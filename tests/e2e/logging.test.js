import { app } from '../../src/app';
import { request } from 'supertest';

describe('Logging E2E', () => {
  it('should log a request and response', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);

    const logs = await request(app).get('/api/logs');
    expect(logs.body.length).toBe(1);
  });

  it('should detect an anomaly in a log entry', async () => {
    const response = await request(app).get('/api/data?error=true');
    expect(response.status).toBe(500);

    const logs = await request(app).get('/api/logs');
    expect(logs.body.length).toBe(1);
    expect(logs.body[0].anomaly).toBe(true);
  });
});
