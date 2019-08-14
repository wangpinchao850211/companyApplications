import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay'; // 官网使用这种引入

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
