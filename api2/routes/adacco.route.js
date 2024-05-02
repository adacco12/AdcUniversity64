const express = require('express'), mongoose = require('mongoose');
const app = express();
const usersRoutes = express.Router();
const adaccoRoutes = express.Router();

let UsrModel = require('../models/Users_mdl');
let DatabasesModel = require('../models/cloud/Listdabases_mdl');
let KorisniciModel = require('../models/cloud/korisnici_mdl');
let RobaModel = require('../models/listez/roba_mdl');
let FirmeModel = require('../models/knjigz/firme_mdl');

function connect2(databasename) {

  // const mngDB = 'mongodb://test.siteknower.com:27017/' + databasename;
  const mngDB = 'mongodb://94.127.5.204:27017/' + dabasename;

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
    () => { console.log('Database on adacco is connected')},
    err => { console.log('Can not connect to the database' + err)}
  );
};


adaccoRoutes.route('/provjeribazucloud').get(function (req, res) {

  const mngDB = 'mongodb://test.siteknower.com:27017/' + 'Cloud';

  try {
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
      () => {
        //console.log('Database on adacco is connected')
        Odgovor = 'Ok';

        dummymyObj = new Object();
        dummymyObj.tekst1 = Odgovor;
        dummymyObj.tekst2 = '';
        dummymyObj.broj2 = -1;
        var rows2 = new Array();

        rows2[0] = dummymyObj;
        res.json(rows2);
      },
      err => {
        //console.log('Can not connect to the database' + err)

        Odgovor = 'Error';

        dummymyObj = new Object();
        dummymyObj.tekst1 = Odgovor;
        dummymyObj.tekst2 = err.toString();
        dummymyObj.broj2 = -1;
        var rows2 = new Array();

        rows2[0] = dummymyObj;
        res.json(rows2);

      }
    );

  } catch (error) {
    //console.error(error);

    Odgovor = 'Error';

    dummymyObj = new Object();
    dummymyObj.tekst1 = Odgovor;
    dummymyObj.tekst2 = error.message;
    dummymyObj.broj2 = -1;
    var rows2 = new Array();

    rows2[0] = dummymyObj;
    res.json(rows2);
  }
  //http://localhost:4001/adacco/provjerivezu
});





//mongoose.connect('mongodb://localhost/dbname', function (err) {
//  if (err) throw err;
//});

//usersRoutes.route('/GetUser/:tdatabase/:ttablica/:tlogin').get(function (req, res) {
//  let tdatabase = req.params.tdatabase;
//  let ttablica = req.params.ttablica;
//  connect2(tdatabase);

//  var tlogin = 'Hello';
//  tlogin = req.params.tlogin;

//  //const tId = req.params.id;
//  var tquery = { UserID: tlogin };
//  //var tquery = { Id: tId };

//  var tModel;
//  if (ttablica == 'korisnici') {
//    tModel = KorisniciModel;
//  } 

//  tModel.find(tquery, function (err, tuser) {
//    if (err) {
//      console.log(err);
//    }
//    else {
//      res.json(tuser);
//    }
//  });

//});

adaccoRoutes.route('/helloworld').get(function (req, res) {
  var tdobardan = 'Hello world!';

  try {
    returnObj = new Object();
    returnObj.tekst1 = tdobardan;

    res.json(returnObj);
  } catch (error) {
    returnObj = new Object();
    returnObj.tekst1 = 'ne radi';

    res.json(returnObj);
  }

  //http://localhost:4001/adacco/helloworld

});


adaccoRoutes.route('/GetKorisnik/:tdatabase/:ttablica/:tprefiks').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  let ttablica = req.params.ttablica;
  connect2(tdatabase);

  var tprefiks = 'Hello';
  tprefiks = req.params.tprefiks;

  //const tId = req.params.id;
  var tquery = { Prefiks: tprefiks };
  //tquery = { Prefiks: "1337" };
  //var tquery = { Id: tId };

  var tModel;
  if (ttablica == 'users') {
    tModel = UsrModel;
  }
  if (ttablica == 'korisnici') {
    tModel = KorisniciModel;
  }

  tModel.find(tquery, function (err, tuser) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(tuser);
    }
  });

  //http://localhost:4001/adacco/GetKorisnik/Cloud/korisnici/1337

});


