import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  location : Location = {
    lat: 0,
    lng: 0
  };

   emergencyCounter = 0;
   counter = " vezes";
  
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  onEmergencyButton() {
     this.emergencyCounter++;
     if (this.emergencyCounter == 2) {
       this.counter = " vez"
     }
     if (this.emergencyCounter > 2) {
       this.onLocate();
     }
  }

  onLocate() {
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          console.log("location = ", location);
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
        }
      )
      .catch(
        error => {
          console.log("Erro para obter a localização")
        } 
      );
  }

}
