import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase  } from 'angularfire2/database';

export const firebaseConfig = {
    apiKey: "AIzaSyBa9SaixW_S7iccKiIq_QNeWkPuF1MI-yY",
    authDomain: "botao-do-panico-unesp-bauru.firebaseapp.com",
    databaseURL: "https://botao-do-panico-unesp-bauru.firebaseio.com",
    projectId: "botao-do-panico-unesp-bauru",
    storageBucket: "botao-do-panico-unesp-bauru.appspot.com",
    messagingSenderId: "618488360157"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
