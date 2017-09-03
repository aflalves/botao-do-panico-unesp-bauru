import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PanicPopupComponent } from './panic-popup/panic-popup.component';

import { AuthService } from './providers/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { MaterialModule } from '@angular/material'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const firebaseConfig = {
    apiKey: "AIzaSyBa9SaixW_S7iccKiIq_QNeWkPuF1MI-yY",
    authDomain: "botao-do-panico-unesp-bauru.firebaseapp.com",
    databaseURL: "https://botao-do-panico-unesp-bauru.firebaseio.com",
    projectId: "botao-do-panico-unesp-bauru",
    storageBucket: "botao-do-panico-unesp-bauru.appspot.com",
    messagingSenderId: "618488360157"
}

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    LogoutComponent,
    PanicPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClNFPrkwLx2Ix2L3pQ50yDn2tH7ZXjlUw'
    })
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    AngularFireDatabase, AuthService
  ],
  entryComponents: [PanicPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
