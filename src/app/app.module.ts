import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// 引入store
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx/reducer/counter.reducer';
import { switchReducer } from './ngrx/reducer/modeSwitch.reducer';

import { reducers, initState } from './reducers'

import { NgModule } from '@angular/core';
import { coreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { NgrxModule } from './ngrx/ngrx.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {initialState: initState}), // 注册全局store
    AppRoutingModule,
    coreModule, // 引入全局依赖
    SharedModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    NgrxModule,
    BrowserAnimationsModule,// 引入动画,放入最后，避免出现异常
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
