import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // 变更检测，默认要全部都检测一遍，这种设置是只检查自己组件，组件外部依赖不进行检测，大型项目中会提高很大性能
})
export class NewProjectComponent implements OnInit {

  form: FormGroup;
  dialogTitle: string;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>
  ) {
    console.log(this.data); // 传过来的数据
  }

  ngOnInit() {
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.compose([Validators.required, Validators.maxLength(20)])],
        desc: [this.data.project.desc, Validators.maxLength(40)],
        coverImg: [this.data.project.coverImg, Validators.required]
      });
      this.dialogTitle = '修改项目：';
    } else {
      this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
        desc: ['', Validators.maxLength(40)],
        coverImg: [this.data.img, Validators.required]
      });
      this.dialogTitle = '创建项目：';
    }
  }

  onSubmit({value, valid}, ev: Event) { // 提交后关闭，把值传回去
    event.preventDefault();
    // if (!valid) return;
    this.dialogRef.close(value);
  }
  close() { // 可以传递回去
    this.dialogRef.close({name: this.data});
  }

}
