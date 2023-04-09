import { Component, NgZone, OnInit } from '@angular/core';
import { ServiceCallsService } from 'src/app/@core/services/service-calls.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { InputDialogComponent } from 'src/app/components/input-dialog/input-dialog.component';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { bottom, right } from '@popperjs/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  taskList: any;
  selection = new SelectionModel<any>(true, []);

  loading: boolean = true

  constructor(private service: ServiceCallsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    //#SUBSCRIBE TO DATA
    this.getData()
  }

  ngOnInit(): void {

  }

  getData() {
    this.service.getDetails().subscribe({
      next: (value) => {
        console.log("task data", value);

        this.taskList = value
        this.loading = false
      },
      error: (error) => {
        console.log("error");
        this.loading = false
      }
    })
  }

  //#ADD TASK
  createTask(event: Event) {
    event?.stopPropagation();
    const dialogRef = this.dialog.open(InputDialogComponent, {
      panelClass: 'action-dialog',
      width: '300px',
      data: {
        'text': "Add New Task"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        console.log("result", result);

        //# MAKE A API CALL TO ADD ITEM IN TASk LIST

        //#updated 'details' as i don't have any api
        this.taskList.push({
          id: this.taskList.length+1,
          task: result
        })

        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          panelClass: 'action-snackbar',
          horizontalPosition: right,
          verticalPosition: bottom,
          data:{
            text:'Task added Successfully'
          }

        });

      }
    });
  }

  //#DELETE CONFIRMATION
  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'action-dialog',
      data: {
        'text': "Are you sure want to delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //#MAKE A REQUEST TO DELETE ITEM BASED ON UNIQUE ID AND 
        this.taskList.splice(this.taskList.findIndex((item: any) => item.id === id), 1);
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          panelClass: 'action-snackbar',
          horizontalPosition: right,
          verticalPosition: bottom,
          data:{
            text:'Task Deleted Successfully'
          }
        });

      }
    });
  }

  //#EDIT CONFIRMATION
  editDialog(id: number, value:string) {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      panelClass: 'action-dialog',
      width: '300px',
      data: {
        'text': "Edit Task",
        value: value
      }
    });

        

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result", result);

        //# MAKE A API CALL TO EDIT ITEM IN TASK LIST

        //#updated 'details' as i don't have any api
      
        
let itemIndex= this.taskList.findIndex((item: any) => item.id === id);

this.taskList[itemIndex].task = result

        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          panelClass: 'action-snackbar',
          horizontalPosition: right,
          verticalPosition: bottom,
          data:{
            text:'Task Edited Successfully'
          }
        });

      }
    });
  }


}