//adaccoRoutes.route('/DajRedak/:tdatabase/:ttablica/:tid').get(function (req, res) {
adaccoRoutes.route('/DajRedak/:tdatabase/:ttablica/:tquery').get(function (req, res) {

  let tdatabase = req.params.tdatabase;
  let ttablica = req.params.ttablica;
  //let tquery = req.params.tquery;
  connect2(tdatabase);

  //let tId = 'xxxx';  //da se zna da je string
  //tId = req.params.tid;
  //var tquery = { _id: tId };  //radi

  //var tquery = { Id: tId };
  //var tquery = { _id: "350e01ba-81b6-41d7-955e-48f93325ef7d" };  //radi

  let ttquery = req.params.tquery;
  
  try {
    let ttquery2 = JSON.parse(ttquery);

    var tModel;
    if (ttablica == 'users') {tModel = UsrModel;}
    if (ttablica == 'korisnici') { tModel = KorisniciModel; }
    if (ttablica == 'roba') { tModel = RobaModel; }

    tModel.find(ttquery2, function (err, tredak) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(tredak);
      }
    });

    //http://localhost:4001/adacco/DajRedak/Cloud/korisnici/350e01ba-81b6-41d7-955e-48f93325ef7d
    //http://localhost:4001/adacco/DajRedak/Cloud/korisnici/{"_id":"350e01ba-81b6-41d7-955e-48f93325ef7d"} // to

  } catch (error) {
    //console.error(error);

    Odgovor = 'Error';

    dummymyObj = new Object();
    dummymyObj.tekst1 = Odgovor;
    dummymyObj.tekst2 = error.message;
    dummymyObj.broj2 = -1;
    var rows2 = new Array();

    rows2[0] = dummymyObj;
    res.json(rows2);

  }
});
adaccoRoutes.route('/DajTablicu/:tdatabase/:ttablica/:ttquery/:ttfld/:ttsort').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  let ttablica = req.params.ttablica;

  let tfldsStr = req.params.ttfld;
  let ttquery = req.params.ttquery;

  connect2(tdatabase);


  //var tquery = { UserID: tlogin };
  //find({
  //  occupation: /host/,
  //  'name.last': 'Ghost',
  //  age: { $gt: 17, $lt: 66 },
  //  likes: { $in: ['vaporizing', 'talking'] }
  //}).

  //var a = 'duration[gte]=5&price[lte]500';
  //var a = req.params.ttquery;
  //const queryObj = { ...a };

  var tquery = {};

  //ttquery = '{"name":{"firstName":"Mark","lastName":"Bob"}}';
  //ttquery = '{ "MPC": { "$gt": 5000 } }';

  //var wquery;
  //if (ttquery == "0") {
  //  wquery = {};
  //} else {
  //  wquery = JSON.parse(ttquery);
  //  let a = wquery.MPC;
  //  let b = 0;
  //}

  //let wquery = { MPC: { $gt: 5000 } }


  //var tquery = { limit: 5, skip: 3 };
  //tquery = { MPC: { $gt: 5000 } }
  //tquery = { Artikl: 'TSMEYB21S00701572' };
  //tquery = {
  //  //Artikl: { $in: ['TSMEYB21S00701572', '50'] },
  //  MPC: { $gt: 60, $lt: 65 }
  //};

  ttquery = req.params.ttquery;

  var tModel;
  if (ttablica == 'users') { tModel = UsrModel; }
  if (ttablica == 'korisnici') { tModel = KorisniciModel; }
  if (ttablica == 'roba') { tModel = RobaModel; }
  if (ttablica == 'firme') { tModel = Rob; }

  const { performance } = require("perf_hooks");
  const t0 = performance.now();

  var usersProjection = {
    Sifra: false,
    Naziv: false
  };

  //const tfldsStr = '{ "Sifra":1, "Naziv":1, "Jed_mj":1 }';
  let tflds = {};
  if (tfldsStr == "0") {
    tflds = {};
  } else {
    tflds = JSON.parse(tfldsStr);
  }

  //tflds = {};

  //tsrt = { Sifra: -1};
  tsrt = {};

  try {
     if (ttquery == "0") {
       tquery = {};
     } else {
       tquery = JSON.parse(ttquery);
     }
    
    //tModel.find(tquery, 'Naziv', function (err, tstudents) {
    //tModel.find(tquery, usersProjection, function (err, tstudents) {
    //tModel.find(tquery, { Sifra: 1, Naziv: 1, Jed_mj: 1 } , function (err, tstudents) {

    let aa = 0;
    tModel.find(tquery, tflds, function (err, tstudents) {
      //tModel.find(tquery, function (err, tstudents) {
      if (err) {
        console.log(err);
        //res.status(500).json({ result: false });
      }
      else {
        res.json(tstudents);

        //const t1 = performance.now();
        //const tuk = t1 - t0;
        //console.log('time = ' + tuk);  
        //console.log('gotovo ');
      }
    }).lean().sort(tsrt)  //.where(wquery);

    //.lean();
    //.limit(10)
    //.where('MPC').gt(60).lt(65);

    //.gte(21).lte(65)
    //.where('age').gte(21).lte(65).where('name', /^b/i)

    //http://localhost:4001/adacco/DajTablicu/Cloud/korisnici
    //http://localhost:4001/adacco/DajTablicu/Cloud/korisnici/0/0/0  'radi
    //http://localhost:4001/adacco/DajTablicu/afris_ListeZ2/roba

    //db.posts.find( {}, { timestamp : 1 , title : 1 , author : 1 , abstract : 1} ).sort( { timestamp : -1 } ).limit(10)
    //https://docs.mongodb.com/manual/tutorial/optimize-query-performance-with-indexes-and-projections/'
    //https://docs.mongodb.com/manual/tutorial/query-documents/

    //https://aquasar.io/articles/using-express-with-mongoose

    //http://localhost:4001/adacco/DajTablicu/afris_ListeZ2/roba/0/{"Sifra":1,"Naziv":1,"Jed_mj":1}/0   ///radi
    //http://localhost:4001/adacco/DajTablicu/Cloud/korisnici/{"_id":"350e01ba-81b6-41d7-955e-48f93325ef7d", "Idb":2}/0/0  //radi


  } catch (error) {
    //console.error(error);

    Odgovor = 'Error';

    dummymyObj = new Object();
    dummymyObj.tekst1 = Odgovor;
    dummymyObj.tekst2 = error.message;
    dummymyObj.broj2 = -1;
    var rows2 = new Array();

    rows2[0] = dummymyObj;
    res.json(rows2);

  }
});

