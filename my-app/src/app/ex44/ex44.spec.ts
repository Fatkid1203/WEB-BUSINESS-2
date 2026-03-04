import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex44 } from './ex44';

describe('Ex44', () => {
  let component: Ex44;
  let fixture: ComponentFixture<Ex44>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex44]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex44);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
