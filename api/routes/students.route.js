// business.route.js

const express = require('express'), mongoose = require('mongoose');
const app = express();
const studentsRoutes = express.Router();

// Require Business model in our routes module
// Require Business model in our routes moduleadc
let StntModel = require('../models/Students_mdl');

//dodano:
// Require Blog model in our routes module
//let Stdnt = require('../models/Students_mdl');
//const tobj = {
//  IdStud: 5,
//  FirstName: 'Janko',
//  LastName: 'Petrović',
//  //date: '2018-06-21T14:11:41.323Z'
//  EnrDate: '2015-06-21'
//};
//let tblog = new Stdnt(tobj);
//tblog.save();
// dodata nova collection blog
////////////////


studentsRoutes.route('/helloworld').get(function (req, res) {
  var tdobardan = 'Hello world 6!';

  returnObj = new Object();
  returnObj.tekst1 = tdobardan;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(returnObj);

  console.log(tdobardan);

  //http://localhost:4001/mnbases/helloworld

});


// Defined store route
studentsRoutes.route('/add').post(function (req, res) {
  let tstudent = new StntModel(req.body);
  tstudent.save()
    .then(tstudent => {
      res.status(200).json({ 'student': 'student in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
// studentsRoutes.route('/:tdatabase').get(function (req, res) {
studentsRoutes.route('/get/:tdatabase').get(function (req, res) {
  //getStudents

  //const mngDB = 'mongodb://localhost:27017/university01';

  //mongoose.connect(mngDB, { useNewUrlParser: true }).then(
  ////mongoose.connect('mongodb://localhost:27017/ng7crud', { useNewUrlParser: true }).then(
  //  () => { console.log('Database is connected') },
  //  err => { console.log('Can not connect to the database' + err) }
  //);

  let tdatabase = req.params.tdatabase;

  var mysort = { IdStud: 1 };

  //console.log('get poc1');
  connect(tdatabase);
  //console.log('get poc2');

  StntModel.find(function (err, student) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(student);
    }
  }).sort(mysort);
});


studentsRoutes.route('/GetStudentPage/:tdatabase/:startindex/:endindex/:orderfield/:strwhere').get(function (req, res) {
  let tdatabase = req.params.tdatabase;

  const tstartindex = req.params.startindex;
  const tendindex = req.params.endindex;
  const torderfield = req.params.orderfield;
  const tstrwhere = req.params.strwhere;

  var poc = parseInt(tstartindex);

  var zav = parseInt(tendindex);
  var toffset = poc.toString();
  var tnext = (zav - poc).toString();
  var inoffset = parseInt(tnext);

  connect(tdatabase);

  var mysort = { IdStud: 1 };

  //var tquery = { IdStud: tIdStud};
  var tquery = {};
  //var tquery = { limit: 5, skip: 3 };

  StntModel.find(tquery, function (err, tstudents) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(tstudents);
    }
  }).sort(mysort).skip(poc).limit(inoffset);
});



studentsRoutes.route('/getMaxID/:tdatabase').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  connect(tdatabase);

  //const maxQuery = Goods.find({}).sort({ price: -1 }).limit(1).then(goods => goods[0].price);
  //StntModel.find().sort({ IdStud: -1 }).limit(1)(function (err, fndstudent) {
  var query = { address: /^S/ };
  var mysort = { IdStud: -1 };
  //StntModel.find(query, function (err, fndstudent) {
  StntModel.find(function (err, fndstudent) {
    if (!fndstudent) {
    //return next(new Error('Could not load Document'));
      Odgovor = 'Error';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = err.toString();
      var rows = new Array();

      rows[0] = dummymyObj;
      //res.setHeader('Access-Control-Allow-Origin', '*');
      //reject(res.status(200).json(rows));
      res.json(rows);
    }
    else {
      //res.json(fndstudent);

      var tmaxid = -1;
      if (fndstudent.length > 0) {
        tmaxid = fndstudent[0].IdStud;

        if (tmaxid == null) { tmaxid = 0 };
        Odgovor = 'ok';
      } else {
        tmaxid = 0;
        Odgovor = 'ok';
      }

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = "";
      dummymyObj.broj1 = tmaxid;
      var rows = new Array();

      rows[0] = dummymyObj;
      //res.setHeader('Access-Control-Allow-Origin', '*');
      //resolve(res.status(200).json(rows));
      res.json(rows);
      var a = 0;
    }
  }).sort(mysort).limit(1);
});

