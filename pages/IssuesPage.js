import basePage from "./basePage";
import IndividualIssuePage from "./IndividualIssuePage";

class IssuesPage extends basePage {
    constructor() {
        super();
        this.addFilterSelect = element(by.id('add_filter_select'));
        this.filterInput = element(by.id('values_subject'));
        this.filterApplyLink = element(by.className('icon-checked'));
        this.noDataMsg = element(by.className('nodata'));

    }

    openIssueBySbjct(name) {
        this.addFilterSelect.element(by.cssContainingText('option', 'Subject')).click();
        browser.wait(this.isLoadedLocator(this.filterInput), browser.params.baseTimeout);
        this.filterInput.sendKeys(name);
        this.filterApplyLink.click();
        element(by.xpath('//td[@class="subject"]//a[contains(text(),"' + name + '")]')).click();
        return IndividualIssuePage;
    }

}

export default new IssuesPage();