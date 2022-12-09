import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierTacheComponent } from './planifier-tache.component';

describe('PlanifierTacheComponent', () => {
  let component: PlanifierTacheComponent;
  let fixture: ComponentFixture<PlanifierTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanifierTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifierTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
