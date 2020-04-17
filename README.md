# Chainlink NodeJS External Adapter Template

This template provides a basic framework for developing Chainlink external adapters in NodeJS. Comments are included to assist with development and testing of the external adapter. Once the API-specific values (like query parameters and API key authentication) have been added to the adapter, it is very easy to add some tests to verify that the data will be correctly formatted when returned to the Chainlink node. There is no need to use any additional frameworks or to run a Chainlink node in order to test the adapter.

## Creating your own adapter from this template

Clone this repo and change "MyProject" below to the name of your project

```bash
git clone https://github.com/thodges-gh/CL-EA-NodeJS-Template.git MyProject
```

Enter into the newly-created directory

```bash
cd MyProject
```

You can remove the existing git history by running:

```bash
rm -rf .git
```

## Input Params

- `base`, `from`, or `coin`: The symbol of the currency to query
- `quote`, `to`, or `market`: The symbol of the currency to convert to

## Output

```json
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "USD": 164.02,
  "result": 164.02
 },
 "statusCode": 200
}
```

## Install

```bash
yarn
```

## Test

```bash
yarn test
```

## Create the zip

```bash
zip -r cl-ea.zip .
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t cl-ea
```

Then run it with:

```bash
docker run -p 8080:8080 -it cl-ea:latest
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-ea.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save

#### To Set Up an API Gateway

An API Gateway is necessary for the function to be called by external services. You will need to disable the Lambda proxy integration for this to work as expected.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose REST API
- Select the security for the API
- Click Add
- Click the API Gateway trigger
- Click the name of the trigger (this is a link, a new window opens)
- Click Integration Request
- Uncheck Use Lamba Proxy integration
- Click OK on the two dialogs
- Return to your function
- Remove the API Gateway and Save
- Click Add Trigger and use the same API Gateway
- Select the deployment stage and security
- Click Add

## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-ea.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key
