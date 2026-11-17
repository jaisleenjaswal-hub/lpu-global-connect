document.addEventListener("DOMContentLoaded", function () {

    // FOOD MENU DATABASE

    const foodOptions = [

        // VEGETARIAN FOOD

        {
            id: "dalrice",
            name: "Dal Chawal",
            category: "vegetarian",
            description: "Yellow lentils cooked with Indian spices, served with steamed rice. A simple and comforting meal.",
            keywords: ["dal", "lentils", "rice", "indian meal"]
        },
        {
            id: "paneer",
            name: "Shahi Paneer",
            category: "vegetarian",
            description: "Soft cubes of paneer (Indian cottage cheese) cooked in a creamy, mildly spiced gravy. Usually eaten with roti or naan.",
            keywords: ["paneer", "cottage cheese", "curry", "gravy"]
        },
        {
            id: "chole",
            name: "Chole Bhature",
            category: "vegetarian",
            description: "Spiced chickpea curry served with deep-fried, fluffy bread. A popular North Indian dish.",
            keywords: ["chole", "chickpeas", "bhature", "punjabi"]
        },
        {
            id: "rajma",
            name: "Rajma Chawal",
            category: "vegetarian",
            description: "Red kidney beans cooked in a thick tomato-based gravy and served with rice.",
            keywords: ["rajma", "kidney beans", "rice"]
        },
        {
            id: "vegthali",
            name: "Vegetarian Thali",
            category: "vegetarian",
            description: "A complete meal served on one plate, usually containing dal, vegetables, roti, rice, salad and sometimes curd.",
            keywords: ["thali", "roti", "dal", "complete meal"]
        },
        {
            id: "pulao",
            name: "Vegetable Pulao",
            category: "vegetarian",
            description: "Flavoured rice cooked with vegetables and mild Indian spices.",
            keywords: ["pulao", "rice", "vegetables", "veg rice"]
        },
        {
            id: "paneerroll",
            name: "Paneer Roll",
            category: "vegetarian",
            description: "A soft flatbread wrapped around spiced paneer, vegetables and sauces.",
            keywords: ["paneer", "roll", "wrap"]
        },

        // NON-VEGETARIAN FOOD

        {
            id: "chickenbiryani",
            name: "Chicken Biryani",
            category: "non-vegetarian",
            description: "Aromatic basmati rice cooked with chicken, herbs and Indian spices. A popular one-pot meal.",
            keywords: ["chicken", "biryani", "rice", "non veg"]
        },
        {
            id: "butterchicken",
            name: "Butter Chicken",
            category: "non-vegetarian",
            description: "Chicken pieces cooked in a creamy tomato-based gravy. Commonly served with naan or rice.",
            keywords: ["chicken", "butter chicken", "curry", "gravy"]
        },
        {
            id: "eggroll",
            name: "Egg Roll",
            category: "non-vegetarian",
            description: "A flatbread wrapped around a cooked egg, onions and sauces.",
            keywords: ["egg", "roll", "wrap"]
        },
        {
            id: "eggcurry",
            name: "Egg Curry",
            category: "non-vegetarian",
            description: "Boiled eggs served in a spiced onion and tomato gravy, usually eaten with rice or roti.",
            keywords: ["egg", "curry", "gravy"]
        },
        {
            id: "chickenkebab",
            name: "Chicken Kebab",
            category: "non-vegetarian",
            description: "Marinated chicken cooked with spices and served as a grilled or roasted snack or meal.",
            keywords: ["chicken", "kebab", "grilled"]
        },

        // SNACKS

        {
            id: "samosa",
            name: "Samosa",
            category: "snacks",
            description: "A crispy triangular pastry usually filled with spiced potatoes and peas.",
            keywords: ["samosa", "potato", "crispy", "street food"]
        },
        {
            id: "pakora",
            name: "Pakora",
            category: "snacks",
            description: "Vegetables coated in a seasoned gram-flour batter and fried until crispy.",
            keywords: ["pakora", "fritters", "fried", "snack"]
        },
        {
            id: "sandwich",
            name: "Vegetable Sandwich",
            category: "snacks",
            description: "Bread filled with vegetables, chutney and sometimes cheese or butter.",
            keywords: ["sandwich", "bread", "vegetables"]
        },
        {
            id: "fries",
            name: "French Fries",
            category: "snacks",
            description: "Potato strips fried until crispy, commonly served with ketchup.",
            keywords: ["fries", "potato", "fast food"]
        },
        {
            id: "momos",
            name: "Momos",
            category: "snacks",
            description: "Small dumplings filled with vegetables or chicken. They can be steamed or fried.",
            keywords: ["momos", "dumplings", "chicken momos", "veg momos"]
        },
        {
            id: "dosa",
            name: "Dosa",
            category: "snacks",
            description: "A thin, crispy South Indian pancake made from fermented rice and lentil batter, usually served with chutney and sambar.",
            keywords: ["dosa", "south indian", "rice", "lentils"]
        },
        {
            id: "noodles",
            name: "Hakka Noodles",
            category: "snacks",
            description: "Stir-fried noodles mixed with vegetables and sauces. Vegetarian and non-vegetarian versions exist.",
            keywords: ["noodles", "hakka", "chowmein"]
        },
        {
            id: "pizza",
            name: "Pizza",
            category: "snacks",
            description: "A baked bread base topped with sauce, cheese and different vegetable or meat toppings.",
            keywords: ["pizza", "cheese", "fast food"]
        },

        // BREAKFAST

        {
            id: "paratha",
            name: "Aloo Paratha",
            category: "vegetarian",
            description: "A flatbread stuffed with seasoned mashed potatoes, usually served with curd or butter.",
            keywords: ["paratha", "potato", "breakfast", "punjabi"]
        },
        {
            id: "idli",
            name: "Idli Sambar",
            category: "vegetarian",
            description: "Soft steamed rice and lentil cakes served with a flavourful lentil and vegetable soup called sambar.",
            keywords: ["idli", "sambar", "south indian", "breakfast"]
        },
        {
            id: "poha",
            name: "Poha",
            category: "vegetarian",
            description: "Flattened rice cooked with onions, turmeric, peanuts and mild spices.",
            keywords: ["poha", "flattened rice", "breakfast"]
        },

        // DRINKS

        {
            id: "lassi",
            name: "Lassi",
            category: "drinks",
            description: "A traditional Punjabi drink made from yoghurt. It can be sweet or salty.",
            keywords: ["lassi", "yoghurt", "punjabi drink"]
        },
        {
            id: "chai",
            name: "Masala Chai",
            category: "drinks",
            description: "Indian milk tea brewed with tea leaves, milk and aromatic spices.",
            keywords: ["chai", "tea", "masala tea"]
        },
        {
            id: "lemonade",
            name: "Fresh Lemonade",
            category: "drinks",
            description: "A refreshing drink made with lemon juice, water and sugar or salt.",
            keywords: ["lemonade", "lemon", "juice"]
        },
        {
            id: "mango",
            name: "Mango Shake",
            category: "drinks",
            description: "A thick and sweet drink made by blending mangoes with milk.",
            keywords: ["mango", "shake", "milkshake"]
        },
        {
            id: "coffee",
            name: "Cold Coffee",
            category: "drinks",
            description: "Chilled coffee blended with milk and usually sugar, sometimes topped with ice cream.",
            keywords: ["coffee", "cold coffee", "caffeine"]
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

    // DISPLAY FOOD CARDS

    function displayFood(options) {

        foodResults.innerHTML = "";

        if (options.length === 0) {

            const message = document.createElement("div");
            message.className = "no-results";

            const heading = document.createElement("h3");
            heading.textContent = "No matching dishes found";

            const description = document.createElement("p");
            description.textContent =
                "Try another dish name or select a different category.";

            message.appendChild(heading);
            message.appendChild(description);

            foodResults.appendChild(message);
            return;
        }

        options.forEach(function (food) {

            const card = document.createElement("div");
            card.className = "food-card";

            const tag = document.createElement("span");
            tag.className = "food-tag";
            tag.textContent = food.category === "non-vegetarian"
                ? "Non-Vegetarian"
                : food.category.charAt(0).toUpperCase() +
                  food.category.slice(1);

            const title = document.createElement("h3");
            title.textContent = food.name;

            const description = document.createElement("p");
            description.textContent = food.description;

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
                food.category === selectedFilter;

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
                "<p>You haven't saved any favourite dishes yet.</p>";
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

    console.log("Food Menu Guide is ready!");

});