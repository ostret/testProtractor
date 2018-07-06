import basePage from "./basePage";
import RootPage from "./RootPage";

class ConfirmationPage extends basePage {
    constructor() {
        super();
        this.loadedIndicator = element(by.css("#content h2"));
        this.yesCheckbox = element(by.id('confirm'));
        this.deleteBtn = element(by.name('commit'));
    }

    deleteAccount() {
        this.yesCheckbox.click();
        this.deleteBtn.click();
        return RootPage;
    }
}

export default new ConfirmationPage();