const { ErrorCodes } = require("./errorCodes")

/**
 * @type {import("express").ErrorRequestHandler}
 */
const errorHandler = (error, req, res, next) => {
    // console.log(error.cause)
    switch (error.code) {
        case ErrorCodes.ROUTING_ERROR:
            {
                req.logger.error('Server error: ' + error.name)
                res.status(500).send({ status: 'error', error: error.name, cause: error.cause })
            }
            break
        case ErrorCodes.INVALID_TYPES_ERROR:
            {
                req.logger.error('Error: ' + error.name)
                res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            }
            break
        case ErrorCodes.DATABASE_ERROR:
            {
                req.looger.error('Server error: ' + error.name)
                res.status(500).send({ status: 'error', error: error.name, cause: error.cause })
            }
            break
        case ErrorCodes.INVALID_CREDENTIALS:
            {
                req.looger.warning('Unauthorization error: ' + error.name)
                res.status(400).send({ status: 'error', error: error.name, cause: error.cause })
            }
            break
        case ErrorCodes.NOT_FOUND:
            {
                req.logger.fatal('Not found error: ' + error.name)
                res.status(404).send({ status: 'error', error: error.name, cause: error.cause })
            }
            break
        case ErrorCodes.UNAUTHORIZED_ERROR:
            {
                req.looger.warning('Unauthorization error: ' + error.name)
                res.status(401).send({ status: 'error', error: error.name, cause: error.cause })
            }
            break
        default:
            res.status(500).send({ status: 'error', error: 'Unknown' })
    }

    next(error)
}

module.exports = { errorHandler }