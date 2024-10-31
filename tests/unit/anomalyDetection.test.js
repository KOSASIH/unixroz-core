import { anomalyDetection } from '../../src/services/anomalyDetectionService';
import { LogEntry } from '../../src/models/logEntry';

describe('Anomaly Detection', () => {
  it('should detect an anomaly in a log entry', async () => {
    const logEntry = new LogEntry({
      request: {
        method: 'GET',
        url: '/api/data',
      },
      response: {
        statusCode: 500,
      },
    });
    const result = await anomalyDetection(logEntry);
    expect(result).toBe(true);
  });

  it('should not detect an anomaly in a log entry', async () => {
    const logEntry = new LogEntry({
      request: {
        method: 'GET',
        url: '/api/data',
      },
      response: {
        statusCode: 200,
      },
    });
    const result = await anomalyDetection(logEntry);
    expect(result).toBe(false);
  });
});
