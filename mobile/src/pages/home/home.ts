import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import {Observable} from 'rxjs/Rx';

import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

import { Sim } from '@ionic-native/sim';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  location : Location = {
    lat: 0,
    lng: 0
  };

  status: string;
  phoneNumber;
  panics: FirebaseListObservable<any>;
  name: string;
  
  constructor(public navCtrl: NavController, public navParam: NavParams, private geolocation: Geolocation, private callNumber: CallNumber,
              public alertCtrl: AlertController, public angularFireDB : AngularFireDatabase, public sim: Sim) {
    this.panics = angularFireDB.list('/panics')
    this.name = this.navParam.get('name');
  }

  //called when page is loaded
  ionViewDidLoad() {
    //testando se o gps esta ligado
    this.onTestEmergency();
  }

  getSimInfo() {
    this.sim.getSimInfo().then(
      (info) => {
        console.log("info", info);
        this.phoneNumber = info.phoneNumber;
      },
      (err) => {
        console.log('Unable to get sim info: ', err)
      }
    );
  }

  //called when emergency button is pressed
  onEmergencyButton() {
    console.log("onEmergencyButton");
    if (status == undefined || status != "Nova") {
      this.getDeviceLocation();
    } else{
      this.showInProgress();
    }
  }

  showInProgress() {
    let alert = this.alertCtrl.create({
      title: 'Socorro já acionado!',
      subTitle: 'Sua localização esta sendo compartilhada.',
      buttons: ['OK']
    });
    alert.present();
  }

  onTestEmergency() {
    console.log("onTestEmergency");
    this.geolocation.getCurrentPosition()
    .then(
      location => {
        console.log("location = ", location);
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        //call web service sending the location and user id
        this.showTestAlert(true);
      }
    )
    .catch(
      error => {
        console.log("Erro para obter a localização");
        this.showTestAlert(false);
      } 
    );
  }

  //gets device location
  getDeviceLocation() {
    console.log("getDeviceLocation");
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          console.log("location = ", location);
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          //call web service sending the location and user id
          this.sendLocation();
          this.showSucessAlert();
        }
      )
      .catch(
        error => {
          console.log("Erro para obter a localização", error);
          this.showErrorAlert();
        } 
      );
  }

  sendLocation() {
    var newRef = this.panics.push({}).key;
    var panic = {
      "id" : newRef,
      "nome" : this.name,
      "telefone" : this.phoneNumber || null,
      "lat" : this.location.lat,
      "lng" : this.location.lng,
      "status": "Nova",
      "data": this.getDate(),
      "ref" : null
    };

    this.panics.push(panic).then((ref) => { 
      let sub = Observable.interval(3000).subscribe(x => {
          this.panicByKey(ref.key).then(x => {
            if (status != "Nova") {
              sub.unsubscribe();
              console.log("Encerrado.");
            } else {
              panic.ref = ref.key;
              console.log("updating location", panic);
              this.updateLocation(panic, ref.key);
            }
          })
          
      });
    });
  }

  panicByKey(key) {
    return this.angularFireDB.database.ref('panics/' + key).once('value').then(function(snapshot) {
      status = snapshot.val().status;
    });
}

  updateLocation(panic: any, ref: any) {
    this.geolocation.getCurrentPosition()
    .then(
      location => {
        panic.lat = location.coords.latitude;
        panic.lng = location.coords.longitude;
        this.panicByKey(ref).then(x => {
          if (status == "Nova") {
            this.panics.update(ref, panic);
            console.log("Atualizando localização no database", panic);
          } 
        })
      }
    )
    .catch(
      error => {
        console.log("Erro ao atualizar localização no database", error);
      } 
    );
  }

  showSucessAlert() {
    let alert = this.alertCtrl.create({
      title: 'Socorro acionado com sucesso!',
      subTitle: 'Sua localização esta sendo compartilhada com os agentes de segurança!',
      buttons: ['OK']
    });
    alert.present();
  }

  showErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Socorro não acionado!',
      subTitle: 'Verfique se o GPS está ligado e se há conexão com a Internet',
      buttons: ['OK']
    });
    alert.present();
  }

  showTestAlert(sucessso: Boolean) {
    let titulo;
    let mensagem;

    if (sucessso) {
      titulo = 'Teste realizado com sucesso!';
      mensagem = 'GPS e comunicação com a central estabelecida!';
      this.status = "Pronto para enviar.";
    } else {
      titulo = 'Erro no teste';
      mensagem = 'Não foi possível obter a localização. Verifique se o GPS está ligado e se há conexão com a Internet.';
      this.status = "Erro de conexão ou GPS.";
    }

    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });

    alert.present();
  }

  getDate() {
    let currentdate = new Date(); 
    return currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + this.getMinutes() + ":" 
                    + currentdate.getSeconds()
  }

  getMinutes() {
    let currentdate = new Date();
    let minutes = currentdate.getMinutes();
    if (minutes.toString().length == 1) {
      let newMinutes = "0" + minutes.toString();
      return newMinutes
    } else {
      return minutes
    }
  }

  callVigilance() {
    this.callNumber.callNumber("31036321", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}
