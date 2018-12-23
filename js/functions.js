/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

/**
 * Initializes the settings to default values and populates the list of texts.
 * @param {Array} texts Array of text objects.
 */
export function initSettings (texts) {
  // Populate text selection with book titles.
  let textSelection = document.getElementById('text-selection')
  texts.forEach(text => {
    textSelection.innerHTML += `<option value="${text.title}">${text.title}</option>`
  })

  // Set standard settings of app, swedish on and ignore casing off.
  document.getElementById('case-ignore').checked = false
  document.getElementById('swedish').checked = true
}

/**
 * Starts the app by disabling the settings area and enabling the typing area.
 * Also changes the background for the play button to indicate it is running.
 */
export function startApp () {
  let playButton = document.getElementById('play-button')
  playButton.style.backgroundImage = 'url("/img/stop-button.png")'

  document.getElementById('text-selection').disabled = true
  document.getElementById('case-ignore').disabled = true
  document.getElementById('swedish').disabled = true
  document.getElementById('english').disabled = true

  document.getElementById('typing-area').value = ''
  document.getElementById('typing-area').disabled = false
}

/**
 * Stops the game by disabling the typing area and enabling the settings area.
 * The play button background is reversed to normal background.
 */
export function stopApp () {
  let playButton = document.getElementById('play-button')
  playButton.style.backgroundImage = 'url("/img/play-button.png")'

  document.getElementById('text-selection').disabled = false
  document.getElementById('case-ignore').disabled = false
  document.getElementById('swedish').disabled = false
  document.getElementById('english').disabled = false

  document.getElementById('typing-area').disabled = true
}

/**
 * Returns true if key is a normal whitespace character.
 * @param {String} key String with key from keypress event.
 */
export function isSpace (key) {
  return key === ' '
}

/**
 * Returns true if key is part of The Ignorables, a list of keys that the
 * typing area ignores.
 * @param {String} key String with key from keypress event.
 */
export function shouldIgnore (key) {
  let theIgnorables = ['Shift', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter']
  return theIgnorables.indexOf(key) > -1
}
