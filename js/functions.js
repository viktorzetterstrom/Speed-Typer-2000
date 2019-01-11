/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

/**
 * Name: functions.js
 * Contains helper functions used by script.js.
 */

import { Text } from './classes.js'

/* global XMLHttpRequest */

/**
 * Gets texts from XML file "texts.xml" via synchronous XMLHttpRequest
 */
export function getTextsFromXml () {
  let returnArray = []

  // Create xml request.
  let connect = new XMLHttpRequest()

  // Define file and send request.
  connect.open('GET', 'texts.xml', false)
  connect.setRequestHeader('Content-Type', 'text/xml')
  connect.send(null)

  // Place response in document.
  let doc = connect.responseXML

  // Get root node.
  let rootNode = doc.childNodes[0]

  let titles = rootNode.getElementsByTagName('title')
  let authors = rootNode.getElementsByTagName('author')
  let languages = rootNode.getElementsByTagName('language')
  let texts = rootNode.getElementsByTagName('text')

  for (let i = 0; i < titles.length; i++) {
    let title = titles[i].innerHTML
    let author = authors[i].innerHTML
    let language = languages[i].innerHTML
    let text = texts[i].innerHTML

    returnArray.push(new Text(title, author, language, text))
  }

  return returnArray
}

/**
 * Starts the app by disabling the settings area and enabling the typing area.
 * Also changes the background for the play button to indicate it is running.
 */
export function startApp () {
  // Change playbutton.
  let playButton = document.getElementById('play-button')
  playButton.style.backgroundImage = 'url("../img/stop-button.png")'

  // Add box shadow.
  let textArea = document.getElementById('text-area')
  textArea.className = 'running'

  // Disable settings.
  document.getElementById('text-selection').disabled = true
  document.getElementById('case-ignore').disabled = true
  document.getElementById('swedish').disabled = true
  document.getElementById('english').disabled = true

  // Empty and enable typing area.
  document.getElementById('typing-area').value = ''
  document.getElementById('typing-area').disabled = false
}

/**
 * Stops the game by disabling the typing area and enabling the settings area.
 * The play button background is reversed to normal background.
 */
export function stopApp () {
  // Change playbutton.
  let playButton = document.getElementById('play-button')
  playButton.style.backgroundImage = 'url("../img/play-button.png")'

  // Remove box shadow.
  let textArea = document.getElementById('text-area')
  textArea.className = 'stopped'

  // Enable settings.
  document.getElementById('text-selection').disabled = false
  document.getElementById('case-ignore').disabled = false
  document.getElementById('swedish').disabled = false
  document.getElementById('english').disabled = false

  // Disable typing area.
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

/**
 * Changes the listing of available texts.
 * @param {Array of Text objects} texts App texts.
 */
export function setTexts (texts) {
  // Populate text selection with book titles.
  let textSelection = document.getElementById('text-selection')
  textSelection.innerHTML = ''
  texts.forEach(text => {
    textSelection.innerHTML += `<option value="${text.title}">${text.title}</option>`
  })
}
