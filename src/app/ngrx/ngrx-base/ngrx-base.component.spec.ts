import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxBaseComponent } from './ngrx-base.component';

describe('NgrxBaseComponent', () => {
  let component: NgrxBaseComponent;
  let fixture: ComponentFixture<NgrxBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
