import basePage from './basePage';
import SignInPage from "./SignInPage";
import ProjectsPage from "./ProjectsPage";

class RootPage extends basePage {
    constructor(){
        super();
        this.loadedIndicator = element(by.css('#header h1'));
    }

    signIn() {
        this.signInLink.click();
        return SignInPage;
    }

    openProjects() {
        this.projectsLink.click();
        return ProjectsPage;
    }

}
export default new RootPage();