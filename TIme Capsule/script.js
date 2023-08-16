document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("message-form");
    const displaySection = document.getElementById("message-display");
    const displayMessage = document.getElementById("display-message");
    const timerDisplay = document.getElementById("timer-display");

    messageForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const message = document.getElementById("message").value;
        const timerMinutes = parseInt(document.getElementById("timer").value, 10);

        if (isNaN(timerMinutes) || timerMinutes <= 0) {
            alert("Please enter a valid timer value.");
            return;
        }

        // Hide the form and show the display section
        messageForm.style.display = "none";
        displaySection.style.display = "block";

        let remainingTime = timerMinutes * 60; // Convert minutes to seconds

        const countdownInterval = setInterval(function () {
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                displayMessage.textContent = message;
                timerDisplay.textContent = "Time's up!";
            } else {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;
                timerDisplay.textContent = `${minutes}m ${seconds}s`;
            }
            remainingTime--;
        }, 1000);
    });
});
