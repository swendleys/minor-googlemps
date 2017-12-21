import {Component, OnInit, ViewChild} from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import {GMapsService} from "./map.service";
import * as data from './inkomen.json';
import * as inbraakdata from '../../assets/output.json';
import * as data_latlon from './inkomen_latlon.json';
import * as inbraak_latlon from './output.json';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {last} from "@angular/router/src/utils/collection";
import {DropdownModule} from "ngx-dropdown";
import {any} from "codelyzer/util/function";
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmInfoWindow, AgmDataLayer, CircleManager, AgmCircle } from '@agm/core';
import {$} from "protractor";

@Component({
  selector : 'googlemap',
  templateUrl: 'maps.html',
  styleUrls: ['map.component.css']
})
export class GoogleMapsComponent implements OnInit{
  @ViewChild(GoogleMapsAPIWrapper) private gmapWrapper: GoogleMapsAPIWrapper;
  arr = [];
  arr2 = [];

  jsonLatlon;
map : any;
jsonData;
  result;
  inkomen
  count = 0;
  results: any;
  pages =['abc','bca','pqr'];

  constructor(private http: Http, private mapservice: GMapsService, map: MapsAPILoader) {
  this.jsonData = data;
    this.jsonLatlon = data_latlon
    this.results = inbraak_latlon;
    this.result = inbraak_latlon;


  }

  ngOnInit(){
    console.log(this.jsonData)
    console.log(this.jsonLatlon.data)
    console.log(this.results)
    this.convert()
    let pos1 = {lat: 52.0704978, lng: 4.3006999};
    this.gmapWrapper.setCenter(pos1)
    this.gmapWrapper.setZoom(12);

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
  //lat: number = 52.1941679;
 // lng: number = 4.6820146;

  public ewa = () => {

    var li = document.getElementById("Denhaag")
    console.log("ewa" +li.innerText);



    alert("ewa");
    let position = {lat: 52.0704978, lng: 4.3006999};
    this.gmapWrapper.panTo(position);
    this.gmapWrapper.setZoom(12);

  };

  public goToDenHaag = () => {
    let position = {lat: 52.0704978, lng: 4.3006999};
    this.gmapWrapper.panTo(position);
  };

  public goToAmsterdam = () => {


    let position = {lat: 52.379189, lng: 4.899431};
    this.gmapWrapper.panTo(position);
  };

  public goToUtrecht = () => {


    let position = {lat: 52.0928768, lng: 5.104480};
    this.gmapWrapper.panTo(position);
  };

  public goToGouda = () => {


    let position = {lat: 52.0115205, lng: 4.7104633};
    this.gmapWrapper.panTo(position);
  };

  public goToEindhoven = () => {


    let position = {lat: 51.441642, lng: 5.4697225};
    this.gmapWrapper.panTo(position);
  };

  public  goToRotterdam = () => {
 console.log("We gaan naar Roffa");
    let position = {lat:  51.9244201, lng:  4.4777325};
    this.gmapWrapper.panTo(position);
  };

  public goToAlmere = () => {


    let position = {lat: 52.3507849, lng: 5.2647016};
    this.gmapWrapper.panTo(position);
  };

  public goToGroningen = () => {


    let position = {lat: 53.2193835, lng: 6.5665018};
    this.gmapWrapper.panTo(position);
  };

  public goToNijmegen = () => {



    let position = {lat: 51.8125626, lng: 5.8372264};
    this.gmapWrapper.panTo(position);
  };

}


