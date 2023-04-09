import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { }

addTask = this._formBuilder.group({
    task: [this.data?.value, [Validators.required,Validators.minLength(3)]],
  })

  get task() {
    return this.addTask.get('task');
  }

  ngOnInit(): void {
    
  }

  dialogAction(event:any,value:boolean): void {
    event?.stopPropagation()
    console.log("task",this.task?.value);
    
    if(value){
      this.addTask.markAllAsTouched();
      if (this.addTask.valid) {
        this.dialogRef.close(this.task?.value);
        }
    }else{
      this.dialogRef.close(value);
    }
  }
}
