import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceManagementAddComponent } from './price-management-add.component';

describe('PriceManagementAddComponent', () => {
  let component: PriceManagementAddComponent;
  let fixture: ComponentFixture<PriceManagementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceManagementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
