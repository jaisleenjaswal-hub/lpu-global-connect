document.addEventListener("DOMContentLoaded", function () {

    // 1. CAMPUS LOCATIONS
    const campusLocations = [
        {
            name: "Central Library",
            category: "academic",
            description: "University library and learning resources."
        },
        {
            name: "Block 30 - Admissions",
            category: "academic",
            description: "Admissions and university enquiries."
        },
        {
            name: "Block 34 - School of CSE",
            category: "academic",
            description: "School of Computer Science and Engineering."
        },
        {
            name: "Block 35 - Auditorium",
            category: "facilities",
            description: "Shanti Devi Mittal Auditorium."
        },
        {
            name: "Uni Mall",
            category: "food",
            description: "Campus shopping and dining area."
        },
        {
            name: "Uni Hospital",
            category: "facilities",
            description: "University healthcare facility."
        },
        {
            name: "LPU Food Court",
            category: "food",
            description: "Campus dining options."
        },
        {
            name: "LPU Hostels",
            category: "facilities",
            description: "University residential facilities."
        }
    ];

    // 2. GET HTML ELEMENTS
    const locationSearch = document.getElementById("locationSearch");
    const searchBtn = document.getElementById("searchBtn");
    const locationResults = document.getElementById("locationResults");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const locationDetails = document.getElementById("locationDetails");
    const campusMap = document.getElementById("campusMap");

    if (!locationSearch || !searchBtn ||
        !locationResults || !locationDetails || !campusMap) {
        console.error("Campus HTML elements are missing!");
        return;
    }

    let selectedCategory = "all";

    const campusAddress =
        "Lovely Professional University, Phagwara, Punjab";

    // 3. GOOGLE MAP URLS
    function getMapUrl(place) {
        const query = place + ", " + campusAddress;

        return "https://www.google.com/maps?q=" +
            encodeURIComponent(query) + "&output=embed";
    }

    function getSearchUrl(place) {
        const query = place + ", " + campusAddress;

        return "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(query);
    }

    function getDirectionsUrl(place) {
        const query = place + ", " + campusAddress;

        return "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent(query) + "&travelmode=walking";
    }

    // 4. SHOW SELECTED LOCATION
    function showLocation(location) {

        campusMap.src = getMapUrl(location.name);
        locationDetails.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = location.name;

        const description = document.createElement("p");
        description.textContent = location.description;

        const directions = document.createElement("a");
        directions.href = getDirectionsUrl(location.name);
        directions.target = "_blank";
        directions.rel = "noopener noreferrer";
        directions.textContent = "Get Walking Directions";
        directions.className = "directions-btn";

        locationDetails.appendChild(heading);
        locationDetails.appendChild(description);
        locationDetails.appendChild(directions);
    }

    // 5. DISPLAY DIRECTORY CARDS
    function displayLocations(locations) {

        locationResults.innerHTML = "";

        if (locations.length === 0) {
            locationResults.textContent =
                "No matching places in our quick directory. " +
                "Your Google Maps search is displayed below.";
            return;
        }

        locations.forEach(function(location) {

            const card = document.createElement("div");
            card.className = "location-card";

            const heading = document.createElement("h3");
            heading.textContent = location.name;

            const description = document.createElement("p");
            description.textContent = location.description;

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "View on Map";

            button.addEventListener("click", function() {
                showLocation(location);
            });

            card.appendChild(heading);
            card.appendChild(description);
            card.appendChild(button);

            locationResults.appendChild(card);
        });
    }

    // 6. FILTER DIRECTORY
    function getFilteredLocations() {

        const searchText =
            locationSearch.value.trim().toLowerCase();

        return campusLocations.filter(function(location) {

            const matchesText =
                location.name.toLowerCase().includes(searchText) ||
                location.description.toLowerCase().includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                location.category === selectedCategory;

            return matchesText && matchesCategory;
        });
    }

    // 7. SEARCH
    function searchLocations() {

        const searchText = locationSearch.value.trim();

        if (searchText === "") {
            displayLocations(getFilteredLocations());

            locationDetails.innerHTML =
                "<p>Enter a campus location to search on the map.</p>";

            return;
        }

        const filteredLocations = getFilteredLocations();

        // Display matching directory cards
        displayLocations(filteredLocations);

        // Always reflect the typed search on Google Maps
        campusMap.src = getMapUrl(searchText);

        locationDetails.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Your Search: " + searchText;

        const message = document.createElement("p");

        if (filteredLocations.length > 0) {
            message.textContent =
                "Matching campus directory options are shown above. " +
                "The map below also reflects your search.";
        } else {
            message.textContent =
                "This place isn't in our quick campus directory. " +
                "Your Google Maps search is being shown below. " +
                "You can open Google Maps for more results.";
        }

        const mapLink = document.createElement("a");
        mapLink.href = getSearchUrl(searchText);
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
        mapLink.textContent = "Open Search in Google Maps";
        mapLink.className = "directions-btn";

        locationDetails.appendChild(heading);
        locationDetails.appendChild(message);
        locationDetails.appendChild(mapLink);
    }

    searchBtn.addEventListener("click", searchLocations);

    locationSearch.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchLocations();
        }
    });

    // 8. CATEGORY FILTERS
    filterButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            filterButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory = button.dataset.category;

            displayLocations(getFilteredLocations());
        });
    });

    // 9. INITIAL DISPLAY
    displayLocations(campusLocations);

    console.log("Campus Navigation loaded successfully!");

});