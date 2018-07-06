import basePage from "./basePage";
import NewProjectPage from "./NewProjectPage";
import IndividualProjectPage from "./IndividualProjectPage";

class ProjectsPage extends basePage {
    constructor() {
        super();
        this.newProjectLink = element(by.css('a[href$="/projects/new"]'));
        this.loadedIndicator = element(by.css("#content h2"));
    }

    openNewProjectPage() {
        this.newProjectLink.click();
        return NewProjectPage;
    }

    findProjectAndOpen(name) {
        element(by.xpath('//li[@class="root"]//div[@class="root"]//a[contains(text(),"' + name + '")]')).click();
        return IndividualProjectPage;

    }
}

export default new ProjectsPage();