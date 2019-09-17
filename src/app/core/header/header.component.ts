import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// 引入store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchChange } from '../../ngrx/action/modeSwitch.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  switchMode$: Observable<boolean>;
  @Output() toggle = new EventEmitter();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  showLogout = false;
  showModeSwitch: boolean;
  constructor(
    private store: Store<{ switchMode: boolean }>,
    private router: Router,
    private location: PlatformLocation,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
    ) {
    // 下面这个图标设置，方便多组件复用的话，可以抽成一个ts，在core.module里加载一次，使用组件直接调用方法，传入icon的名字，和svg路径就ok了
    iconRegistry.addSvgIcon( // 注册自己下载的svg图标
      'newmenu',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'));
    // store获取
    this.switchMode$ = store.pipe(select('switchMode'))
  }

  ngOnInit() {
    // 订阅store
    this.switchMode$.subscribe((data) => {
      console.log(data);
      this.showModeSwitch = data;
    })
    // console.log(this.location.pathname);
    if (this.location.pathname !== '/login') {
      this.showLogout = true;
    }
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        console.log(data.url);
        if (data.url !== '/login' && data.url !== '/register') {
          this.showLogout = true;
        } else {
          this.showLogout = false;
        }
      }
    })
  }

  openSidebar() {
    this.toggle.emit();
  }
  onChange(checked) {
    this.toggleDarkTheme.emit(checked);
    // 使用store更新到新的模式
    this.store.dispatch(switchChange());
  }

  Logout() {
    this.router.navigate(['login']);
  }
}
