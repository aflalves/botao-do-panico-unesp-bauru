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

import { AuthService } from './providers/auth.service';
import { LogoutComponent } from './logout/logout.component';


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
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClNFPrkwLx2Ix2L3pQ50yDn2tH7ZXjlUw'
    })
  ],
  providers: [
    AngularFireDatabase, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
