import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {

  dialogTitle: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewTaskListComponent>
  ) { }

  ngOnInit() {
    this.dialogTitle = this.data.title;
    console.log(JSON.stringify(this.data.title));
  }
  saveName() {
    this.dialogRef.close(this.dialogTitle);
  }


}
