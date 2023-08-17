document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("message-form");
    const displaySection = document.getElementById("message-display");
    const displayMessage = document.getElementById("display-message");
    const timerContainer = document.getElementById("timer-container");
    const timerDisplay = document.getElementById("timer-display");
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", function () {
        const message = document.getElementById("message").value;
        const futureDate = new Date(document.getElementById("future-date").value);

        if (isNaN(futureDate.getTime()) || futureDate <= new Date()) {
            alert("Please select a valid future date.");
            return;
        }

        // Save data to local storage
        saveDataToLocalStorage(message, futureDate.getTime());

        messageForm.style.display = "none";
        displaySection.style.display = "block";

        const countdownInterval = setInterval(function () {
            const currentTime = new Date();
            const savedFutureDate = new Date(parseInt(getDataFromLocalStorage("futureDate")));
            const timeDifference = savedFutureDate - currentTime;

            if (timeDifference <= 0) {
                clearInterval(countdownInterval);
                displayMessage.textContent = getDataFromLocalStorage("message");
                timerContainer.style.display = "none";
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

                timerDisplay.textContent = `${days}d ${hours}h ${minutes}m`;
            }
        }, 1000);
    });

    // Check for stored data on page load
    const savedMessage = getDataFromLocalStorage("message");
    const savedFutureDate = getDataFromLocalStorage("futureDate");

    if (savedMessage && savedFutureDate) {
        messageForm.style.display = "none";
        displaySection.style.display = "block";
    }

    // Function to save data to local storage
    function saveDataToLocalStorage(message, futureDate) {
        localStorage.setItem("message", message);
        localStorage.setItem("futureDate", futureDate);
    }

    // Function to retrieve data from local storage
    function getDataFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
});
