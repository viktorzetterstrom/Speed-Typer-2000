/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

/**
 * Class representing a Text. Has an author and a string of words, can return
 * the amount of words and the amount of chars in.
 */
export class Text {
  constructor (title, author, words) {
    this._title = title
    this._author = author
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
   * @param {String} char Character that was entered
   */
  typeChar (char) {
    var noError = true
    let chars = this._wordsArea.getElementsByTagName('span')
    chars[this._activeCharIndex].id = 'typed'

    if (char !== chars[this._activeCharIndex].innerHTML) {
      chars[this._activeCharIndex].id = 'typing-error'
      noError = false
    }

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
    console.log(this._activeCharIndex)
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
      } else {
        chars[i].id = ''
      }
    }
  }
}

export class StatsArea {
  constructor () {
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

  reset () {
    this._grossWpm.innerHTML = 0
    this._netWpm.innerHTML = 0
    this._accuracy.innerHTML = 0
    this._errors.innerHTML = 0
  }

  addError () {
    this._errors.innerHTML++
  }

  addWord () {

  }

  start () {

  }

  update () {
    // this._grossWpm.innerHTML = (typedEntries / 5) / elapsedMinutes;
  }
}
