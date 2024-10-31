// tests/governance.test.js
const GovernanceService = require('../governanceService');

describe('Governance Service', () => {
    let service;

    beforeEach(() => {
        service = new GovernanceService();
    });

    test('should create a new proposal', () => {
        const proposal = service.createProposal('Proposal Title', 'Proposal Description');
        expect(proposal).toHaveProperty('id');
        expect(proposal.title).toBe('Proposal Title');
    });

    test('should allow voting on a proposal', () => {
        const proposal = service.createProposal('Proposal Title', 'Proposal Description');
        const result = service.vote(proposal.id, 'address1', true);
        expect(result).toBe(true);
    });

    test('should not allow voting on a non-existent proposal', () => {
        expect(() => service.vote('invalidId', 'address1', true)).toThrow('Proposal not found');
    });
});
