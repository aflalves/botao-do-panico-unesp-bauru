import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-relatorio-page',
  templateUrl: './relatorio-page.component.html',
  styleUrls: ['./relatorio-page.component.css']
})
export class RelatorioPageComponent implements OnInit {

  panics: FirebaseListObservable<any>;
  constructor(private router:Router, angularFireDB : AngularFireDatabase) { 
    this.panics = angularFireDB.list('/panics');
  }

  ngOnInit() {
  }

}
