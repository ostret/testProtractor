import basePage from './basePage';
import SignInPage from "./SignInPage";
import ProjectsPage from "./ProjectsPage";
import MyAccountPage from "./MyAccountPage";
import RegisterPage from "./RegisterPage";

class RootPage extends basePage {
    constructor(){
        super();
        this.loadedIndicator = element(by.css('#header h1'));
        this.myAccountLink = element(by.className('my-account'));
    }

    signIn() {
        this.signInLink.click();
        return SignInPage;
    }

    openProjects() {
        this.projectsLink.click();
        return ProjectsPage;
    }

    openMyAccount() {
        this.myAccountLink.click();
        return MyAccountPage;
    }

    openRegisterPage() {
        this.registerLink.click();
        return RegisterPage;
    }


}
export default new RootPage();