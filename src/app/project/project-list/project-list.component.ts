import { Component, OnInit, HostBinding } from '@angular/core';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anim/router.anim';
import { listAnimation } from '../../anim/list.anim';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state; // 动画路由直接写这个绑定的这个组件类上，不能写在标签的指令上
  projects = [
    {
      id: 0,
      name : "企业协作平台",
      desc : "这是一个企业内部项目",
      coverImg: "assets/img/covers/0.jpg"
    },
    {
      id: 1,
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
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { title: '新建项目'}});
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log(val);
        this.projects = [ ...this.projects, {
          id: 2,
          name : "新添加项目",
          desc : "这是一个新的项目",
          coverImg: "assets/img/covers/8.jpg"
        } ];
      }
    });
  }
  openUpdateDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { title: '编辑项目'}});
  }
  openInviteDialog(project) { // 打开邀请对话框
    const dialogRef = this.dialog.open(InviteComponent);
  }
  openDeleteDialog(project) {
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该项目？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});

    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed().subscribe(val => {
      // console.log(val);
      console.log(project.id);
      this.projects = [...this.projects.filter(p => project.id !== p.id)];
    });

  }
}
