import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChargeAddComponent } from './service-charge-add.component';

describe('ServiceChargeAddComponent', () => {
  let component: ServiceChargeAddComponent;
  let fixture: ComponentFixture<ServiceChargeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceChargeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceChargeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
