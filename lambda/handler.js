var Firebase = require('firebase');
//http://blog.blundellapps.co.uk/tut-using-firebase-with-a-node-js-amazon-lambda/
exports.handler = function(event, context, callback) {
  var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,//"awsiotlambdainteg.firebaseapp.com",
    databaseURL: process.env.databaseURL, //"https://awsiotlambdainteg.firebaseio.com",
    projectId: process.env.projectId,//"awsiotlambdainteg",
    storageBucket: process.env.storageBucket,//"awsiotlambdainteg.appspot.com",
    messagingSenderId: process.env.messagingSenderId//"324447664557"
  };
  Firebase.initializeApp(config);
  Firebase.auth().signInAnonymously();
  Firebase.auth().onAuthStateChanged(function(firebaseuser) {
    if(firebaseuser) {
      Firebase.database().ref().child(event.sensorname)
        .set(event.state)                            // sets the key value to world
        .then(function(data) {
          console.log('Firebase data: ', data);
          context.succeed("This is done");                  // important that you don't call succeed until you are called back otherwise nothing will be saved to the database!
        })
        .catch(function(error) {
            console.log('Firebase error: ', error);
            context.fail();
        });
    }
  });

  //context.succeed("done");
}
