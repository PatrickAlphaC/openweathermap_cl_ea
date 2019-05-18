const request = require('request');

const createRequest = (input, callback) => {
  let url = process.env.URL || "";
  // Including an endpoint parameter is optional but common since
  // different endpoints of the same API typically respond with
  // data structured different from one another
  const endpoint = process.env.ENDPOINT || input.data.endpoint || "";
  // Include a trailing slash "/" in your url if endpoint is in use
  // and part of the URL
  url = url + endpoint;

  // Create additional input params here, for example:
  const coin = input.data.coin || "";
  const market = input.data.market || "";

  // Build your query object with the given input params, for example:
  const queryObj = {
    fsym: coin,
    tsyms: market
  }

  const options = {
    url: url,
    // Change the API_KEY key name to the name specified by the API
    // Note: If the API only requires a request header to be specified
    // for authentication, you can place this in the job's specification
    // instead of writing an external adapter
    /*
    headers: {
      "API_KEY": process.env.API_KEY
    },
    */
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

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
}

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;