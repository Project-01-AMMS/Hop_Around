
var input = document.getElementById("inputID");
var btn = document.getElementById("submit");
var bars = document.getElementById("bars");

var divTitle = document.getElementById("eventTitle");
var brewTitle = document.getElementById("brewTitle");

var innerEvents = document.querySelector(".eventInner");

var bottomSection = document.querySelector(".bottom-section");
var navLinks = document.querySelectorAll(".nav-link");
var links = document.querySelectorAll('nav a');

var sgAPIKEY = "MzIxNzgxMjl8MTY3Nzg4MDY0MS4yODM0NzQ3";
var globalBarData = [];
var globalEventData = [];

divTitle.style.display = "none";
brewTitle.style.display = "none";

async function getCity(city) {
    console.clear(); // Clears the console everytime the function is called

    // Fetching the openBreweryDB API
    var brewAPI = `https://api.openbrewerydb.org/breweries?by_city=${city}`;

    // Calling the openBreweryAPI
    var barResponse = await fetch(brewAPI);
    var barData = await barResponse.json();

    var bar = barData;
    globalBarData.push(barData);

    // Took if statement out of the for loop and put the loop inside the conditional
    if (barData.length !== 0) {
        for (var j = 0; j < barData.length; j++) {

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

            // Added this ==========
            console.log(barAddress);
            if (barAddress === "" || barAddress === null) {
                barAddressText.textContent = "N/A";
            } else {
                barAddressText.textContent = barAddress;
            }

            // Changed this
            barCityStateZipText.textContent = barCity + ", " + barState;
            barPhoneText.textContent = formatPhoneNumber(barPhone);
            barWebsiteText.textContent = "Bar Website";

            // Added this ===========
            if (barWebsite === "" || barWebsite === null) {
                barWebsiteText.style.opacity = .3;
                barWebsiteText.style.cursor = "not-allowed";
                barWebsiteText.style.borderColor = "grey";
                barWebsiteText.textContent = "Bar Website";
            }

            //Appends the brewery data to the bar div elements, and then the main container 
            barDiv.setAttribute("class", "rounded-lg bar shadow-lg text-center m-2 p-3");
            document.getElementById("breweries").appendChild(barDiv);
            barDiv.appendChild(barNameText);
            barDiv.appendChild(barAddressText);
            barDiv.appendChild(barCityStateZipText);
            barDiv.appendChild(barPhoneText);
            barDiv.appendChild(barWebsiteText);
            barWebsiteText.setAttribute("href", barWebsite);
            barWebsiteText.setAttribute("target", "_blank");
            barWebsiteText.setAttribute("class", "website hover:bg-zinc-700");
        }
    } else {
        sorryNoBars = document.createElement("p");
        sorryNoBars.textContent = "Sorry there are no breweries in your area.";
        document.getElementById("breweries").appendChild(sorryNoBars);
    }

    // Fetching the seatgeekAPI
    var eventResponse = await fetch(`https://api.seatgeek.com/2/events?venue.city=${input.value}&client_id=${sgAPIKEY}`);
    var eventData = await eventResponse.json();

    globalEventData.push(eventData.events);

    if (eventData.events.length !== 0) {
        for (var i = 0; i < eventData.events.length; i++) {
            //Creates the variables from the API Data
            var eventImageUrl = eventData.events[i].performers[0].image;
            var eventTitle = eventData.events[i].title;
            var eventDate = eventData.events[i].datetime_local;
            var eventLocation = eventData.events[i].venue.name;
            var eventURL = eventData.events[i].url;

            var date = dayjs(eventDate);
            var formattedDate = date.format('MM/D h:mm A');

            //Creares the elements that will hold the data
            var eventLabel = document.createElement("h2");
            var eventDiv = document.createElement("div");
            var eventImage = document.createElement("img");
            var eventTitleText = document.createElement("p");
            var eventDateText = document.createElement("p");
            var eventLocationText = document.createElement("p");
            var eventUrlText = document.createElement("a");

            //Add the values to the event data elemnts
            eventImage.setAttribute("src", eventImageUrl);
            eventUrlText.setAttribute("href", eventURL);
            eventTitleText.textContent = cutString(eventTitle);
            eventDateText.textContent = formattedDate;
            eventLocationText.textContent = eventLocation;
            eventUrlText.textContent = "Click for Ticket Info";

            //Appends the events data to the events div elements, and then the main container
            eventDiv.setAttribute("class", "flex-col event flex items center text-center pb-10 rounded-lg shadow-xl");
            document.getElementById("events").appendChild(eventDiv);
            eventDiv.appendChild(eventImage);
            eventDiv.appendChild(eventTitleText);
            eventDiv.appendChild(eventDateText);
            eventDiv.appendChild(eventLocationText);
            eventDiv.appendChild(eventUrlText);
        }
    } else {
        sorryNoEvents = document.createElement("p");
        sorryNoEvents.textContent = "Sorry there are no events in your area.";
        document.getElementById("events").appendChild(sorryNoEvents);
        console.log(sorryNoEvents);
    }
}

