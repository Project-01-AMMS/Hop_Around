# Hop Around

## Description

Hop Around is a web app that allows a user to search for a city and receive information on events and breweries local to that area. Brewery information provides users the address, phone number, and website for local breweries. While the event information provides users the event name, date, time, venue, and a link for ticket info. Finally, users can save to local storage their favorite options for future reference.

## Links

Deployed app on Github Pages: https://project-01-amms.github.io/Hop_Around/

Repository: https://github.com/Project-01-AMMS/Hop_Around

Presentation Slideshow:
https://docs.google.com/presentation/d/e/2PACX-1vRugcAtj_2p9ulTy3YrbJ-OlI6WaS0aNejCUNghtS8w90h7Zh3LbfKGQY-Cn_Mzc097lF-bY4kJ9-6Q/pub?start=false&loop=false&delayms=3000

## GIF of Hop Around in Use

![Hop Around application in use GIF](./assets/Untitled_%20Mar%2014%2C%202023%203_45%20PM.gif)

## Authors

This project was built for the Northwestern Coding Bootcamp. Project developed by:
- Martin Lynch
- Matt Wagner
- Anthony Groce
- Sebastian Aguirre

## Features

- This app utilizes the Open Brewery API to gather data by city on what breweries exist in the area. IT provides the user location and a website to each brewery if the data is retrievable.

- This app also uses the Seat Geek API to gather data for local events in the same city search. Links to ticket information are provided, along with location, date, and time.

- Data from both API's is populated in cards once a search query is submitted. Each card has a selectable button that will save the brewery or event in local storage and move the card to a "favorites" section at the bottom of the page.

- Selecting the headings in the nav bar beneath the search form will allow the user to quickly navigate to each section. Animations make this transition quick and sleek.

## Installation

This app will function in any browser upon linking to the url and operates as a single stand alone webpage.

## Usage Instructions

Entering the url https://project-01-amms.github.io/Hop_Around/ brings the user to our single-page application.

- Enter a city in the search bar.

- Press "Enter" or click on the "Submit" button.

- If there are breweries or events in the area of the city entered into the search query, these will be populated as a grid of cards respectively into the sections "Breweries" and "Local Events."

- Each card contains a "star" icon, button that can be clicked to add the brewery or event to the user's favorites. This is populated at the bottom of the page into two respective sections for "Favorite Breweries" and "Favorite Events."

- Local Memory stores the users favorites thus that refreshing the page maintains the user's selected favorites.

## Acknowledgements

The developers of this app owe thanks to several free, open-source services.

- SeatGeek API - https://seatgeek.com/

- Open Brewery DB API - https://www.openbrewerydb.org/

- Tailwind CSS - for our CSS framework - https://tailwindcss.com/

- Cursor.cc - for our beer cursor - https://www.cursor.cc/

- Font Awesome - for our star icons - https://fontawesome.com/

- Clip Art Max - for our beer hop logo - https://www.clipartmax.com/

Gratitude is also given to the NU Coding Bootcamp and our advisor Pat Cocoran.

## License

MIT License

Copyright (c) 2023 Project-01-AMMS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
