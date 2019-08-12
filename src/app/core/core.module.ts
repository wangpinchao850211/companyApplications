import { NgModule, SkipSelf, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {loadSvgResources} from '../utils/svg.util';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class coreModule {
  constructor (
    @Optional() @SkipSelf() parent: coreModule,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    // @SkipSelf()告知去父级去寻找是否有此类已经加载
    // @Optional()首次加载时，一定没有这个类，optional指定为可选参数
    if (parent) {
      throw new Error('模块已经存在，不能再次加载!');
    }
    loadSvgResources(iconRegistry, sanitizer);
  }
}
