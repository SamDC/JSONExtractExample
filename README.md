# Building a RESTful API in Node and Express to Extract from a JSON service

Using the new Express 4.0 Router to build an API

[Read the tutorial](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)

## Requirements

- Node and npm

## Installation

- Install dependencies: `npm install`
- Start the server: `node server.js`

## About this example

This small service allows you to create a simple node api which can extract data from a remote endpoint and output to CSV. The code can be adapted to meet any of your requirements i.e. delimeter, ways to access the remote api, etc. You can also add as many endpoints as you require.

From experience of using a form of this in a real project, you will most likely need to work with the result as it comes back from the request to parse nested objects, etc.

### Extract1

The endpoint is an example of making a straightforward request to a remote endpoint which may or may not be protected by an api token, but this will go straight to the url endpoint. The result of this example uses the JSON2CSV converter to parse the JSON stream returned in the request body. This module can be run without defining the headers as this example does, but this maintains the order of columns, etc.

### Extract2

The endpoint is an example of accessing a remote api using a certificate. A requirment for this one is to separate out the private key and public certificate from the certificate file so you end up with the two pem files detailed in the code. Another thing to note is that the return in this example was csv from a web service, so the result could be saved straight to the file system.

##Links

[Nice JSON to CSV](https://github.com/matteofigus/nice-json2csv)
[NPM](https://www.npmjs.com)
[Node JS](https://nodejs.org)


