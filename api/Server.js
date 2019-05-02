
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose')
  //,
  //config = require('./DB')
  ;

const studentRoute = require('./routes/students.route');
mongoose.Promise = global.Promise;

//const mngDB = 'mongodb://localhost:27017/university01';

//mongoose.connect(mngDB, { useNewUrlParser: true }).then(
////mongoose.connect('mongodb://localhost:27017/ng7crud', { useNewUrlParser: true }).then(
//  () => {console.log('Database is connected') },
//  err => { console.log('Can not connect to the database'+ err)}
//);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/studenti', studentRoute);
const port = process.env.PORT || 4001;

app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
});


const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
