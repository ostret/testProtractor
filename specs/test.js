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
import basePage from "../pages/basePage";
import ConfirmationPage from "../pages/ConfirmationPage";

let epoch = (new Date()).getTime(); // use it as a unique identifier for user


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
        RootPage.registerLink.click();

        expect(registerPage.loadedIndicator.getText()).toBe(titles.title.register);

        //validate registration
        expect(registerPage
            .fillInRegisterPage(regDefaults.registerData.login + epoch.toString(),
                regDefaults.registerData.password + epoch.toString(),
                regDefaults.registerData.password + epoch.toString(),
                regDefaults.registerData.firstName + +epoch.toString(),
                regDefaults.registerData.lastName + epoch.toString(),
                epoch.toString() + regDefaults.registerData.email)
            .submitData().message.getText()).toMatch(titles.message.successSignUp);

        //registerPage.homeLink.click();
        MyAccountPage.logOutLink.click();

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


        IndividualProjectPage.menuSettingsTabsMembers.click();
        browser.wait(IndividualProjectPage.isLoadedLocator(IndividualProjectPage.contentMembersNewLink),
            browser.params.baseTimeout);
        IndividualProjectPage.isPresentMember(userData.testUser.firstname, userData.testUser.lastname)
            .then(function (result) {
                if (result) {
                    console.log('user is already here');
                }
                else {
                    IndividualProjectPage.contentMembersNewLink.click();
                    browser.wait(IndividualProjectPage.isLoadedLocator(IndividualProjectPage.newMemberModal),
                        browser.params.baseTimeout);
                    IndividualProjectPage.addMember(userData.testUser.firstname, userData.testUser.lastname, 1);
                    browser.wait(IndividualProjectPage.isInvisible(IndividualProjectPage.newMemberModal),
                        browser.params.baseTimeout);
                    IndividualProjectPage.removeMember(userData.testUser.firstname, userData.testUser.lastname);
                }
            });

        IndividualProjectPage.menuNewIssue.click();

        browser.wait(NewIssuePage.isLoaded(), browser.params.baseTimeout);
        expect(NewIssuePage.loadedIndicator.getText()).toBe(titles.title.newIssue);
        NewIssuePage.fillInNewIssue(
            newIssueData.newIssue.trackerType, newIssueData.newIssue.subject + epoch.toString(),
            newIssueData.newIssue.description,
            newIssueData.newIssue.status, newIssueData.newIssue.priority
        );
        expect(NewIssuePage.message.getText()).toMatch(/Issue #\d+ created./);
        $$('.icon-del').get(0).click();
        browser.switchTo().alert().accept();


    });


    it('should close project', function () {
        RootPage.openProjects()
            .findProjectAndOpen(projectData.projectData.name + epoch.toString())
            .menuOverview.click();
        browser.wait(IndividualProjectPage.isLoaded(), browser.params.baseTimeout);
        expect(IndividualProjectPage.loadedIndicator.getText()).toBe(titles.title.overview);
        IndividualProjectPage.closeProject();

    });
    it('should delete account', function () {
        expect(RootPage.openMyAccount().deleteMyAccount().loadedIndicator.getText()).toBe(titles.title.confirmation);
        expect(RootPage.isInvisible(ConfirmationPage.deleteAccount().loggedInUserText)).toBeTruthy();

    });

});