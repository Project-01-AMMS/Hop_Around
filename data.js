var input = document.getElementById("inputID");
var btn = document.getElementById("submit");
var bars = document.getElementById("bars");

var sgAPIKEY = "MzIxNzgxMjl8MTY3Nzg4MDY0MS4yODM0NzQ3";

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

            // Gets 5 random bars
            console.log("Bar picks");
            for (var j = 0; j < 5; j++) {
                if (barData.length !== 0) {
                    // var randomIndex = Math.floor(Math.random() * barData.length);
                    var indexNum = barData[0][j]
                    var bar = indexNum;
                    displayData.push(bar);
                    console.log(bar.name);
                } else {
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
            }
            var filteredEvents = eventsList.filter((value, index, self) => 
                index === self.findIndex((v) => v.title === value.title)
            );
            console.log("data",filteredEvents);
            console.log(data);
        })

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

console.log("Bar Data: ", barData);

btn.addEventListener("click", function () {
    // function will only be called if the user has entered a city
    if (input.value !== "") {
        // Calls the function with the the input given when user clicks submit
        getCity(input.value);
    } else {
        console.log("Please enter a valid city")
    }

})


