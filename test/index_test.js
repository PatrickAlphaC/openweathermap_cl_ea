const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {
  
  context('Requests data', () => {
    // The value here doesn't matter, we just want to be sure that the adapter returns the same
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    // Update the parameters in the data to match actual requests for the target API
    const req = {
      id: jobID,
      data: {
        endpoint: "data"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });
  });
});