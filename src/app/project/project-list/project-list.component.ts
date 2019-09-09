import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, HostBinding } from '@angular/core';
import { ProjectService } from '../../services';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anim/router.anim';
import { listAnimation } from '../../anim/list.anim';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
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
    this.service.get("3").subscribe(res => {
      console.log(res)
      this.projects = res;
      //！！！ 当我们调用 ChangeDetectorRef  的 markForCheck 方法之后，angular 会在变化检测周期中检测该组件，如果我们设置了组件的 changeDetection 为 OnPush 的时候，不使用 markForCheck 方法我们更新数据视图是不会更新的。
      this.cd.markForCheck(); // 脏值检测，上面projects不定义初始值数组时可避免报错（在angular 2中，回调函数的返回结果，不会自动更新视图层的显示，可以用 ChangeDetectorRef 来驱动angular更新视图。）
    });
  }
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { thumbnails: thumbnails$, img: selectedImg}});
    dialogRef.afterClosed().pipe(
      take(1), // 不能使用一个Subscription来进行取消订阅时，可以使用take(1),只进行一次获取流，然后就complete，就ok了
      filter(n => !!n),
      map(val => {
        console.log(val);
        return {
          ...val,
          coverImg: this.buildImgSrc(val.coverImg)
        }
      }),
      // 增加项目(这也是一个Observable，只有订阅才能触发，但是一般不会再subscribe里再写subscribe，需要合并两个流)
      switchMap(val => this.service.add(val))
    ).subscribe(val => {
      if (val) {
        console.log(val);
        this.projects = [...this.projects, val];
        this.cd.markForCheck();
      }
    });
  }
  openUpdateDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { thumbnails: this.getThumbnailsObs(), project: project}});
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => !!n),
      map(val => {
        return {
          ...val,
          id: project.id,
          coverImg: this.buildImgSrc(val.coverImg)
        }
      }),
      switchMap(val => this.service.update(val))
    ).subscribe(val => {
      if (val) {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects[index] = val;
        this.cd.markForCheck();
      }
    });
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
    dialogRef.afterClosed().pipe(
      take(1),
      switchMap(_ => this.service.del(project))
    ).subscribe(val => {
      // console.log(val);
      console.log(project.id);
      this.projects = [...this.projects.filter(p => project.id !== p.id)];
      this.cd.markForCheck(); // 关闭弹层，让其进行检测这个位置
    });
  }
  onAnimationEvent(ev) { // 执行动画的回调
    console.log(ev);
  }

  getThumbnailsObs(): Observable<string[]> {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }

}
