import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  
  panics: FirebaseListObservable<any>;

  constructor(angularFireDB : AngularFireDatabase) {

    this.panics = angularFireDB.list('/panics');
    
   }

  ngOnInit() {
  }

}
