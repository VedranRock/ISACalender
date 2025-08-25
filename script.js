let calendarEvents = {};

fetch('events.json') // or 'data/events.json' if it's in a folder
    .then(response => response.json())
    .then(data => {
        calendarEvents = data;
    });

document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', () => {
        const date = day.textContent;
        const month = "August"; // You can make this dynamic later
        const events = calendarEvents[month]?.[date] || ["No events scheduled"];

        document.getElementById('modal-date').textContent = `${month} ${date}`;

        const eventList = document.getElementById('event-list');
        eventList.innerHTML = '';
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            eventList.appendChild(li);
        });

        document.getElementById('eventModal').style.display = 'block';
    });
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('eventModal').style.display = 'none';
});