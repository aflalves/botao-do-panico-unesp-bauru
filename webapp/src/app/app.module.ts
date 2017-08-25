import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase  } from 'angularfire2/database';

import { AgmCoreModule } from '@agm/core';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClNFPrkwLx2Ix2L3pQ50yDn2tH7ZXjlUw'
    })
  ],
  providers: [
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
