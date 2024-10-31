// analyticsModel.js
const tf = require('@tensorflow/tfjs');

class AnalyticsModel {
    constructor() {
        this.model = null;
    }

    // Function to create a linear regression model
    async createModel() {
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        this.model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
    }

    // Function to train the model
    async trainModel(xs, ys) {
        const xsTensor = tf.tensor2d(xs, [xs.length, 1]);
        const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

        await this.model.fit(xsTensor, ysTensor, { epochs: 100 });
    }

    // Function to make predictions
    async predict(input) {
        const inputTensor = tf.tensor2d([input], [1, 1]);
        const prediction = this.model.predict(inputTensor);
        return prediction.dataSync()[0];
    }
}

module.exports = AnalyticsModel;
