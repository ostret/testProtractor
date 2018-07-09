import basePage from "./basePage";
import IndividualIssuePage from "./IndividualIssuePage";

class NewIssuePage extends basePage {

    constructor() {
        super();
        this.trackerInput = element(by.id('issue_tracker_id'));
        this.subjectInput = element(by.id('issue_subject'));
        this.descInput = element(by.id('issue_description'));
        this.statusInput = element(by.id('issue_status_id'));
        this.priorityInput = element(by.id('issue_priority_id'));
        this.assgineeInput = element(by.id('issue_assigned_to_id'));
        this.startDateInput = element(by.id('issue_start_date'));
        this.dueDateInput = element(by.id('issue_due_date'));
        this.donePercentage = element(by.id('issue_done_ratio'));
        this.FileAttachementInput = element(by.className('file_selector'));


        this.createBtn = element(by.name("commit"));


        this.loadedIndicator = element(by.css("#content h2"));



    }

    fillInNewIssue(trackerType, subject, description, status, priority, assignee, startDate, dueDate, donePercentage,
                   filePath) {
        this.trackerInput.element(by.cssContainingText('option', trackerType)).click();
        this.subjectInput.sendKeys(subject);
        this.descInput.sendKeys(description);
        this.statusInput.element(by.cssContainingText('option', status)).click();
        this.priorityInput.element(by.cssContainingText('option', priority)).click();
        this.assgineeInput.element(by.cssContainingText('option', assignee)).click();
        this.startDateInput.clear().sendKeys(startDate);
        this.dueDateInput.sendKeys(dueDate);
        this.donePercentage.element(by.cssContainingText('option', donePercentage)).click();
        this.FileAttachementInput.sendKeys(filePath);

        browser.wait(protractor.ExpectedConditions.presenceOf(element(by.name('attachments[1][description]'))), browser.params.baseTimeout);
        browser.wait(protractor.ExpectedConditions.presenceOf(element(by.name('attachments[1][filename]'))),
            browser.params.baseTimeout);
        browser.wait(protractor.ExpectedConditions.presenceOf(element(by.name('attachments[1][token]'))),
            browser.params.baseTimeout);

        // browser.sleep(1000);
        this.createBtn.click();
        return IndividualIssuePage;

    }


}

export default new NewIssuePage();