import anomalyDetection from '../anomalyDetection';

describe('anomalyDetection', () => {
  it('should detect anomalies in a dataset', async () => {
    const data = [
      { value: 10, timestamp: 1 },
      { value: 15, timestamp: 2 },
      { value: 20, timestamp: 3 },
      { value: 25, timestamp: 4 },
      { value: 50, timestamp: 5 }, // anomaly
      { value: 30, timestamp: 6 },
      { value: 35, timestamp: 7 },
      { value: 40, timestamp: 8 },
    ];

    const threshold = 2; // 2 standard deviations

    const anomalies = await anomalyDetection.detectAnomalies(data, threshold);

    expect(anomalies).toEqual([{ timestamp: 5, value: 50 }]);
  });

  it('should handle missing data points', async () => {
    const data = [
      { value: 10, timestamp: 1 },
      { value: 15, timestamp: 2 },
      { timestamp: 4 }, // missing data point
      { value: 20, timestamp: 5 },
      { value: 25, timestamp: 6 },
      { value: 50, timestamp: 7 }, // anomaly
      { value: 30, timestamp: 9 },
    ];

    const threshold = 2; // 2 standard deviations

    const anomalies = await anomalyDetection.detectAnomalies(data, threshold);

    expect(anomalies).toEqual([{ timestamp: 7, value: 50 }]);
  });

  it('should return an empty array if no anomalies are found', async () => {
    const data = [
      { value: 10, timestamp: 1 },
      { value: 15, timestamp: 2 },
      { value: 20, timestamp: 3 },
      { value: 25, timestamp: 4 },
      { value: 30, timestamp: 5 },
      { value: 35, timestamp: 6 },
      { value: 40, timestamp: 7 },
    ];

    const threshold = 2; // 2 standard deviations

    const anomalies = await anomalyDetection.detectAnomalies(data, threshold);

    expect(anomalies).toEqual([]);
  });
});
