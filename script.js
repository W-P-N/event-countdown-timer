(function () {
    let countdownInterval;

    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const countdownForm = document.getElementById('countdownForm'); 
    const message = document.getElementById('message');

    const daysLeft = document.getElementById('days');
    const hoursLeft = document.getElementById('hours');
    const minutesLeft = document.getElementById('minutes');
    const secondsLeft = document.getElementById('seconds');

    countdownForm.addEventListener('submit', (e) => {
        e.preventDefault();
        message.textContent = '';

        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;

        if(!eventDate) {
            message.textContent = 'Please select a date.';
            return;
        };

        if(!eventName) {
            message.textContent = 'Please enter the event name.';
            return;
        };

        const targetDate = new Date(eventDate);

        if(targetDate < new Date()) {
            message.textContent = 'Please select a future date.';
            return;
        };

        message.textContent = `Countdown to ${eventName}`;
        startCountdown(targetDate, eventName);

        eventDateInput.value = '';
        eventNameInput.value = '';
    });

    function startCountdown(targetDate, eventName) {
        clearInterval(countdownInterval);

        function updateCountdown() {
            const now = new Date();
            const diff = targetDate - now;

            if(diff <= 0) {
                clearInterval(countdownInterval);
                message.textContent = `Happy ${eventName}`;
                return;
            };

            const days = Math.floor(diff/ (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60))/ (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60))/1000);

            daysLeft.textContent = String(days).padStart(2, '0');
            hoursLeft.textContent = String(hours).padStart(2, '0');
            minutesLeft.textContent = String(minutes).padStart(2, '0');
            secondsLeft.textContent = String(seconds).padStart(2, '0');
        };
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    };
    
}) ();