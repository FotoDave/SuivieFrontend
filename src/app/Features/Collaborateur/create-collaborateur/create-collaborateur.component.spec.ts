import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollaborateurComponent } from './create-collaborateur.component';

describe('CreateCollaborateurComponent', () => {
  let component: CreateCollaborateurComponent;
  let fixture: ComponentFixture<CreateCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCollaborateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
