import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  dialogTitle: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>
  ) {
    console.log(this.data); // 传过来的数据
  }

  ngOnInit() {
    this.dialogTitle = '创建项目：';
  }

  onSubmit(f, e) { // 提交后关闭，把值传回去
    this.dialogRef.close({name: this.data});
  }
  close() { // 可以传递回去
    this.dialogRef.close({name: this.data});
  }

}
