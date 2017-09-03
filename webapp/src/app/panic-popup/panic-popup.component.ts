import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-panic-popup',
  templateUrl: './panic-popup.component.html',
  styleUrls: ['./panic-popup.component.css']
})
export class PanicPopupComponent implements OnInit{

  panic: any;
  panics: FirebaseListObservable<any>;

  constructor(public dialogRef: MdDialogRef<PanicPopupComponent>, @Inject(MD_DIALOG_DATA) public data: any,
              public router: Router, angularFireDB : AngularFireDatabase) {
      this.panics = angularFireDB.list('/panics'); 
  }

  closeDialog() {
    console.log("dialog", this.dialogRef);
    this.dialogRef.close();
  }

  finishPanic() {
    this.panic.status = 'Atendida';
    this.panics.update(this.panic.$key, this.panic);
  }

  ngOnInit() {
    this.panic = this.data.panic;
  }

}
