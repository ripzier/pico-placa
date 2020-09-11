import canDrive, {isRestrictedTime, getPlateDay} from './index'

describe('can drive ', () => {
  const mondayPlate = 'PBH1231'
  const fridayPlate = 'PBH1239'

  const mondayDate = '2020-09-07'
  const fridayDate = '2020-09-11'
  const saturdayDate = '2020-09-12'
  const sundayDate = '2020-09-13'

  const restrictedTime = '18:00'
  const unrestrictedTime = '20:00'

  test('should be able to drive if time is not restricted', () => {
    expect(canDrive(mondayPlate, mondayDate, unrestrictedTime)).toBe(true)
  })

  test('should be able to drive on weekends', () => {
    expect(canDrive(mondayPlate, saturdayDate, restrictedTime)).toBe(true)
    expect(canDrive(fridayPlate, sundayDate, restrictedTime)).toBe(true)
  })

  test('should be able to drive if time is restricted but plate does not match restricted day', () => {
    expect(canDrive(mondayPlate, fridayDate, restrictedTime)).toBe(true)
  })

  test('should not be able to drive if time is restricted and plate matches restricted day', () => {
    expect(canDrive(fridayPlate, fridayDate, restrictedTime)).toBe(false)
  })
})

describe('restricting times', () => {
  it('should not be restricted before 07:00', () => {
    expect(isRestrictedTime('06:59')).toBe(false)
  })

  it('should be restricted after 07:00 and before 09:30', () => {
    expect(isRestrictedTime('08:39')).toBe(true)
  })

  it('should not be restricted after 09:30', () => {
    expect(isRestrictedTime('09:31')).toBe(false)
  })

  it('should not be restricted before 16:00', () => {
    expect(isRestrictedTime('15:59')).toBe(false)
  })

  it('should be restricted after 16:00 and before 19:30', () => {
    expect(isRestrictedTime('18:11')).toBe(true)
  })

  it('should not be restricted after 19:30', () => {
    expect(isRestrictedTime('19:31')).toBe(false)
  })

  describe('edge cases', () => {
    it('should restrict 07:00', () => {
      expect(isRestrictedTime('07:00')).toBe(true)
    })

    it('should restrict 09:30', () => {
      expect(isRestrictedTime('09:30')).toBe(true)
    })

    it('should restrict 16:00', () => {
      expect(isRestrictedTime('16:00')).toBe(true)
    })

    it('should restrict 19:30', () => {
      expect(isRestrictedTime('19:30')).toBe(true)
    })
  })
})

describe('matching plate ending numbers to days', () => {
  it('should return 1st day for plates ending in 1 and 2', () => {
    expect(getPlateDay('PBH1231')).toBe(1)
    expect(getPlateDay('PBH1232')).toBe(1)
  })
  it('should return 2nd day for plates ending in 3 and 4', () => {
    expect(getPlateDay('PBH1233')).toBe(2)
    expect(getPlateDay('PBH1234')).toBe(2)
  })
  it('should return 3rd day for plates ending in 5 and 6', () => {
    expect(getPlateDay('PBH1235')).toBe(3)
    expect(getPlateDay('PBH1236')).toBe(3)
  })
  it('should return 4th day for plates ending in 7 and 8', () => {
    expect(getPlateDay('PBH1237')).toBe(4)
    expect(getPlateDay('PBH1238')).toBe(4)
  })
  it('should return 5th day for plates ending in 9 and 0', () => {
    expect(getPlateDay('PBH1239')).toBe(5)
    expect(getPlateDay('PBH1230')).toBe(5)
  })
})
