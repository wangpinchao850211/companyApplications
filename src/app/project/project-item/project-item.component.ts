import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output()  launchUpdateDialog = new EventEmitter();
  @Output() launchInviteDailog = new EventEmitter();
  @Output() launchDeleteDailog = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.item);

  }
  openUpdateDialog(ev: Event) {
    ev.preventDefault();
    this.launchUpdateDialog.emit();
  }
  openInviteDialog(ev: Event) {
    ev.preventDefault();
    this.launchInviteDailog.emit();
  }
  openDeleteDialog(ev: Event) {
    ev.preventDefault();
    this.launchDeleteDailog.emit();
  }

}
