# Speed-Typer-2000

## About this project

This project was created as part of the course DT146G - Web Programming with HTML5, CSS3 and JavaScript (7.5 Credits) at the Mid Sweden University. The app lets the user type in one of eight predefined texts with the goal of doing it as fast as they can.

## Running

The app is started by either pressing the enter key or by pressing the start button right below the typing area. Focus is automatically put into the textbox for typing when the game is started. Statistics are shown below, these are reset when a new game is started.

## Settings

The text can be changed by using the select input at the top of the page. The user can change the language of the texts by pressing one of the two radio buttons. There is also an ignore casing option.

## Statistics

Statistics are shown below the the text area. GrossWPM is calculated using an average word length of five letters. NetWPM is grossWPM subtracted with the errors made per minute. Accuracy is just correct letters typed divided with total letters typed. Errors a sum of all the errors typed so far.

There is also a canvas element displaying the progress of netWPM over time. The canvas displays speeds up to 100WPM.