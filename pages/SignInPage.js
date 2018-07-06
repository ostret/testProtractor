import basePage from "./basePage";
import RootPage from "./RootPage";

class SignInPage extends basePage {
    constructor() {
        super();
        this.loginInput = element(by.id('username'));
        this.passwordInput = element(by.id('password'));
        this.lostPasswordLink = element(by.css('a[href$="/account/lost_password"]'));
        this.loginButton = element(by.name('login'));
    }

    login(username, password) {
        this.loginInput.clear().sendKeys(username);
        this.passwordInput.clear().sendKeys(password);
        this.loginButton.click();
        return RootPage;
    }
}

export default new SignInPage();