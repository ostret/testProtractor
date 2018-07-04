import RootPage from '../pages/RootPage';
import registerPage from '../pages/RegisterPage'

describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
        browser.waitForAngularEnabled(false);
        browser.get('http://demo.redmine.org/');
        RootPage.ifLoggedInCleanUp();
        RootPage.registerLink.click();
        browser.sleep(3000);
        let epoch = registerPage.fillInRegisterPage();
        browser.sleep(5000);




    });
});