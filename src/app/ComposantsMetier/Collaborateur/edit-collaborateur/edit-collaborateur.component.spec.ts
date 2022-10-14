import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollaborateurComponent } from './edit-collaborateur.component';

describe('EditCollaborateurComponent', () => {
  let component: EditCollaborateurComponent;
  let fixture: ComponentFixture<EditCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCollaborateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
