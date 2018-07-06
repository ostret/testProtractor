import basePage from "./basePage";

class MyAccountPage extends basePage {

    constructor() {
        super();
        this.loadedIndicator = element(by.css("#content h2"));
        this.message = element(by.id('flash_notice'));
    }
}

export default new MyAccountPage();