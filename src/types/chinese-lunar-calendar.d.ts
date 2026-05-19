declare module 'chinese-lunar-calendar' {
  /** Lunar date result from getLunar(yyyy, m, d). */
  export interface LunarDate {
    /** 農曆年 numeric, e.g. 2026 */
    lunarYear: number
    /** 農曆月 numeric, 1-12 (negative if leap month) */
    lunarMonth: number
    /** 農曆日 numeric, 1-30 */
    lunarDay: number
    /** Formatted string e.g. "四月初三" */
    dateStr: string
    /** Zodiac animal, e.g. "馬" */
    zodiac: string
    /** Year stem-branch (天干地支) e.g. "丙午" */
    solarTerm: string
    /** Chinese era year string e.g. "二〇二六年" */
    lunarYearCn: string
    /** Chinese era month string e.g. "四月" */
    lunarMonthCn: string
  }

  export function getLunar(
    year: number,
    month: number,
    day: number,
  ): LunarDate | null
}
