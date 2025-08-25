document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', () => {
      const date = day.textContent;
      document.getElementById('modal-date').textContent = `August ${date}`;
      
      // Example events (replace with dynamic data)
      const events = [
        `Math test at 10:00`,
        `Basketball practice at 15:30`
      ];
  
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