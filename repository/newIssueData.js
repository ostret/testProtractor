export const trackerType = {
    BUG: {value: 0, description: 'Bug'},
    FEATURE: {value: 1, description: 'Feature'},
    SUPPORT: {value: 2, description: 'Support'}
};
export const statusType = {
    NEW: {value: 0, description: 'New'},
    IN_PROGRESS: {value: 1, description: 'In Progress'},
    RESOLVED: {value: 2, description: 'Resolved'},
    FEEDBACK: {value: 3, description: 'Feedback'},
    CLOSED: {value: 4, description: 'Closed'},
    REJECTED: {value: 5, description: 'Rejected'},
};

export const priorityType = {
    LOW: {value: 0, description: 'Low'},
    NORMAL: {value: 1, description: 'Normal'},
    HIGH: {value: 2, description: 'High'},
    URGENT: {value: 3, description: 'Urgent'},
    IMMEDIATE: {value: 2, description: 'Immediate'}
};

export default {
    newIssue: {
        trackerType: trackerType.BUG.description, subject: "Subject", description: "desc",
        status: statusType.NEW.description, priority: priorityType.IMMEDIATE.description,
        assignee: "<< me >>", dueDateOffset: 7, donePercentage: '90 %'
    }
}