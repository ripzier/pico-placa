import canDrive from '../src/main'

const message = document.getElementById('message')
const plateControl = document.getElementById('plate')
const dateControl = document.getElementById('date')
const timeControl = document.getElementById('time')
const submitButton = document.getElementById('submit')

plateControl.onblur = () => isValidPlate(plateControl.value)
dateControl.onblur = () => isValidDate(dateControl.value)
timeControl.onblur = () => isValidTime(timeControl.value)
submitButton.onclick = onClick

function isValidPlate(plate) {
  const error = document.getElementById('plateError')
  const plateRegex = /^[A-Z]{3}\d{4}$/

  if (plateRegex.test(plate.toUpperCase())) {
    error.hidden = true
    return true
  }
  message.hidden = true
  error.hidden = false
  return false
}

function isValidDate(date) {
  const error = document.getElementById('dateError')
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (dateRegex.test(date)) {
    error.hidden = true
    return true
  }
  message.hidden = true
  error.hidden = false
  return false
}

function isValidTime(time) {
  const error = document.getElementById('timeError')
  const timeRegex = /^\d{2}:\d{2}$/

  if (timeRegex.test(time)) {
    error.hidden = true
    return true
  }
  message.hidden = true
  error.hidden = false
  return false
}

function onClick() {
  if (
    isValidPlate(plateControl.value) &&
    isValidDate(dateControl.value) &&
    isValidTime(timeControl.value)
  ) {
    if (canDrive(plateControl.value, dateControl.value, timeControl.value)) {
      message.innerHTML = '<strong>SI</strong> puede circular'
    } else {
      message.innerHTML = '<strong>NO</strong> puede circular'
    }
    message.hidden = false
  }
}
