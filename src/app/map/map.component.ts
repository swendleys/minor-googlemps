import {Component, OnInit} from "@angular/core";
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import {GMapsService} from "./map.service";
import * as data from './inkomen.json';
import * as inbraakdata from '../../assets/output.json';
import * as data_latlon from './inkomen_latlon.json';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {last} from "@angular/router/src/utils/collection";
@Component({
  selector : 'googlemap',
  templateUrl: 'maps.html',
  styleUrls: ['map.component.css']
})
export class GoogleMapsComponent implements OnInit{

  arr = [];
  arr2 = [];

  jsonLatlon

jsonData
  result
  inkomen
  count = 0;
  results: any;


  constructor(private http: Http, private mapservice: GMapsService) {
  this.jsonData = data
    this.jsonLatlon = data_latlon
    this.results = [];
    this.result = [];


  }

  ngOnInit(){
    console.log(this.jsonData)
    console.log(this.jsonLatlon.data)
    console.log(this.results)
    this.convert()


    }

  convert(){
    for(var i = 0; i < this.jsonData.length; i++){
      var spl = this.jsonData[i].wijk.split(" ");
     // this.getLatLon(this.jsonData[i].wijk, this.jsonData[i].stad, this.jsonData[i].inkomen)
    }
    //this.showArr()
  }


  getLatLon(wijk, stad, inkomen) {
    var colour;
    var int_inkomen = parseInt(inkomen)
    if (int_inkomen <= 15) {
      colour = 'red'
    } else if (int_inkomen > 15 && int_inkomen < 20) {
      colour = 'orange'
    } else if (int_inkomen >= 20 && int_inkomen < 25) {
      colour = 'yellow'
    } else if (int_inkomen >= 25) {
      colour = 'green'
    }
    console.log(colour)
    console.log(inkomen)


    var spl = wijk.split(" ");
    this.http.get('http://nominatim.openstreetmap.org/search/' + wijk[0] + '%20' + wijk[1] + '%20' + wijk[2] + '%20' + stad + '?format=json&addressdetails=1&limit=1&polygon_svg=1')
      .subscribe(
        data => {
          console.log("Latitude: " + data.json()[0].lat)
          console.log("Longitude: " + data.json()[0].lon)
          this.arr.push({
            "lat": data.json()[0].lat,
            "lon": data.json()[0].lon,
            "inkomen": int_inkomen,
            colour: colour,
            "radius": 500
          })
          console.log(this.arr)
        }
      )
    console.log(this.arr)
  }


  title: string = 'My first AGM project';
  lat: number = 52.1941679;
  lng: number = 4.6820146;
}
