var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var CircularJSON = require('circular-json');
var axios = require('axios')
var dataset = require('./inbraak.json')
require('xlsx');
var jsonarr = []
var jsoninfo = []

app.get('/scrape', function(req, res){

  /* set up XMLHttpRequest */
  var url = "kwb-2017.xls";
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];

  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];

   jsoninfo.push(XLSX.utils.sheet_to_json(worksheet));
    fs.writeFile('fullinfo.json', JSON.stringify(jsoninfo, null, 4), function(err){
      // console.log('File successfully written! - Check your project directory for the output.json file');
    })

}

oReq.send();

  for(let i = 0; i < dataset.length; i++) {
   //key=AIzaSyAap9hU5GyKW10ITaMEOfc-YKa4gr7RZYQ
    axios.get('https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?geoquery=Den+Haag%2C+Nederland&distance=5.0&categorie=1&categorie=2&pageSize=500')
      .then(function (response) {


        var contentlat = (response.data.results[0].geometry.location.lat);
        var contentlon = (response.data.results[0].geometry.location.lng);
        var aantallen = dataset[i].count
        var json = {lat: "", lon: "", aantal: ""};
        json.lat = contentlat;
        json.lon = contentlon;
        json.aantal= aantallen;
        console.log(dataset[i]._id)

        //console.log(dataset[2].count)


        jsonarr.push(json)
        fs.writeFile('output.json', JSON.stringify(jsonarr, null, 4), function(err){
          // console.log('File successfully written! - Check your project directory for the output.json file');
        })
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  res.send('Check your console!')
});



app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
