// integrations/third_party/paymentGateway.js

const stripe = require('stripe')('your_stripe_secret_key');

class PaymentGateway {
    async createPaymentIntent(amount, currency) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });
            return paymentIntent;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw new Error('Could not create payment intent');
        }
    }

    async confirmPayment(intentId, paymentMethodId) {
        try {
            const paymentIntent = await stripe.paymentIntents.confirm(intentId, {
                payment_method: paymentMethodId,
            });
            return paymentIntent;
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw new Error('Could not confirm payment');
        }
    }
}

module.exports = PaymentGateway;
