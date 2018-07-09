import basePage from "./basePage";
import IssuesPage from "./IssuesPage";
import NewIssuePage from "./NewIssuePage";
import FilesPage from "./FilesPage";

class IndividualProjectPage extends basePage {
    constructor() {
        super();
        this.loadedIndicator = element(by.css("#content h2"));


        this.mainMenu = element(by.id('main-menu'));
        this.menuSettings = this.mainMenu.element(by.className('settings'));
        this.menuIssues = this.mainMenu.element(by.className('issues '));
        this.menuNewIssue = this.mainMenu.element(by.className('new-issue'));
        this.menuOverview = this.mainMenu.element(by.className('overview'));
        this.menuFiles = this.mainMenu.element(by.className('files'));


        this.menuSettingsTabs = element(by.className('tabs'));
        this.menuSettingsTabsMembers = this.menuSettingsTabs.element(by.id('tab-members'));

        this.contentMembers = element(by.id('tab-content-members'));
        this.contentMembersNewLink = this.contentMembers.element(by.css('a[href$="/memberships/new"]'));

        this.newMemberModal = element(by.id('new_membership'));
        this.newMemberModalSearch = this.newMemberModal.element(by.id('principal_search'));
        this.newMemberModalList = this.newMemberModal.element(by.id('principals'));
        this.newMemberModalSubmitBtn = this.newMemberModal.element(by.id('member-add-submit'));

        this.newMemberModalRoleSelection = this.newMemberModal.element(by.className('roles-selection'));

        this.message = element(by.id('flash_notice'));
        this.warningNotice = element(by.xpath('//p[@class="warning"]//span[@class="icon icon-lock"]'));
        this.closeIcon = element(by.className('icon-lock'));
    }

    searchUserByFullName(firstname, lastname) {
        this.newMemberModalSearch.sendKeys(firstname + " " + lastname);
        // this search input is terrible, it does not have text, have to wait for attribute to change value
        browser.wait(this.isLoadedLocator($('#principal_search[data-value-was="' + firstname + " " + lastname + '"]')),
            browser.params.baseTimeout);

    }

    selectFirstResult(firstname, lastname) {
        let xpath = '//label[contains(text(),"' + firstname + " " + lastname +
            '")]//input';
        browser.wait(this.isLoadedLocator(this.newMemberModalList.element(by.xpath(xpath))), browser.params.baseTimeout);
        this.newMemberModalList.element(by.xpath(xpath)).click();
        // browser.wait(this.isSelected(this.newMemberModalList.element(by.xpath(xpath))),
        //     browser.params.baseTimeout );

    }

    selectRoleByValue(value) {
        this.newMemberModalRoleSelection.all(by.css('label')).get(value).click();
    }

    addMember(firstname, lastname, role) {
        this.searchUserByFullName(firstname, lastname);
        this.selectFirstResult(firstname, lastname);
        this.selectRoleByValue(role);
        this.newMemberModalSubmitBtn.click();
        return this;
    }

    removeMember(firstname, lastname) {
        let xpath = '//a[contains(text(),"' + firstname + " " + lastname +
            '")]/parent::td/parent::tr/td[contains(@class, "buttons")]/a[contains(@class,"icon-del")]';
        element(by.xpath(xpath)).click();
        return this;

    }

    isPresentMember(firstname, lastname) {
        let xpath = '//a[contains(text(),"' + firstname + " " + lastname +
            '")]';
        return element(by.xpath(xpath)).isPresent();
    }

    closeProject() {
        this.closeIcon.click();
        browser.switchTo().alert().accept();
        return this;

    }

    openIssues() {
        this.menuIssues.click();
        return IssuesPage;
    }

    openFilesTab() {
        this.menuFiles.click();
        return FilesPage;

    }

    openNewIssue() {
        this.menuNewIssue.click();
        return NewIssuePage;
    }

    openSettingsMembersTab() {
        this.menuSettingsTabsMembers.click();
        return this;
    }

    openOverviewTab() {
        this.menuOverview.click();
        return this;
    }

    openNewMemberModal() {
        this.contentMembersNewLink.click();
        return this;
    }

    lookUpMemberByName(firstname, lastname) {
        return element(by.xpath('//a[contains(text(),"' + firstname + " " + lastname + '")]'));
    }


}

export default new IndividualProjectPage();