import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // 变更检测，默认要全部都检测一遍，这种设置是只检查自己组件，组件外部依赖不进行检测，大型项目中会提高很大性能
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
    this.dialogTitle = this.data.title;
  }

  onSubmit(f, e) { // 提交后关闭，把值传回去
    this.dialogRef.close({name: this.data});
  }
  close() { // 可以传递回去
    this.dialogRef.close({name: this.data});
  }

}
