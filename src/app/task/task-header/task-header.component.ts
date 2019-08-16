import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header;
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    console.log(this.header);
  }
  addNewTask(ev: Event) {
    this.newTask.emit();
  }
  onChangeListName(e) {
    console.log(e);
  }
  onMoveAllTasks(ev: Event) {
    this.moveAllTasks.emit();
  }
  onDeleteList(e) {
    console.log(e);
  }
}
