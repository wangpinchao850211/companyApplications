import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// 引入store
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx/reducer/counter.reducer';
import { switchReducer } from './ngrx/reducer/modeSwitch.reducer';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

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
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './effects/quote.effects'; // 直接导入了每个effect

import { AppEffects } from './app.effects'; // 这个没合并成effect

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      initialState: initState,
    }), // 注册全局store
    // 路由引入有问题
    // StoreModule.forRoot({
    //   router: routerReducer,
    // }),
    AppRoutingModule,
    coreModule, // 引入全局依赖
    SharedModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    NgrxModule,
    BrowserAnimationsModule,// 引入动画,放入最后，避免出现异常
    EffectsModule.forRoot([QuoteEffects]),
    // StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
