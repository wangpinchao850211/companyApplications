import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // 下面这个图标设置，方便多组件复用的话，可以抽成一个ts，在core.module里加载一次，使用组件直接调用方法，传入icon的名字，和svg路径就ok了
    iconRegistry.addSvgIcon( // 注册自己下载的svg图标
      'newmenu',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'));
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }
  onChange(checked) {
    this.toggleDarkTheme.emit(checked);
  }

}
