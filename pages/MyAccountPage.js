import basePage from "./basePage";
import ConfirmationPage from "./ConfirmationPage";

class MyAccountPage extends basePage {

    constructor() {
        super();
        this.loadedIndicator = element(by.css("#content h2"));
        this.message = element(by.id('flash_notice'));
        this.deleteMyAccountLink = element(by.xpath('//div[@id="sidebar"]//a[@class="icon icon-del"]'));
    }

    deleteMyAccount() {
        this.deleteMyAccountLink.click();
        return ConfirmationPage;
    }


}

export default new MyAccountPage();