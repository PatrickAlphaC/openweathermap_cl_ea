const request = require('request');

const createRequest = (input, callback) => {
    let url = process.env.URL || "";
    // Including an endpoint parameter is optional but common. 
    const endpoint = input.data.endpoint || "";
    // Include a trailing slash "/" in your url if this is in use
    url = url + endpoint;
    /* Create additional input params here, for example:
    const coin = input.data.coin || "";
    const market = input.data.market || "";
    */
    let queryObj;
    /* Build your query object with the given input params, for example:
    queryObj = {
        coin: coin,
        market: market
    }
    */
    const options = {
        url: url,
        // Change the API_KEY key name to the name specified by the API
        headers: {
            "API_KEY": process.env.API_KEY
        },
        qs: queryObj,
        json: true
    }
    request(options, (error, response, body) => {
        // Add any API-specific failure case here to pass that error back to Chainlink
        if (error || response.statusCode >= 400) {
            callback(response.statusCode, {
                jobRunID: input.id,
                status: "errored",
                error: body,
                statusCode: response.statusCode
            });
        } else {
            callback(response.statusCode, {
                jobRunID: input.id,
                data: body,
                statusCode: response.statusCode
            });
        }
    });
};

exports.gcpservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.handler = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
}

module.exports.createRequest = createRequest;