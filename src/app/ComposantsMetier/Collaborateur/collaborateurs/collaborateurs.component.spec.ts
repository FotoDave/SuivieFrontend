import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateursComponent } from './collaborateurs.component';

describe('CollaborateursComponent', () => {
  let component: CollaborateursComponent;
  let fixture: ComponentFixture<CollaborateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
