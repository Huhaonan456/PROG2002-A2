document.addEventListener('DOMContentLoaded', () => {
  const eventsContainer = document.getElementById('events-container');
  if (eventsContainer) {
    fetch('http://localhost:3000/api/events/home')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length) {
          eventsContainer.innerHTML = '';
          data.data.forEach(event => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl overflow-hidden card-shadow card-hover';
            card.innerHTML = `
              <div class="h-48 bg-gray-200 relative">
                <img src="https://picsum.photos/seed/${event.event_id}/600/400" alt="${event.event_name}" class="w-full h-full object-cover">
                <div class="absolute top-4 right-4 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                  ${event.category_name}
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${event.event_name}</h3>
                <div class="flex items-center mb-3 text-gray-600">
                  <i class="fas fa-calendar-alt mr-2"></i>
                  <span>${new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div class="flex items-center mb-4 text-gray-600">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  <span>${event.event_location}</span>
                </div>
                <a href="event.html?id=${event.event_id}" class="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  View Details
                </a>
              </div>
            `;
            eventsContainer.appendChild(card);
          });
        } else {
          eventsContainer.innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
              <i class="fas fa-frown text-5xl text-gray-400 mb-4"></i>
              <p class="text-gray-600 text-lg">No upcoming events found.</p>
            </div>
          `;
        }
      })
      .catch(err => {
        eventsContainer.innerHTML = `
          <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
            <i class="fas fa-exclamation-triangle text-5xl text-accent mb-4"></i>
            <p class="text-gray-600 text-lg">Failed to load events. Please try again later.</p>
          </div>
        `;
        console.error('Home event load error:', err);
      });
  }
});