import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
  }

  public userId: string;

  login() {
    this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => {
      this.userId = res.authResponse.userID;
      this.getUserInformation();
    })
    .catch(e => console.log("error loading facebook info", e));
  }

  getUserInformation() {
    this.fb.getLoginStatus().then((response) => {
      if (response.status == 'connected') {
        this.fb.api('/' + response.authResponse.userID + '?fields=id,name,first_name,last_name,email', []).then((response) => {
          //this._name = JSON.parse(JSON.stringify(response)).name;
          //this._firstName = JSON.parse(JSON.stringify(response)).id;
          //this._lastName = JSON.parse(JSON.stringify(response)).last_name;
        }, (error) => {
          alert(error);
        })
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
