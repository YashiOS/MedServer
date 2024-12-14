const createResponse = (status, message,accessToken = null, data = null, error = null) => {
    return {
        status,
        message,
        accessToken,
        data,
        error
    };
};

module.exports = createResponse;