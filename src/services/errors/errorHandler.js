const { ErrorCodes } = require("./errorCodes")

/**
 * @type {import("express").ErrorRequestHandler}
 */
const errorHandler = (error, req, res, next) => {
    // console.log(error.cause)
    switch (error.code) {
        case ErrorCodes.ROUTING_ERROR:
            res.status(500).send({ status: 'error', error: error.name, cause: error.cause })
            break
        case ErrorCodes.INVALID_TYPES_ERROR:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break
        case ErrorCodes.DATABASE_ERROR:
            res.status(500).send({ status: 'error', error: error.name, cause: error.cause })
            break
        case ErrorCodes.INVALID_CREDENTIALS:
            res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            break
        case ErrorCodes.NOT_FOUND:
            res.status(404).send({ status: 'error', error: error.name, cause: error.cause })
            break
        case ErrorCodes.UNAUTHORIZED_ERROR:
            res.status(401).send({ status: 'error', error: error.name, cause: error.cause })
            break
        default:
            res.status(500).send({ status: 'error', error: 'Unknown' })
    }

    next(error)
}

module.exports = { errorHandler }