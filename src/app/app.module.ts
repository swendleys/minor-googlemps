import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import {GoogleMapsComponent} from "./map/map.component";
import { GoogleMapsAPIWrapper } from '@agm/core';
import {GMapsService} from "./map/map.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHc8r0xb1x2QOmslvXOYL5unMdODNCaro'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
   // NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyD0l8AD86NucXhybctdjkzL32XE7PDsYIA'})
  ],
  providers: [GoogleMapsAPIWrapper, GMapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
