/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

/**
 * Name: script.js
 * This is the main file for the app. It contains a number of globals representing
 * the current state of the app and functions for initiating the app and handling
 * events in the app.
 */

import { TextArea, StatsArea } from './classes.js'
import { startApp, stopApp, isSpace, shouldIgnore, getTextsFromXml, setTexts } from './functions.js'

// Globals initiated in function initApp()
let TEXTS // Array of text objects used in app.
let TEXTAREA // TextArea object encapsulating the text to be entered and its information.
let STATSAREA // StatsArea object encapsulating the stats of the game.
let RUNNING = false // Boolean used to indicate if the game is running.

/**
 * Initiates the app by setting the initial text and setting up the settings.
 */
function initApp () {
  // Get texts
  TEXTS = getTextsFromXml()

  // Empty typing area and set default settings.
  document.getElementById('typing-area').value = ''
  document.getElementById('case-ignore').checked = false
  document.getElementById('swedish').checked = true

  // Initiate stats area and text area
  STATSAREA = new StatsArea()
  STATSAREA.resetStatsDiagram()
  TEXTAREA = new TextArea()
  TEXTAREA.setText(TEXTS[0])

  // Set listed texts to swedish.
  setLanguageEvent('swedish')

  // Set the app to stopped.
  stopApp()
}

/**
 * Function to be used with listener for change in text-selection. Changes the
 * active text.
 */
function setTextEvent () {
  let newText = TEXTS.find(text => text.title === this.value)
  STATSAREA.reset()
  TEXTAREA.setText(newText)
}

/**
 * Toggles the game on or off depending on current state.
 */
function toggleGameEvent () {
  let typingArea = document.getElementById('typing-area')

  if (RUNNING) {
    RUNNING = false
    stopApp()
    typingArea.blur()
  } else {
    TEXTAREA.reset()
    RUNNING = true
    startApp()
    typingArea.focus()
  }
}

/**
 * Handles the events when user types into typing area
 * @param {event object} event Keypress event.
 */
function typingEvent (event) {
  // Ignore Shift, Backspace and arrowkeys
  if (shouldIgnore(event.key)) {
    event.preventDefault()
    return
  }
  // Stop and reset if end is reached
  if (TEXTAREA.atEnd()) {
    RUNNING = false
    stopApp()
  }

  // Ty
  let ignoreCasing = document.getElementById('case-ignore').checked
  TEXTAREA.typeChar(event.key, ignoreCasing)

  if (isSpace(event.key)) {
    document.getElementById('typing-area').value = ''
  }
}

/**
 * Listener that enables starting and stopping the game using enter key.
 * @param {event object} event Keypress event.
 */
function enterKeyEvent (event) {
  if (event.key === 'Enter') {
    toggleGameEvent()
  }
}

/**
 * Listenerfunction for use with the radio buttons to change language.
 * @param {String} language String with language.
 */
function setLanguageEvent (language) {
  let filteredTexts = TEXTS.filter((text) => { return text.language === language })
  setTexts(filteredTexts)
  TEXTAREA.setText(filteredTexts[0])
}

// Eventlisteners.
// Initialization of app.
window.addEventListener('load', initApp)

// Listener for pressing the enter key, starts and stops the game.
window.addEventListener('keyup', (event) => { enterKeyEvent(event) })

// Listener that checks if the text selection changes. Changes active text.
document.getElementById('text-selection').addEventListener('change', setTextEvent)

// Listener that records what the user types in the typing area when the app is running.
document.getElementById('typing-area').addEventListener('keyup', (event) => { typingEvent(event) })

// Listener for the playbutton. Is used to start and stop the game.
document.getElementById('play-button').addEventListener('click', toggleGameEvent)

// Listener for change of language.
document.getElementById('swedish').addEventListener('click', () => { setLanguageEvent('swedish') })
document.getElementById('english').addEventListener('click', () => { setLanguageEvent('english') })