// Formatting brewery phone number to be easily readable
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return "Phone Number Not Found";
}

function getAmount() {

    document.getElementById("brewLength").innerHTML = "(" + globalBarData[0].length + " Items)";

    document.getElementById("eventLength").innerHTML = "(" + globalEventData[0].length + " Items)";

}

function cutString(str) {
    if (str.length > 13) {
      str = str.slice(0, 35) + '...';
    }
    return str;
}

btn.addEventListener("click", function (event) {
    event.preventDefault();
    globalBarData = [];
    globalEventData = [];
    //document.getElementById("events").innerHTML = "";
    document.getElementById("breweries").innerHTML = "";
    // Removes boxes from screen
    document.querySelectorAll(".bar").forEach(barBox => barBox.remove());
    document.querySelectorAll(".event").forEach(eventBox => eventBox.remove());
    // function will only be called if the user has entered a city
    if (input.value !== "") {
        divTitle.style.display= "flex";
        brewTitle.style.display = "flex";
        // Calls the function with the the input given when user clicks submit
        getCity(input.value);
        setTimeout(function () {
            getAmount();
            input.value = "";
        }, 500)
    } else {
        console.log("Please enter a valid city")
    }
})

// Scrolls to the desired place on the page
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        var targetId = link.getAttribute('href');
        var targetSection = document.querySelector(targetId);
        // Offsetting the bottom section that holds the content due to the header and nav being stuck in place
        var targetOffsetTop = targetSection.offsetTop;
        var bottomOffsetTop = bottomSection.offsetTop;
        var adjustedOffsetTop = targetOffsetTop - bottomOffsetTop;
        window.scrollTo({
            top: adjustedOffsetTop,
            behavior: 'smooth'
        });

       // Update the active link after a short delay
       setTimeout(() => {
        // Remove the "active" class from all links
        const links = document.querySelectorAll('nav a');
        links.forEach(link => link.classList.remove('active'));

        // Add the "active" class to the matching link
        link.classList.add('active');
    }, 700); // Adjust the delay time as needed
    });
});


window.addEventListener('scroll', () => {
    // Get the current scroll position of the window
    const scrollPosition = window.scrollY;

    // Get the heights of the fixed header and nav
    const headerHeight = document.querySelector('header').offsetHeight;
    const navHeight = document.querySelector('nav').offsetHeight;
    const offset = headerHeight + navHeight;

    // Loop through all sections on the page
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Get the top and bottom bounds of each section
        const sectionTop = section.offsetTop - offset;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Check if the current scroll position is within the bounds of the section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Get the id of the corresponding navigation link
            const sectionId = section.getAttribute('id');
            const matchingLink = document.querySelector(`nav a[href="#${sectionId}"]`);

            // Remove the "active" class from all links
            const links = document.querySelectorAll('nav a');
            links.forEach(link => link.classList.remove('active'));

            // Add the "active" class to the matching link
            matchingLink.classList.add('active');
        }
    });
});