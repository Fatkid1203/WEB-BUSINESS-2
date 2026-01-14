import { TestBed } from '@angular/core/testing';
import { LunarYearComponent } from './lunar-year';

describe('LunarYearComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunarYearComponent], // standalone component
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LunarYearComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('convert() should produce lunarResult', () => {
    const fixture = TestBed.createComponent(LunarYearComponent);
    const component = fixture.componentInstance;

    component.selectedDay = 15;
    component.selectedMonth = 5;
    component.selectedYear = 1986;

    component.convert();
    expect(component.lunarResult).toBeTruthy();
    expect(component.lunarResult?.ngayAm).toContain('/');
  });
});
