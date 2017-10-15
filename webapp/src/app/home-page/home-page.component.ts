import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import {MdDialog, MdDialogRef} from '@angular/material';
import {PanicPopupComponent} from '../panic-popup/panic-popup.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  panics: FirebaseListObservable<any>;
  dialogRef: MdDialogRef<PanicPopupComponent>;

  constructor(angularFireDB : AngularFireDatabase, public dialog: MdDialog) {

    this.panics = angularFireDB.list('/panics');
   }

   openDialog(panic) {
     this.dialogRef = this.dialog.open(PanicPopupComponent, {
       data: {
         panic: panic
       }
     });

     this.dialogRef.afterClosed().subscribe((result) => {
       console.log("subscribe", result);
     })
   }

  ngOnInit() {
    
  }

}
