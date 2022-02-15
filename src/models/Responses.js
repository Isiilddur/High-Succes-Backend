class ErrorResponse {
    status;
    msg;

    constructor(status, msg) {
        this.status = status;
        this.msg = msg;
    }
}

class SuccessResponse {
    status;
    msg;
    data;

    constructor(status, msg, data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }
}

module.exports = {
    ErrorResponse,
    SuccessResponse
}