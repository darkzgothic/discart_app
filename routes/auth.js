var express = require('express');
var firebase = require('firebase');

var router = express.Router();

//Init Firebase
var config = {
    apiKey: "AIzaSyBPyjPaS2RD7urae2KDbFug8aiN9cvVNW8",
    authDomain: "discart-app.firebaseapp.com",
    databaseURL: "https://discart-app.firebaseio.com/",
    storageBucket: "discart-app.appspot.com/" 
};
if(!firebase.apps.length){
    firebase.initializeApp(config);
}
  
var auth = firebase.auth();

//Routes
router.get('/', function (req, res, next) {
    var auth = req.session.auth;

    if (typeof auth === 'undefined' && !auth) {
        res.render('auth', { title: 'Discart - Login OR Register' });
    } else {
        res.redirect('profile');

    }
});

router.get('/login', function(req, res, next){
    var data = req.query;

    var email = data.email;
    var pass = data.pass;

    auth.signInWithEmailAndPassword(email, pass)
        .then(function(){
            req.session.email = email;
            req.session.auth = true;
            res.send('success');
        })
        .catch(function(error){
            var errorCode = error.code;

            if(errorCode === 'auth/wrong-password'){
                var data = {};
                data.error = "error";
                data.msg = "Wrong Password";
                res.send(data);
            }
            else if(errorCode === 'auth/invalid-email'){
                var data = {};
                data.error = "error";
                data.msg = "Invalid Email";
                res.send(data);
            }
            else if(errorCode === 'auth/user-not-found'){
                var data = {};
                data.error = "error";
                data.msg = "User Not Found";
                res.send(data);
            }
            console.log("Login Error");
        })
});

router.get('/register', function(req, res, next){
    var data = req.query;
  
    var name = data.name;
    var email = data.email;
    var phn = data.phn;
    var pass = data.pass;
    var cpass = data.cpass;
  
    var database = firebase.database();
    var userRef = database.ref('users');
    
    auth.createUserWithEmailAndPassword(email, pass)
      .then(function(){
        var key = userRef.push().key;
        firebase.database().ref('users/' + key).set({
          uid: key,
          email: email,
          name: name,
          phn: phn
        });
  
        req.session.email = email;
        req.session.uid = key;
        res.send("success");
      })
      .catch(function(error){
        if(error.code == "auth/email-already-in-use"){
          res.send("error");  
        }
    });
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log("Not Logged in");
    }
});

module.exports = router;
