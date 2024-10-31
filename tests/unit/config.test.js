// tests/unit/config.test.js

const config = require('../../utils/configuration/config');

describe('Configuration', () => {
    it('should have a PORT defined', () => {
        expect(config.PORT).toBeDefined();
    });

    it('should have a DB_URI defined', () => {
        expect(config.DB_URI).toBeDefined();
    });

    it('should have a JWT_SECRET defined', () => {
        expect(config.JWT_SECRET).toBeDefined();
    });
});
