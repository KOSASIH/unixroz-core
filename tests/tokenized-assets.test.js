// tests/tokenized-assets.test.js
const TokenizedAssetsService = require('../tokenizedAssetsService');

describe('Tokenized Assets Service', () => {
    let service;

    beforeEach(() => {
        service = new TokenizedAssetsService();
    });

    test('should create a new tokenized asset', () => {
        const asset = service.createAsset('Asset Data');
        expect(asset).toHaveProperty('id');
        expect(asset.data).toBe('Asset Data');
    });

    test('should retrieve a tokenized asset by ID', () => {
        const asset = service.createAsset('Asset Data');
        const retrieved = service.getAssetById(asset.id);
        expect(retrieved).toEqual(asset);
    });
});
