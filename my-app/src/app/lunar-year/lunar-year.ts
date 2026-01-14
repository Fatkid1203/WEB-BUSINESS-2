import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lunar-year',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lunar-year.html',
  styleUrls: ['./lunar-year.css']
})
export class LunarYearComponent implements OnInit {

  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay = 1;
  selectedMonth = 1;
  selectedYear = 1993;

  lunarResult: any = null;

  ngOnInit(): void {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    this.years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  }

  convert(): void {
    const tz = 7;

    const solarJD = jdFromDate(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );

    const lunar = convertSolar2Lunar(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear,
      tz
    );

    const THU = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    const CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    const CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

    const thu = THU[(solarJD + 1) % 7];

    const [ld, lm, ly] = lunar;

    const nam = `${CAN[(ly + 6) % 10]} ${CHI[(ly + 8) % 12]}`;
    const ngay = `${CAN[(solarJD + 9) % 10]} ${CHI[(solarJD + 1) % 12]}`;

    const thangCanIndex = (ly * 12 + lm + 3) % 10;
    const thang = `${CAN[thangCanIndex]} ${CHI[(lm + 1) % 12]}`;

    this.lunarResult = {
      thu,
      ngayAm: `${ld}/${lm}/${ly}`,
      nam,
      thang,
      ngay
    };
  }
}

/* =========================
   HO NGOC DUC – FULL VERSION
   ========================= */

function INT(d: number) { return Math.floor(d); }

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  return dd + INT((153 * m + 2) / 5)
    + 365 * y + INT(y / 4)
    - INT(y / 100) + INT(y / 400)
    - 32045;
}

function getNewMoonDay(k: number, timeZone: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  let jd1 = 2415020.75933 + 29.53058868 * k
    + 0.0001178 * T2 - 0.000000155 * T3;

  jd1 += 0.00033 *
    Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M = 359.2242 + 29.10535608 * k
    - 0.0000333 * T2 - 0.00000347 * T3;

  const Mpr = 306.0253 + 385.81691806 * k
    + 0.0107306 * T2 + 0.00001236 * T3;

  const F = 21.2964 + 390.67050646 * k
    - 0.0016528 * T2 - 0.00000239 * T3;

  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr)
    + 0.0021 * Math.sin(2 * dr * M)
    - 0.4068 * Math.sin(Mpr * dr)
    + 0.0161 * Math.sin(2 * dr * Mpr)
    - 0.0004 * Math.sin(3 * dr * Mpr)
    + 0.0104 * Math.sin(2 * dr * F)
    - 0.0051 * Math.sin(dr * (M + Mpr))
    - 0.0074 * Math.sin(dr * (M - Mpr))
    + 0.0004 * Math.sin(dr * (2 * F + M))
    - 0.0004 * Math.sin(dr * (2 * F - M))
    - 0.0006 * Math.sin(dr * (2 * F + Mpr))
    + 0.0010 * Math.sin(dr * (2 * F - Mpr))
    + 0.0005 * Math.sin(dr * (2 * Mpr + M));

  let deltaT = (T < -11)
    ? 0.001 + 0.000839 * T + 0.0002261 * T2
      - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;

  return INT(jd1 + C1 - deltaT + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn: number, timeZone: number): number {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;

  const M = 357.52910 + 35999.05030 * T
    - 0.0001559 * T2 - 0.00000048 * T * T2;

  const L0 = 280.46645 + 36000.76983 * T
    + 0.0003032 * T2;

  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2)
    * Math.sin(dr * M);

  let L = L0 + DL;
  L = L * dr;
  return INT(L / Math.PI * 6);
}

function getLunarMonth11(yy: number, timeZone: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  if (getSunLongitude(nm, timeZone) >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number): [number, number, number] {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear = yy;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
    }
  }

  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear--;

  return [lunarDay, lunarMonth, lunarYear];
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}
