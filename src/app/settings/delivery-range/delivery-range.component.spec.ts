import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRangeComponent } from './delivery-range.component';

describe('DeliveryRangeComponent', () => {
  let component: DeliveryRangeComponent;
  let fixture: ComponentFixture<DeliveryRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
