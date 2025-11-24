import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Legs } from './legs';

describe('Legs', () => {
  let component: Legs;
  let fixture: ComponentFixture<Legs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Legs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Legs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
