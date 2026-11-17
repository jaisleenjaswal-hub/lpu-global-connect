document.addEventListener("DOMContentLoaded", function () {

    // ALL FOOD AND DINING OPTIONS

    const foodOptions = [
        // EXISTING DINING OPTIONS

        {
            id: "vegetarian",
            name: "Vegetarian Food",
            category: "vegetarian",
            description: "Explore vegetarian meal options around LPU.",
            keywords: ["veg", "vegetarian", "pure veg", "meals"]
        },
        {
            id: "nonvegetarian",
            name: "Non-Vegetarian Food",
            category: "non-vegetarian",
            description: "Search for dining information and food options outside campus.",
            keywords: ["non veg", "non-veg", "chicken", "meat"]
        },
        {
            id: "snacks",
            name: "Snacks & Quick Bites",
            category: "snacks",
            description: "Discover quick snacks and light food options.",
            keywords: ["snacks", "quick bites", "fast food"]
        },
        {
            id: "beverages",
            name: "Drinks & Beverages",
            category: "drinks",
            description: "Explore juices, shakes and other beverages.",
            keywords: ["drinks", "beverages", "juice", "shake", "coffee"]
        },
        {
            id: "foodcourt",
            name: "Campus Food Court",
            category: "vegetarian",
            description: "Explore dining options around the LPU food court.",
            keywords: ["food court", "canteen", "campus food"]
        },
        {
            id: "unimall",
            name: "Uni Mall Dining",
            category: "snacks",
            description: "Explore dining options around Uni Mall.",
            keywords: ["uni mall", "mall", "dining"]
        },
        {
            id: "nearby",
            name: "Nearby Restaurants",
            category: "all",
            description: "Discover restaurants around Lovely Professional University.",
            keywords: ["nearby", "restaurants", "eating places", "food places"]
        },

        // SPECIFIC FOOD ITEMS

        {
            id: "burger",
            name: "Veg Burger",
            category: "snacks",
            description: "Explore vegetarian burger options around LPU.",
            keywords: ["burger", "veggie burger", "paneer burger", "soya burger"]
        },
        {
            id: "pizza",
            name: "Pizza",
            category: "snacks",
            description: "Explore pizza options around the LPU campus.",
            keywords: ["pizza", "cheese pizza", "veg pizza"]
        },
        {
            id: "sandwich",
            name: "Sandwich",
            category: "snacks",
            description: "Explore paneer, corn and other sandwich options.",
            keywords: ["sandwich", "paneer sandwich", "corn sandwich"]
        },
        {
            id: "dosa",
            name: "Dosa & Idli",
            category: "vegetarian",
            description: "Explore South Indian food options.",
            keywords: ["dosa", "idli", "south indian"]
        },
        {
            id: "rolls",
            name: "Vegetarian Rolls",
            category: "snacks",
            description: "Find vegetarian rolls and quick bites.",
            keywords: ["roll", "rolls", "wrap", "wraps"]
        },
        {
            id: "pasta",
            name: "Pasta",
            category: "snacks",
            description: "Explore pasta options around campus.",
            keywords: ["pasta", "white sauce pasta", "red sauce pasta"]
        },
        {
            id: "noodles",
            name: "Noodles",
            category: "snacks",
            description: "Explore noodle and quick meal options.",
            keywords: ["noodles", "chowmein", "hakka noodles"]
        },
        {
            id: "fries",
            name: "French Fries",
            category: "snacks",
            description: "Explore fries and other quick bites.",
            keywords: ["fries", "french fries", "potato fries"]
        },
        {
            id: "thali",
            name: "Indian Meals & Thali",
            category: "vegetarian",
            description: "Explore Indian meal and thali options.",
            keywords: ["thali", "indian food", "roti", "dal", "meal"]
        }
    ];

    // GET HTML ELEMENTS

    const foodSearch = document.getElementById("foodSearch");
    const foodSearchBtn = document.getElementById("foodSearchBtn");
    const foodResults = document.getElementById("foodResults");
    const savedFood = document.getElementById("savedFood");
    const filterButtons = document.querySelectorAll(".food-filter");

    if (!foodSearch || !foodSearchBtn || !foodResults || !savedFood) {
        console.error("Food page elements are missing. Check food.html IDs.");
        return;
    }

    // LOAD FAVOURITES

    let favourites = [];

    try {
        favourites = JSON.parse(
            localStorage.getItem("lpuFoodFavourites")
        ) || [];
    } catch (error) {
        favourites = [];
    }

    let selectedFilter = "all";

    // GOOGLE MAPS LINK

    function getGoogleMapsLink(place) {
        const query = place +
            ", Lovely Professional University, Phagwara, Punjab";

        return "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(query);
    }

    // DISPLAY FOOD CARDS

    function displayFood(options) {

        foodResults.innerHTML = "";

        if (options.length === 0) {

            const message = document.createElement("div");
            message.className = "no-results";

            const heading = document.createElement("h3");
            heading.textContent = "No matching options found";

            const description = document.createElement("p");
            description.textContent =
                "Try another food name or explore nearby places.";

            const mapLink = document.createElement("a");
            mapLink.className = "food-map-link";
            mapLink.href = getGoogleMapsLink(foodSearch.value);
            mapLink.target = "_blank";
            mapLink.rel = "noopener noreferrer";
            mapLink.textContent = "Search on Google Maps →";

            message.appendChild(heading);
            message.appendChild(description);
            message.appendChild(mapLink);

            foodResults.appendChild(message);
            return;
        }

        options.forEach(function (food) {

            const card = document.createElement("div");
            card.className = "food-card";

            const tag = document.createElement("span");
            tag.className = "food-tag";
            tag.textContent = food.category === "all"
                ? "Dining"
                : food.category.replace("-", " ");

            const title = document.createElement("h3");
            title.textContent = food.name;

            const description = document.createElement("p");
            description.textContent = food.description;

            const mapLink = document.createElement("a");
            mapLink.className = "food-map-link";
            mapLink.href = getGoogleMapsLink(food.name);
            mapLink.target = "_blank";
            mapLink.rel = "noopener noreferrer";
            mapLink.textContent = "Find nearby options →";

            const favouriteButton = document.createElement("button");
            favouriteButton.className = "favourite-btn";

            favouriteButton.textContent = favourites.includes(food.id)
                ? "♥ Saved"
                : "♡ Add to favourites";

            favouriteButton.addEventListener("click", function () {
                toggleFavourite(food.id);
            });

            card.appendChild(tag);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(mapLink);
            card.appendChild(favouriteButton);

            foodResults.appendChild(card);
        });
    }

    // SEARCH AND FILTER

    function getFilteredFood() {

        const searchTerm = foodSearch.value.toLowerCase().trim();

        return foodOptions.filter(function (food) {

            const searchableText = [
                food.name,
                food.description,
                ...food.keywords
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(searchTerm);

            const matchesCategory =
                selectedFilter === "all" ||
                food.category === selectedFilter ||
                (selectedFilter === "vegetarian" &&
                    food.category === "all");

            return matchesSearch && matchesCategory;
        });
    }

    function searchFood() {
        displayFood(getFilteredFood());
    }

    foodSearchBtn.addEventListener("click", searchFood);

    foodSearch.addEventListener("input", searchFood);

    foodSearch.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchFood();
        }
    });

    // FILTER BUTTONS

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedFilter = button.dataset.filter;

            searchFood();
        });
    });

    // ADD OR REMOVE FAVOURITES

    function toggleFavourite(id) {

        if (favourites.includes(id)) {

            favourites = favourites.filter(function (item) {
                return item !== id;
            });

        } else {

            favourites.push(id);

        }

        localStorage.setItem(
            "lpuFoodFavourites",
            JSON.stringify(favourites)
        );

        searchFood();
        displayFavourites();
    }

    // DISPLAY FAVOURITES

    function displayFavourites() {

        savedFood.innerHTML = "";

        if (favourites.length === 0) {
            savedFood.innerHTML =
                "<p>You haven't saved any favourites yet.</p>";
            return;
        }

        favourites.forEach(function (id) {

            const food = foodOptions.find(function (item) {
                return item.id === id;
            });

            if (!food) return;

            const favouriteItem = document.createElement("div");
            favouriteItem.className = "favourite-item";

            const name = document.createElement("span");
            name.textContent = food.name;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                toggleFavourite(id);
            });

            favouriteItem.appendChild(name);
            favouriteItem.appendChild(removeButton);

            savedFood.appendChild(favouriteItem);
        });
    }

    // INITIAL DISPLAY

    displayFood(foodOptions);
    displayFavourites();

    console.log("Food & Dining page is ready!");

});