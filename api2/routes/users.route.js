const express = require('express'), mongoose = require('mongoose');
const app = express();
const usersRoutes = express.Router();

let UsrModel = require('../models/Users_mdl');


//usersRoutes.route('/GetUserPassword/:tdatabase/:tlogin').get(function (req, res) {
//  let tdatabase = req.params.tdatabase;

//  connect2(tdatabase);

//  var tlogin = 'Hello';
//  tlogin = req.params.tlogin;

//  //var tquery = { UserID: tlogin };

//  Odgovor = 'Nista';

//  //var tquery = { IdStud: tIdStud };

//  //UsrModel.find(tquery, function (err, fnduser) {
//  //  if (err) {
//  //    console.log(err);
//  //  }
//  //  else {
//  //    res.json(fnduser);
//  //  }
//  //});

//  //UsrModel.find(tquery, function (err, fnduser) {
//  //  if (err) {
//  //    console.log(err);
//  //    Odgovor = 'Greska';
//  //  }
//  //  else if (!fnduser) {
//  //    console.log('nema');
//  //    Odgovor = 'Nema';
//  //  }
//  //  else {
//  //    //res.json(tuser);
//  //    var tapassw = '';
//  //    tapassw = fnduser[0].Password;
//  //    Odgovor = tapassw;
//  //  }
//  //});

//  //var tquery = { Id: '2' };
//  //var tquery = { UserID: 'bbb' };
//  var tquery2 = { UserID: "bbb" };
//  var tquery = { UserID: tlogin };

//  //UsrModel.find(tquery, function (err, fnduser) {
//  //  if (err) {
//  //    console.log(err);
//  //  }
//  //  else {
//  //    res.json(fnduser);
//  //  }
//  //});

//  UsrModel.find(tquery, function (err, fnduser) {
//    if (err) {
//      console.log(err);
//      Odgovor = 'Greska';

//      dummymyObj = new Object();
//      dummymyObj.tekst1 = Odgovor;
//      dummymyObj.tekst2 = '';
//      dummymyObj.broj2 = -1;
//      var rows2 = new Array();

//      rows2[0] = dummymyObj;
//      res.json(rows2);
//    }
//    else {
//      //res.json(fnduser);
//      Odgovor = fnduser[0].Password;

//      dummymyObj = new Object();
//      dummymyObj.tekst1 = Odgovor;
//      dummymyObj.tekst2 = '';
//      dummymyObj.broj2 = -1;
//      var rows2 = new Array();

//      rows2[0] = dummymyObj;
//      res.json(rows2);
//    }
//  });

//  //StntModel.find(tquery, function (err, tstudent) {
//  //  if (err) {
//  //    console.log(err);
//  //  }
//  //  else {
//  //    res.json(tstudent);
//  //  }
//  //});


//  //UsrModel.find(function (err, student) {
//  //  if (err) {
//  //    console.log(err);
//  //  }
//  //  else {
//  //    res.json(student);
//  //  }
//  //}).sort(mysort);




//});


function connect2(databasename) {

  const mngDB = 'mongodb://siteknower.com:27017/' + databasename;

  mongoose.connect(mngDB, {
    auth: {
      // user: 'adacco',
      // password: 'ag58fr5q'
      username: 'adako2',
      password: '123456'
    },
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(
    () => { console.log('Database on adacco is connected') },
    err => { console.log('Can not connect to the database' + err) }
  );

};

usersRoutes.route('/check/:tdatabase').get(function (req, res) {
  let tdatabase = req.params.tdatabase;

  var query = {};

  Odgovor = 'User ok check';

  dummymyObj = new Object();
  dummymyObj.tekst1 = 'grga';
  dummymyObj.tekst2 = '';
  //dummymyObj.tekst2 = req.params.name;
  dummymyObj.broj2 = -1;
  var rows2 = new Array();

  rows2[0] = dummymyObj;
  res.json(rows2);

});

//usersRoutes.route('/GetUser/:id/:tdatabase').get(function (req, res) {
//  let tdatabase = req.params.tdatabase;
//  connect2(tdatabase);

//  const tId = req.params.id;

//  //MyModel.find({ name: 'john', age: { $gte: 18 } });
//  //const tquery = "SELECT * FROM students " + " WHERE IdStud= '" + tid + "'";
//  var tquery = { Id: tId };

//  UsrModel.find(tquery, function (err, tuser) {
//    if (err) {
//      console.log(err);
//    }
//    else {
//      res.json(tuser);
//    }
//  });

//});

usersRoutes.route('/GetUser/:tdatabase/:tlogin').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  connect2(tdatabase);

  var tlogin = 'Hello';
  tlogin = req.params.tlogin;

  //const tId = req.params.id;
  var tquery = { UserID: tlogin };
  //var tquery = { Id: tId };

  UsrModel.find(tquery, function (err, tuser) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(tuser);
    }
  });

});

module.exports = usersRoutes;
