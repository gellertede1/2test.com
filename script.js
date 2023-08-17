document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("message-form");
    const displaySection = document.getElementById("message-display");
    const displayMessage = document.getElementById("display-message");
    const timerDisplay = document.getElementById("timer-display");
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", function () {
        const message = document.getElementById("message").value;
        const futureDateInput = document.getElementById("future-date");
        const futureDateString = futureDateInput.value;

        if (!futureDateString) {
            alert("Please select a future date.");
            return;
        }

        const futureDate = new Date(futureDateString);

        if (futureDate <= new Date()) {
            alert("Please select a valid future date.");
            return;
        }

        const futureTime = futureDate.getTime();
        localStorage.setItem("futureTime", futureTime);

        messageForm.style.display = "none";
        displaySection.style.display = "block";

        updateCountdown();

        const countdownInterval = setInterval(updateCountdown, 1000);
    });

    function updateCountdown() {
        const savedFutureTime = parseInt(localStorage.getItem("futureTime"));
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(Math.floor((savedFutureTime - currentTime) / 1000), 0);

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            displayMessage.textContent = message;
            timerDisplay.style.display = "none";
        } else {
            const days = Math.floor(remainingTime / (60 * 60 * 24));
            const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
            const seconds = remainingTime % 60;

            timerDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    const savedFutureTime = parseInt(localStorage.getItem("futureTime"));

    if (!isNaN(savedFutureTime) && savedFutureTime > new Date().getTime()) {
        messageForm.style.display = "none";
        displaySection.style.display = "block";

        updateCountdown();

        const countdownInterval = setInterval(updateCountdown, 1000);
    }
});
