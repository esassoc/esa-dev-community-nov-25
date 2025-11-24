import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Torso } from './torso';

describe('Torso', () => {
  let component: Torso;
  let fixture: ComponentFixture<Torso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Torso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Torso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
