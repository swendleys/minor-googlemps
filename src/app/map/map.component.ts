import {Component, OnInit, ViewChild} from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import {GMapsService} from "./map.service";
import * as data from './inkomen.json';
import * as denhaagdagen from './denhaagdagen.json';
import * as amsterdamdagen from './amsterdamdagen.json';
import * as utrechtdagen from './utrechtdagen.json';
import * as rotterdamdagen from './rotterdamdagen.json';
import * as inbraakdata from '../../assets/output.json';
import * as data_latlon from './inkomen_latlon.json';
import * as inbraak_latlon from './output.json';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
//import {VaadinCharts, DataSeries} from '../../../bower_components/vaadin-charts/vaadin-charts.html'
import {last} from "@angular/router/src/utils/collection";
import {DropdownModule} from "ngx-dropdown";
import {any} from "codelyzer/util/function";
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmInfoWindow, AgmDataLayer, CircleManager, AgmCircle } from '@agm/core';
import {$} from "protractor";

@Component({
  selector : 'googlemap',
  templateUrl: 'maps.html',
  styleUrls: ['map.component.css'],
  //directives: [VaadinCharts, DataSeries]
})
export class GoogleMapsComponent implements OnInit{
  @ViewChild(GoogleMapsAPIWrapper) private gmapWrapper: GoogleMapsAPIWrapper;
  arr = [];
  arr2 = [];
  showChart: boolean = false;
  showDenHaag: boolean = false;
  showAmsterdam: boolean = false;
  showRotterdam: boolean = false;
  showInfo: boolean = false;
  jsonLatlon;
  map : any;
  jsonData;
  result;
  inkomen;
  barChartData: any;
  item;
  denHaagmaandag = 0;
  denHaagdinsdag = 0;
  denHaagwoensdag = 0;
  denHaagdonderdag = 0;
  denHaagvrijdag = 0;
  denHaagzaterdag = 0;
  denHaagzondag = 0;

  amsterdammaandag = 0;
  amsterdamdinsdag = 0;
  amsterdamwoensdag = 0;
  amsterdamdonderdag = 0;
  amsterdamvrijdag = 0;
  amsterdamzaterdag = 0;
  amsterdamzondag = 0;

  utrechtmaandag = 0;
  utrechtdinsdag = 0;
  utrechtwoensdag = 0;
  utrechtdonderdag = 0;
  utrechtvrijdag = 0;
  utrechtzaterdag = 0;
  utrechtzondag = 0;

  rotterdammaandag = 0;
  rotterdamdinsdag = 0;
  rotterdamwoensdag = 0;
  rotterdamdonderdag = 0;
  rotterdamvrijdag = 0;
  rotterdamzaterdag = 0;
  rotterdamzondag = 0;

  mf = 1;
  percentageMaandag;
  percentageDinsdag;
  percentageWoensdag;
  percentageDonderdag;
  percentageVrijdag;
  percentageZaterdag;
  percentageZondag;
  count = 0;
  results: any;
  denHaagDays;
 utrechtDays;
  amsterdamDays;
  rotterdamDays;
  pages =['abc','bca','pqr'];

  str: string;
  sendValues(): void {
 console.log(this.str);
  }

  constructor(private http: Http, private mapservice: GMapsService, map: MapsAPILoader) {
    this.jsonData = data;
    this.jsonLatlon = data_latlon
    this.results = inbraak_latlon;
    this.result = inbraak_latlon;
    this.denHaagDays = denhaagdagen;
    this.amsterdamDays = amsterdamdagen;
    this.utrechtDays = utrechtdagen;
    this.rotterdamDays = rotterdamdagen;

  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLegend:boolean = false;

  public barChartLabels:string[] = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];


  public barChartType:string = 'bar';

