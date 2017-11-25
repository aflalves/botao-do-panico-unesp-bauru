import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-panic-popup',
  templateUrl: './panic-popup.component.html',
  styleUrls: ['./panic-popup.component.css']
})
export class PanicPopupComponent implements OnInit{

  public panic: any;
  public panicKey: any;
  panics: FirebaseListObservable<any>;

  constructor(public dialogRef: MdDialogRef<PanicPopupComponent>, @Inject(MD_DIALOG_DATA) public data: any,
              public router: Router, public angularFireDB : AngularFireDatabase) {
      this.panics = angularFireDB.list('/panics'); 
  }

  closeDialog() {
    this.dialogRef.close();
  }

  finishPanic() {
    this.panic.status = 'Atendida';
    this.panics.update(this.panicKey, this.panic);
  }

  ngOnInit() {
    this.panic = this.data.panic;
    this.panicKey = this.data.panic.$key;

    let sub = Observable.interval(5000).subscribe(x => {
      this.panicByKey(this.panicKey).then(x => {
        this.panic = x.val();
        if (this.panic.status != "Nova") {
          sub.unsubscribe();
        }
      })
    });
  }

  panicByKey(key: any) {
    return this.angularFireDB.database.ref('panics/' + key).once('value')
  }

}
