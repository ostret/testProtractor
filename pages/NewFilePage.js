import basePage from "./basePage";
import FilesPage from "./FilesPage";

class NewFilePage extends basePage {
    constructor() {
        super();
        this.addBtn = element(by.name("commit"));
        this.fileSelectorInput = element(by.className('file_selector'));
    }

    addNewFile(filePath) {

        this.fileSelectorInput.sendKeys(filePath);

        browser.wait(element(by.className('description')).isPresent(), browser.params.baseTimeout);
        browser.wait(element(by.className('filename readonly')).isPresent(), browser.params.baseTimeout);
        browser.wait(element(by.name('attachments[1][token]')).isPresent(), browser.params.baseTimeout);
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.addBtn), browser.params.baseTimeout);
        this.addBtn.click();
        return FilesPage;

    }
}

export default new NewFilePage();