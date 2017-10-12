import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NguiMapModule} from '@ngui/map';

import { AppComponent } from './app.component';
import {GoogleMapsComponent} from "./map/map.component";

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyD0l8AD86NucXhybctdjkzL32XE7PDsYIA'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
