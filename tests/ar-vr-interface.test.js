// tests/ar-vr-interface.test.js
const ARVRInterfaceService = require('../arVrInterfaceService');

describe('AR/VR Interface Service', () => {
    let service;

    beforeEach(() => {
        service = new ARVRInterfaceService();
    });

    test('should load AR/VR content', () => {
        const content = service.loadContent('contentId');
        expect(content).toBeDefined();
    });

    test('should throw an error for invalid content ID', () => {
        expect(() => service.loadContent('invalidId')).toThrow('Content not found');
    });
});
