trigger AccountTrigger on Account (before insert, after insert) {
    // Query the RecordType ID for Person Account once and store it for reuse
    RecordType personAccountRecordType = [SELECT Id FROM RecordType WHERE Name = 'Person Account' LIMIT 1];
    
    // Before Insert: Generate Secure Token
    if (Trigger.isBefore && Trigger.isInsert) {
        for (Account acc : Trigger.new) {
            if (acc.RecordTypeId == personAccountRecordType.Id) {
                acc.Secure_Token__c = TokenGenerator.generateToken();
            }
        }
    }

    // After Insert: Send Welcome Email
    if (Trigger.isAfter && Trigger.isInsert) {
        for (Account acc : Trigger.new) {
            if (acc.RecordTypeId == personAccountRecordType.Id) {
                EmailService.sendWelcomeEmail(acc);
            }
        }
    }
}