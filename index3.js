var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var app     = express();
var CircularJSON = require('circular-json');

var dataset = require('./inbraak.json')


app.get('/scrape', function(req, res){

  var jsonarr = []
  let dates = [];
  let dayNamesArr = [];

    url = 'https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?geoquery=Den+Haag%2C+Nederland&distance=5.0&categorie=1&categorie=2&pageSize=500';


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

       fs.writeFile('denhaagdagen.json', JSON.stringify(dayNamesArr, null, 4), function(err){
       console.log('File successfully written! - Check your project directory for the output.json file');
    })
     });



// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
  res.send('Check your console!')

});













app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
