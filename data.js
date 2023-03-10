var input = document.getElementById("inputID");
var btn = document.getElementById("submit");
var bars = document.getElementById("bars");

var sgAPIKEY = "MzIxNzgxMjl8MTY3Nzg4MDY0MS4yODM0NzQ3";
var secret = "e136e3e8274438c3d1d3d9ace84ccc7c9de84832c86cc50234bfc0b0a38fdf6e";

var barData = []; // All the data for bars will go here

// This is where filtered bars will go
var displayData = [];
var displayData1 = [];

var eventsList = [];

function getCity(city) {
    console.clear(); // Clears the console everytime the function is called
    displayData1 = []; // Clearing data in the displayData1 array
    barData = []; // Clear the barData array
    displayData = []; // Clears the displayData array

    // Fetching the openBreweryDB API
    var brewAPI = `https://api.openbrewerydb.org/breweries?by_city=${city}`;

    // Calling the openBreweryAPI
    fetch(brewAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                barData.push(data);
            }

            // This loop gets 5 random beers
            console.log("Bar picks");
            for (var j = 0; j < barData.length; j++) {
                if (barData.length !== 0) {
                    var randomIndex = Math.floor(Math.random() * barData.length);
                    var indexNum = barData[0][j];
                    var bar = indexNum;
                    displayData.push(bar);
                    console.log(bar.name);

                    //Creates the variables from the API data
                    var barName = bar.name;
                    var barAddress = bar.street;
                    var barCity = bar.city;
                    var barState = bar.state;
                    var barZip = bar.postal_code;
                    var barPhone = bar.phone;
                    var barWebsite = bar.website_url;
                   
                    //Creates the elements that will hold the data
                    var barDiv = document.createElement("div");
                    var barNameText = document.createElement("p");
                    var barAddressText = document.createElement("p");
                    var barCityStateZipText = document.createElement("p");
                    var barPhoneText = document.createElement("p");
                    var barWebsiteText = document.createElement("a");

                    //Adds text values to the data elements
                    barNameText.textContent = barName;
                    barAddressText.textContent = barAddress;
                    barCityStateZipText.textContent = barCity + ", " + barState + " " + barZip;
                    barPhoneText.textContent = barPhone;
                    barWebsiteText.textContent = barWebsite;
                    
                    //Appends the brewery data to the bar div elements, and then the main container 
                    barDiv.setAttribute("class", "bar");
                    document.getElementById("breweries").appendChild(barDiv);
                    barDiv.appendChild(barNameText);
                    barDiv.appendChild(barAddressText);
                    barDiv.appendChild(barCityStateZipText);
                    barDiv.appendChild(barPhoneText);
                    barDiv.appendChild(barWebsiteText);
                    barWebsiteText.setAttribute("href", barWebsite);


                } else {
                    sorryNoBars = document.createElement("p");
                    sorryNoBars.textContent = "Sorry there are no bars in your area.";
                    document.getElementById("breweries").appendChild(sorryNoBars);
                    console.log("Sorry there are no bars in your area");
                }
            }
        })

    // Fetching the seatgeekAPI
    fetch(`https://api.seatgeek.com/2/events?venue.city=${input.value}&client_id=${sgAPIKEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.events.length);
            for (var i = 0; i < data.events.length; i++) {
                // Appending the data event elements to the eventsList array
                eventsList.push(data.events[i]);
                console.log(eventsList);

                //Creates the variables from the API Data
                var eventImageUrl = data.events[i].performers[0].image;
                var eventTitle = data.events[i].title;
                var eventLocation = data.events[i].venue.name;
                var eventURL = data.events[i].url;

                //Creares the elements that will hold the data
                var eventDiv = document.createElement("div");
                var eventImage = document.createElement("img");
                var eventTitleText = document.createElement("p");
                var eventLocationText = document.createElement("p");
                var eventUrlText = document.createElement("a");
                
                //Add the values to the event data elemnts
                eventImage.setAttribute("src", eventImageUrl);
                eventUrlText.setAttribute("href", eventURL);
                eventTitleText.textContent = eventTitle;
                eventLocationText.textContent = eventLocation;
                eventUrlText.textContent = "Click for Ticket Info";
    
                //Appends the events data to the events div elements, and then the main container
                eventDiv.setAttribute("class", "event");
                document.getElementById("events").appendChild(eventDiv);
                eventDiv.appendChild(eventImage);
                eventDiv.appendChild(eventTitleText);
                eventDiv.appendChild(eventLocationText);
                eventDiv.appendChild(eventUrlText);

            }

            // var filteredEvents = eventsList.filter((value, index, self) => 
            //     index === self.findIndex((v) => v.title === value.title)
            // );

            // console.log("data",filteredEvents);

        })

    // Calling the displayDataOnPage function so that all results are filterd and displayed
    displayDataOnPage();

    //console.log(eventsList);
}

// This will filter the elements in the displayData array so that there are no duplicates
function displayDataOnPage() {
    document.querySelectorAll(".bar").forEach(barBox => barBox.remove());
    document.querySelectorAll(".event").forEach(eventBox => eventBox.remove());
    var displayOnPage = displayData.filter((value, index) => {
        return displayData.indexOf(value) === index;
    });

    // Looping through all items in the displayData array and adding those to a global arr that we can use anywhere
    for (var i = 0; i < displayData.length; i++) {
        displayData1.push(displayOnPage[i]);
    }

    // Pulling all day from the displayData array and loggin the name of the object
    for (var j = 0; j < displayData1.length; j++) {
        console.log(displayData1[j].name);
    }
    //console.log(displayData1);
    //console.log("display",displayOnPage);
}

console.log("Bar Data: ", barData);

btn.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("events").innerHTML = "";
  document.getElementById("breweries").innerHTML = "";
  // Removes boxes from screen
  document.querySelectorAll(".bar").forEach((barBox) => barBox.remove());
  document.querySelectorAll(".event").forEach((eventBox) => eventBox.remove());
  // function will only be called if the user has entered a city
  if (input.value !== "") {
    // Calls the function with the the input given when user clicks submit
    getCity(input.value);
  } else {
    console.log("Please enter a valid city");
  }
});


// Scrolls to the desired place on the page
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    var targetId = link.getAttribute("href");
    var targetSection = document.querySelector(targetId);
    // Offsetting the bottom section that holds the content due to the header and nav being stuck in place
    var targetOffsetTop = targetSection.offsetTop;
    var bottomOffsetTop = bottomSection.offsetTop;
    var adjustedOffsetTop = targetOffsetTop - bottomOffsetTop;
    window.scrollTo({
      top: adjustedOffsetTop,
      behavior: "smooth",
    });
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});
