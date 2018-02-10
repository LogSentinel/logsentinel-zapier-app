const log = require('./creates/log');
const authentication = require('./authentication');

// To include the API key/secret/appId headers on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeAuthHeaders = (request, z, bundle) => {
  if (bundle.authData.organizationId) {
	request.headers = request.headers || {};
	request.headers['Application-Id'] = bundle.authData.applicationId
	const basicHash = Buffer(`${bundle.authData.organizationId}:${bundle.authData.apiSecret}`).toString('base64');
	request.headers['Authorization'] = `Basic ${basicHash}`;
  }
  return request;
};

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  
  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
	includeAuthHeaders
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [log.key]: log,
  }
};

// Finally, export the app.
module.exports = App;
