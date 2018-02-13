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

router.get('/update', function(req, res, next) {
  var email = req.session.email;
  var data = req.query;

  var ref = firebase.database().ref().child("users");
  var user = {};
  ref.orderByChild('email').equalTo(email).on('child_added', function(snapshot){
    user.email = snapshot.val().email;
    user.name = snapshot.val().name;
    user.phn = snapshot.val().phn;
    user.uid = snapshot.val().uid;
  });

  var key = user.uid;
  console.log(key);
  var updates = {};
  updates['/users/' + key] = {
    name: data.name,
    phn: data.phn,
    email: user.email,
    uid: user.uid
  };

  firebase.database().ref().update(updates)
  .then(function(){
    console.log(user);
    res.send("success");
  })
  .catch(function(error){
    res.send("error");
  });
});

router.get('/create-company-profile', function(req, res, next){
  var data = req.query;
  var email = req.session.email;

  var database = firebase.database();
  var companyRef = database.ref('companies');
  var key = companyRef.push().key;
  firebase.database().ref('companies/' + key).set({
    cid: key,
    title: data.title,
    phn: data.phn,
    address: data.address,
    category: data.category,
    location: data.location,
    lat: data.lat,
    lon: data.lon,
    email: email
  }).then(function(){
    res.send("success");
  });
  console.log(data);
});

module.exports = router;
