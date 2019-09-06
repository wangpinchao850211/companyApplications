import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project, TaskList} from '../domain';
import { concat, map, mapTo, reduce, merge } from 'rxjs/operators';

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(@Inject('BASE_CONFIG') private config,
              private http: HttpClient) {
  }

  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers}).pipe(
        map(res => res as TaskList)
      );
  }

  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
        map(res => res as TaskList)
      );
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri).pipe(
      mapTo(taskList)
    );
  }

  // GET /tasklist
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}}).pipe(
        map(res => res as TaskList[])
      );
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers}).pipe(
        map(res => res as TaskList[])
      );
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({order: src.order}), {headers: this.headers}).pipe(
        map(res => res as TaskList[])
      );
    return drag$.pipe(
      concat(drop$),
      reduce((r, x) => {
        return [...r, x];
      }, [])
    );
  }
  // initializeTaskLists(prj: Project): Observable<any[]> {
  //   const id = prj.id;
  //   return this.add({name: '待办', projectId: id, order: 1})
  //   .pipe(
  //     merge(
  //     this.add({name: '进行中', projectId: id, order: 2}),
  //     this.add({name: '已完成', projectId: id, order: 3})),
  //     reduce((r, x) => {
  //       return [...r, x];
  //     }, []),
  //     map(tls => ({...prj, taskLists: tls.map(tl => tl.id)}))
  //   )
  // }
}
