import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { coreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    coreModule // 引入全局依赖
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