  ngOnInit(){
    console.log(this.jsonData)
    console.log(this.jsonLatlon.data)
    console.log(this.results)
    this.convert()
    let pos1 = {lat: 52.0704978, lng: 4.3006999};
    this.gmapWrapper.setCenter(pos1)
    this.gmapWrapper.setZoom(12);

    this.showChart = false;
    let m = 0;

    for (let i=0; i< this.denHaagDays.length; i++)
    {
      if(this.denHaagDays[i]==='Maandag') {
        this.denHaagmaandag++;
      }
      if(this.denHaagDays[i]==='Dinsdag') {
        this.denHaagdinsdag++;
      }
      if(this.denHaagDays[i]==='Woensdag') {
        this.denHaagwoensdag++;
      }
      if(this.denHaagDays[i]==='Donderdag') {
        this.denHaagdonderdag++;
      }
      if(this.denHaagDays[i]==='Vrijdag') {
        this.denHaagvrijdag++;
      }
      if(this.denHaagDays[i]==='Zaterdag') {
        this.denHaagzaterdag++;
      }
      if(this.denHaagDays[i]==='Zondag') {
        this.denHaagzondag++;
      }


     //check welke meest voorkomt
      for (let j=i; j<this.denHaagDays.length; j++)
      {
        if (this.denHaagDays[i] == this.denHaagDays[j])
          m++;
        if (this.mf<m)
        {
          this.mf=m;
          this.item = this.denHaagDays[i];
        }
      }
      m=0;
    }



    //tel dagen amsterdam
    for (let i=0; i< this.amsterdamDays.length; i++)
    {
      if(this.amsterdamDays[i]==='Maandag') {
        this.amsterdammaandag++;
      }
      if(this.amsterdamDays[i]==='Dinsdag') {
        this.amsterdamdinsdag++;
      }
      if(this.amsterdamDays[i]==='Woensdag') {
        this.amsterdamwoensdag++;
      }
      if(this.amsterdamDays[i]==='Donderdag') {
        this.amsterdamdonderdag++;
      }
      if(this.amsterdamDays[i]==='Vrijdag') {
        this.amsterdamvrijdag++;
      }
      if(this.amsterdamDays[i]==='Zaterdag') {
        this.amsterdamzaterdag++;
      }
      if(this.amsterdamDays[i]==='Zondag') {
        this.amsterdamzondag++;
      }


      //check welke meest voorkomt
      for (let j=i; j<this.amsterdamDays.length; j++)
      {
        if (this.amsterdamDays[i] == this.amsterdamDays[j])
          m++;
        if (this.mf<m)
        {
          this.mf=m;
          this.item = this.amsterdamDays[i];
        }
      }
      m=0;
    }


    //tel dagen utrecht
    for (let i=0; i< this.utrechtDays.length; i++)
    {
      if(this.utrechtDays[i]==='Maandag') {
        this.utrechtmaandag++;
      }
      if(this.utrechtDays[i]==='Dinsdag') {
        this.utrechtdinsdag++;
      }
      if(this.utrechtDays[i]==='Woensdag') {
        this.utrechtwoensdag++;
      }
      if(this.utrechtDays[i]==='Donderdag') {
        this.utrechtdonderdag++;
      }
      if(this.utrechtDays[i]==='Vrijdag') {
        this.utrechtvrijdag++;
      }
      if(this.utrechtDays[i]==='Zaterdag') {
        this.utrechtzaterdag++;
      }
      if(this.utrechtDays[i]==='Zondag') {
        this.utrechtzondag++;
      }

      //check welke meest voorkomt
      for (let j=i; j<this.utrechtDays.length; j++)
      {
        if (this.utrechtDays[i] == this.utrechtDays[j])
          m++;
        if (this.mf<m)
        {
          this.mf=m;
          this.item = this.utrechtDays[i];
        }
      }
      m=0;
    }

    for (let i=0; i< this.rotterdamDays.length; i++) {
      if (this.rotterdamDays[i] === 'Maandag') {
        this.rotterdammaandag++;
      }
      if (this.rotterdamDays[i] === 'Dinsdag') {
        this.rotterdamdinsdag++;
      }
      if (this.rotterdamDays[i] === 'Woensdag') {
        this.rotterdamwoensdag++;
      }
      if (this.rotterdamDays[i] === 'Donderdag') {
        this.rotterdamdonderdag++;
      }
      if (this.rotterdamDays[i] === 'Vrijdag') {
        this.rotterdamvrijdag++;
      }
      if (this.rotterdamDays[i] === 'Zaterdag') {
        this.rotterdamzaterdag++;
      }
      if (this.rotterdamDays[i] === 'Zondag') {
        this.rotterdamzondag++;
      }
    }


    console.log(`${this.item} ( ${this.mf} times ) `) ;
    console.log("maandag: " + this.denHaagmaandag) ;
    console.log("dinsdag: " + this.denHaagdinsdag) ;
    console.log("woensdag: " + this.denHaagwoensdag) ;
    console.log("donderdag: " + this.denHaagdonderdag) ;
    console.log("vrijdag: " + this.denHaagvrijdag) ;
    console.log("zaterdag: " + this.denHaagzaterdag) ;
    console.log("zondag: " + this.denHaagzondag) ;


    this.barChartData = [
      {data: [this.denHaagmaandag, this.denHaagdinsdag, this.denHaagwoensdag,  this.denHaagdonderdag ,this.denHaagvrijdag ,this.denHaagzaterdag ,this.denHaagzondag]},
    ];

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


    this.percentageMaandag = this.mf / (this.denHaagDays.length) * 100;
    this.percentageMaandag = this.percentageMaandag.toFixed(1);

    this.percentageDinsdag = this.denHaagdinsdag / (this.denHaagDays.length) * 100;
    this.percentageDinsdag = this.percentageDinsdag.toFixed(1);

    this.percentageWoensdag = this.denHaagwoensdag / (this.denHaagDays.length) * 100;
    this.percentageWoensdag = this.percentageWoensdag.toFixed(1);

    this.percentageDonderdag = this.denHaagdonderdag / (this.denHaagDays.length) * 100;
    this.percentageDonderdag = this.percentageDonderdag.toFixed(1);

    this.percentageVrijdag = this.denHaagvrijdag / (this.denHaagDays.length) * 100;
    this.percentageVrijdag = this.percentageVrijdag.toFixed(1);

    this.percentageZaterdag = this.denHaagzaterdag / (this.denHaagDays.length) * 100;
    this.percentageZaterdag = this.percentageZaterdag.toFixed(1);

    this.percentageZondag = this.denHaagzondag / (this.denHaagDays.length) * 100;
    this.percentageZondag = this.percentageZondag.toFixed(1);

    let position = {lat: 52.0704978, lng: 4.3006999};
    this.gmapWrapper.panTo(position);
    this.showChart=!this.showChart;
    this.showInfo=!this.showInfo;

    /*document.getElementById("info").innerHTML = " Inbraakdata is van <strong>11-10-2017</strong> tot heden. (bron: www.politie.nl)<br>\n" +
      "  De favoriete inbraakdag in Den Haag is: <strong> "+ this.item + "</strong><br>\n" +
      "\n" +
      "  Verdeling inbraken over de week:  <br>\n" +
      "  Maandag: <strong> " + this.percentageMaandag + "%</strong>  <br>\n" +
      "  Dinsdag: <strong> " + this.percentageDinsdag+ "%</strong> <br>\n" +
      "  Woensdag:<strong> " + this.percentageWoensdag+ "%</strong> <br>\n" +
      "  Donderdag: <strong>" + this.percentageDonderdag+ "%</strong> <br>\n" +
      "  Vrijdag: <strong> " + this.percentageVrijdag+ "%</strong> <br>\n" +
      "  Zaterdag: <strong> " + this.percentageZaterdag+ "%</strong> <br>\n" +
      "  Zondag:<strong>  " + this.percentageZondag+ "%</strong> <br>";*/
  };

