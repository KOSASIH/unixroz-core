// tests/unit/logger.test.js

const logger = require('../../utils/logging/logger');
const LogLevels = require('../../utils/logging/logLevels');

describe('Logger', () => {
    beforeEach(() => {
        console.log = jest.fn(); // Mock console.log
    });

    it('should log info messages', () => {
        logger.info('This is an info message');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('INFO: This is an info message'));
    });

    it('should log error messages', () => {
        logger.error('This is an error message');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('ERROR: This is an error message'));
    });

    it('should not log debug messages if log level is INFO', () => {
        logger.setLogLevel(LogLevels.INFO);
        logger.debug('This is a debug message');
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should log debug messages if log level is DEBUG', () => {
        logger.setLogLevel(LogLevels.DEBUG);
        logger.debug('This is a debug message');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('DEBUG: This is a debug message'));
    });
});
