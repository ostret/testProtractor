import basePage from "./basePage";
import MyAccountPage from "./MyAccountPage";

class RegisterPage extends basePage {

    constructor(){
        super();
        this.loadedIndicator = element(by.css("#content h2"));

        this.loginInput = element(by.id("user_login"));
        this.passwordInput = element(by.id("user_password"));
        this.passwordConfirmationInput = element(by.id("user_password_confirmation"));
        this.firstNameInput = element(by.id("user_firstname"));
        this.lasttNameInput = element(by.id("user_lastname"));
        this.emailInput = element(by.id("user_mail"));
        this.submitBtn = element(by.name("commit"));
    }

    fillInRegisterPage(login, password, confPassword, firstName, lastName, email) {
        this.loginInput.clear().sendKeys(login);
        this.passwordInput.clear().sendKeys(password);
        this.passwordConfirmationInput.clear().sendKeys(confPassword);
        this.firstNameInput.clear().sendKeys(firstName);
        this.lasttNameInput.clear().sendKeys(lastName);
        this.emailInput.clear().sendKeys(email);
        return this;

    }

    submitData() {
        this.submitBtn.click();
        return MyAccountPage;

    }

}
export default new RegisterPage();