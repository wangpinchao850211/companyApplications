import { trigger, stagger, transition, style, animate, query } from '@angular/animations';
// 在project-list 标签上使用指令了
// optional: true 是避免没有选择到元素会报错的问题
// 使用stagger，当添加多个元素时会按顺序执行动画
export const listAnimation = trigger('listAnim', [
  transition('* => *', [
    query(':enter', style({opacity: 0}), { optional: true }),
    query(':enter', stagger(100, [
      animate('1s', style({opacity: 1}))
    ]), { optional: true }),
    query(':leave', style({opacity: 1}), { optional: true }), // 离开有问题
    query(':leave', stagger(100, [
      animate('1s', style({opacity: 0}))
    ]), { optional: true })
  ])
]);
