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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Discart' });
});

router.get('/company', function(req, res, next) {
  var email = req.session.email;
  var ref = firebase.database().ref('companies');
  var companies = {};
  if(req.session.auth == true){
    ref.orderByChild('email').equalTo(email).on('value', function(snapshot){
      var i = 0;
      snapshot.forEach(function(childSnapshot){
        var value = childSnapshot.val();
        companies[i] = value;
        i++;
      });
      console.log(companies);
      res.render('company', { title: 'Discart - Company', companies: companies });
    });
    
  }else{
    res.redirect('auth');
  }
});

router.get('/company-profile', function(req, res, next) {
  if(req.session.auth == true){
    res.render('company-profile', { title: 'Discart - Company Profile' });
  }else{
    res.redirect('/auth');
  }
  
});

router.get('/profile', function(req, res, next) {
  var email = req.session.email;
  var ref = firebase.database().ref('users');
  var user = {};
  if(req.session.auth == true){
    ref.orderByChild('email').equalTo(email).on('child_added', function(snapshot){
      user.email = snapshot.val().email;
      user.name = snapshot.val().name;
      user.phn = snapshot.val().phn;
      user.uid = snapshot.val().uid;
      console.log(user);
      res.render('profile', { title: 'Discart - Profile', user: user });
    });
    
  }else{
    res.redirect('auth');
  }
  
});

router.get('/edit-profile', function(req, res, next) {
  var email = req.session.email;
  var ref = firebase.database().ref('users');
  var user = {};
  if(req.session.auth == true){
    ref.orderByChild('email').equalTo(email).on('child_added', function(snapshot){
      user.email = snapshot.val().email;
      user.name = snapshot.val().name;
      user.phn = snapshot.val().phn;
      user.uid = snapshot.val().uid;
      console.log(user);
      res.render('edit-profile', { title: 'Discart - Edit Profile', user: user });
    });
    
  }else{
    res.redirect('auth');
  }
  
});

router.get('/getsession', function(req, res, next) {
  console.log(req.session.cookie.path);
});

router.get('/setsession', function(req, res, next) {
  req.session.cookie.name = "Anto";
});

module.exports = router;
