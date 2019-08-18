import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import {cardAnim} from '../../anim/card.anim';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim],
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output()  launchUpdateDialog = new EventEmitter();
  @Output() launchInviteDailog = new EventEmitter();
  @Output() launchDeleteDailog = new EventEmitter();
  @HostBinding('@card') cardState = 'out'; // 相当于这个组件的指令[@card]="cardState" 写在组件上的
  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.cardState = 'out';
  }
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
