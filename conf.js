
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specs/test.js'],
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: [  "--disable-gpu", "--window-size=800,600" ]
        }
    },
    framework:'jasmine',
    jasmineNodeOpts: {
        showColors: true,   // Use colors in the command line report.
        defaultTimeoutInterval: 30000   // Default time to wait in ms before a test fails.
    },
    onPrepare: () => {

        browser.ignoreSynchronization = true;
        require("babel-register");
        require("babel-core/register")({presets: ["es2015"]});
    }
};