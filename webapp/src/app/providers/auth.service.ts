import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public af: AngularFireAuth) {
    this.user = af.authState;
  }

  signup(email: string, password: string) {
    this.af
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    return this.af
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.af
      .auth
      .signOut();
  }

}