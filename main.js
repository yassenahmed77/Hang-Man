let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let countDown = 0;
// Catch Letters Selector In Html
let letterParent = document.querySelector(".letters");
let container = document.querySelector(".container");
// All Draw Parts
// All Draw Parts in order of appearance
let drawParts = [
    document.querySelector(".draw"),
    document.querySelector(".stand"),
    document.querySelector(".hang"), 
    document.querySelector(".rope"),
    document.querySelector(".head"),
    document.querySelector(".body"),
    document.querySelector(".hands"),
    document.querySelector(".legs")
];
// Generate Letters
lettersArray.forEach((letter) => {
    let letterDiv = document.createElement("div");
    letterDiv.textContent = letter
    letterDiv.className="letter";
    letterParent.appendChild(letterDiv);
});
// Words And Categories
let words = {
    programming : ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    people : ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries : ["Syria", "Palestine", "United States", "Egypt", "Thailand", "Qatar"],
    fighters : ["Max Holloway", "Islam Makhachev", "Khabib","Justin Gaethje", "Dustin Porier","Khalil Routree Jr"]
};
// Get Random Category
let keys = Object.keys(words);
let num = Math.trunc(Math.random() * keys.length);
let category = keys[num];
// Add Category To The Game
let cat = document.querySelector(".category");
cat.textContent = category;
// Get Random Word From The Category
let wordNum = Math.trunc(Math.random() * words[category].length);
let randomWord = words[category][wordNum];
// Get Random Word Letters
let wordLetters = randomWord.toLowerCase().split("");
// Create Span With Random Word Letters
let spanParent = document.querySelector(".chosen-letters");
wordLetters.forEach((letter) => {
    let span = document.createElement("span");
    // span.textContent = letter;
    if(letter === " "){
        span.className = "space";
    }
    spanParent.appendChild(span);
});
// Letters OnClick FUNCTION
let showWord = document.querySelectorAll(".chosen-letters span");
letterParent.addEventListener("click",(e) => {
    let theStatus = false;
    // Clicked Letter
    let letter = e.target.textContent.toLowerCase();
    if(e.target.className === "letter"){
        e.target.classList.add("clicked");
        // Loop In Word Letters
        wordLetters.forEach((wordLetter,index) => {
            if(letter === wordLetter){
                theStatus = true;
                showWord[index].textContent = wordLetter;
            }
        });
        if(theStatus === true){
        checkWin();
        };
        // If Wrong Letter Was Clicked
        if(theStatus === false){
            countDown++;
            if (countDown <= drawParts.length) {
                drawParts[countDown - 1].style.display = "block";
            };
            if (countDown === drawParts.length) {
                container.innerHTML = `
                <div class="final-message">Game Over, The Word Is ${randomWord}</div>
                <button class="play-again">Play Again?</button>
                `;
            };
        };
    };
});
// If Word Was Successfully Guessed Function
function checkWin(){
    let finished = true;
    showWord.forEach((span) => {
        if(span.textContent === "" && !span.classList.contains("space")){
            finished = false
        };
    })
    if(finished) {
        container.innerHTML = `<div class="final-message">You Won!! The Word Is ${randomWord}</div>
        <button class="play-again">Play Again?</button>`;
    };
}
// Play Again Buttom
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("play-again")){
        location.reload();
    }
});
