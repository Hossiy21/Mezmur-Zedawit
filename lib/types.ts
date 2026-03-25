export interface Verse {
  verse: number
  text: string
}

export interface Section {
  title: string
  verses: Verse[]
}

export interface Chapter {
  chapter: number
  sections: Section[]
}

export interface PsalmsData {
  book_number: number
  book_name_am: string
  book_short_name_am: string
  book_name_en: string
  book_short_name_en: string
  testament: string
  chapters: Chapter[]
}

export interface DaySchedule {
  day: string
  dayAmharic: string
  startChapter: number
  endChapter: number
}

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  { day: "Monday", dayAmharic: "ሰኞ", startChapter: 1, endChapter: 30 },
  { day: "Tuesday", dayAmharic: "ማክሰኞ", startChapter: 31, endChapter: 60 },
  { day: "Wednesday", dayAmharic: "ረቡዕ", startChapter: 61, endChapter: 80 },
  { day: "Thursday", dayAmharic: "ሐሙስ", startChapter: 81, endChapter: 110 },
  { day: "Friday", dayAmharic: "ዓርብ", startChapter: 111, endChapter: 130 },
  { day: "Saturday", dayAmharic: "ቅዳሜ", startChapter: 131, endChapter: 150 },
  { day: "Sunday", dayAmharic: "እሁድ", startChapter: 0, endChapter: 0 },
]

export function getTodaySchedule(): DaySchedule {
  const dayIndex = new Date().getDay()
  // JavaScript: 0 = Sunday, 1 = Monday, etc.
  const scheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1
  return WEEKLY_SCHEDULE[scheduleIndex]
}

export function getDayOfWeek(): number {
  return new Date().getDay()
}
