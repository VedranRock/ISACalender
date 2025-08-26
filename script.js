document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', () => {
        const date = day.textContent;
        const month = "August"; // You can make this dynamic later
        const events = calendarEvents[month]?.[date] || [];

        document.getElementById('modal-date').textContent = `${month} ${date}`;

        const eventList = document.getElementById('event-list');
        eventList.innerHTML = '';

        if (events.length === 0) {
            eventList.innerHTML = '<p>No events scheduled</p>';
        } else {
            const grouped = {
                Primary: [],
                Middle: [],
                General: []
            };

            events.forEach(event => {
                if (grouped[event.audience]) {
                    grouped[event.audience].push(event.title);
                }
            });

            for (const audience in grouped) {
                if (grouped[audience].length > 0) {
                    const sectionTitle = document.createElement('h3');
                    sectionTitle.textContent = `${audience} School`;
                    eventList.appendChild(sectionTitle);

                    const ul = document.createElement('ul');
                    grouped[audience].forEach(title => {
                        const li = document.createElement('li');
                        li.textContent = title;
                        ul.appendChild(li);
                    });
                    eventList.appendChild(ul);
                }
            }
        }

        document.getElementById('eventModal').style.display = 'block';
    });
});