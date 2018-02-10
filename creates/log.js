const log = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: `https://api.logsentinel.com/api/log/${bundle.inputData.actorId}/${bundle.inputData.action}`,
    body: bundle.inputData.details,
	headers: {
		'Accept': 'application/json'
	}
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'log-entry',
  noun: 'Log entry',

  display: {
    label: 'Log',
    description: 'Log an audit trail entry'
  },

  operation: {
    inputFields: [
      {key: 'actorId', label:'ActorID', required: true},
      {key: 'action', label:'Action', required: true},
      {key: 'details', label:'Details', required: false}
    ],
    perform: log
  }
};