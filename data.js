var input = document.getElementById("inputID");
var btn = document.getElementById("submit");
var bars = document.getElementById("bars");

var sgAPIKEY = "MzIxNzgxMjl8MTY3Nzg4MDY0MS4yODM0NzQ3";

var barData = []; // All the data for bars will go here

// This is where filtered bars will go
var displayData = [];
var displayData1 = [];

var eventsList = [];

async function getCity(city) {
    console.clear(); // Clears the console everytime the function is called
    displayData1 = []; // Clearing data in the displayData1 array
    displayData = []; // Clears the displayData array

    // Fetching the openBreweryDB API
    var brewAPI = `https://api.openbrewerydb.org/breweries?by_city=${city}`;

    // Calling the openBreweryAPI
    var barResponse = await fetch(brewAPI);
    var barData = await barResponse.json();

    // Gets 5 random bars
    console.log("Bar picks");
    var bar = barData;
    for (var j = 0; j < barData.length; j++) {
        if (barData.length !== 0) {
            console.log(bar[j].name);

            //Creates the variables from the API data
            var barName = bar[j].name;
            var barAddress = bar[j].street;
            var barCity = bar[j].city;
            var barState = bar[j].state;
            var barZip = bar[j].postal_code;
            var barPhone = bar[j].phone;
            var barWebsite = bar[j].website_url;
                   
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

    // Fetching the seatgeekAPI
    var eventResponse = await fetch(`https://api.seatgeek.com/2/events?venue.city=${input.value}&client_id=${sgAPIKEY}`);
    var eventData = await eventResponse.json();

    //console.log(barData.events.length);
    for (var i = 0; i < eventData.events.length; i++) {
        //Creates the variables from the API Data
        var eventImageUrl = eventData.events[i].performers[0].image;
        var eventTitle = eventData.events[i].title;
        var eventLocation = eventData.events[i].venue.name;
        var eventURL = eventData.events[i].url;

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

    // Calling the displayDataOnPage function so that all results are filterd and displayed
    displayDataOnPage();

    //console.log(eventsList);
}

// This will filter the elements in the displayData array so that there are no duplicates
function displayDataOnPage() {
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


btn.addEventListener("click", function () {
    document.querySelectorAll(".bar").forEach(barBox => barBox.remove());
    document.querySelectorAll(".event").forEach(eventBox => eventBox.remove());
    // function will only be called if the user has entered a city
    if (input.value !== "") {
        // Calls the function with the the input given when user clicks submit
        getCity(input.value);
        
    } else {
        console.log("Please enter a valid city")
    }

})


