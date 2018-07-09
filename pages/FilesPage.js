import basePage from "./basePage";
import NewFilePage from "./NewFilePage";

class FilesPage extends basePage {
    constructor() {
        super();
        this.newFileLink = element(by.className('icon-add'));


    }

    openAddNewFilePage() {
        this.newFileLink.click();
        return NewFilePage;
    }

    lookUpFileByName(name) {
        return element(by.xpath('//td[@class="filename"]//a[contains(text(),"' + name + '")]'));
    }

    removeFileByName(name) {
        element(by.xpath('//a[contains(text(),"' + name
            + '")]//parent::td//parent::tr//td[@class="buttons"]//a[@data-method="delete"]')).click();
        browser.switchTo().alert().accept();
        return this;

    }

}

export default new FilesPage();