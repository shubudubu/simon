const btnColors = ["green", "red", "blue", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
let gameStarted = false;

// Start the game when the Start Game button is clicked
document.getElementById("start-btn").addEventListener("click", function() {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

// Handle button clicks
document.querySelectorAll(".btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        const userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

// Generate the next sequence
function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    updateLevelTitle();

    const randomColor = btnColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    flashSequence(gamePattern);
}

// Flash the sequence of colors
function flashSequence(pattern) {
    let i = 0;
    const intervalId = setInterval(function() {
        if (i === pattern.length) {
            clearInterval(intervalId);
        } else {
            const color = pattern[i];
            playSound(color);
            animatePress(color);
            i++;
        }
    }, 1000);
}

// Play a sound for a given color
function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Animate a button press
function animatePress(currentColor) {
    document.querySelector(`#${currentColor}`).classList.add("pressed");
    setTimeout(function() {
        document.querySelector(`#${currentColor}`).classList.remove("pressed");
    }, 100);
}

// Check the user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);
        document.querySelector("#message").textContent = "Game Over! Press Start Game to Restart";
        startOver();
    }
}

// Update the level title
function updateLevelTitle() {
    document.querySelector("#message").textContent = `Level ${level}`;
}

// Restart the game
function startOver() {
    level = 0;
    gamePattern.length = 0;
    gameStarted = false;
}

