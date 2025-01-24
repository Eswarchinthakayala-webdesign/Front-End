const emojis = ["😄", "😃", "😂", "😅", "😉", "😜"];
const button = document.querySelector("#button");
const emojiHead = document.querySelector("#head-emoji");
const punchBtn = document.querySelector("#punch-btn");

punchBtn.style.display = "none";

button.addEventListener("click", () => {
  
    let emojiIndex = Math.floor(Math.random() * emojis.length);
    emojiHead.innerHTML = emojis[emojiIndex];

    emojiHead.style.transform = "scale(1.2)";
    setTimeout(() => {
        emojiHead.style.transform = "scale(1)";
    }, 300);

    
    let joke = document.querySelector("#joke");
    let punch = document.querySelector("#punch");
    punch.innerHTML = "..."; 
    punchBtn.style.display = "none"; 

    fetch("https://official-joke-api.appspot.com/random_joke")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch a joke.");
            }
            return response.json();
        })
        .then((data) => {
            joke.innerHTML = data.setup;
            joke.style.color="#bb86fc"
            button.innerHTML="Joke Generated"
            button.disabled=true;
            punchBtn.style.display = "block"; 
            punchBtn.disabled = false; 
            punchBtn.style.cursor = "pointer";
            punch.innerHTML=`Click "Show Punchline"`;

            punchBtn.onclick = () => {
                punch.innerHTML = data.punchline;
                punch.style.color="#74f456"
                punchBtn.disabled = true; 
                button.innerHTML="Get Random Joke"
                

                punchBtn.style.cursor = "not-allowed";

                setTimeout(()=>
                {
                    punch.innerHTML=". . . . . . . . . . . . . . . . . . . . .  "
                    joke.innerHTML=`Click "Get Random Joke" to see a joke!`
                    button.disabled=false
                    joke.style.color="#ff7597"
                    punch.style.color="#ff7597"
                    punchBtn.style.display = "none";

                },3000)
            };
        })
        .catch((error) => {
            joke.innerHTML = "Oops! Something went wrong. Try again.";
            punch.innerHTML = "";
        });
});
