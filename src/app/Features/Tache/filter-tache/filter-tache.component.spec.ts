import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTacheComponent } from './filter-tache.component';

describe('FilterTacheComponent', () => {
  let component: FilterTacheComponent;
  let fixture: ComponentFixture<FilterTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