  public goToAmsterdam = () => {
    this.showInfo=true;
    this.showChart=!this.showChart;
    this.barChartData = [
      {data: [this.amsterdammaandag, this.amsterdamdinsdag, this.amsterdamwoensdag,  this.amsterdamdonderdag ,this.amsterdamvrijdag,this.amsterdamzaterdag ,this.amsterdamzondag]},
    ];

    let position = {lat: 52.379189, lng: 4.899431};
    this.gmapWrapper.panTo(position);

    this.percentageMaandag = this.amsterdammaandag / (this.amsterdamDays.length) * 100;
    this.percentageMaandag = this.percentageMaandag.toFixed(1);

    this.percentageDinsdag = this.amsterdamdinsdag / (this.amsterdamDays.length) * 100;
    this.percentageDinsdag = this.percentageDinsdag.toFixed(1);

    this.percentageWoensdag = this.amsterdamwoensdag / (this.amsterdamDays.length) * 100;
    this.percentageWoensdag = this.percentageWoensdag.toFixed(1);

    this.percentageDonderdag = this.amsterdamdonderdag / (this.amsterdamDays.length) * 100;
    this.percentageDonderdag = this.percentageDonderdag.toFixed(1);

    this.percentageVrijdag = this.amsterdamvrijdag / (this.amsterdamDays.length) * 100;
    this.percentageVrijdag = this.percentageVrijdag.toFixed(1);

    this.percentageZaterdag = this.amsterdamzaterdag / (this.amsterdamDays.length) * 100;
    this.percentageZaterdag = this.percentageZaterdag.toFixed(1);

    this.percentageZondag = this.amsterdamzondag / (this.amsterdamDays.length) * 100;
    this.percentageZondag = this.percentageZondag.toFixed(1);
  };
  public goToUtrecht = () => {
    this.showInfo=true;
    this.showChart=!this.showChart;
    this.barChartData = [
      {data: [this.utrechtmaandag, this.utrechtdinsdag, this.utrechtwoensdag,  this.utrechtdonderdag ,this.utrechtvrijdag,this.utrechtzaterdag ,this.utrechtzondag]},
    ];
    this.percentageMaandag = this.utrechtmaandag / (this.utrechtDays.length) * 100;
    this.percentageMaandag = this.percentageMaandag.toFixed(1);

    this.percentageDinsdag = this.utrechtdinsdag / (this.utrechtDays.length) * 100;
    this.percentageDinsdag = this.percentageDinsdag.toFixed(1);

    this.percentageWoensdag = this.utrechtwoensdag / (this.utrechtDays.length) * 100;
    this.percentageWoensdag = this.percentageWoensdag.toFixed(1);

    this.percentageDonderdag = this.utrechtdonderdag / (this.utrechtDays.length) * 100;
    this.percentageDonderdag = this.percentageDonderdag.toFixed(1);

    this.percentageVrijdag = this.utrechtvrijdag / (this.utrechtDays.length) * 100;
    this.percentageVrijdag = this.percentageVrijdag.toFixed(1);

    this.percentageZaterdag = this.utrechtzaterdag / (this.utrechtDays.length) * 100;
    this.percentageZaterdag = this.percentageZaterdag.toFixed(1);

    this.percentageZondag = this.utrechtzondag / (this.utrechtDays.length) * 100;
    this.percentageZondag = this.percentageZondag.toFixed(1);

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

    this.showInfo=true;
    this.showChart=!this.showChart;
    this.barChartData = [
      {data: [this.rotterdammaandag, this.rotterdamdinsdag, this.rotterdamwoensdag,  this.rotterdamdonderdag ,this.rotterdamvrijdag,this.rotterdamzaterdag ,this.rotterdamzondag]},
    ];
    this.percentageMaandag = this.utrechtmaandag / (this.utrechtDays.length) * 100;
    this.percentageMaandag = this.percentageMaandag.toFixed(1);

    this.percentageDinsdag = this.utrechtdinsdag / (this.utrechtDays.length) * 100;
    this.percentageDinsdag = this.percentageDinsdag.toFixed(1);

    this.percentageWoensdag = this.utrechtwoensdag / (this.utrechtDays.length) * 100;
    this.percentageWoensdag = this.percentageWoensdag.toFixed(1);

    this.percentageDonderdag = this.utrechtdonderdag / (this.utrechtDays.length) * 100;
    this.percentageDonderdag = this.percentageDonderdag.toFixed(1);

    this.percentageVrijdag = this.utrechtvrijdag / (this.utrechtDays.length) * 100;
    this.percentageVrijdag = this.percentageVrijdag.toFixed(1);

    this.percentageZaterdag = this.utrechtzaterdag / (this.utrechtDays.length) * 100;
    this.percentageZaterdag = this.percentageZaterdag.toFixed(1);

    this.percentageZondag = this.utrechtzondag / (this.utrechtDays.length) * 100;
    this.percentageZondag = this.percentageZondag.toFixed(1);



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


