import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, HostBinding } from '@angular/core';
import { ProjectService } from '../../services';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anim/router.anim';
import { listAnimation } from '../../anim/list.anim';
import { from, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Project } from 'src/app/domain';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state; // 动画路由直接写这个绑定的这个组件类上，不能写在标签的指令上
  projects: Project[]=[];
  constructor(
    private service: ProjectService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.get("2").subscribe(res => {
      console.log(res)
      this.projects = res;
      //！！！ 当我们调用 ChangeDetectorRef  的 markForCheck 方法之后，angular 会在变化检测周期中检测该组件，如果我们设置了组件的 changeDetection 为 OnPush 的时候，不使用 markForCheck 方法我们更新数据视图是不会更新的。
      this.cd.markForCheck(); // 脏值检测，上面projects不定义初始值数组时可避免报错（在angular 2中，回调函数的返回结果，不会自动更新视图层的显示，可以用 ChangeDetectorRef 来驱动angular更新视图。）
    });
  }
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const thumbnails$ = this.getThumbnailsObs()
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { thumbnails: thumbnails$, img: selectedImg}});
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log(val);
        this.service.add(val); // 增加项目
        this.cd.markForCheck();
        // this.projects = [ ...this.projects, {
        //   id: "2",
        //   name : "新添加项目",
        //   desc : "这是一个新的项目",
        //   coverImg: "assets/img/covers/8.jpg"
        // } ];
      }
    });
  }
  openUpdateDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { project: project}});
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
      this.cd.markForCheck(); // 关闭弹层，让其进行检测这个位置
    });
  }
  onAnimationEvent(ev) { // 执行动画的回调
    console.log(ev);
  }

  private getThumbnailsObs(): Observable<string[]> {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