studentsRoutes.route('/getCountN/:tdatabase').get(function (req, res) {
  let tdatabase = req.params.tdatabase;

  connect(tdatabase);

  //var query = { address: /^S/ };
  var query = {};

  StntModel.count(query, function (err, c) {
    //if (!c) {
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
      dummymyObj.tekst2 ='';
      dummymyObj.broj2 = Number(c);
      var rows2 = new Array();

      rows2[0] = dummymyObj;
      res.json(rows2);
    }
  });
});

studentsRoutes.route('/GetStudent/:id/:tdatabase').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  connect(tdatabase);

  const tIdStud = req.params.id;

  //MyModel.find({ name: 'john', age: { $gte: 18 } });
  //const tquery = "SELECT * FROM students " + " WHERE IdStud= '" + tid + "'";
  var tquery = { IdStud: tIdStud};

  StntModel.find(tquery, function (err, tstudent) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(tstudent);
    }
  });

});


studentsRoutes.route('/napuni/:dmm').get(function (req, res) {
  let dmm = req.params.dmm;

  const sql = require('mssql');

  var config = {
    user: 'sa',
    password: 'mJksxnXG#i1',
    server: '94.127.5.214',
    database: 'AdcUniversity',
    driver: 'tedious',
    options: {
      //instanceName: 'sql',
      encrypt: true
    }
  };


  // const tquery = "SELECT * FROM students";
  //
  // new sql.ConnectionPool(config).connect().then(pool => {
  //     return pool.request().query(tquery)
  // }).then(result => {
  //
  //     //resolve(result.recordset);
  //     //res.send({ result });
  //     let rows = result.recordset;
  //
  //     connect('AdcUniversity');
  //
  //     let i = 1;
  //     for (let item of rows) {
  //       let tstudent = new StntModel(req.body);
  //       tstudent.IdStud = i;
  //       tstudent.Code = item.Code;
  //       tstudent.FirstName = item.FirstName;
  //       tstudent.LastName = item.LastName;
  //       tstudent.Address = item.Address;
  //       tstudent.Email = item.Email;
  //       tstudent.Age = item.Age;
  //       tstudent.EnrDate = item.EnrDate;
  //       i = i + 1;
  //       tstudent.save();
  //     }
  //
  //     sql.close();
  // }).catch(err => {
  //
  //     //reject(err);
  //     console.log(err);
  //     //reject(res.status(500).send({ message: "${err}" }));
  //
  //     sql.close();
  // });

  //res.send('napuni');
  console.log('napuni');
  dummymyObj = new Object();
  dummymyObj.tekst1 = 'napunjeno';
  dummymyObj.tekst2 = "";
  var rows = new Array();
  rows[0] = dummymyObj;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(rows);
  //console.log('radi');
  //res.send(JSON.stringify({ myObject }));
  //res.json({ a: 1 });
});


//studentsRoutes.route('/getCountN2/:tdatabase').get(function (req, res) {
//  let tdatabase = req.params.tdatabase;
//  connect(tdatabase);
//});

