const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    const input = document.getElementById("input");
    const inputValue = input.value.trim();

  
    if (!inputValue) {
        result.innerHTML = `<h4 class="error">Please enter a valid word</h4>`;
        sound.setAttribute("src", "");
        return;
    }


    result.innerHTML = `<h4 class="loading">Loading...</h4>`;
    btn.disabled = true;


    fetch(`${url}${inputValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            result.innerHTML = `
            <div class="word">
                <h3>${inputValue}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic || "Phonetics unavailable"}</p>
            </div>
            <p class="word-meaning">
               ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "Example unavailable"}
            </p>
            `;

            const audioUrl = (data[0].phonetics[0]?.audio||data[0].phonetics[1]?.audio )|| "";
            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                sound.setAttribute("src", ""); // Reset audio if not available
                result.innerHTML += `<p class="error">Pronunciation audio not available</p>`;
            }
        })
        .catch(err => {
            result.innerHTML = `<h4 class="error">${err.message}</h4>`;
            sound.setAttribute("src", ""); 
        })
        .finally(() => {
            btn.disabled = false;
        });
});

// Play sound function
function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("Pronunciation audio not available.");
    }
}
