document.addEventListener("DOMContentLoaded", function () {

    // EVERYDAY LANGUAGE PHRASES

    const phrases = [

        // GREETINGS

        {
            id: 1,
            english: "Hello",
            hindi: "नमस्ते",
            punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
            hindiPronunciation: "Namaste",
            punjabiPronunciation: "Sat Sri Akaal",
            category: "greetings",
            situation: "Use when meeting someone for the first time.",
            keywords: ["hi", "hey", "greeting"]
        },
        {
            id: 2,
            english: "How are you?",
            hindi: "आप कैसे हैं?",
            punjabi: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
            hindiPronunciation: "Aap kaise hain?",
            punjabiPronunciation: "Tusi kiven ho?",
            category: "greetings",
            situation: "Use when asking someone how they are.",
            keywords: ["how are you", "kaise ho"]
        },
        {
            id: 3,
            english: "Thank you",
            hindi: "धन्यवाद",
            punjabi: "ਧੰਨਵਾਦ",
            hindiPronunciation: "Dhanyavaad",
            punjabiPronunciation: "Dhanvaad",
            category: "greetings",
            situation: "Use to show appreciation.",
            keywords: ["thanks", "thank"]
        },
        {
            id: 4,
            english: "Please",
            hindi: "कृपया",
            punjabi: "ਕਿਰਪਾ ਕਰਕੇ",
            hindiPronunciation: "Kripya",
            punjabiPronunciation: "Kirpa karke",
            category: "greetings",
            situation: "Use when making a polite request.",
            keywords: ["request"]
        },
        {
            id: 5,
            english: "Sorry",
            hindi: "माफ़ कीजिए",
            punjabi: "ਮਾਫ਼ ਕਰਨਾ",
            hindiPronunciation: "Maaf kijiye",
            punjabiPronunciation: "Maaf karna",
            category: "greetings",
            situation: "Use when apologising.",
            keywords: ["apology", "excuse me"]
        },

        // CAMPUS

        {
            id: 6,
            english: "Where is the library?",
            hindi: "लाइब्रेरी कहाँ है?",
            punjabi: "ਲਾਇਬ੍ਰੇਰੀ ਕਿੱਥੇ ਹੈ?",
            hindiPronunciation: "Library kahan hai?",
            punjabiPronunciation: "Library kithe hai?",
            category: "campus",
            situation: "Use when asking someone for directions to the library.",
            keywords: ["library", "books", "location"]
        },
        {
            id: 7,
            english: "Where is my classroom?",
            hindi: "मेरा क्लासरूम कहाँ है?",
            punjabi: "ਮੇਰਾ ਕਲਾਸਰੂਮ ਕਿੱਥੇ ਹੈ?",
            hindiPronunciation: "Mera classroom kahan hai?",
            punjabiPronunciation: "Mera classroom kithe hai?",
            category: "campus",
            situation: "Use when looking for your classroom.",
            keywords: ["class", "classroom", "room"]
        },
        {
            id: 8,
            english: "I am a new student.",
            hindi: "मैं नया छात्र हूँ।",
            punjabi: "ਮੈਂ ਨਵਾਂ ਵਿਦਿਆਰਥੀ ਹਾਂ।",
            hindiPronunciation: "Main naya chhatra hoon.",
            punjabiPronunciation: "Main nava vidyarthi haan.",
            category: "campus",
            situation: "Use when introducing yourself on campus.",
            keywords: ["new student", "introduction"]
        },
        {
            id: 9,
            english: "Can you help me?",
            hindi: "क्या आप मेरी मदद कर सकते हैं?",
            punjabi: "ਕੀ ਤੁਸੀਂ ਮੇਰੀ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?",
            hindiPronunciation: "Kya aap meri madad kar sakte hain?",
            punjabiPronunciation: "Ki tusi meri madad kar sakde ho?",
            category: "campus",
            situation: "Use when you need assistance.",
            keywords: ["help", "assistance"]
        },
        {
            id: 10,
            english: "Where is the office?",
            hindi: "ऑफिस कहाँ है?",
            punjabi: "ਦਫ਼ਤਰ ਕਿੱਥੇ ਹੈ?",
            hindiPronunciation: "Office kahan hai?",
            punjabiPronunciation: "Daftar kithe hai?",
            category: "campus",
            situation: "Use when asking for the university office.",
            keywords: ["office", "administration"]
        },

        // FOOD

        {
            id: 11,
            english: "I would like some food.",
            hindi: "मुझे खाना चाहिए।",
            punjabi: "ਮੈਨੂੰ ਖਾਣਾ ਚਾਹੀਦਾ ਹੈ।",
            hindiPronunciation: "Mujhe khana chahiye.",
            punjabiPronunciation: "Mainu khana chahida hai.",
            category: "food",
            situation: "Use when asking for something to eat.",
            keywords: ["food", "hungry", "eat"]
        },
        {
            id: 12,
            english: "How much does this cost?",
            hindi: "इसकी कीमत कितनी है?",
            punjabi: "ਇਸ ਦੀ ਕੀਮਤ ਕਿੰਨੀ ਹੈ?",
            hindiPronunciation: "Iski keemat kitni hai?",
            punjabiPronunciation: "Is di keemat kinni hai?",
            category: "food",
            situation: "Use when asking the price of something.",
            keywords: ["price", "cost", "money"]
        },
        {
            id: 13,
            english: "I want water.",
            hindi: "मुझे पानी चाहिए।",
            punjabi: "ਮੈਨੂੰ ਪਾਣੀ ਚਾਹੀਦਾ ਹੈ।",
            hindiPronunciation: "Mujhe paani chahiye.",
            punjabiPronunciation: "Mainu paani chahida hai.",
            category: "food",
            situation: "Use when asking for drinking water.",
            keywords: ["water", "drink"]
        },
        {
            id: 14,
            english: "Is this vegetarian?",
            hindi: "क्या यह शाकाहारी है?",
            punjabi: "ਕੀ ਇਹ ਸ਼ਾਕਾਹਾਰੀ ਹੈ?",
            hindiPronunciation: "Kya yeh shakahari hai?",
            punjabiPronunciation: "Ki eh shakahari hai?",
            category: "food",
            situation: "Use when checking whether food is vegetarian.",
            keywords: ["vegetarian", "veg", "food"]
        },

        // SHOPPING

        {
            id: 15,
            english: "Where is the market?",
            hindi: "बाज़ार कहाँ है?",
            punjabi: "ਬਾਜ਼ਾਰ ਕਿੱਥੇ ਹੈ?",
            hindiPronunciation: "Bazaar kahan hai?",
            punjabiPronunciation: "Bazaar kithe hai?",
            category: "shopping",
            situation: "Use when asking where to shop.",
            keywords: ["market", "shop", "shopping"]
        },
        {
            id: 16,
            english: "Can you reduce the price?",
            hindi: "क्या आप कीमत कम कर सकते हैं?",
            punjabi: "ਕੀ ਤੁਸੀਂ ਕੀਮਤ ਘਟਾ ਸਕਦੇ ਹੋ?",
            hindiPronunciation: "Kya aap keemat kam kar sakte hain?",
            punjabiPronunciation: "Ki tusi keemat ghata sakde ho?",
            category: "shopping",
            situation: "Use when politely asking for a discount.",
            keywords: ["discount", "bargain", "price"]
        },

        // TRANSPORT

        {
            id: 17,
            english: "Where can I get a taxi?",
            hindi: "मुझे टैक्सी कहाँ मिलेगी?",
            punjabi: "ਮੈਨੂੰ ਟੈਕਸੀ ਕਿੱਥੋਂ ਮਿਲੇਗੀ?",
            hindiPronunciation: "Mujhe taxi kahan milegi?",
            punjabiPronunciation: "Mainu taxi kithon milegi?",
            category: "transport",
            situation: "Use when looking for a taxi or cab.",
            keywords: ["taxi", "cab", "travel"]
        },
        {
            id: 18,
            english: "Please take me to the university.",
            hindi: "कृपया मुझे विश्वविद्यालय ले चलिए।",
            punjabi: "ਕਿਰਪਾ ਕਰਕੇ ਮੈਨੂੰ ਯੂਨੀਵਰਸਿਟੀ ਲੈ ਚੱਲੋ।",
            hindiPronunciation: "Kripya mujhe university le chaliye.",
            punjabiPronunciation: "Kirpa karke mainu university lai chalo.",
            category: "transport",
            situation: "Use when telling a driver your destination.",
            keywords: ["university", "destination", "ride"]
        }
    ];

    // GET HTML ELEMENTS

    const phraseSearch = document.getElementById("phraseSearch");
    const phraseSearchBtn = document.getElementById("phraseSearchBtn");
    const phraseResults = document.getElementById("phraseResults");
    const filterButtons = document.querySelectorAll(".phrase-filter");

    if (!phraseSearch || !phraseSearchBtn || !phraseResults) {
        console.error("Language page elements are missing.");
        return;
    }

    let selectedCategory = "all";
    let practiceMode = false;
    let revealedPhrases = [];

    // SPEAK A PHRASE

    function speakPhrase(text, language) {
    if (!("speechSynthesis" in window)) {
        alert("Text-to-speech is not supported in this browser.");
        return;
    }

    const synth = window.speechSynthesis;
    const prefix = language.split("-")[0].toLowerCase();

    function playWhenReady() {
        const voices = synth.getVoices();

        const matchingVoice = voices.find(function (voice) {
            return voice.lang.toLowerCase().startsWith(prefix);
        });

        if (!matchingVoice) {
            const languageName = prefix === "hi" ? "Hindi" : "Punjabi";

            alert(
                languageName +
                " voice is not available. Please check your device's " +
                "Text-to-speech settings."
            );
            return;
        }

        synth.cancel();

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = language;
        speech.voice = matchingVoice;
        speech.rate = 0.85;

        synth.speak(speech);
    }

    if (synth.getVoices().length > 0) {
        playWhenReady();
    } else {
        synth.addEventListener("voiceschanged", function onVoicesChanged() {
            synth.removeEventListener("voiceschanged", onVoicesChanged);
            playWhenReady();
        }, { once: true });

        synth.getVoices();
    }
}

    // DISPLAY PHRASES

    function displayPhrases(list) {

        phraseResults.innerHTML = "";

        if (list.length === 0) {
            phraseResults.innerHTML = `
                <div class="no-phrases">
                    <h3>No matching phrases found</h3>
                    <p>Try another word or select a different category.</p>
                </div>
            `;
            return;
        }

        list.forEach(function (phrase) {

            const card = document.createElement("div");
            card.className = "phrase-card";

            const category = document.createElement("span");
            category.className = "phrase-category";
            category.textContent = phrase.category;

            const english = document.createElement("h3");
            english.textContent = phrase.english;

            const situation = document.createElement("p");
            situation.textContent = "When to use: " + phrase.situation;

            const translationBox = document.createElement("div");
            translationBox.className = "translation-box";

            const hindi = document.createElement("p");
            hindi.className = "phrase-translation";
            hindi.textContent = "Hindi: " + phrase.hindi;

            const hindiPronunciation = document.createElement("p");
            hindiPronunciation.className = "phrase-pronunciation";
            hindiPronunciation.textContent =
                "Pronunciation: " + phrase.hindiPronunciation;

            const punjabi = document.createElement("p");
            punjabi.className = "phrase-translation";
            punjabi.textContent = "Punjabi: " + phrase.punjabi;

            const punjabiPronunciation = document.createElement("p");
            punjabiPronunciation.className = "phrase-pronunciation";
            punjabiPronunciation.textContent =
                "Pronunciation: " + phrase.punjabiPronunciation;

            translationBox.appendChild(hindi);
            translationBox.appendChild(hindiPronunciation);
            translationBox.appendChild(punjabi);
            translationBox.appendChild(punjabiPronunciation);

            const revealButton = document.createElement("button");
            revealButton.className = "copy-phrase-btn";

            const isRevealed = revealedPhrases.includes(phrase.id);

            translationBox.style.display =
                isRevealed ? "block" : "none";

            revealButton.textContent =
                isRevealed ? "Hide Translation" : "Show Translation";

            revealButton.addEventListener("click", function () {

                if (revealedPhrases.includes(phrase.id)) {
                    revealedPhrases = revealedPhrases.filter(
                        id => id !== phrase.id
                    );
                } else {
                    revealedPhrases.push(phrase.id);
                }

                displayPhrases(list);
            });

            // LISTEN BUTTONS

            const listenHindi = document.createElement("button");
            listenHindi.className = "copy-phrase-btn";
            listenHindi.textContent = "🔊 Listen Hindi";

            listenHindi.addEventListener("click", function () {
                speakPhrase(phrase.hindi, "hi-IN");
            });

            const listenPunjabi = document.createElement("button");
            listenPunjabi.className = "copy-phrase-btn";
            listenPunjabi.textContent = "🔊 Listen Punjabi";

            listenPunjabi.addEventListener("click", function () {
                speakPhrase(phrase.punjabi, "pa-IN");
            });

            // COPY BUTTON

            const copyButton = document.createElement("button");
            copyButton.className = "copy-phrase-btn";
            copyButton.textContent = "Copy Translation";

            copyButton.addEventListener("click", async function () {

                const textToCopy =
                    phrase.english + "\n" +
                    "Hindi: " + phrase.hindi + "\n" +
                    "Punjabi: " + phrase.punjabi;

                try {
                    await navigator.clipboard.writeText(textToCopy);
                    copyButton.textContent = "Copied!";
                } catch (error) {
                    copyButton.textContent = "Copy unavailable";
                }

                setTimeout(function () {
                    copyButton.textContent = "Copy Translation";
                }, 1500);
            });

            card.appendChild(category);
            card.appendChild(english);
            card.appendChild(situation);
            card.appendChild(translationBox);
            card.appendChild(revealButton);
            card.appendChild(listenHindi);
            card.appendChild(listenPunjabi);
            card.appendChild(copyButton);

            phraseResults.appendChild(card);
        });
    }

    // SEARCH PHRASES

    function searchPhrases() {

        const searchTerm = phraseSearch.value.toLowerCase().trim();

        const filteredPhrases = phrases.filter(function (phrase) {

            const searchableText = [
                phrase.english,
                phrase.hindi,
                phrase.punjabi,
                phrase.hindiPronunciation,
                phrase.punjabiPronunciation,
                ...phrase.keywords
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                phrase.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        displayPhrases(filteredPhrases);
    }

    // SEARCH EVENTS

    phraseSearchBtn.addEventListener("click", searchPhrases);
    phraseSearch.addEventListener("input", searchPhrases);

    phraseSearch.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchPhrases();
        }
    });

    // CATEGORY FILTERS

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory = button.dataset.category;

            searchPhrases();
        });
    });

    // PRACTICE MODE

    const practiceButton = document.createElement("button");
    practiceButton.id = "practiceModeBtn";
    practiceButton.className = "copy-phrase-btn";
    practiceButton.textContent = "Start Practice Mode";

    phraseResults.parentElement.insertBefore(
        practiceButton,
        phraseResults
    );

    practiceButton.addEventListener("click", function () {

        practiceMode = !practiceMode;
        revealedPhrases = [];

        practiceButton.textContent = practiceMode
            ? "Exit Practice Mode"
            : "Start Practice Mode";

        if (practiceMode) {
            alert("Practice mode started! Try guessing the translations before revealing them.");
        }

        searchPhrases();
    });

    // INITIAL DISPLAY

    displayPhrases(phrases);

    console.log("Interactive Language Help is ready!");

});