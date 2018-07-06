import basePage from "./basePage";
import IndividualProjectPage from "./IndividualProjectPage";

class NewProjectPage extends basePage {
    constructor() {
        super();
        this.projectNameInput = element(by.id('project_name'));
        this.descriptionInput = element(by.id('project_description'));
        this.idInput = element(by.id('project_identifier'));
        this.homepageInput = element(by.id('project_homepage'));
        this.publicPropertyChckBox = element(by.id('project_is_public'));
        this.inheritPropertyChckBox = element(by.id('project_inherit_members'));

        this.createBtn = element(by.name("commit"));
        this.createAndContinueBtn = element(by.name("continue"));

        //this.message = element(by.id('flash_notice'));

    }

    fillInNewProjectForm(name, description, id, homePage, publicProperty = true, inheritProperty = false) {

        this.projectNameInput.clear().sendKeys(name);
        this.descriptionInput.clear().sendKeys(description);
        this.idInput.clear().sendKeys(id);

        this.homepageInput.clear().sendKeys(homePage);
        if (!publicProperty) {
            this.publicPropertyChckBox.click();
        }
        if (inheritProperty) {
            this.inheritPropertyChckBox.click();
        }

        return this;
    }

    submitNewProject() {
        this.createBtn.click();
        return IndividualProjectPage;
    }

}

export default new NewProjectPage();