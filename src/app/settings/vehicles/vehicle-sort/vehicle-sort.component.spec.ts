import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSortComponent } from './vehicle-sort.component';

describe('VehicleSortComponent', () => {
  let component: VehicleSortComponent;
  let fixture: ComponentFixture<VehicleSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
