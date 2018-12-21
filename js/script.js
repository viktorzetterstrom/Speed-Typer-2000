/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

import { Text, TextArea, StatsArea } from './classes.js'
import { initSettings } from './functions.js'

// Globals initiated in function initApp()
let TEXTS // Array of text objects used in app.
let TEXTAREA // TextArea object encapsulating the text to be entered and its information
let STATSAREA // StatsArea object encapsulating the stats of the game.
let RUNNING = false // Boolean used to indicate if the game is running.

/**
 * Initiates the app by setting the initial text and setting up the settings.
 */
function initApp () {
  let text1 = new Text('Tomtegubbar', 'Viktor', 'Hej tomtegubbar slår i glasen och låt oss lustiga vara!')
  let text2 = new Text('Visdomsord', 'Cissi', 'Viktor är bäääst! ')
  let text3 = new Text('Vad är detta?', 'Perra', 'mrrrghghhglll')
  TEXTS = [text1, text2, text3]
  STATSAREA = new StatsArea()
  TEXTAREA = new TextArea()
  TEXTAREA.setText(TEXTS[0])
  initSettings(TEXTS)
}

/**
 * Function to be used with listener for change in text-selection. Changes the
 * active text.
 */
function setActiveText () {
  let newText = TEXTS.find(text => text.title === this.value)
  STATSAREA.reset()
  TEXTAREA.setText(newText)
}

/**
 * Toggles the game on or off depending on current state.
 */
function toggleGame () {
  let playButton = document.getElementById('play-button')
  let typingArea = document.getElementById('typing-area')

  var error = !TEXTAREA.typeChar('e')

  if (error) {
    STATSAREA.addError()
  }

  if (RUNNING) {
    RUNNING = false
    playButton.style.backgroundImage = 'url("/img/play-button.png")'
  } else {
    RUNNING = true
    playButton.style.backgroundImage = 'url("/img/stop-button.png")'
    typingArea.focus()
  }
}

// Eventlisteners.
window.addEventListener('load', initApp)
document.getElementById('text-selection').addEventListener('change', setActiveText)
document.getElementById('play-button').addEventListener('click', toggleGame)
