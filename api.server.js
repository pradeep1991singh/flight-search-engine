/**** 
 * Flights API configuration
 * 
 * Using express for API server
 * API will serve JSON Object having flights data
 * 
 ***/

// express server configuration
var express = require('express');
var api = express();

// api port, api will be running on 8080
var port = 8080;

// enable cors
api.all('/*', function(req, res, next) {
	console.log('request made for: %s', req.originalUrl);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
	next();
});

// api root
api.get('/', function(req, res) {
  res.send('api running... <br> please use "/api/flights" for getting all flights!');
});

// get all flights
api.get('/api/flights', function(req, res) {
  res.send([{
      "id": 1,
      "airline": "air india",
      "number": "AI-202",
      "from": "PUNE",
      "to": "DELHI",
      "from_code": "PNQ",
      "to_code": "DEL",
      "depart_date": "Tue Apr 11 2017 17:03:07 GMT+0530 (IST)",
      "arrive_date": "Tue Apr 11 2017 19:03:07 GMT+0530 (IST)",
      "price": 9500
    }, {
      "id": 2,
      "airline": "indigo",
      "number": "IND-202",
      "from": "HYDERABAD",
      "to": "DELHI",
      "from_code": "HYD",
      "to_code": "DEL",
      "depart_date": "Tue Apr 15 2017 15:03:07 GMT+0530 (IST)",
      "arrive_date": "Tue Apr 15 2017 17:03:07 GMT+0530 (IST)",
      "price": 10500
    }]);
});

// api listen
api.listen(port, function() {
  console.log('api listening on port ' + port);
});

// api call
// fetch("http://localhost:8080/api/flights")
//   .then(response => response.json())
//   .then(flights => {
//     this.setState({flights});
//   }, e => {
//     console.log(e);
//   });