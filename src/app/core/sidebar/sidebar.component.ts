import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {getDate} from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClicked = new EventEmitter<void>();
  today = 'day';
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  handleClicked(ev: Event, url) {
    ev.preventDefault();
    this.navClicked.emit();
    this.router.navigate([url]);
  }

}
