import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {itemAnim} from '../../anim/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar:string;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in'; // 这回写到了模板上，并没用HostBinding
  @HostListener('mouseenter')
  handleMouseEnter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.widerPriority = 'in';
  }
  constructor() { }

  ngOnInit() {
    this.avatar = (this.item.owner) ? this.item.owner.avatar : 'unassigned';
  }
  itemClicked(e: Event) {
    this.taskClick.emit();
  }
  onCheckboxClick(e: Event) {
    e.stopPropagation(); // 阻止冒泡
  }

}
