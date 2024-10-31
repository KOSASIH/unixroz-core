// tests/performance/performance.test.js

const PaymentGateway = require('../../integrations/third_party/paymentGateway');
const NotificationService = require('../../integrations/third_party/notificationService');

describe('Performance Tests', () => {
    const paymentGateway = new PaymentGateway();
    const notificationService = new NotificationService(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    it('should measure the performance of creating a payment intent', async () => {
        const start = Date.now();
        await paymentGateway.createPaymentIntent(1000, 'usd');
        const duration = Date.now() - start;
        console.log(`Payment Intent Creation Duration: ${duration}ms`);
        expect(duration).toBeLessThan(2000); // Expect it to be less than 2 seconds
    });

    it('should measure the performance of sending an SMS', async () => {
        const start = Date.now();
        await notificationService.sendSMS(
            '+1234567890', // Replace with a valid phone number
            '+0987654321', // Replace with a valid Twilio number
            'Performance test message'
        );
        const duration = Date.now() - start;
        console.log(`SMS Sending Duration: ${duration}ms`);
        expect(duration).toBeLessThan(2000); // Expect it to be less than 2 seconds
    });
});
