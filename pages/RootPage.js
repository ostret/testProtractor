class RootPage {
    constructor(){
        this.loggedInUserLink = element(by.id('loggedas'));
        this.registerLink = element(by.className('register'));
        this.logOutLink = element(by.className('loggout'))
    }

    ifLoggedInCleanUp() {
        this.loggedInUserLink.isPresent().then(function (result) {
            if (result){
                return this.logOutLink.click();
            }
            else
            {console.log("user was not logged in")}
        });

    }
    

}
export default new RootPage();