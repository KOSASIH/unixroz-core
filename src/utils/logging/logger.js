// utils/logging/logger.js

const LogLevels = require('./logLevels');

class Logger {
    constructor() {
        this.logLevel = LogLevels.INFO; // Default log level
    }

    setLogLevel(level) {
        this.logLevel = level;
    }

    log(level, message) {
        const currentTime = new Date().toISOString();
        if (this.shouldLog(level)) {
            console.log(`[${currentTime}] [${level}]: ${message}`);
        }
    }

    shouldLog(level) {
        const levels = Object.values(LogLevels);
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    info(message) {
        this.log(LogLevels.INFO, message);
    }

    warn(message) {
        this.log(LogLevels.WARN, message);
    }

    error(message) {
        this.log(LogLevels.ERROR, message);
    }

    debug(message) {
        this.log(LogLevels.DEBUG, message);
    }
}

module.exports = new Logger();
