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

/* global Audio */

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
    this._errorAudio = new Audio('audio/error.m4a')
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
    for (let i = 0; i < chars.length; i++) {
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
    let noError = true
    let chars = this._wordsArea.getElementsByTagName('span')
    chars[this._activeCharIndex].id = ''
    chars[this._activeCharIndex].classList = 'typed'

    // If the typed char is incorrect, mark with error.
    let corrChar = chars[this._activeCharIndex].innerHTML
    if (ignoreCasing) {
      if (char !== corrChar.toLowerCase() && char !== corrChar.toUpperCase()) {
        chars[this._activeCharIndex].classList = 'typing-error'
        noError = false
        this._errorAudio.play()
      }
    } else {
      if (char !== corrChar) {
        chars[this._activeCharIndex].classList = 'typing-error'
        noError = false
        this._errorAudio.play()
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
    for (let i = 0; i < chars.length; i++) {
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
    // Get stat area elements and set them to 0.
    this._statsDiagram = document.getElementById('stats-diagram')
    this._grossWpm = document.getElementById('gross-wpm')
    this._netWpm = document.getElementById('net-wpm')
    this._accuracy = document.getElementById('accuracy')
    this._errors = document.getElementById('errors')

    // Initiate variables that keeps track of typed entries and word errors.
    this._typedEntries = 0
    this._errorEntries = 0

    // Variable for remembering what the previous point was when drawing on the
    // stats diagram canvas.
    this._previousX = null
    this._previousY = null
  }

  get currentWordErrorCount () {
    return this._currentWordErrorCount
  }

  /**
   * Starts stats timer.
   */
  start () {
    this._startTime = new Date().getTime()
    this._updater = setInterval(this.update.bind(this), 1000)
  }

  /**
   * Stops timer and returns the final time.
   */
  end () {
    clearInterval(this._updater)
    return (this._startTime - new Date().getTime()) / 1000
  }

  /**
   * Increases typedEntries by one to indicate correct typing of one letter.
   */
  addCorrect () {
    this._typedEntries++
  }

  /**
   * Increases typedEntries and errorEntries by one to indicate incorrect typing
   * of one letter.
   */
  addError () {
    this._typedEntries++
    this._errorEntries++
  }

  /**
   * Calculates and updates the current stats based on the time elapsed and the
   * entered letters.
   */
  update () {
    // Calculate stats.
    let elapsedMinutes = (new Date().getTime() - this._startTime) / 60000
    let grossWpm = (this._typedEntries / 5) / elapsedMinutes
    let errorsPm = this._errorEntries / elapsedMinutes
    let netWpm = grossWpm - errorsPm

    // Put stats into app.
    this._grossWpm.innerHTML = grossWpm.toFixed(0)
    this._netWpm.innerHTML = netWpm.toFixed(0)
    this._accuracy.innerHTML = (100 * (1 - (this._errorEntries / this._typedEntries))).toFixed(0) + '%'
    this._errors.innerHTML = this._errorEntries

    // Draw on statsdiagram.
    this.addPoint(netWpm)
  }

  /**
   * Initiates the stats diagram by clearing it and drawing three horizontal
   * lines to make the progress of the user more visible.
   */
  resetStatsDiagram () {
    // Get canvas.
    let canvas = this._statsDiagram
    let ctx = canvas.getContext('2d')

    // Clear canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Redraw lines indicating 25, 50 and 75.
    let height = canvas.height
    for (let i = height / 4; i < canvas.height; i += height / 4) {
      ctx.beginPath()
      ctx.strokeStyle = 'black'
      ctx.moveTo(0, i)
      ctx.lineTo(300, i)
      ctx.stroke()
    }
  }

  /**
   * Adds a point to the stats diagram that shows typing speed over time.
   * @param {Number} value Typing speed in WPM, 0-100 will show on canvas.
   */
  addPoint (value) {
    // Get canvas
    let canvas = this._statsDiagram
    let ctx = canvas.getContext('2d')

    // Get previous point
    let preX = this._previousX === null ? 0 : this._previousX
    let preY = this._previousY === null ? ctx.height : this._previousY

    // Get elapsed time
    let elapsedMinutes = (new Date().getTime() - this._startTime) / 60000

    // Calculate new x and y
    let x = (canvas.width / 2) * elapsedMinutes
    let y = canvas.height - (canvas.height / 100) * value

    // Draw line from previous point
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(preX, preY)
    ctx.lineTo(x, y)
    ctx.stroke()

    // Store x and y as previous point
    this._previousX = x
    this._previousY = y
  }

  /**
   * Resets the Stats area.
   */
  reset () {
    this._grossWpm.innerHTML = ''
    this._netWpm.innerHTML = ''
    this._accuracy.innerHTML = ''
    this._errors.innerHTML = ''
    this._typedEntries = 0
    this._errorEntries = 0
    this._previousX = null
    this._previousY = null
    this.resetStatsDiagram()
  }
}
