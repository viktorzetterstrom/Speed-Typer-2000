/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

import { Text, TextArea, StatsArea } from './classes.js'
import { initSettings, startApp, stopApp, isSpace, shouldIgnore } from './functions.js'

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
  let text1 = new Text('Moln', 'Karin Boye', 'Se de mäktiga moln, vilkas fjärran höga toppar stolta, skimrande resa sig, vita som vit snö! Lugna glida de fram för att slutligen lugnt dö sakta lösande sig i en skur av svala droppar. Majestätiska moln - genom livet, genom döden gå de leende fram i en strålande sols sken utan skymmande oro i eter så klart ren, gå med storstilat, stilla förakt för sina öden.')
  let text2 = new Text('Jag har en dröm', 'Martin Luther King Jr.', 'Så säger jag er, mina vänner, att jag trots dagens och morgondagens svårigheter har en dröm. Det är en dröm med djupa rötter i den amerikanska drömmen om att denna nation en dag kommer att resa sig och leva ut den övertygelsens innersta mening, som vi håller för självklar: Att alla människor är skapade med samma värde.')
  let text3 = new Text('Doktor Glas', 'Hjalmar Söderberg', 'Jag stod vid pastor Gregorius bädd; han låg sjuk. Övre delen av hans kropp var blottad, och jag lyssnade på hans hjärta. Sängen stod i hans arbetsrum; en kammarorgel stod i ett hörn, och någon spelade på den. Ingen koral, knappt en melodi. Bara formlösa fugaartade tongångar fram och tillbaka. En dörr stod öppen; det oroade mig, men jag kunde inte komma mig för att få den stängd.')
  TEXTS = [text1, text2, text3]

  // Empty typing area
  document.getElementById('typing-area').value = ''

  // Initiate stats area and text area
  STATSAREA = new StatsArea()
  STATSAREA.resetStatsDiagram()
  TEXTAREA = new TextArea()
  TEXTAREA.setText(TEXTS[0])

  // Initiate settings with text list.
  initSettings(TEXTS)

  // Set the app to stopped.
  stopApp()
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
function typingEventHandler (event) {
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
function enterKeyEventHandler (event) {
  if (event.key === 'Enter') {
    toggleGame()
  }
}

// Eventlisteners.
// Initialization of app.
window.addEventListener('load', initApp)

// Listener for pressing the enter key, starts and stops the game.
window.addEventListener('keyup', (event) => { enterKeyEventHandler(event) })

// Listener that checks if the text selection changes. Changes active text.
document.getElementById('text-selection').addEventListener('change', setActiveText)

// Listener that records what the user types in the typing area when the app is running.
document.getElementById('typing-area').addEventListener('keyup', (event) => { typingEventHandler(event) })

// Listener for the playbutton. Is used to start and stop the game.
document.getElementById('play-button').addEventListener('click', toggleGame)
