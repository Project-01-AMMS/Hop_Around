
var input = document.getElementById("inputID");
var btn = document.getElementById("submit");
var bars = document.getElementById("bars");

var divTitle = document.getElementById("eventTitle");
var brewTitle = document.getElementById("brewTitle");

var innerEvents = document.querySelector(".eventInner");

var bottomSection = document.querySelector(".bottom-section");
var navLinks = document.querySelectorAll(".nav-link");
var links = document.querySelectorAll('nav a');

var favorites = document.getElementById("favorites");
var favoriteEvents = document.getElementById("favorite-Events");

var sgAPIKEY = "MzIxNzgxMjl8MTY3Nzg4MDY0MS4yODM0NzQ3";
var globalBarData = [];
var globalEventData = [];
var savedDivs = JSON.parse(localStorage.getItem("card")) || [];
var savedEventDivs = JSON.parse(localStorage.getItem("eventCard")) || [];

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

            var favBtn = document.createElement("button");
            var favIcon = document.createElement("i");

            var barNameText = document.createElement("p");
            var barAddressText = document.createElement("p");
            var barCityStateZipText = document.createElement("p");
            var barPhoneText = document.createElement("p");
            var barWebsiteText = document.createElement("a");

            //Adds text values to the data elements
            barNameText.textContent = cutString(barName);

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
            barDiv.setAttribute("class", "barDiv rounded-lg bar shadow-lg text-center m-2 p-3");
            document.getElementById("breweries").appendChild(barDiv);

            favIcon.setAttribute("class", "fav fa-sharp fa-solid fa-star");
            favBtn.setAttribute('id', "favBtn" + [j]);
            barDiv.appendChild(favBtn);
            favBtn.appendChild(favIcon);

            favBtn.addEventListener("click", function(event) { 
                const cardElement = event.target.closest(".barDiv");
                favorites.appendChild(cardElement);
                var savedDiv = cardElement.outerHTML;
                savedDivs.push(savedDiv)
                localStorage.setItem("card", JSON.stringify(savedDivs));
            });

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
            var eventDiv = document.createElement("div");
            var eventImage = document.createElement("img");
            var eventTitleText = document.createElement("p");
            var eventDateText = document.createElement("p");
            var eventLocationText = document.createElement("p");
            var eventUrlText = document.createElement("a");
            var favBtn2 = document.createElement("button");
            var favIcon2 = document.createElement("i");

            //Add the values to the event data elemnts
            eventImage.setAttribute("src", eventImageUrl);
            eventUrlText.setAttribute("href", eventURL);
            eventTitleText.textContent = cutString(eventTitle);
            eventDateText.textContent = formattedDate;
            eventLocationText.textContent = eventLocation;
            eventUrlText.textContent = "Click for Ticket Info";

            //Appends the events data to the events div elements, and then the main container
            eventDiv.setAttribute("class", "eventDiv flex-col event flex items center text-center pb-10 rounded-lg shadow-xl");
            document.getElementById("events").appendChild(eventDiv);
            eventDiv.appendChild(eventImage);
            eventDiv.appendChild(eventTitleText);
            eventDiv.appendChild(eventDateText);
            eventDiv.appendChild(eventLocationText);
            eventDiv.appendChild(eventUrlText);

            favIcon2.setAttribute("class", "fav2 fa-sharp fa-solid fa-star");
            favBtn2.setAttribute('id', "favBtn2" + [i]);
            eventDiv.appendChild(favBtn2);
            favBtn2.appendChild(favIcon2);

            
            favBtn2.addEventListener("click", function (event) {
                favEventTitle.style.display = "flex";
                const eventCardElement = event.target.closest(".eventDiv");
                favoriteEvents.appendChild(eventCardElement);
                var savedEventDiv = eventCardElement.outerHTML;
                savedEventDivs.push(savedEventDiv);
                localStorage.setItem("eventCard", JSON.stringify(savedEventDivs));
            });
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

function loadFavorites() {
    // Reversing array so that the 4 most recent saved breweries are displayed to the page
    savedDivs.reverse();
    if (savedDivs.length >= 4){
        for (var i = 0; i < 4; i++){
            var newDiv = document.createElement("div");
            newDiv.innerHTML = savedDivs[i];
            favorites.appendChild(newDiv);
        }
    }

    if(savedDivs.length < 4) {
        for (var i = 0; i < savedDivs.length; i++){
            var newDiv = document.createElement("div");
            newDiv.innerHTML = savedDivs[i];
            favorites.appendChild(newDiv);
        }
    }
}

function loadFavoriteEvents() {
    //On page load, page will be blank IF nothing is in local storage.
    //Else, the "Favorite Breweries" heading will be visible, along with the favorite brewery cards
    if (localStorage.length === 0) {
        favoriteEvents.setAttribute("display", "none");
    } else {
        savedEventDivs.reverse();
        favEventTitle.style.display = "flex";
        for (var i = 0; i < savedEventDivs.length; i++) {
            var newEventDiv = document.createElement("div");
            newEventDiv.innerHTML = savedEventDivs[i];
            favoriteEvents.appendChild(newEventDiv);
        }
    }
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
            loadFavorites();
            loadFavoriteEvents();
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

loadFavorites();
loadFavoriteEvents();