document.addEventListener("DOMContentLoaded", function () {

    const defaultTasks = [
        { id: "d1", title: "Confirm your admission", description: "Keep your admission confirmation and university details ready.", category: "before" },
        { id: "d2", title: "Arrange your travel", description: "Plan your journey and keep your travel details accessible.", category: "before" },
        { id: "d3", title: "Keep important documents", description: "Prepare your ID, admission letter and other required documents.", category: "before" },
        { id: "d4", title: "Check your accommodation", description: "Confirm your hostel or living arrangements.", category: "before" },
        { id: "d5", title: "Locate your classroom", description: "Find your academic block and classroom before classes begin.", category: "firstday" },
        { id: "d6", title: "Visit the university help desk", description: "Find out where to ask for assistance on campus.", category: "firstday" },
        { id: "d7", title: "Explore the campus", description: "Locate the library, food court and other important places.", category: "campus" },
        { id: "d8", title: "Save important contacts", description: "Keep university and emergency contact information accessible.", category: "campus" },
        { id: "d9", title: "Explore food options", description: "Find dining options that suit your preferences.", category: "settling" },
        { id: "d10", title: "Connect with other students", description: "Meet classmates and explore student communities.", category: "settling" },
        { id: "d11", title: "Understand campus facilities", description: "Explore student support services and available facilities.", category: "settling" },
        { id: "d12", title: "Create a daily routine", description: "Plan your classes, meals, study time and activities.", category: "settling" }
    ];

    const taskContainer = document.getElementById("checklistTasks");
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");
    const resetButton = document.getElementById("resetChecklist");
    const filterContainer = document.querySelector(".checklist-filters");

    const PROGRESS_KEY = "lpuArrivalChecklist";
    const CUSTOM_KEY = "lpuCustomChecklist";

    function loadData(key, fallback) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return Array.isArray(data) ? data : fallback;
        } catch (error) {
            return fallback;
        }
    }

    let completedTasks = loadData(PROGRESS_KEY, []);
    let customTasks = loadData(CUSTOM_KEY, []);
    let currentFilter = "all";

    // PERSONAL TASK INPUT
    const personalSection = document.createElement("section");
    personalSection.className = "personal-task-section";

    personalSection.innerHTML = `
        <h3>Make Your Own Checklist</h3>
        <p>Add personal tasks that are important for your journey and university life.</p>

        <form class="personal-task-form" id="personalTaskForm">
            <input
                type="text"
                id="personalTaskInput"
                placeholder="e.g. Buy a SIM card"
                maxlength="80"
                required
            >
            <button type="submit" id="addPersonalTask">
                + Add My Task
            </button>
        </form>
    `;

    const heading = document.querySelector(".checklist-heading");
    heading.insertAdjacentElement("afterend", personalSection);

    const personalForm = document.getElementById("personalTaskForm");
    const personalInput = document.getElementById("personalTaskInput");

    // ADD PERSONAL FILTER
    const personalFilter = document.createElement("button");
    personalFilter.className = "check-filter";
    personalFilter.dataset.filter = "personal";
    personalFilter.textContent = "My Tasks";

    filterContainer.appendChild(personalFilter);

    const filterButtons = document.querySelectorAll(".check-filter");

    function getAllTasks() {
        return [...defaultTasks, ...customTasks];
    }

    function saveProgress() {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedTasks));
        localStorage.setItem(CUSTOM_KEY, JSON.stringify(customTasks));
    }

    function updateProgress() {
        const allTasks = getAllTasks();
        const total = allTasks.length;
        const completed = allTasks.filter(task =>
            completedTasks.includes(task.id)
        ).length;

        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        progressText.textContent =
            `${completed} of ${total} tasks completed (${percentage}%)`;

        progressBar.style.width = percentage + "%";
    }

    function renderTasks() {
        taskContainer.innerHTML = "";

        let visibleTasks = getAllTasks();

        if (currentFilter === "personal") {
            visibleTasks = customTasks;
        } else if (currentFilter !== "all") {
            visibleTasks = visibleTasks.filter(task =>
                task.category === currentFilter
            );
        }

        if (visibleTasks.length === 0) {
            taskContainer.innerHTML =
                '<p class="no-tasks">No tasks here yet. Add your own task above!</p>';
            return;
        }

        visibleTasks.forEach(function (task) {
            const isCompleted = completedTasks.includes(task.id);

            const card = document.createElement("div");
            card.className = "task-card";

            if (isCompleted) {
                card.classList.add("completed");
            }

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = isCompleted;
            checkbox.setAttribute("aria-label", task.title);

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    if (!completedTasks.includes(task.id)) {
                        completedTasks.push(task.id);
                    }
                } else {
                    completedTasks = completedTasks.filter(
                        id => id !== task.id
                    );
                }

                saveProgress();
                renderTasks();
                updateProgress();
            });

            const info = document.createElement("div");
            info.className = "task-info";

            const title = document.createElement("h3");
            title.textContent = task.title;

            const description = document.createElement("p");
            description.textContent = task.description;

            info.appendChild(title);
            info.appendChild(description);

            card.appendChild(checkbox);
            card.appendChild(info);

            if (task.category === "personal") {
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-task";
                deleteButton.textContent = "Delete";
                deleteButton.type = "button";

                deleteButton.addEventListener("click", function () {
                    customTasks = customTasks.filter(
                        item => item.id !== task.id
                    );

                    completedTasks = completedTasks.filter(
                        id => id !== task.id
                    );

                    saveProgress();
                    renderTasks();
                    updateProgress();
                });

                card.appendChild(deleteButton);
            }

            taskContainer.appendChild(card);
        });
    }

    // ADD PERSONAL TASK
    personalForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskName = personalInput.value.trim();

        if (!taskName) {
            return;
        }

        const newTask = {
            id: "p" + Date.now(),
            title: taskName,
            description: "Your personal task.",
            category: "personal"
        };

        customTasks.push(newTask);

        saveProgress();

        personalInput.value = "";
        currentFilter = "personal";

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === "personal"
            );
        });

        renderTasks();
        updateProgress();
    });

    // FILTER TASKS
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            currentFilter = button.dataset.filter;

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            renderTasks();
        });
    });

    // RESET COMPLETED PROGRESS
    resetButton.addEventListener("click", function () {
        const confirmReset = confirm(
            "Reset all completed tasks? Your personal tasks will remain saved."
        );

        if (confirmReset) {
            completedTasks = [];
            saveProgress();
            renderTasks();
            updateProgress();
        }
    });

    renderTasks();
    updateProgress();

});