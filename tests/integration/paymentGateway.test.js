// tests/integration/paymentGateway.test.js

const PaymentGateway = require('../../integrations/third_party/paymentGateway'); // Adjust the path as necessary
const config = require('../../utils/configuration/config'); // Import configuration for API keys

describe('Payment Gateway Integration', () => {
    let paymentGateway;

    beforeAll(() => {
        // Initialize the payment gateway with necessary credentials
        paymentGateway = new PaymentGateway(config.STRIPE_SECRET_KEY); // Assuming you're using Stripe
    });

    it('should create a payment intent', async () => {
        const amount = 1000; // Amount in cents
        const currency = 'usd';

        const intent = await paymentGateway.createPaymentIntent(amount, currency);

        expect(intent).toHaveProperty('id'); // Check if the intent has an ID
        expect(intent).toHaveProperty('status', 'requires_payment_method'); // Check the initial status
    });

    it('should confirm a payment intent', async () => {
        const amount = 1000; // Amount in cents
        const currency = 'usd';

        // First, create a payment intent
        const intent = await paymentGateway.createPaymentIntent(amount, currency);
        
        // Now confirm the payment intent (this is a mock; in a real scenario, you'd use a valid payment method)
        const paymentMethodId = 'pm_card_visa'; // Replace with a valid payment method ID for testing

        const confirmedIntent = await paymentGateway.confirmPaymentIntent(intent.id, paymentMethodId);

        expect(confirmedIntent).toHaveProperty('id', intent.id); // Check if the confirmed intent ID matches
        expect(confirmedIntent).toHaveProperty('status', 'succeeded'); // Check if the status is 'succeeded'
    });

    it('should handle payment failures gracefully', async () => {
        const amount = 1000; // Amount in cents
        const currency = 'usd';

        // Create a payment intent
        const intent = await paymentGateway.createPaymentIntent(amount, currency);
        
        // Attempt to confirm with an invalid payment method ID
        const invalidPaymentMethodId = 'pm_invalid'; // Invalid payment method ID

        await expect(paymentGateway.confirmPaymentIntent(intent.id, invalidPaymentMethodId)).rejects.toThrow('Payment failed'); // Adjust the error message based on your implementation
    });
});