//  Defined update route
studentsRoutes.route('/update2/:tdatabase/:id').get(function (req, res) {
  let tdatabase = 'AdcUniversity2';
  connect(tdatabase);

  //var tid = ObjectId("5cb06d463b03fc174c123d7e");
  var tid = "5cb06d463b03fc174c123d7e";

  //age: { $gte: 18 }
  //var tquery = { IdStud: { $gte: 5 } };  //veći od 5
  var tquery = { IdStud: '2' };
  //var tquery = { _id: '726dc363-e3a1-4d96-8c13-5c37cc7545fa' };

  //StntModel.findById(tid, function (err, fndstudent) {
  StntModel.find(tquery, function (err, fndstudent) {
    if (!fndstudent)
      return next(new Error('Could not load Document'));
    else {
      //fndstudent.IdStud = req.body.IdStud;
      
      //fndstudent[0]._id = '726dc363-e3a1-4d96-8c13-5c37cc7545fb';
      fndstudent[0].Code = 'cd3';
      fndstudent[0].FirstName ='Zoran3';

      fndstudent[0].save().then(fndstudent => {
        res.json('Update complete3');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

//http://localhost:4001/studenti/update2/AdcUniversity2/2


studentsRoutes.route('/updateStudent/:id/:code/:prezime/:ime/:address/:email/:age/:vreme/:tdatabase').get(function (req, res) {
  //let tdatabase = 'AdcUniversity2';
  let tdatabase = req.params.tdatabase;
  connect(tdatabase);

  //const tid = req.params.id;
  var tid = 'Hello';
  tid = req.params.id;
  const tcode = req.params.code;
  const tprezime = req.params.prezime;
  const time = req.params.ime;
  const taddress = req.params.address;
  const temail = req.params.email;
  const tage = req.params.age;
  const tvreme = req.params.vreme;

  var tnvreme = "_";
  var sdtt = tvreme;
  var ndtt = sdtt.replace(/-/g, '/')
  let d = new Date(ndtt);

  const timestamp = Date.parse(ndtt);

  if (isNaN(timestamp) === false) {
    d = new Date(timestamp);
    //"YYYY-mm-dd HH:MM:SS"
    tnvreme = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00";
  } else {
    d = new Date();
    tnvreme = "_";
  }

  var tquery = { IdStud: tid };


  StntModel.find(tquery, function (err, fndstudent)  {
    if (!fndstudent)
      return next(new Error('Could not load Document'));
    else {
      //fndstudent.IdStud = req.body.IdStud;
      fndstudent[0].Code = tcode;
      fndstudent[0].FirstName = time;
      fndstudent[0].LastName = tprezime;
      fndstudent[0].Email = temail;
      fndstudent[0].EnrDate =  tvreme;
      fndstudent[0].Address = taddress;
      fndstudent[0].Age = tage;


      fndstudent[0].save()
        .then(fndstudent => {
          //res.json('Update complete58');
              Odgovor = 'ok';

              dummymyObj = new Object();
              dummymyObj.tekst1 = Odgovor;
              var rows2 = new Array();

              rows2[0] = dummymyObj;
              //res.setHeader('Access-Control-Allow-Origin', '*');
              //resolve(res.status(200).json(rows));
              res.json(rows2);
        })
        .catch(err => {
          //res.status(400).send("unable to update the database");
              Odgovor = 'greska';

              dummymyObj = new Object();
              dummymyObj.tekst1 = Odgovor;
              dummymyObj.tekst2 = err.toString();
              var rows2 = new Array();

              rows2[0] = dummymyObj;
              //res.setHeader('Access-Control-Allow-Origin', '*');
              //reject(res.status(200).json(rows));
              res2.json(rows2);
        });



    }
  });



  //var Odgovor = '';
  //var praznaslika = '0xFFD8FFDB00430006040506050406060506070706080A100A0A09090A140E0F0C1017141818171416161A1D251F1A1B231C1616202C20232627292A29191F2D302D283025282928FFDB0043010707070A080A130A0A13281A161A2828282828282828282828282828282828282828282828282828282828282828282828282828282828282828282828282828FFC0001108003A005A03012200021101031101FFC4001500010100000000000000000000000000000008FFC40014100100000000000000000000000000000000FFC40014010100000000000000000000000000000000FFC40014110100000000000000000000000000000000FFDA000C03010002110311003F00AA4000000000000000000000000000000000000000000000000000000000000000000000007FFFD9';

  //var rowUpgradeQuery = "UPDATE Students SET";
  //rowUpgradeQuery = rowUpgradeQuery + " Ozn=0";
  //if (tcode != "_") rowUpgradeQuery = rowUpgradeQuery + ", Code='" + tcode + "'";
  //if (tprezime != "_") rowUpgradeQuery = rowUpgradeQuery + ", LastName='" + tprezime + "'";
  //if (time != "_") rowUpgradeQuery = rowUpgradeQuery + ", FirstName='" + time + "'";
  //if (taddress != "_") rowUpgradeQuery = rowUpgradeQuery + ", Address='" + taddress + "'";
  //if (temail != "_") rowUpgradeQuery = rowUpgradeQuery + ", Email='" + temail + "'";
  //if (tage != "_") rowUpgradeQuery = rowUpgradeQuery + ", Age='" + tage + "'";
  //if (tnvreme != "_") rowUpgradeQuery = rowUpgradeQuery + ", EnrDate=" + "CONVERT(datetime, '" + tnvreme + "',20)";
  //rowUpgradeQuery = rowUpgradeQuery + " WHERE IdStud=" + tid;

  //return new Promise((resolve, reject) => {

  //  new sql.ConnectionPool(config).connect().then(pool => {
  //    return pool.request().query(rowUpgradeQuery)
  //  }).then(result => {

  //    Odgovor = 'ok';

  //    dummymyObj = new Object();
  //    dummymyObj.tekst1 = Odgovor;
  //    var rows = new Array();

  //    rows[0] = dummymyObj;
  //    res.setHeader('Access-Control-Allow-Origin', '*');
  //    resolve(res.status(200).json(rows));

  //    sql.close();
  //  }).catch(err => {

  //    Odgovor = 'greska';

  //    dummymyObj = new Object();
  //    dummymyObj.tekst1 = Odgovor;
  //    dummymyObj.tekst2 = err.toString();
  //    var rows = new Array();

  //    rows[0] = dummymyObj;
  //    res.setHeader('Access-Control-Allow-Origin', '*');
  //    reject(res.status(200).json(rows));

  //    sql.close();
  //  });

});




studentsRoutes.route('/addStudent/:tdatabase/:id').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  connect(tdatabase);

  const tIdStud = req.params.id;

  let tstudent = new StntModel(req.body);
  tstudent._id = broofa();  // generateUUID();
  tstudent.IdStud = tIdStud;
  tstudent.Code = '';
  tstudent.FirstName = '';

  //StntModel.find(tquery, function (err, fndstudent)  {

  tstudent.save()
    .then(tstudent => {
      //res.status(200).json({ 'student': 'student in added successfully' });
      Odgovor = 'ok dodato';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = "";
      var rows = new Array();

      rows[0] = dummymyObj;
      //res.setHeader('Access-Control-Allow-Origin', '*');
      //resolve(res.status(200).json(rows));
      res.json(rows);
    })
    .catch(err => {
      //res.status(400).send("unable to save to database");
      Odgovor = 'Error';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = err.toString();
      var rows = new Array();

      rows[0] = dummymyObj;
      //res.setHeader('Access-Control-Allow-Origin', '*');
      //reject(res.status(200).json(rows));
      res.json(rows);
    });

});


studentsRoutes.route('/deleteStudent/:tdatabase/:id').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  connect(tdatabase);

  const tIdStud = req.params.id;

  //let tstudent = new StntModel(req.body);

  StntModel.deleteMany({ IdStud: tIdStud }, function (err, data) {
  //StntModel.deleteMany({ IdStud:9 }, function (err, data) {
    //StntModel.findByIdAndRemove({ IdStud: req.params.id }, function (err, student) {
    if (err) {
      Odgovor = 'Error';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = err.toString();
      var rows = new Array();

      rows[0] = dummymyObj;
      res.setHeader('Access-Control-Allow-Origin', '*');
      //reject(res.status(200).json(rows));
      res.json(rows);
    } else {
      Odgovor = 'ok obrisano';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      var rows = new Array();

      rows[0] = dummymyObj;
      res.setHeader('Access-Control-Allow-Origin', '*');
      //resolve(res.status(200).json(rows));
      res.json(rows);
    }
  });

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Defined edit route
//:tdatabase/:startindex
studentsRoutes.route('/edit/:tdatabase/:id').get(function (req, res) {
  let id = req.params.id;
  StntModel.findById(id, function (err, student) {
    res.json(student);
  });
});

//  Defined update route
studentsRoutes.route('/update/:tdatabase/:id').post(function (req, res) {
  StntModel.findById(req.params.id, function (err, fndstudent) {
    if (!fndstudent)
      return next(new Error('Could not load Document'));
    else {
      fndstudent.IdStud = req.body.IdStud;
      fndstudent.Code = req.body.Code;
      fndstudent.FirstName = req.body.FirstName;

      fndstudent.save().then(fndstudent => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
studentsRoutes.route('/delete/:tdatabase/:id').get(function (req, res) {
  StntModel.findByIdAndRemove({ _id: req.params.id }, function (err, student) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////

studentsRoutes.route('/upload/:ttekst').get(function (req, res) {
  const ttekst = req.params.ttekst;

  //let sampleFile0 = "C:/Privr/Privr1/file0.txt";
  let fl2 = "C:/Privr/Privr1/uploadsx/fajl4.txt";
  const fs = require('fs');

  var xml2js = require('xml2js');

  var obj = { name: "Super", Surname: "Man", age: 23 };
  obj = ttekst;

  var builder = new xml2js.Builder();
  var txml = builder.buildObject(obj);
  console.dir(txml);

  fs.writeFile(fl2, txml, function (err) {
    if (err) {
      Odgovor = 'Error';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = err.toString();
      var rows = new Array();

      rows[0] = dummymyObj;
      res.setHeader('Access-Control-Allow-Origin', '*');
      //reject(res.status(200).json(rows));
      res.json(rows);
    } else {
      Odgovor = 'ok dodato';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 = "";
      var rows = new Array();

      rows[0] = dummymyObj;
      res.setHeader('Access-Control-Allow-Origin', '*');
      //resolve(res.status(200).json(rows));
      res.json(rows);
    }

    //console.log("The file was saved!!");
    //res.send('saved2');
  });

});


// studentsRoutes.route('/check').get(function (req, res) {
//   // res.send('radi');
//   // console.log('radi');
//   //res.send(JSON.stringify({ myObject }));
//   //res.json({ a: 1 });
//
//   dummymyObj = new Object();
//   dummymyObj.tekst1 = 'radi';
//   dummymyObj.tekst2 = "";
//   var rows = new Array();
//
//   rows[0] = dummymyObj;
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   //resolve(res.status(200).json(rows));
//   res.json(rows);
// });

// studentsRoutes.route('/check/:tdatabase').get(function (req, res) {
//   let tdatabase = req.params.tdatabase;
//
//       Odgovor = 'Radi';
//
//       dummymyObj = new Object();
//       dummymyObj.tekst1 = Odgovor;
//       dummymyObj.tekst2 = err.toString();
//       var rows = new Array();
//
//       rows[0] = dummymyObj;
//       //res.setHeader('Access-Control-Allow-Origin', '*');
//       //reject(res.status(200).json(rows));
//       res.json(rows);
//
// });

 studentsRoutes.route('/check/:tdatabase').get(function (req, res) {
// studentsRoutes.route('/check').get(function (req, res) {
  let tdatabase = req.params.tdatabase;

  //var query = { address: /^S/ };
  var query = {};

  // StntModel.count(query, function (err, c) {
  //   //if (!c) {
  //   if (typeof c == 'undefined' || c == null) {
  //     Odgovor = 'Error';
  //
  //     dummymyObj = new Object();
  //     dummymyObj.tekst1 = Odgovor;
  //     dummymyObj.tekst2 = err.toString();
  //     dummymyObj.broj2 = -1;
  //     var rows2 = new Array();
  //
  //     rows2[0] = dummymyObj;
  //     res.json(rows2);
  //   }
  //   else {
  //     Odgovor = 'Ok122237';
  //
  //     dummymyObj = new Object();
  //     dummymyObj.tekst1 = Odgovor;
  //     dummymyObj.tekst2 ='';
  //     dummymyObj.broj2 = Number(c);
  //     var rows2 = new Array();
  //
  //     rows2[0] = dummymyObj;
  //     res.json(rows2);
  //   }
  // });

      Odgovor = 'Ok12223457';

      dummymyObj = new Object();
      dummymyObj.tekst1 = Odgovor;
      dummymyObj.tekst2 ='';
      //dummymyObj.tekst2 = req.params.name;
      dummymyObj.broj2 = -1;
      var rows2 = new Array();

      rows2[0] = dummymyObj;
      res.json(rows2);

});

studentsRoutes.route('/check3').get(function (req, res) {
// studentsRoutes.route('/check').get(function (req, res) {
 //  let tdatabase = req.params.tdatabase;

  var query = {};

  var a = req.body;
  var b = req.query.FirstName;

    Odgovor = 'Radi 3';

  dummymyObj = new Object();
  dummymyObj.tekst1 = Odgovor;
  dummymyObj.tekst2 ='';
  //dummymyObj.tekst2 =  req.params.name;
  dummymyObj.tekst2 = req.query.FirstName;
  dummymyObj.broj2 = -1;
  var rows2 = new Array();

  rows2[0] = dummymyObj;
  res.json(rows2);

});

studentsRoutes.route('/check4').get(function (req, res) {
  let tdatabase = 'AdcUniversity2';
  connect(tdatabase);

  //let tdatabase = req.params.tdatabase;

  var mysort = { IdStud: 1 };

  connect(tdatabase);

  StntModel.find(function (err, student) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(student);
    }
  }).sort(mysort);


  for (var i = 0; i < student; i++) {
    var currentAccount = tstudents.FirstName[i];
    console.log(currentAccount);
  }

});

studentsRoutes.route('/updateStudent2/:tdatabase/:id').get(function (req, res) {
  let tdatabase = req.params.tdatabase;
  connect(tdatabase);

  //var tid = 'Hello'; 'NEE!
  tid = req.params.id;

  //const tcode = req.params.code;
  //const tprezime = req.params.prezime;
  //const time = req.params.ime;

  const time = req.query.FirstName;
  const tprezime = req.query.LastName;

  //var tid = ObjectId("5cb06d463b03fc174c123d7e");
  //var tid = "5cb06d463b03fc174c123d7e";

  //age: { $gte: 18 }
  //var tquery = { IdStud: { $gte: 5 } };  //veći od 5
  //var tquery = { IdStud: '2' };
  //var tquery1 = { _id: '726dc363-e3a1-4d96-8c13-5c37cc7545fa' };
  var tquery = { _id: tid };

  //var tquery = { FirstName: 'Kroks' };

  var i = 0;

  var tModel = StntModel;

  //StntModel.findById(tid, function (err, fndstudent) {
  //StntModel.find(tquery, function (err, fndstudent) {
  tModel.find(tquery, function (err, fndstudent) {
    if (!fndstudent)
      return next(new Error('Could not load Document'));
    else {
      //fndstudent.IdStud = req.body.IdStud;

      //fndstudent[0]._id = '726dc363-e3a1-4d96-8c13-5c37cc7545fb';
      //fndstudent[0].Code = 'cd5';
      //fndstudent[0].FirstName = 'Zoran7';

      //fndstudent[0].Code = tcode;
      //fndstudent[0].FirstName = time;
      //fndstudent[0].LastName = tprezime;

      //for (const [key, value] of Object.entries(fndstudent[0])) {
      //for (var key in fndstudent[0]) {
      //  //console.log(key, value);
      //  //if (key === 'id') {
      //  //  fndstudent[0].FirstName = fndstudent[0]._id;
      //  //}
      //  if (key === 'FirstName') {
      //    fndstudent[0].FirstName = req.query.FirstName;
      //  }
      //  if (key === 'LastName') {
      //    fndstudent[0].LastName = req.query.LastName;
      //  }

      //}

      // TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!
      for (var key in fndstudent[0]) {
        for (var propName in req.query) {
          if (req.query.hasOwnProperty(propName)) {
            //console.log(propName, req.query[propName]);
            if (key === propName) {
              fndstudent[0][key] = req.query[propName];
            }
          }
        }
      }
      

      fndstudent[0].save()
        .then(fndstudent => {
          //res.json('Update complete58');
          Odgovor = 'ok';

          dummymyObj = new Object();
          dummymyObj.tekst1 = Odgovor;
          var rows2 = new Array();

          rows2[0] = dummymyObj;
          //res.setHeader('Access-Control-Allow-Origin', '*');
          //resolve(res.status(200).json(rows));
          res.json(rows2);
        })
        .catch(err => {
          //res.status(400).send("unable to update the database");
          Odgovor = 'greska';

          dummymyObj = new Object();
          dummymyObj.tekst1 = Odgovor;
          dummymyObj.tekst2 = err.toString();
          var rows2 = new Array();

          rows2[0] = dummymyObj;
          //res.setHeader('Access-Control-Allow-Origin', '*');
          //reject(res.status(200).json(rows));
          res2.json(rows2);
        });

     
    }
  });
});

studentsRoutes.route('/databaseexists/:tdatabase').get(function (req, res) {
  //ovo ne radi, jer se na mongo bazu možeš konektovati i ako ona ne postoji
  //ali pokazuje kako se u node.js pravi funkcija koja čeka odgovor
  //vidi #01

  let tdatabase = req.params.tdatabase;
  //const mngDB = 'mongodb://siteknower.com:27017/' + tdatabase;
  var tquery = tdatabase

  var tekst;

  connect(tquery, function (err, res) {
    //if (err) {
    //  Odgovor = 'greska';
    //  console.log('greska');
    //} else {
    //  var aa = res;
    //  if (res == '1') {
    //    Odgovor = 'ok';
    //    console.log('ok');
    //  }
    //  else {
    //    Odgovor = 'greska';
    //    console.log('greska');
    //  }
    //}

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');


    dummymyObj = new Object();
    dummymyObj.tekst1 = Odgovor;
    dummymyObj.tekst2 = err.toString();
    var rows2 = new Array();

    rows2[0] = dummymyObj;
    res2.json(rows2);

    console.log('kraj');
  });

});

function connect(databasename) {

   //mongodb://adacco:ag58fr5q@adacco.com: 27017/
  // const mngDB = 'mongodb://localhost:27017/' + databasename;
  // const mngDB = 'mongodb://adacco:ag58fr5q@adacco.com:27017/' + databasename;
  // const mngDB = 'mongodb://adacco:ag58fr5q@adacco.com:27017/AdcUniversity2?authSource=AdcUniversity2&w=1';
  // const mngDB = 'mongodb://adacco@adacco.com:27017/AdcUniversity2';
  //' ' +?authSource=AdcUniversity2&w=1';

  // const mngDB = 'mongodb://localhost:27017/AdcUniversity2';
  // const mngDB = 'mongodb://adacco@adacco.com:27017/AdcUniversity2';
  // const mngDB = 'mongodb://adacco@adacco.com:27017/' + databasename;

  // const mngDB = 'mongodb://adacco:ag58fr5q@adacco.com:27017/' + databasename;
  //const mngDB = 'mongodb://siteknower.com:27017/' + databasename;
  const mngDB = 'mongodb://94.127.5.204:27017/' + databasename;

  // mongoose.connect('mongodb://user:password@host/yourDB?authSource=yourDB&w=1')

  // https://stackoverflow.com/questions/30105823/mongoerror-auth-failed-mongoose-connection-string'

  // mongoose.connect(mngDB, { useNewUrlParser: true }).then(
  // //mongoose.connect('mongodb://localhost:27017/ng7crud', { useNewUrlParser: true }).then(
  //   () => { console.log('Database is connected') },
  //   //() => { },
  //   err => { console.log('Can not connect to the database' + err) }
  // );


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
      console.log('Database on adacco is connected');
      return '1';
    },
    err => {
      console.log('Can not connect to the database' + err);
      return '0';
    }
  );

};

//ne radi
//function generateUUID() { // Public Domain/MIT
//  var d = new Date().getTime();//Timestamp
//  var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
//  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//    var r = Math.random() * 16;//random number between 0 and 16
//    if (d > 0) {//Use timestamp until depleted
//      r = (d + r) % 16 | 0;
//      d = Math.floor(d / 16);
//    } else {//Use microseconds since page-load if supported
//      r = (d2 + r) % 16 | 0;
//      d2 = Math.floor(d2 / 16);
//    }
//    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//  });
//}

function broofa() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

studentsRoutes.route('/provjeribazucloud').get(function (req, res) {

  // const mngDB = 'mongodb://test.siteknower.com:27017/' + 'Cloud';
  const mngDB = 'mongodb://94.127.5.204:27017/' + 'Cloud';

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
  //http://localhost:4001/studenti/provjeribazucloud
});



module.exports = studentsRoutes;


// https://bezkoder.com/angular-10-node-express-postgresql/



//#01

//function(query, callback) {
//  myApi.exec('SomeCommand', function (response) {
//    // other stuff here...
//    // bla bla..
//    callback(response); // this will "return" your value to the original caller
//  });
//}

//So you dont use it like this:

//var returnValue = myFunction(query);
//But like this:

//myFunction(query, function (returnValue) {
//  // use the return value here instead of like a regular (non-evented) return value
//});

