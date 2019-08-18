import {animate, state, style, transition, trigger, group, AnimationTriggerMetadata} from '@angular/animations';

// 路由动画需要在host元数据中指定触发器，动画尽量不要使用过度
export const slideToRight = trigger('routeAnim', [
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  // 注释的是基础使用
  // transition('void => *', [
  //   style({transform: 'translateX(-100%)', opacity: 0}),
  //   animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
  // ]),
  // transition('* => void', [
  //   style({transform: 'translateX(0)', opacity: 1}),
  //   animate('.5s ease-in-out', style({transform: 'translateX(100%)'})),
  // ]),
  // 'void => *' 别名 ':enter' ; '* => void' 别名 ':leave'
  transition(':enter', [
    style({transform: 'translateX(-100%)', opacity: 0}),
    group([
      animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
      animate('.3s ease-in', style({opacity: 1})),
    ])
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)', opacity: 1}),
    group([
      animate('.5s ease-in-out', style({transform: 'translateX(100%)'})),
      animate('.3s ease-in', style({opacity: 0})),
    ])
  ]),
]);

const slideToBottom = trigger('routeAnim', [
  state('void', style({position: 'fixed', width: '100%', height: '80%'}) ),
  state('*', style({position: 'fixed', width: '100%', height: '80%'}) ),
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
  ])
]);

const slideToTop = trigger('routeAnim', [
  state('void', style({position: 'fixed', width: '100%', height: '100%'}) ),
  state('*', style({position: 'fixed', width: '100%', height: '100%'}) ),
  transition(':enter', [
    style({transform: 'translateY(100%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
  ])
]);

export const defaultRouteAnim: AnimationTriggerMetadata = slideToRight;
