import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header;
  constructor() { }

  ngOnInit() {
    console.log(this.header);
  }
  addNewTask(e) {
    console.log(e);
  }
  onChangeListName(e) {
    console.log(e);
  }
  onMoveAllTasks(e) {
    console.log(e);
  }
  onDeleteList(e) {
    console.log(e);
  }
}
