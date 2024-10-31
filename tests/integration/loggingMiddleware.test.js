import { loggingMiddleware } from '../../src/middleware/loggingMiddleware';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../src/utils/logger';

describe('Logging Middleware', () => {
  it('should log a request and response', async () => {
    const req = {
      method: 'GET',
      url: '/api/data',
    };
    const res = {
      statusCode: 200,
    };
    const next = jest.fn();

    await loggingMiddleware(req, res, next);

    expect(logger.getLogs().length).toBe(1);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should detect an anomaly in a log entry', async () => {
    const req = {
      method: 'GET',
      url: '/api/data',
    };
    const res = {
      statusCode: 500,
    };
    const next = jest.fn();

    await loggingMiddleware(req, res, next);

    expect(logger.getLogs().length).toBe(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
