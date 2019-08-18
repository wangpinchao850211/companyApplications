import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { coreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    coreModule, // 引入全局依赖
    SharedModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    BrowserAnimationsModule,// 引入动画,放入最后，避免出现异常
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
