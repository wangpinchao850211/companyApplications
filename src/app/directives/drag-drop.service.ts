import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface DragData {
  tag: string; // 用于标识该拖拽对象，在具有多个可拖拽的层级中标识该层级，需要用户自己维护唯一性
  data: any; // 要传递的数据
}
@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }
  // BehaviorSubject特点总能记住上一次的值
  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }
}
