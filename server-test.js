let express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const connection = mysql.createConnection({
    host: '0.0.0.0',
    // host: '172.17.0.2',
    port: '3308',
    user: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASS,
    database: process.env.LOCAL_DB
});

const app = express();
app.use(cors());
app.use(express.json());

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.post('/university', (req, res) => {
  res.setHeader('content-type', 'application/json');
  let query = `SELECT * FROM IDP_Main WHERE University_Name LIKE '%${req.body.text}%'`;
  connection.query(query, (err, result) => {
    if (err) throw err;

    // console.log(req.body.table);

    res.send(JSON.stringify({'Query': result}));
  });
  
});

app.post('/program', (req, res) => {
  res.setHeader('content-type', 'application/json');
  let query = `SELECT * FROM IDP_Courses WHERE Course_Name LIKE '%${req.body.text}%'`;
  connection.query(query, (err, result) => {
    if (err) throw err;

    res.send(JSON.stringify({'Query': result}));
  });
});

app.post('/progUni', (req, res) => {
  res.setHeader('content-type', 'application/json');
  let query = `SELECT * FROM IDP_Courses WHERE Course_Name LIKE '%${req.body.prog}%' AND University_Name LIKE '%${req.body.uni}%'`;
  connection.query(query, (err, result) => {
    if (err) throw err;

    res.send(JSON.stringify({'Query': result}));
  });
});

app.get('', (req, res) => {
  res.send(JSON.stringify("Welcome"));
});
  
// connection.query("SELECT * FROM IDP_Courses WHERE University_Name LIKE '%University%'", (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });

app.listen(8080, () => {
  console.log('Server listening on Port 8080');
});

module.exports = app;
