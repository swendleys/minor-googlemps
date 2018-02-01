var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var app     = express();
var CircularJSON = require('circular-json');

var dataset = require('./inbraak.json')


app.get('/scrape', function(req, res){
  let elementArr = [];
  var jsonarr = []
  let dates = [];
  let dayNamesArr = [];
  let buitenreq = 1;
  let tweedereq = 0;
  let binnenreq = 0;

    url = 'https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?geoquery=Rotterdam+Nederland&distance=5.0&categorie=1&categorie=2&pageSize=500';
    url2 = 'https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?page=2&geoquery=Rotterdam+Nederland&distance=5.0&categorie=1&categorie=2&pageSize=500';
//https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?page=2&geoquery=Amsterdam%2C+Nederland&distance=5.0&categorie=1&categorie=2&pageSize=500

/*
   request(url, function(error, response, html) {


      if (!error) {

        var $ = cheerio.load(html);

        $('tr td:nth-child(2)').each(function(){ dates.push($(this).text()); });

        //var contentLat = $(lat).text().trim();


        var data = $(this);

        //  console.log(contentLat, contentLon)

       // var json = {lat: ""};
       // json.lat = lat;


      }


for(let i = 0; i < dates.length; i++)  {
      //  console.log(dates[i])

  let newdate = dates[i].split("-").reverse().join("-");
  let date = new Date("'" + newdate + "'");
  let dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
  let dayOfWeekIndex = date.getDay()
  dayNamesArr.push(dayNames[dayOfWeekIndex]);

}
      console.log('Na de eerste forloop: ' + dayNamesArr.length)
      let mf = 1;
      let m = 0;
      let item;


      for (let i=0; i<dayNamesArr.length; i++)
      {
        for (let j=i; j<dayNamesArr.length; j++)
        {
          if (dayNamesArr[i] == dayNamesArr[j])
            m++;
          if (mf<m)
          {
            mf=m;
            item = dayNamesArr[i];
          }
        }
        m=0;
      }

      console.log(`${item} ( ${mf} times ) `) ;





     // console.log(dayNamesArr)

   //   console.log(dates);
    // console.log(dayNamesArr.length)




   /!*  fs.writeFile('rotterdamdagen.json', JSON.stringify(dayNamesArr, null, 4), function(err){
         binnenreq++;
         console.log('Eerste req:' + dayNamesArr.length)
       console.log('File successfully written! - Check your project directory for the output.json file');
    })*!/
     });
*/




//console.log("Tussen requests" + dayNamesArr.length)

    //als er een meer dan 500 resultaten zijn

  request(url, function(error, response, html) {


    if (!error) {

      var $ = cheerio.load(html);


      var data = $(this);
      $('tr td:nth-child(1)').each(function() {
        var element = {postcode: "", dag: ""};
        element.postcode = ($(this).text());
        elementArr.push(element)
      })
      //var contentLat = $(lat).text().trim();



      $('tr td:nth-child(2)').each(function(){ dates.push($(this).text()) })

//console.log(elementArr)
      for(let i = 0; i < dates.length; i++)  {

        let newdate = dates[i].split("-").reverse().join("-");
        let date = new Date("'" + newdate + "'");
        let dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
        let dayOfWeekIndex = date.getDay()
        elementArr[i].dag = dayNames[dayOfWeekIndex]
        console.log(elementArr)
      }

      //console.log(elementArr)

      let mf = 1;
      let m = 0;
      let item;
      for (let i=0; i<dayNamesArr.length; i++)
      {
        for (let j=i; j<dayNamesArr.length; j++)
        {
          if (dayNamesArr[i] == dayNamesArr[j])
            m++;
          if (mf<m)
          {
            mf=m;
            item = dayNamesArr[i];
          }
        }
        m=0;
      }
     // console.log(`${item} ( ${mf} times ) `) ;
      //  console.log(contentLat, contentLon)



      // var json = {lat: ""};
      // json.lat = lat;

      fs.writeFile('elements.json', JSON.stringify(elementArr, null, 4), function(err){
        tweedereq++;
        console.log('Tweede req' + dayNamesArr.length)
        console.log('File successfully written! - Check your project directory for the output.json file');
      })

     // console.log(element)
     // console.log(element)
    }

  });







// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
  res.send('Check your console!')

});













app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
