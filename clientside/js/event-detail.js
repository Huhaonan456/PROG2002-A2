document.addEventListener('DOMContentLoaded', () => {
  // 获取URL中的活动ID
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  const eventDetail = document.getElementById('event-detail');

  if (!eventId) {
    if (eventDetail) {
      eventDetail.innerHTML = `
        <div class="p-8 text-center">
          <i class="fas fa-exclamation-triangle text-5xl text-accent mb-4"></i>
          <h3 class="text-2xl font-bold mb-2">Invalid Event ID</h3>
          <p class="text-gray-600">Please select a valid event.</p>
          <a href="index.html" class="mt-4 inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            Go to Home
          </a>
        </div>
      `;
    }
    return;
  }

  if (eventDetail) {
    // 发起详情请求
    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const event = data.data;
          // 计算筹款进度百分比
          const progressPercent = event.event_current_amount && event.event_target_amount
            ? Math.min((event.event_current_amount / event.event_target_amount) * 100, 100)
            : 0;

          eventDetail.innerHTML = `
            <div class="h-64 md:h-80 bg-gray-200 relative">
              <img src="https://picsum.photos/seed/${event.event_id}/1200/600" alt="${event.event_name}" class="w-full h-full object-cover">
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 class="text-3xl md:text-4xl font-bold text-white">${event.event_name}</h1>
                <div class="flex items-center mt-2 text-white/90">
                  <i class="fas fa-calendar-alt mr-2"></i>
                  <span>${new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                </div>
                <div class="flex items-center mt-2 text-white/90">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  <span>${event.event_location}</span>
                </div>
              </div>
            </div>
            <div class="p-6 md:p-8">
              <div class="flex flex-col md:flex-row md:space-x-8">
                <div class="md:w-2/3">
                  <h2 class="text-2xl font-bold mb-4">Event Details</h2>
                  <p class="text-gray-700 mb-6">${event.event_desc}</p>
                  
                  <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 class="text-lg font-bold mb-3">Fundraising Progress</h3>
                    <div class="progress-bar bg-gray-200 mb-2">
                      <div class="progress-fill bg-secondary" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="flex justify-between text-sm text-gray-600">
                      <span>${event.event_current_amount ? event.event_current_amount.toLocaleString('en-US', { style: 'currency', currency: 'AUD' }) : '0.00'}</span>
                      <span>${progressPercent.toFixed(1)}%</span>
                      <span>of ${event.event_target_amount ? event.event_target_amount.toLocaleString('en-US', { style: 'currency', currency: 'AUD' }) : '0.00'}</span>
                    </div>
                  </div>

                  <div class="mb-6">
                    <h3 class="text-lg font-bold mb-3">Ticketing</h3>
                    <p class="text-gray-700">
                      ${event.event_ticket_price 
                        ? `Ticket Price: ${event.event_ticket_price.toLocaleString('en-US', { style: 'currency', currency: 'AUD' })}` 
                        : 'Free Entry'}
                    </p>
                  </div>
                </div>
                
                <div class="md:w-1/3 mt-8 md:mt-0">
                  <div class="bg-gray-50 rounded-lg p-6 sticky top-24">
                    <h3 class="text-lg font-bold mb-4">Organizer</h3>
                    <div class="flex items-center mb-4">
                      <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                        ${event.org_name ? event.org_name.charAt(0) : 'C'}
                      </div>
                      <div class="ml-4">
                        <h4 class="font-bold">${event.org_name}</h4>
                      </div>
                    </div>
                    <p class="text-gray-700 mb-4">${event.org_mission}</p>
                    <div class="flex items-center mb-2">
                      <i class="fas fa-envelope mr-2 text-gray-600"></i>
                      <a href="mailto:${event.org_contact_email}" class="text-primary hover:underline">${event.org_contact_email}</a>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-phone mr-2 text-gray-600"></i>
                      <span>${event.org_phone}</span>
                    </div>

                    <div class="mt-6">
                      <h3 class="text-lg font-bold mb-3">Category</h3>
                      <span class="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        ${event.category_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        } else {
          eventDetail.innerHTML = `
            <div class="p-8 text-center">
              <i class="fas fa-frown text-5xl text-gray-400 mb-4"></i>
              <h3 class="text-2xl font-bold mb-2">Event Not Found</h3>
              <p class="text-gray-600">The event you're looking for does not exist or has been removed.</p>
              <a href="index.html" class="mt-4 inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                Go to Home
              </a>
            </div>
          `;
        }
      })
      .catch(err => {
        eventDetail.innerHTML = `
          <div class="p-8 text-center">
            <i class="fas fa-exclamation-triangle text-5xl text-accent mb-4"></i>
            <h3 class="text-2xl font-bold mb-2">Failed to Load Event</h3>
            <p class="text-gray-600">An error occurred while loading event details. Please try again later.</p>
            <a href="index.html" class="mt-4 inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              Go to Home
            </a>
          </div>
        `;
        console.error('Event detail load error:', err);
      });
  }
});