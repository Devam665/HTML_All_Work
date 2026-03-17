let randomNumber;
let attemptsLeft;
let score;

const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart');
const rotatingImage = document.getElementById('rotating-image');
const emojiElement = document.getElementById('emoji');

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    attemptsLeft = 10; // Reset attempts
    score = 0; // Reset score
    attemptsElement.textContent = attemptsLeft; // Update attempts display
    scoreElement.textContent = score; // Update score display
    messageElement.textContent = "Guess a number between 1 and 100"; // Reset message
    document.getElementById('submit').disabled = false; // Enable the submit button
    restartButton.style.display = 'none'; // Hide the restart button
    document.getElementById('guess').value = ''; // Clear the input field
    emojiElement.textContent = ''; // Clear emoji display
    rotatingImage.style.transform = 'rotate(0deg)'; // Reset image rotation
}

document.getElementById('submit').addEventListener('click', () => {
    const guess = Number(document.getElementById('guess').value); // Get the user's guess
    
    if (guess < 1 || guess > 100) {
        messageElement.textContent = "Please enter a number between 1 and 100."; // Input validation
        return;
    }

    attemptsLeft--; // Decrease attempts left
    attemptsElement.textContent = attemptsLeft; // Update attempts display

    // Rotate the image based on the guess
    rotatingImage.style.transform = `rotate(${guess * 3.6}deg)`; // Rotate image based on guess

    if (guess === randomNumber) {
        messageElement.textContent = "Congratulations! You've guessed the number!"; // Winning message
        score = Math.floor((attemptsLeft / 10) * 100); // Calculate score
        scoreElement.textContent = score; // Update score display
        emojiElement.textContent = "🎉"; // Show celebration emoji
        showCongratulationAnimation(); // Show congratulation animation
        endGame(); // End the game
    } else if (attemptsLeft === 0) {
        messageElement.textContent = `Game over! The number was ${randomNumber}.`; // Game over message
        emojiElement.textContent = "😢"; // Show sad emoji
        endGame(); // End the game
    } else {
        messageElement.textContent = guess < randomNumber ? "Too low!" : "Too high!"; // Hint message
    }
});

function endGame() {
    document.getElementById('submit').disabled = true; // Disable the submit button
    restartButton.style.display = 'block'; // Show the restart button
}

restartButton.addEventListener('click', startGame); // Restart the game when the button is clicked

// Start the game for the first time
startGame();

function showCongratulationAnimation() {
    const congratulationMessage = document.createElement('div');
    congratulationMessage.className = 'congratulation';
    congratulationMessage.textContent = "🎉 Congratulations! 🎉";
    document.body.appendChild(congratulationMessage);
    
    setTimeout(() => {
        document.body.removeChild(congratulationMessage);
    }, 3000); // Remove the congratulation message after 3 seconds
}