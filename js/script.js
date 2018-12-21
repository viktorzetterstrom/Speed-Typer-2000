/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

import { Text } from './classes.js'

// Globals initiated in function initApp()
let TEXTS // Array of text objects used in app.
let RUNNING = false // Boolean used to indicate if the game is running.

/**
 * Updates the text area with given text. Sets word- and charcounts, and changes
 * title and words.
 * @param {Text} text
 */
function updateTextArea (text) {
  // Get text area elements
  let words = document.getElementById('words')
  let textTitle = document.getElementById('text-title')
  let wordCount = document.getElementById('word-count')
  let charCount = document.getElementById('char-count')

  // Set text area values
  textTitle.innerHTML = text.title
  wordCount.innerHTML = text.numberOfWords
  charCount.innerHTML = text.numberOfChars
  words.innerHTML = ''
  text.getCharArray().forEach(char => {
    words.innerHTML += `<span>${char}</span>`
  })
}

/**
 * Initiates the app by setting the initial text and setting up the settings.
 */
function initApp () {
  let text1 = new Text('Tomtegubbar', 'Viktor', 'Hej tomtegubbar slår i glasen och låt oss lustiga vara!')
  let text2 = new Text('Visdomsord', 'Cissi', 'Viktor är bäääst! ')
  let text3 = new Text('Vad är detta?', 'Perra', 'mrrrghghhglll')
  TEXTS = [text1, text2, text3]

  // Populate text selection with books
  let textSelection = document.getElementById('text-selection')
  TEXTS.forEach(text => {
    textSelection.innerHTML += `<option value="${text.title}">${text.title}</option>`
  })

  // Set standard settings of app, swedish on and ignore casing off.
  document.getElementById('case-ignore').checked = false
  document.getElementById('swedish').checked = true

  updateTextArea(TEXTS[0])
}

/**
 * Function to be used with listener for change in text-selection. Changes the
 * active text.
 */
function setActiveText () {
  let newText = TEXTS.find(text => text.title === this.value)
  updateTextArea(newText)
}

/**
 * Toggles the game on or off depending on current state.
 */
function toggleGame () {
  let playButton = document.getElementById('play-button')
  let typingArea = document.getElementById('typing-area')

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
