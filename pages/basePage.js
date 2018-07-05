export default class basePage{
    constructor(){

        this.topMenu = element(by.id('top-menu'));
        this.loggedInUserLink = this.topMenu.element(by.id('loggedas'));
        this.loggedInUserText = this.loggedInUserLink.element(by.className("user"));
        this.registerLink = this.topMenu.element(by.className('register'));
        this.logOutLink = this.topMenu.element(by.className('loggout'));
        this.signInLink = this.topMenu.element(by.className('login'));
        this.homeLink = this.topMenu.element(by.className('home'));
        this.projectsLink = this.topMenu.element(by.className('projects'));


        this.loadedIndicator;
    }

    ifLoggedInCleanUp() {
        this.loggedInUserLink.isPresent().then(function (result) {
            if (result){
                this.logOutLink.click();
            }
            else
            {console.log("user was not logged in")}
        });

    }

    isLoaded(){
        return protractor.ExpectedConditions.visibilityOf(this.loadedIndicator);
    }
    isLoadedLocator(locator){
        return protractor.ExpectedConditions.visibilityOf(locator);
    }
    isClosed(locator){
        return protractor.ExpectedConditions.stalenessOf(locator);
    }

    isInvisible(locator){
        return protractor.ExpectedConditions.invisibilityOf(locator);
    }


}
