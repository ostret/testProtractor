import basePage from "./basePage";
import NewProjectPage from "./NewProjectPage";

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
}

export default new ProjectsPage();