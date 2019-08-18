import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11',
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: '任务二：完成老师留的作业',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12',
          },
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务三：项目代码审核',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13',
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务四：制定项目计划',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12',
          },
          dueDate: new Date(),
        }
      ]
    }
  ]
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  handleAddTask() {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '新建任务'}});
  }
  handleMoveList() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: { lists: this.lists }});
  }
  handleUpdateTask(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task }});
  }
  handleNewTaskList() {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '添加任务'}});
  }
  handleDelList(list) {
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该任务列表？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});

    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed().subscribe(val => {
      console.log(val);
    });
  }
  handleRenameList(list) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改名称' }});
    dialogRef.afterClosed().subscribe(name => {
      console.log(name);
    });
  }
}
