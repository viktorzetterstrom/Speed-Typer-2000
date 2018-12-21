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
