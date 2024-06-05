public class EmailService {
    public static void sendWelcomeEmail(Account acc) {
        String communityUrl = 'https://jignesh5-dev-ed.develop.my.site.com/s';
        String recordUrl = communityUrl + '/detail/' + acc.Id;
        String subject = 'Welcome to ABC Fashion Loyalty Program';
        String body = 'Dear ' + acc.FirstName + ' ' + acc.LastName + ',\n\n' +
              'Please click the link below to complete your profile:\n' +
              recordUrl;
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] {acc.PersonEmail});
        mail.setSubject(subject);
        mail.setPlainTextBody(body);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}