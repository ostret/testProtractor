import regDefaults from "../repository/userData"

class RegisterPage{

    constructor(){
        this.loginInput = element(by.id("user_login"));
        this.passwordInput = element(by.id("user_password"));
        this.passwordConfirmationInput = element(by.id("user_password_confirmation"));
        this.firstNameInput = element(by.id("user_firstname"));
        this.lasttNameInput = element(by.id("user_lastname"));
        this.emailInput = element(by.id("user_mail"));
        this.submitBtn = element(by.name("commit"));
    }

     fillInRegisterPage(){
        let epoch = (new Date).getTime();
         console.log(epoch.toString());

         this.loginInput.sendKeys(regDefaults.registerData.login + epoch.toString());
         this.passwordInput.sendKeys(regDefaults.registerData.password + epoch.toString());
         this.passwordConfirmationInput.sendKeys(regDefaults.registerData.password + epoch.toString());
         this.firstNameInput.sendKeys(regDefaults.registerData.firstName);
         this.lasttNameInput.sendKeys(regDefaults.registerData.lastName);
         this.emailInput.sendKeys(epoch.toString() + regDefaults.registerData.email);
         this.submitBtn.click();
        return epoch;
    }
}
export default new RegisterPage();