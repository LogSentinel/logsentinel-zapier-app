module.exports = {
  type: 'custom',
  connectionLabel: (z, bundle) => {
	  return 'API credentials: ' + bundle.authData.applicationId;
  },
  fields: [
    {key: 'organizationId', label:'Organization ID', required: true, type: 'string'},
	{key: 'apiSecret', label:'API secret', required: true, type: 'string'},
	{key: 'applicationId', label:'Application ID', required: true, type: 'string'}
  ],
  test: function() {return true;}
};
