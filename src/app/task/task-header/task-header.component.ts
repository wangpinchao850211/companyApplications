import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  @Input() header;
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() changeListName = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
    console.log(this.header);
  }
  addNewTask(ev: Event) {
    this.newTask.emit();
  }
  onChangeListName(ev: Event) {
    this.changeListName.emit();
  }
  onMoveAllTasks(ev: Event) {
    this.moveAllTasks.emit();
  }
  onDeleteList(e) {
    e.preventDefault();
    this.deleteList.emit();
  }
}
