import basePage from "./basePage";

class NewIssuePage extends basePage {

    constructor() {
        super();
        this.trackerInput = element(by.id('issue_tracker_id'));
        this.subjectInput = element(by.id('issue_subject'));
        this.descInput = element(by.id('issue_description'));
        this.statusInput = element(by.id('issue_status_id'));
        this.priorityInput = element(by.id('issue_priority_id'));
        this.createBtn = element(by.name("commit"));

        this.loadedIndicator = element(by.css("#content h2"));

        this.message = element(by.id('flash_notice'));

    }

    fillInNewIssue(trackerType, subject, description, status, priority) {
        this.trackerInput.element(by.cssContainingText('option', trackerType)).click();
        this.subjectInput.sendKeys(subject);
        this.descInput.sendKeys(description);
        this.statusInput.element(by.cssContainingText('option', status)).click();
        this.priorityInput.element(by.cssContainingText('option', priority)).click();
        this.createBtn.click();

    }


}

export default new NewIssuePage();