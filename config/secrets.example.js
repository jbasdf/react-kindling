module.exports = {

  'mongoUrl' : 'mongodb://localhost/reactkindling', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

  'sessionSecret' : 'Generate a secure session secret and put it here.',

  'facebookAuth' : {
    'clientID'    : 'your-secret-clientID-here', // your App ID
    'clientSecret'  : 'your-client-secret-here', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback' // In production localhost will need to be your live url
  },

  'twitterAuth' : {
    'consumerKey'     : 'your-consumer-key-here',
    'consumerSecret'  : 'your-client-secret-here',
    'callbackURL'     : 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID'    : 'your-secret-clientID-here',
    'clientSecret'  : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }

};