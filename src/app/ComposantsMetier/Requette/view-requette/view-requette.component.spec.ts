import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequetteComponent } from './view-requette.component';

describe('ViewRequetteComponent', () => {
  let component: ViewRequetteComponent;
  let fixture: ComponentFixture<ViewRequetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRequetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
