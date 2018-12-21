/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

import { Settings, Text } from './classes.js'

// Globals initiated in function initApp()
var SETTINGS // App settings.
var TEXTS // Texts used in app.

/**
 * Initiates the settings area of the app.
 * @param {Settings} settings Settings to be used.
 */
function initiateSettingsArea (settings) {
  let caseIgnore = document.getElementById('case-ignore')
  let swedish = document.getElementById('swedish')
  let english = document.getElementById('english')

  // Either select or deselect caseIgnore
  caseIgnore.checked = settings.ignoreCasing
  if (settings.language === 'swedish') {
    swedish.checked = true
  } else if (settings.language === 'english') {
    english.checked = true
  }
}

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
  SETTINGS = new Settings(false, 'swedish')
  let text1 = new Text('Tomtegubbar', 'Viktor', 'Hej tomtegubbar slår i glasen och låt oss lustiga vara!')
  let text2 = new Text('Visdomsord', 'Cissi', 'Viktor är bäääst! ')
  let text3 = new Text('Vad är detta?', 'Perra', 'mrrrghghhglll')
  TEXTS = [text1, text2, text3]

  // Populate text selection with books
  let textSelection = document.getElementById('text-selection')
  TEXTS.forEach(text => {
    textSelection.innerHTML += `<option value="${text.title}">${text.title}</option>`
  })

  updateTextArea(TEXTS[0])
  initiateSettingsArea(SETTINGS)
}

/**
 * Function to be used with listener for change in text-selection. Changes the
 * active text.
 */
function setActiveText () {
  let newText = TEXTS.find(text => text.title === this.value)
  updateTextArea(newText)
}

document.getElementById('text-selection').addEventListener('change', setActiveText)
window.addEventListener('load', initApp)
