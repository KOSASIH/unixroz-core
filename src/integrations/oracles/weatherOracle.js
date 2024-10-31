// integrations/oracles/weatherOracle.js

const axios = require('axios');

class WeatherOracle {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeather(city) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw new Error('Could not fetch weather data');
        }
    }
}

module.exports = WeatherOracle;
