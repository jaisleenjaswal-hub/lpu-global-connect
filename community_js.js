document.addEventListener("DOMContentLoaded", function () {

    // 1. GET HTML ELEMENTS
    const connectForm = document.getElementById("connectForm");
    const studentPosts = document.getElementById("studentPosts");
    const formMessage = document.getElementById("formMessage");
    const authPanelMount = document.getElementById("authPanelMount");
    const connectFormArea = document.getElementById("connectFormArea");

    // 2. MOVE LOGIN PANEL BELOW NAVBAR
    const communityHero = document.querySelector(".community-hero");

    if (authPanelMount && communityHero) {
        communityHero.parentNode.insertBefore(
            authPanelMount,
            communityHero
        );
    }

    // 3. GET SUPABASE CLIENT
    const db = supabaseClient;

    // 4. CREATE LOGIN PANEL
    const authPanel = document.createElement("section");
    authPanel.className = "community-auth-panel";

    authPanel.innerHTML = `
        <h3>Student Account</h3>
        <p id="authStatus">Please sign in to share your introduction.</p>

        <input type="email" id="authEmail"
            placeholder="Your email address">

        <input type="password" id="authPassword"
            placeholder="Password (minimum 8 characters)">

        <div class="auth-buttons">
            <button type="button" id="signupBtn">Create Account</button>
            <button type="button" id="loginBtn">Sign In</button>
            <button type="button" id="logoutBtn" hidden>Sign Out</button>
        </div>

        <p id="authMessage" role="status"></p>
    `;

    authPanelMount.appendChild(authPanel);

    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");
    const authStatus = document.getElementById("authStatus");
    const authMessage = document.getElementById("authMessage");

    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    let currentUser = null;

    // 5. SIGN UP
    signupBtn.addEventListener("click", async function () {

        const email = authEmail.value.trim();
        const password = authPassword.value;

        if (!email || password.length < 8) {
            authMessage.textContent =
                "Enter a valid email and password of at least 8 characters.";
            return;
        }

        authMessage.textContent = "Creating your account...";

        const { data, error } = await db.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            authMessage.textContent = error.message;
            return;
        }

        if (!data.session) {
            authMessage.textContent =
                "Account created! Please check your email and confirm your account before signing in.";
        } else {
            authMessage.textContent = "Account created successfully!";
        }
    });

    // 6. SIGN IN
    loginBtn.addEventListener("click", async function () {

        const email = authEmail.value.trim();
        const password = authPassword.value;

        if (!email || !password) {
            authMessage.textContent =
                "Please enter your email and password.";
            return;
        }

        authMessage.textContent = "Signing in...";
        loginBtn.disabled = true;

        try {
            const { data, error } = await db.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                authMessage.textContent = error.message;
                return;
            }

            updateAuthDisplay(data.user);
            authMessage.textContent = "Signed in successfully!";
            await displayIntroductions();

        } catch (err) {
            authMessage.textContent =
                "Connection error. Please refresh and try again.";
            console.error("Sign in error:", err);

        } finally {
            loginBtn.disabled = false;
        }
    });

    // 7. SIGN OUT
    logoutBtn.addEventListener("click", async function () {

        const { error } = await db.auth.signOut();

        if (error) {
            authMessage.textContent = error.message;
        }
    });

    // 8. UPDATE LOGIN DISPLAY
    function updateAuthDisplay(user) {

        currentUser = user;

        if (user) {

            authStatus.textContent = "Signed in as " + user.email;

            signupBtn.hidden = true;
            loginBtn.hidden = true;
            logoutBtn.hidden = false;

            authEmail.hidden = true;
            authPassword.hidden = true;

            connectFormArea.hidden = false;

        } else {

            authStatus.textContent =
                "Please sign in to share your introduction.";

            signupBtn.hidden = false;
            loginBtn.hidden = false;
            logoutBtn.hidden = true;

            authEmail.hidden = false;
            authPassword.hidden = false;

            connectFormArea.hidden = true;
        }
    }

    // 9. DISPLAY INTRODUCTIONS FROM SUPABASE
    async function displayIntroductions() {

        studentPosts.innerHTML = "<p>Loading introductions...</p>";

        const { data, error } = await db
            .from("student_introductions")
            .select("*")
            .eq("is_public", true)
            .order("created_at", { ascending: false });

        if (error) {
            studentPosts.textContent =
                "Could not load introductions: " + error.message;
            return;
        }

        studentPosts.innerHTML = "";

        if (!data || data.length === 0) {
            studentPosts.innerHTML =
                '<p class="empty-posts">No introductions yet. Be the first to share!</p>';
            return;
        }

        data.forEach(function (post) {

            const card = document.createElement("div");
            card.className = "student-post";

            const name = document.createElement("h4");
            name.textContent = post.display_name;

            const country = document.createElement("p");
            country.textContent = "🌍 " + post.country;

            const message = document.createElement("p");
            message.textContent = post.message;

            const category = document.createElement("span");
            category.className = "post-category";
            category.textContent = post.interest;

            card.appendChild(name);
            card.appendChild(country);
            card.appendChild(message);
            card.appendChild(category);

            // ONLY THE OWNER CAN DELETE THEIR POST
            if (currentUser && currentUser.id === post.user_id) {

                const deleteButton = document.createElement("button");

                deleteButton.type = "button";
                deleteButton.textContent = "Delete My Post";
                deleteButton.className = "delete-post-btn";

                deleteButton.addEventListener("click", async function () {

                    const confirmDelete = confirm(
                        "Are you sure you want to delete this introduction?"
                    );

                    if (!confirmDelete) return;

                    const { error } = await db
                        .from("student_introductions")
                        .delete()
                        .eq("id", post.id)
                        .eq("user_id", currentUser.id);

                    if (error) {
                        alert("Could not delete post: " + error.message);
                        return;
                    }

                    displayIntroductions();
                });

                card.appendChild(deleteButton);
            }

            studentPosts.appendChild(card);
        });
    }

    // 10. SUBMIT INTRODUCTION
    connectForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!currentUser) {
            formMessage.textContent =
                "Please sign in before sharing your introduction.";
            return;
        }

        const name = document.getElementById("studentName").value.trim();
        const country = document.getElementById("studentCountry").value.trim();
        const category = document.getElementById("connectionType").value;
        const message = document.getElementById("studentMessage").value.trim();

        if (!name || !country || !category || !message) {
            formMessage.textContent =
                "Please fill in all the fields.";
            return;
        }

        if (
            name.length < 2 || name.length > 40 ||
            country.length < 2 || country.length > 60 ||
            category.length < 2 || category.length > 60 ||
            message.length < 5 || message.length > 300
        ) {
            formMessage.textContent =
                "Please check the length of your entries.";
            return;
        }

        formMessage.textContent = "Publishing your introduction...";

        const { error } = await db
            .from("student_introductions")
            .insert({
                user_id: currentUser.id,
                display_name: name,
                country: country,
                interest: category,
                message: message,
                is_public: true
            });

        if (error) {
            formMessage.textContent =
                "Could not publish: " + error.message;
            return;
        }

        connectForm.reset();

        formMessage.textContent =
            "Your introduction has been published successfully!";

        displayIntroductions();
    });

    // 11. LISTEN FOR LOGIN CHANGES
    db.auth.onAuthStateChange(function (event, session) {

        updateAuthDisplay(session ? session.user : null);

        displayIntroductions();
    });

    // 12. INITIAL LOAD
    async function initializeCommunity() {

        const { data, error } = await db.auth.getSession();

        if (error) {
            authMessage.textContent = error.message;
            return;
        }

        updateAuthDisplay(
            data.session ? data.session.user : null
        );

        displayIntroductions();
    }

    initializeCommunity();

    console.log("Supabase Community Board loaded!");

});


// 13. SUPPORT DIRECTORY SEARCH
document.addEventListener("DOMContentLoaded", function () {

    const supportSearch = document.getElementById("supportSearch");
    const supportMessage = document.getElementById("supportSearchMessage");
    const supportCards = document.querySelectorAll(".support-card");

    if (supportSearch) {

        supportSearch.addEventListener("input", function () {

            const searchText = supportSearch.value
                .trim()
                .toLowerCase();

            let visibleCount = 0;

            supportCards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();
                const matches = cardText.includes(searchText);

                card.style.display = matches ? "" : "none";

                if (matches) visibleCount++;
            });

            if (visibleCount === 0) {
                supportMessage.textContent =
                    "No matching help options found. Try another search.";
            } else {
                supportMessage.textContent =
                    searchText === "" ? "" :
                    visibleCount + " matching option(s) found.";
            }
        });
    }
});