const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let currentMonthIndex = 7; // August
  let calendarEvents = {};
  
  fetch('events.json')
    .then(response => response.json())
    .then(data => {
      calendarEvents = data;
      updateMonthLabel();
      renderDays();
      attachArrowListeners();
      attachModalClose();
    });
  
  function updateMonthLabel() {
    document.querySelector('.month-label b').textContent = months[currentMonthIndex];
  }
  
  function renderDays() {
    const calendar = document.querySelector('.calendar');
    const labels = document.querySelectorAll('.dayLables');
    calendar.innerHTML = '';
    labels.forEach(label => calendar.appendChild(label));
  
    const daysInMonth = new Date(new Date().getFullYear(), currentMonthIndex + 1, 0).getDate();
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      if (isWeekend(day, currentMonthIndex)) dayDiv.classList.add('weekend');
      dayDiv.textContent = day;
      dayDiv.addEventListener('click', () => showEvents(day));
      calendar.appendChild(dayDiv);
    }
  }
  
  function isWeekend(day, monthIndex) {
    const date = new Date(new Date().getFullYear(), monthIndex, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    return dayOfWeek === 0 || dayOfWeek === 6;
  }
  
  function showEvents(day) {
    const month = months[currentMonthIndex];
    const events = calendarEvents[month]?.[day.toString()] || [];
  
    document.getElementById('modal-date').textContent = `${month} ${day}`;
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
  
    if (events.length === 0) {
      eventList.innerHTML = '<p>No events scheduled</p>';
    } else {
      const grouped = { Primary: [], Middle: [], General: [] };
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
  }
  
  function attachArrowListeners() {
    document.querySelector('.mingcute--left-fill').addEventListener('click', () => {
      currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
      updateMonthLabel();
      renderDays();
    });
  
    document.querySelector('.mingcute--right-fill').addEventListener('click', () => {
      currentMonthIndex = (currentMonthIndex + 1) % 12;
      updateMonthLabel();
      renderDays();
    });
  }
  
  function attachModalClose() {
    document.querySelector('.close-button').addEventListener('click', () => {
      document.getElementById('eventModal').style.display = 'none';
    });
  }