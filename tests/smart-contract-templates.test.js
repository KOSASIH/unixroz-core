// tests/smart-contract-templates.test.js
const SmartContractTemplateService = require('../smartContractTemplateService');

describe('Smart Contract Templates Service', () => {
    let service;

    beforeEach(() => {
        service = new SmartContractTemplateService();
    });

    test('should create a new smart contract template', () => {
        const template = service.createTemplate('Template Data');
        expect(template).toHaveProperty('id');
        expect(template.data).toBe('Template Data');
    });

    test('should retrieve a smart contract template by ID', () => {
        const template = service.createTemplate('Template Data');
        const retrieved = service.getTemplateById(template.id);
        expect(retrieved).toEqual(template);
    });
});
