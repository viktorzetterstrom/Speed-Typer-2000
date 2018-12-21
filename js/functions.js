/**
 * Viktor Zetterström
 * DT146G
 * Mittuniversitet
 * vize1500@student.miun.se
 */

export function initSettings (texts) {
  // Populate text selection with book titles.
  let textSelection = document.getElementById('text-selection')
  texts.forEach(text => {
    textSelection.innerHTML += `<option value="${text.title}">${text.title}</option>`
  })

  // Set standard settings of app, swedish on and ignore casing off.
  document.getElementById('case-ignore').checked = false
  document.getElementById('swedish').checked = true
}
