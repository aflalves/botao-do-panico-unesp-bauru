import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

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

   panics: FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, private geolocation: Geolocation,  public alertCtrl: AlertController, angularFireDB : AngularFireDatabase) {
    this.panics = angularFireDB.list('/panics');
  }

  //called when page is loaded
  ionViewDidLoad() {
    console.log("I'm alive!");
    this.getDeviceLocation();
  }

  //called when emergency button is pressed
  onEmergencyButton() {
     this.emergencyCounter++;
     if (this.emergencyCounter == 2) {
       this.counter = " vez"
     }
     if (this.emergencyCounter > 2) {
       this.getDeviceLocation();
       console.log("after on locate");
     }
  }

  //gets device location
  getDeviceLocation() {
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          console.log("location = ", location);
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          //call web service sending the location and user id
          this.sendLocation();
          this.showAlert();
        }
      )
      .catch(
        error => {
          console.log("Erro para obter a localização")
        } 
      );
  }

  sendLocation() {
    var panic = {
      "user_id" : 13,
      "lat" : this.location.lat,
      "lng" : this.location.lng
    };

    this.panics.push(panic);

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Socorro acionado com sucesso!',
      subTitle: 'Sua localização esta sendo compartilhada com os agentes de segurança!',
      buttons: ['OK']
    });
    alert.present();
  }

}
