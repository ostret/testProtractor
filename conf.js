var AllureReporter = require('jasmine-allure-reporter');


exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specs/test.js'],
    multiCapabilities: [
        {
            browserName: 'chrome',
            chromeOptions: {
                args: ["--disable-gpu", "--window-size=1600,800"],
                prefs: {
                    autofill: {
                        auxiliary_profiles_enabled: false,
                        enabled: false
                    }
                }
            }
        }
        ,
        {
            'browserName': 'firefox',
            'moz:firefoxOptions': {
                'args': ['--safe-mode']
            }
        }


    ],
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,   // Use colors in the command line report.
        defaultTimeoutInterval: 30000   // Default time to wait in ms before a test fails.
    },
    onPrepare: () => {

        browser.ignoreSynchronization = true;
        require("babel-register");
        require("babel-core/register")({presets: ["es2015"]});

        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64');
                }, 'image/png')();
                done();
            });
        });

    },
    params: {
        baseURL: 'http://demo.redmine.org/',
        baseTimeout: 5000
    }
};