adaccoRoutes.route('/getCountN/:tdatabase/:ttablica').get(function ( req, res, next ) {
  let tdatabase = req.params.tdatabase;
  let ttablica = req.params.ttablica;

  connect2(tdatabase);

  var tModel;
  if (ttablica == 'users') { tModel = UsrModel; }
  if (ttablica == 'korisnici') { tModel = KorisniciModel; }
  if (ttablica == 'roba') { tModel = RobaModel; }

  //var query = { address: /^S/ };
  var query = {};

  try {
   tModel.count(query, function (err, c) {
    if (err) {
      Odgovor = 'Error0';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = err.toString();
      dummymyObj.broj2 = -1;
      var rows2 = new Array();

      rows2[0] = dummymyObj;
      res.json(rows2);
    }
    else {
      if (typeof c == 'undefined' || c == null) {
        Odgovor = 'Error';

        dummymyObj = new Object();
        dummymyObj.tekst1 = Odgovor;
        dummymyObj.tekst2 = err.toString();
        dummymyObj.broj2 = -1;
        var rows2 = new Array();

        rows2[0] = dummymyObj;
        res.json(rows2);
      }
      else {
        Odgovor = 'Ok';

        dummymyObj = new Object();
        dummymyObj.tekst1 = Odgovor;
        dummymyObj.tekst2 = '';
        dummymyObj.broj2 = Number(c);
        var rows2 = new Array();

        rows2[0] = dummymyObj;
        res.json(rows2);
      }
    }
   });

  } catch (error) {
    //console.error(error);

    Odgovor = 'Error';

    dummymyObj = new Object();
    dummymyObj.tekst1 = Odgovor;
    dummymyObj.tekst2 = error.message;
    dummymyObj.broj2 = -1;
    var rows2 = new Array();

    rows2[0] = dummymyObj;
    res.json(rows2);

  }


  //http://localhost:4001/adacco/getCountN/Cloud/korisnici
   //http://localhost:4001/adacco/getCountN/afris_ListeZ2/roba

});

//adaccoRoutes.route('/listdatabases').get(function (req, res) {
//  var mongoose = require('mongoose')
//    , Admin = mongoose.mongo.Admin;

//  const connection = `mongodb://${encodeURIComponent('adacco')}:${encodeURIComponent('ag58fr5q')}@${'test.siteknower.com'}:${'27017'}/admin`

//  //connect2('admin');

//  var tdobardan = 'listdatabases';

//  try {

//    mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true }).then((MongooseNode) => {

//      /* I use the default nativeConnection object since my connection object uses a single hostname and port. Iterate here if you work with multiple hostnames in the connection object */

//      const nativeConnetion = MongooseNode.connections[0]

//      //now call the list databases function
//      new Admin(nativeConnetion.db).listDatabases(function (err, results) {
//        console.log(results)  //store results and use
//      });

//      //DatabasesModel.new Admin(nativeConnetion.db).listDatabases.toArray(function (err, results) {
//      //  console.log(results)  //store results and use
//      //});

//    })

//    returnObj = new Object();
//    returnObj.tekst1 = tdobardan;

//    res.json(returnObj);
//  } catch (error) {
//    returnObj = new Object();
//    returnObj.tekst1 = 'ne radi';

//    res.json(returnObj);
//  }

//  //http://localhost:4001/adacco/listdatabases

//});



//module.exports = usersRoutes;
module.exports = adaccoRoutes;


//http://localhost:4001/adacco/DajTablicu/afris_ListeZ2/roba/{"_id":"6061b63e-fbc9-41b4-ba52-7f2f2f7bedb3"}/{"Sifra":1,"Naziv":1,"Jed_mj":1}/0

//http://localhost:4001/adacco/DajTablicu/Cloud/korisnici/{"_id":"350e01ba-81b6-41d7-955e-48f93325ef7d", "Idb":2}/0/0

//http://localhost:4001/adacco/DajTablicu/afris_ListeZ2/roba/0/0/0

//http://localhost:4001/adacco/DajRedak/Cloud/korisnici/{"_id":"350e01ba-81b6-41d7-955e-48f93325ef7d"} 

//http://localhost:4001/adacco/DajTablicu/afris_ListeZ2/roba/{"_id":"6061b63e-fbc9-41b4-ba52-7f2f2f7bedb3"}/0/0

//http://localhost:4001/adacco/DajTablicu/Cloud/korisnici/0/0/0   //radi
