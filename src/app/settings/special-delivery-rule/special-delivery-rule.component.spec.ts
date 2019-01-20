import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDeliveryRuleComponent } from './special-delivery-rule.component';

describe('SpecialDeliveryRuleComponent', () => {
  let component: SpecialDeliveryRuleComponent;
  let fixture: ComponentFixture<SpecialDeliveryRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDeliveryRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDeliveryRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
