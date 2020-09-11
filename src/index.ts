export default function canDrive(
  plate: string,
  date: string,
  time: string
): boolean {
  if (isRestrictedTime(time)) {
    const day = getDay(date)
    // Saturday and Sunday
    if (day === 6 || day === 0) {
      return true
    }

    const plateDay = getPlateDay(plate)
    if (day === plateDay) {
      return false
    }

    return true
  }

  return true
}

export function isRestrictedTime(time: string): boolean {
  const hours = +time.slice(0, 2)
  const minutes = +time.slice(3, 5)

  // Minutes Since Midnight
  const msm = hours * 60 + minutes

  const MORNING_START = 420 // 07:00
  const MORNING_END = 570 // 09:30
  const EVENING_START = 960 // 16:00
  const EVENING_END = 1170 // 19:30

  if (
    msm < MORNING_START ||
    (msm > MORNING_END && msm < EVENING_START) ||
    msm > EVENING_END
  ) {
    return false
  }

  return true
}

function getDay(date: string): number {
  return new Date(`${date}T00:00:00`).getDay()
}

export function getPlateDay(plate: string): number {
  const endingNumbers = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 5,
    0: 5,
  }

  return endingNumbers[plate[6]]
}
