var input = document.getElementById("inputID");
var btn = document.getElementById("submit");
var bars = document.getElementById("bars");

var sgAPIKEY = "MzIxNzgxMjl8MTY3Nzg4MDY0MS4yODM0NzQ3";

async function getCity(city) {
  console.clear(); // Clears the console everytime the function is called

  // Fetching the openBreweryDB API
  var brewAPI = `https://api.openbrewerydb.org/breweries?by_city=${city}`;

  // Calling the openBreweryAPI
  var barResponse = await fetch(brewAPI);
  var barData = await barResponse.json();

  var bar = barData;
  console.log(barData.length);
  globalBarData = barData.length;

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
        barWebsiteText.style.backgroundColor = "grey";
        barWebsiteText.style.cursor = "not-allowed";
        barWebsiteText.style.borderColor = "grey";
        barWebsiteText.textContent = "Bar Website";
      }

      //Appends the brewery data to the bar div elements, and then the main container
      barDiv.setAttribute("class", "bar");
      document.getElementById("breweries").appendChild(barDiv);
      barDiv.appendChild(barNameText);
      barDiv.appendChild(barAddressText);
      barDiv.appendChild(barCityStateZipText);
      barDiv.appendChild(barPhoneText);
      barDiv.appendChild(barWebsiteText);
      barWebsiteText.setAttribute("href", barWebsite);
      barWebsiteText.setAttribute("class", "website");
    }
  } else {
    sorryNoBars = document.createElement("p");
    sorryNoBars.textContent = "Sorry there are no bars in your area.";
    document.getElementById("breweries").appendChild(sorryNoBars);
    console.log("Sorry there are no bars in your area");
  }

  // Fetching the seatgeekAPI
  var eventResponse = await fetch(
    `https://api.seatgeek.com/2/events?venue.city=${input.value}&client_id=${sgAPIKEY}`
  );
  var eventData = await eventResponse.json();

  if (eventData.events.length !== 0) {
    for (var i = 0; i < eventData.events.length; i++) {
      //Creates the variables from the API Data
      var eventImageUrl = eventData.events[i].performers[0].image;
      var eventTitle = eventData.events[i].title;
      var eventDate = eventData.events[i].datetime_local;
      var eventLocation = eventData.events[i].venue.name;
      var eventURL = eventData.events[i].url;

      var date = dayjs(eventDate);
      var formattedDate = date.format("MM/D h:mm A");
      console.log("Date: ", formattedDate);

      //Creares the elements that will hold the data
      var eventDiv = document.createElement("div");
      var eventImage = document.createElement("img");
      var eventTitleText = document.createElement("p");
      var eventDateText = document.createElement("p");
      var eventLocationText = document.createElement("p");
      var eventUrlText = document.createElement("a");

      //Add the values to the event data elemnts
      eventImage.setAttribute("src", eventImageUrl);
      eventUrlText.setAttribute("href", eventURL);
      eventTitleText.textContent = eventTitle;
      eventDateText.textContent = formattedDate;
      eventLocationText.textContent = eventLocation;
      eventUrlText.textContent = "Click for Ticket Info";

      //Appends the events data to the events div elements, and then the main container
      eventDiv.setAttribute("class", "event");
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
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return "Phone Number Not Found";
}

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

var bottomSection = document.querySelector(".bottom-section");
var navLinks = document.querySelectorAll(".nav-link");

// Scrolls to the desired place on the page
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
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
