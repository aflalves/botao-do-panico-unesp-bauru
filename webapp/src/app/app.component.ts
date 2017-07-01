import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Botão do Pânico - UNESP Bauru';

  panics: FirebaseListObservable<any>;

  constructor(angularFireDB : AngularFireDatabase) {
    this.panics = angularFireDB.list('/panics');
  }
}




