import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequetteComponent } from './update-requette.component';

describe('UpdateRequetteComponent', () => {
  let component: UpdateRequetteComponent;
  let fixture: ComponentFixture<UpdateRequetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
