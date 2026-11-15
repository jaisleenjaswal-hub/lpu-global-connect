/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});

// Close menu after selecting a section
document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
    });
});


/* =========================
   CAMPUS NAVIGATION
========================= */

// IMPORTANT:
// These are starter records, not a verified campus directory.
// Confirm exact locations and descriptions before your final demo.

const campusLocations = [
    {
        name: "Central Library",
        keywords: "library books study reading",
        details: "Campus library and study resources. Confirm the current block and route."
    },
    {
        name: "University Hospital",
        keywords: "hospital medical health doctor",
        details: "University healthcare facility. Confirm its current location and opening hours."
    },
    {
        name: "Uni-Centre",
        keywords: "uni centre shopping food banking",
        details: "Campus shopping and service area. Confirm the facilities available."
    },
    {
        name: "Innovation Studio",
        keywords: "innovation studio ideas",
        details: "Innovation and idea development facility. Confirm its current location."
    },
    {
        name: "Admission Block",
        keywords: "admission admissions enquiry registration",
        details: "Admission and enquiry-related services. Confirm the relevant office."
    },
    {
        name: "Main Auditorium",
        keywords: "auditorium events programmes",
        details: "Venue for university events. Confirm the exact building and entrance."
    }
];

const locationSearch = document.getElementById("locationSearch");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");


function searchLocation() {

    const searchText = locationSearch.value.trim().toLowerCase();

    if (searchText === "") {
        searchResults.innerHTML =
            "<p>Please enter a location to search.</p>";
        return;
    }

    const results = campusLocations.filter(function(location) {

        return (
            location.name.toLowerCase().includes(searchText) ||
            location.keywords.toLowerCase().includes(searchText)
        );

    });

    if (results.length > 0) {

        searchResults.innerHTML = "";

        results.forEach(function(location) {

            searchResults.innerHTML += `
                <div class="location-card">
                    <h3>${location.name}</h3>
                    <p>${location.details}</p>
                </div>
            `;

        });

    } else {

        searchResults.innerHTML = `
            <p>No matching location found.</p>
            <p>Try another name or ask the campus help desk.</p>
        `;

    }
}

searchBtn.addEventListener("click", searchLocation);

locationSearch.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchLocation();
    }

});


/* =========================
   FOOD AND DINING
========================= */

// General information cards.
// They do not certify that a particular meal is suitable.

const foodInformation = [
    {
        title: "Vegetarian Options",
        category: "vegetarian",
        description: "Ask whether a dish contains meat, fish, eggs or animal-based ingredients."
    },
    {
        title: "Vegan Options",
        category: "vegan",
        description: "Ask whether a dish contains milk, butter, cheese, eggs or other animal-derived ingredients."
    },
    {
        title: "Allergy Awareness",
        category: "allergy",
        description: "Always tell the food provider about your allergy and ask about ingredients and cross-contact."
    },
    {
        title: "Halal Information",
        category: "halal",
        description: "Ask the food provider about the ingredients, preparation and relevant certification."
    },
    {
        title: "Ingredient Information",
        category: "allergy",
        description: "Ask for a complete ingredient list whenever you are unsure about a food item."
    },
    {
        title: "Dietary Preferences",
        category: "vegetarian",
        description: "Clearly communicate your dietary requirements before ordering."
    }
];

const foodFilter = document.getElementById("foodFilter");
const foodResults = document.getElementById("foodResults");


function displayFoodInformation() {

    const selectedCategory = foodFilter.value;

    const filteredFood = foodInformation.filter(function(item) {

        return (
            selectedCategory === "all" ||
            item.category === selectedCategory
        );

    });

    foodResults.innerHTML = "";

    filteredFood.forEach(function(item) {

        foodResults.innerHTML += `
            <div class="food-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

    });

}

foodFilter.addEventListener("change", displayFoodInformation);

// Show all food information when page opens
displayFoodInformation();


/* =========================
   COPY COMMUNICATION PHRASES
========================= */

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach(function(button) {

    button.addEventListener("click", async function() {

        const textToCopy = button.getAttribute("data-copy");

        const messageArea = button.closest("#food")
            ? document.getElementById("copyMessage")
            : document.getElementById("languageCopyMessage");

        try {

            await navigator.clipboard.writeText(textToCopy);

            messageArea.textContent = "Message copied successfully!";

        } catch (error) {

            messageArea.textContent =
                "Copy unavailable here. Please select and copy the message manually.";

        }

    });

});


/* =========================
   ONBOARDING CHECKLIST
========================= */

const tasks = document.querySelectorAll(".task");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const resetChecklist = document.getElementById("resetChecklist");

const STORAGE_KEY = "globalConnectChecklist";


function saveChecklist() {

    const taskStatus = [];

    tasks.forEach(function(task) {
        taskStatus.push(task.checked);
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskStatus));

}


function updateProgress() {

    let completedTasks = 0;

    tasks.forEach(function(task) {

        if (task.checked) {
            completedTasks++;
        }

    });

    const totalTasks = tasks.length;

    const percentage = Math.round(
        (completedTasks / totalTasks) * 100
    );

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        percentage + "% completed (" +
        completedTasks + "/" + totalTasks + ")";

    saveChecklist();

}


// Load previously saved checklist
function loadChecklist() {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {

        try {

            const taskStatus = JSON.parse(savedData);

            tasks.forEach(function(task, index) {

                task.checked = Boolean(taskStatus[index]);

            });

        } catch (error) {

            localStorage.removeItem(STORAGE_KEY);

        }

    }

    updateProgress();

}


// Update whenever a task is checked
tasks.forEach(function(task) {

    task.addEventListener("change", updateProgress);

});


// Reset all tasks
resetChecklist.addEventListener("click", function() {

    const confirmReset = confirm(
        "Are you sure you want to reset your checklist?"
    );

    if (confirmReset) {

        tasks.forEach(function(task) {
            task.checked = false;
        });

        updateProgress();

    }

});

loadChecklist();

function showSupportInfo(type) {

  const messages = {
    community: "Explore university clubs, student groups and campus events to connect with other students.",

    buddy: "Ask experienced students for guidance about campus facilities, classes and everyday university life.",

    support: "For academic assistance, contact your faculty or relevant university office. For personal support, seek help from the appropriate university counselling service.",

    assistant: "Explore your university library, academic offices, student services and other campus facilities."
  };

  alert(messages[type]);
}



/* =========================
   END OF JAVASCRIPT
========================= */

console.log("LPU Global Connect website loaded successfully!");
