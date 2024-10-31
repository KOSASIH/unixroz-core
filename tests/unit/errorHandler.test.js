// tests/unit/errorHandler.test.js

const errorHandler = require('../../utils/error_handling/errorHandler');
const { AppError } = require('../../utils/error_handling/customErrors');

describe('Error Handler', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
        return res;
    };

    it('should handle operational errors', () => {
        const req = {};
        const res = mockResponse();
        const next = jest.fn();
        const error = new AppError('Not Found', 404);

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            statusCode: 404,
            message: 'Not Found',
        });
    });

    it('should handle non-operational errors', () => {
        const req = {};
        const res = mockResponse();
        const next = jest.fn();
        const error = new Error('Something went wrong');

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            statusCode: 500,
            message: 'Something went wrong!',
        });
    });
});
