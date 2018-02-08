var express = require('express');
var firebase = require('firebase');

var router = express.Router();

var config = {
  apiKey: "AIzaSyBPyjPaS2RD7urae2KDbFug8aiN9cvVNW8",
  authDomain: "discart-app.firebaseapp.com",
  databaseURL: "https://discart-app.firebaseio.com/",
  storageBucket: "discart-app.appspot.com/" 
};
firebase.initializeApp(config);

var auth = firebase.auth();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Discart' });
});

router.get('/auth', function(req, res, next) {
  res.render('auth', { title: 'Discart - Login OR Register' });
});

router.get('/register', function(req, res, next){
  var data = req.query;

  var name = data.name;
  var email = data.email;
  var phn = data.phn;
  var pass = data.pass;
  var cpass = data.cpass;

  var responseData = "success";

  auth.createUserWithEmailAndPassword(email, pass).catch(function(error){
    if(error.code == "auth/email-already-in-use"){
      console.log("Used");
    }
  });
  console.log(responseData);
  res.send(responseData);
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log("Not Logged in");
  }
});

module.exports = router;
