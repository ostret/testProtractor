import basePage from "./basePage";

class IndividualProjectPage extends basePage {
    constructor() {
        super();
        this.loadedIndicator = element(by.css("#content h2"));


        this.mainMenu = element(by.id('main-menu'));
        this.menuSettings = this.mainMenu.element(by.className('settings'));
        this.menuNewIssue = this.mainMenu.element(by.className('new-issue'));
        this.menuOverview = this.mainMenu.element(by.className('overview'));

        this.menuSettingsTabs = element(by.className('tabs'));
        this.menuSettingsTabsMembers = this.menuSettingsTabs.element(by.id('tab-members'));

        this.contentMembers = element(by.id('tab-content-members'));
        this.contentMembersNewLink = this.contentMembers.element(by.css('a[href$="/memberships/new"]'));

        this.newMemberModal = element(by.id('new_membership'));
        this.newMemberModalSearch = this.newMemberModal.element(by.name('principal_search'));
        this.newMemberModalList = this.newMemberModal.element(by.id('principals'));
        this.newMemberModalSubmitBtn = this.newMemberModal.element(by.id('member-add-submit'));

        this.newMemberModalRoleSelection = this.newMemberModal.element(by.className('roles-selection'));

        this.message = element(by.id('flash_notice'));

    }

    searchUserByFullName(firstname, lastname) {
        this.newMemberModalSearch.sendKeys(firstname + " " + lastname);
        browser.driver.sleep(3000);
    }

    selectFirstResult() {
        this.newMemberModalList.all(by.name('membership[user_ids][]')).get(0).click();
    }

    selectRoleByValue(value) {
        this.newMemberModalRoleSelection.all(by.css('label')).get(value).click();
    }

    addMember(firstname, lastname, role) {
        this.searchUserByFullName(firstname, lastname);
        this.selectFirstResult();
        this.selectRoleByValue(role);
        this.newMemberModalSubmitBtn.click();
    }

    removeMember(firstname, lastname) {
        let xpath = '//a[contains(text(),"' + firstname + " " + lastname +
            '")]/parent::td/parent::tr/td[contains(@class, "buttons")]/a[contains(@class,"icon-del")]';
        element(by.xpath(xpath)).click();

    }

    isPresentMember(firstname, lastname) {
        let xpath = '//a[contains(text(),"' + firstname + " " + lastname +
            '")]';
        return element(by.xpath(xpath)).isPresent();
    }


}

export default new IndividualProjectPage();