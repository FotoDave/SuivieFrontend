import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequettesComponent } from './requettes.component';

describe('RequettesComponent', () => {
  let component: RequettesComponent;
  let fixture: ComponentFixture<RequettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
