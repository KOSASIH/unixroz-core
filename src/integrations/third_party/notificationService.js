// integrations/third_party/notificationService.js

const twilio = require('twilio');

class NotificationService {
    constructor(accountSid, authToken) {
        this.client = twilio(accountSid, authToken);
    }

    async sendSMS(to, from, body) {
        try {
            const message = await this.client.messages.create({
                body,
                from,
                to,
            });
            return message;
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error('Could not send SMS');
        }
    }
}

module.exports = NotificationService;
