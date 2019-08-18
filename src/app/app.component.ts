import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes, // 关键帧动画
  // ...
} from '@angular/animations';
import { OverlayContainer } from '@angular/cdk/overlay'; // 官网使用这种引入

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers go here
    trigger('square', [state('green', style({ 'background-color': 'yellow'}))])
  ]
})
export class AppComponent {
  dark = false;
  constructor(private oc: OverlayContainer) {
  }
  switchDarkTheme(dark: boolean) {
    this.dark = dark;
    // this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
    // 上面这种方法也去掉了，使用下面的
    if (this.dark) {
      this.oc.getContainerElement().classList.add('my-dark-theme');
    }
  }
}
