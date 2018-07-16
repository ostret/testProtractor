import RootPage from '../pages/RootPage';
import registerPage from '../pages/RegisterPage';
import regDefaults from '../repository/userData';
import ProjectsPage from "../pages/ProjectsPage";
import projectData from "../repository/projectData";
import IndividualProjectPage from "../pages/IndividualProjectPage";
import NewIssuePage from "../pages/NewIssuePage";
import newIssueData from "../repository/newIssueData";
import titles from "../repository/titles";
import userData from "../repository/userData";
import MyAccountPage from "../pages/MyAccountPage";
import ConfirmationPage from "../pages/ConfirmationPage";


import * as path from 'path';
import fileData from "../repository/fileData";
import FilesPage from "../pages/FilesPage";
import IndividualIssuePage from "../pages/IndividualIssuePage";
import IssuesPage from "../pages/IssuesPage";

let epoch = (new Date()).getTime(); // use it as a unique identifier for user
let filePath = (browser.params.dockerMode) ? fileData.fileDataDocker.relPath : path.resolve(__dirname, fileData.fileData.relPath);
let fileName = (browser.params.dockerMode) ? fileData.fileDataDocker.fileName : fileData.fileData.fileName;


describe('redmine demo test suite', function () {
    beforeAll(() => {

        browser.waitForAngularEnabled(false);
        browser.get(browser.params.baseURL);

        //verify we are logged out first
        RootPage.ifLoggedInCleanUp();
    });

    it('should register, login, create project and issue', function () {

        //wait for Root Page to load

        expect(RootPage.isLoaded()).toBeTruthy();

        //go and register a new user with default dto

        expect(RootPage.openRegisterPage().loadedIndicator.getText()).toBe(titles.title.register);

        //validate registration
        expect(registerPage
            .fillInRegisterPage(regDefaults.registerData.login + epoch.toString(),
                regDefaults.registerData.password + epoch.toString(),
                regDefaults.registerData.password + epoch.toString(),
                regDefaults.registerData.firstName + +epoch.toString(),
                regDefaults.registerData.lastName + epoch.toString(),
                epoch.toString() + regDefaults.registerData.email)
            .submitData().message.getText()).toMatch(titles.message.successSignUp);

        //  log out
        expect(MyAccountPage.logout().loggedInUserText.isPresent()).toBeFalsy();


        // login with new user and check name in header
        expect(RootPage
            .signIn()
            .login(regDefaults.registerData.login + epoch.toString(),
                regDefaults.registerData.password + epoch.toString())
            .loggedInUserText.getText()).toBe(regDefaults.registerData.login + epoch.toString());


        //open Projects
        browser.wait(RootPage.openProjects().isLoaded(), browser.params.baseTimeout);

        //create new project
        expect(
            ProjectsPage
                .openNewProjectPage()
                .fillInNewProjectForm(projectData.projectData.name + epoch.toString(),
                    projectData.projectData.description,
                    projectData.projectData.id + epoch.toString(),
                    projectData.projectData.homepage)
                .submitNewProject()
                .message.getText()
        ).toMatch(titles.message.successProjectCreate);


        //IndividualProjectPage.menuSettingsTabsMembers.click();
        // add new member
        browser.wait(IndividualProjectPage
                .openSettingsMembersTab()
                .isLoadedLocator(IndividualProjectPage.contentMembersNewLink),
            browser.params.baseTimeout);

        //if user is already added - skip it

        IndividualProjectPage.lookUpMemberByName(userData.testUser.firstname, userData.testUser.lastname).isPresent()
            .then(function (result) {
                if (result) {
                    console.log('user is already here');
                }
                // otherwise find and add
                else {

                    browser.wait(IndividualProjectPage.isLoadedLocator(IndividualProjectPage.openNewMemberModal().newMemberModal),
                        browser.params.baseTimeout);
                    browser.wait(IndividualProjectPage.addMember(userData.testUser.firstname,
                        userData.testUser.lastname, userData.roleType.DEVELOPER.value)
                            .lookUpMemberByName(userData.testUser.firstname, userData.testUser.lastname).isPresent()
                        , browser.params.baseTimeout);
                    browser.wait(IndividualProjectPage.isInvisible(IndividualProjectPage.newMemberModal),
                        browser.params.baseTimeout);
                    browser.wait(protractor.ExpectedConditions.invisibilityOf(IndividualProjectPage.removeMember(userData.testUser.firstname, userData.testUser.lastname)
                        .lookUpMemberByName(userData.testUser.firstname, userData.testUser.lastname)), browser.params.baseTimeout);

                }
            });

        // add new issue
        browser.wait(IndividualProjectPage.openNewIssue().isLoaded(), browser.params.baseTimeout);
        expect(NewIssuePage.loadedIndicator.getText()).toBe(titles.title.newIssue);
        var result = new Date();
        result.setDate(result.getDate() + newIssueData.newIssue.dueDateOffset);

        expect(
            NewIssuePage.fillInNewIssue(
                newIssueData.newIssue.trackerType, newIssueData.newIssue.subject + epoch.toString(),
                newIssueData.newIssue.description,
                newIssueData.newIssue.status, newIssueData.newIssue.priority, newIssueData.newIssue.assignee,
                (new Date()).toISOString().slice(0, 10),
                result.toISOString().slice(0, 10), newIssueData.newIssue.donePercentage,
                filePath)
                .message.getText()).toMatch(/Issue #\d+ created./);

        expect(IndividualIssuePage.statusValue.getText()).toBe(newIssueData.newIssue.status);
        expect(IndividualIssuePage.priorityValue.getText()).toBe(newIssueData.newIssue.priority);
        expect(IndividualIssuePage.assigneeLink.getText()).toBe(regDefaults.registerData.firstName + epoch.toString()
            + " " + regDefaults.registerData.lastName + epoch.toString());
        expect(IndividualIssuePage.attachementLink.getText()).toBe(fileName);

    });
    it('should add file to project', function () {
        expect(
            RootPage.openProjects()
                .findProjectAndOpen(projectData.projectData.name + epoch.toString())
                .openFilesTab()
                .openAddNewFilePage()
                .addNewFile(filePath)
                .lookUpFileByName(fileName).isPresent())
            .toBeTruthy();

    });

    it('should remove file from project', function () {
        RootPage
            .openProjects()
            .findProjectAndOpen(projectData.projectData.name + epoch.toString())
            .openFilesTab().lookUpFileByName(fileName).isPresent()
            .then(function (result) {
                if (result) {
                    browser.wait(protractor.ExpectedConditions.invisibilityOf(FilesPage
                            .removeFileByName(fileName)
                            .lookUpFileByName(fileName))
                        , browser.params.baseTimeout);
                }
                else {
                    pending('there was no file to delete'); // there's a bug that will mark it failed though
                }
            });

    });


    it('should remove issue', function () {

        browser.wait(RootPage.isLoadedLocator(
            RootPage.openProjects()
                .findProjectAndOpen(projectData.projectData.name + epoch.toString())
                .openIssues()
                .openIssueBySbjct(newIssueData.newIssue.subject + epoch.toString())
                .deleteCurrentIssue()
                .noDataMsg), browser.params.baseTimeout);
        expect(IssuesPage.noDataMsg.getText()).toBe(titles.message.noDataForIssues);
    });


    it('should close project', function () {
        browser.wait(RootPage.openProjects()
            .findProjectAndOpen(projectData.projectData.name + epoch.toString())
            .openOverviewTab().isLoaded(), browser.params.baseTimeout);
        expect(IndividualProjectPage.loadedIndicator.getText()).toBe(titles.title.overview);
        browser.wait(protractor.ExpectedConditions.presenceOf(
            IndividualProjectPage.closeProject().warningNotice), browser.params.baseTimeout);
        expect(IndividualProjectPage.warningNotice.getText()).toBe(titles.message.successCloseProject);


    });
    it('should delete account', function () {
        expect(RootPage.openMyAccount().deleteMyAccount().loadedIndicator.getText()).toBe(titles.title.confirmation);
        expect(RootPage.isInvisible(ConfirmationPage.deleteAccount().loggedInUserText)).toBeTruthy();

    });
});