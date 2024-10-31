// tests/integration/notificationService.test.js

const NotificationService = require('../../integrations/third_party/notificationService');

describe('Notification Service Integration', () => {
    const notificationService = new NotificationService(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    it('should send an SMS', async () => {
        const message = await notificationService.sendSMS(
            '+1234567890', // Replace with a valid phone number
            '+0987654321', // Replace with a valid Twilio number
            'Hello from the Notification Service!'
        );
        expect(message).toHaveProperty('sid');
        expect(message).toHaveProperty('status', 'queued');
    });
});
