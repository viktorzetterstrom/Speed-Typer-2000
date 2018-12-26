/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

/**
 * Name: classes.js
 * This file contains the classes used by the app. The classes were created to
 * create some encapsulation of the app functions to promote readability of the
 * app code.
 */

/**
 * Class representing a Text. Has an author and a string of words, can return
 * the amount of words and the amount of chars in.
 */
export class Text {
  constructor (title, author, language, words) {
    this._title = title
    this._author = author
    this._language = language
    this._words = words
    this._numberOfWords = words.split(' ').length
    this._numberOfChars = words.length
  }

  // Returns an array of every char in the book.
  getCharArray () {
    return this._words.split('')
  }

  get title () {
    return this._title
  }
  get author () {
    return this._author
  }
  get language () {
    return this._language
  }
  get words () {
    return this._words
  }
  get numberOfWords () {
    return this._numberOfWords
  }
  get numberOfChars () {
    return this._numberOfChars
  }
}

/**
 * Class that encapsulates the word-area where the words to be typed in are
 * displayed.
 */
export class TextArea {
  constructor () {
    this._wordsArea = document.getElementById('words-area')
    this._textTitle = document.getElementById('text-title')
    this._textAuthor = document.getElementById('text-author')
    this._wordCount = document.getElementById('word-count')
    this._charCount = document.getElementById('char-count')
    this._activeCharIndex = 0
  }

  /**
   * Changes the text displayed in the text area.
   * @param {Text} text New text to display.
   */
  setText (text) {
    this._textTitle.innerHTML = text.title
    this._textAuthor.innerHTML = text.author
    this._wordCount.innerHTML = text.numberOfWords
    this._charCount.innerHTML = text.numberOfChars
    this._wordsArea.innerHTML = ''
    this._activeCharIndex = 0

    // Make a span for every char, make the first span active.
    let chars = text.getCharArray()
    for (var i = 0; i < chars.length; i++) {
      if (i === 0) {
        this._wordsArea.innerHTML += `<span id=active-char>${chars[i]}</span>`
      } else {
        this._wordsArea.innerHTML += `<span>${chars[i]}</span>`
      }
    }
  }

  /**
   * Takes a char and validates it with current active char. If it is wrong it
   * is flagged with a typing error. It then moves the active char forward
   * unless the end is reacehd. It returns false if there was an error, false
   * otherwise.
   * @param {String} char The character that was typed
   * @param {Boolean} ignoreCasing Boolean if casing should be ignored.
   */
  typeChar (char, ignoreCasing) {
    var noError = true
    let chars = this._wordsArea.getElementsByTagName('span')
    chars[this._activeCharIndex].id = ''
    chars[this._activeCharIndex].classList = 'typed'

    // If the typed char is incorrect, mark with error.
    let corrChar = chars[this._activeCharIndex].innerHTML
    if (ignoreCasing) {
      if (char !== corrChar.toLowerCase() && char !== corrChar.toUpperCase()) {
        chars[this._activeCharIndex].classList = 'typing-error'
        noError = false
      }
    } else {
      if (char !== corrChar) {
        chars[this._activeCharIndex].classList = 'typing-error'
        noError = false
      }
    }

    // Move the active char forward.
    if (this._activeCharIndex < chars.length - 1) {
      this._activeCharIndex++
      chars[this._activeCharIndex].id = 'active-char'
    }
    return noError
  }

  /**
   * Returns true if the active char has reached the end of the text.
   */
  atEnd () {
    let chars = this._wordsArea.getElementsByTagName('span')
    return this._activeCharIndex === chars.length - 1
  }

  /**
   * Resets the textarea, removes formatting from the text to enable a new game.
   */
  reset () {
    this._activeCharIndex = 0
    let chars = this._wordsArea.getElementsByTagName('span')
    for (var i = 0; i < chars.length; i++) {
      if (i === 0) {
        chars[i].id = 'active-char'
        chars[i].className = ''
      } else {
        chars[i].id = ''
        chars[i].className = ''
      }
    }
  }
}

/**
 * Class that encapsulates the stats area of the app. Providing functionality
 * that allows starting and stopping recordig of stats.
 */
export class StatsArea {
  constructor () {
    // Get stat area elements
    this._statsDiagram = document.getElementById('stats-diagram')
    this._grossWpm = document.getElementById('gross-wpm')
    this._netWpm = document.getElementById('net-wpm')
    this._accuracy = document.getElementById('accuracy')
    this._errors = document.getElementById('errors')

    this._goodWords = 0
    this._badWords = 0

    this._grossWpm.innerHTML = 0
    this._netWpm.innerHTML = 0
    this._accuracy.innerHTML = 0
    this._errors.innerHTML = 0
  }

  /**
   * Initiates the stats diagram by clearing it and drawing three horizontal
   * lines to make the progress of the user more visible.
   */
  resetStatsDiagram () {
    let canvas = this._statsDiagram
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let height = canvas.height
    for (let i = height / 4; i < canvas.height; i += height / 4) {
      ctx.moveTo(0, i)
      ctx.lineTo(300, i)
      ctx.stroke()
    }
  }

  /**
   * Resets the Stats area.
   */
  reset () {
    this._grossWpm.innerHTML = 0
    this._netWpm.innerHTML = 0
    this._accuracy.innerHTML = 0
    this._errors.innerHTML = 0
  }
}
