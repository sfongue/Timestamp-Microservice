// server.js
// where your node app starts

// init project
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  var date = new Date();
  var unix_tm = new Date(date).getTime();
  var utc_tm = new Date(date).toUTCString();
  res.json({"unix": unix_tm, "utc": utc_tm})
})

app.get("/api/timestamp/:date_string", (req, res) => {
  var date = req.params.date_string;
  if(isNaN(date) === true) {
    var unix_tm = new Date(date).getTime();
    var utc_tm = new Date(date).toUTCString();
  } else {
    date = parseInt(date);
    var unix_tm = date;
    //
    var a = new Date(date);
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var day = days[a.getDay()];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    if (hour.toString().length < 2) {
      hour = ('0' + hour).slice(-2);
      console.log('hour');
    }
    if (min.toString().length < 2) {
      min = ('0' + min).slice(-2);
    }
    if (sec.toString().length < 2) {
      sec = ('0' + sec).slice(-2);
    }
    var utc_tm = day + ', '+ date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' GMT';
  }
  console.log(unix_tm.toString())
  if (isNaN(new Date(date).getTime())) {
    res.json({"error" : "Invalid Date" });
  } else {
    res.json({"unix": unix_tm, "utc": utc_tm})
  }
})

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});