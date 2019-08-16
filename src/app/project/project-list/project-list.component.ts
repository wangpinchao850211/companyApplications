import { Component, OnInit } from '@angular/core';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { InviteComponent } from '../invite/invite.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      name : "企业协作平台",
      desc : "这是一个企业内部项目",
      coverImg: "assets/img/covers/0.jpg"
    },
    {
      name : "企业协作平台",
      desc : "这是一个企业内部项目",
      coverImg: "assets/img/covers/1.jpg"
    }
  ]
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: 'wpc'});
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log(val);
      }
    });
  }
  openInviteDialog(project) { // 打开邀请对话框
    const dialogRef = this.dialog.open(InviteComponent);
  }
}