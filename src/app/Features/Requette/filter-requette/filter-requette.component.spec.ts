import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRequetteComponent } from './filter-requette.component';

describe('FilterRequetteComponent', () => {
  let component: FilterRequetteComponent;
  let fixture: ComponentFixture<FilterRequetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRequetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRequetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
