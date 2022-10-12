import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveClientComponent } from './save-client.component';

describe('SaveClientComponent', () => {
  let component: SaveClientComponent;
  let fixture: ComponentFixture<SaveClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
