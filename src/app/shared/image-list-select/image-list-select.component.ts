import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // 注册到这个令牌上
      useExisting: forwardRef(() => ImageListSelectComponent), // 元数据上自己还没有创建，使用forwardRef来注册，向前延用，注册到依赖实例
      multi: true // NG_VALUE_ACCESSOR令牌是对应多个控件
    },
    {
      provide: NG_VALIDATORS, // 注册到验证器这个令牌上(同上也是将自己注册到这个令牌上)
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListSelectComponent implements ControlValueAccessor {

    selected: string;
    @Input() title = '选择封面：';
    @Input() items: string[] = [];
    @Input() cols = 8;
    @Input() rowHeight = '32px';
    @Input() itemWidth = '40px';
    @Input() useSvgIcon = false; // 判断时svg还是img
    @Output('itemChange') itemChange = new EventEmitter<string>();

    // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
    // 由框架注册，然后我们使用它把变化发回表单
    // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
    private propagateChange = (_: any) => {};

    // 写入控件值
    public writeValue(obj: any) {
      if (obj && obj !== '') {
        this.selected = obj;
      }
    }

    // 当表单控件值改变时，函数 fn 会被调用
    // 这也是我们把变化 emit 回表单的机制
    public registerOnChange(fn: any) {
      this.propagateChange = fn;
    }

    // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
    public validate(c: FormControl): {[key: string]: any} {
      return this.selected ? null : {
        imageListSelect: {
          valid: false,
        },
      };
    }

    // 这里没有使用，用于注册 touched 状态（用户点选过）
    public registerOnTouched() {
    }

    // 列表元素选择发生改变触发
    onChange(i) {
      this.selected = this.items[i];
      // 更新表单
      this.propagateChange(this.items[i]);
      this.itemChange.emit(this.items[i]);
    }

}
