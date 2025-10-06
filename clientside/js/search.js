document.addEventListener('DOMContentLoaded', () => {
  // 加载分类下拉框
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    fetch('http://localhost:3000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length) {
          data.data.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.category_id;
            option.textContent = cat.category_name;
            categorySelect.appendChild(option);
          });
        }
      })
      .catch(err => console.error('Category load error:', err));
  }

  // 处理搜索表单提交
  const searchForm = document.getElementById('search-form');
  const searchResults = document.getElementById('search-results');
  if (searchForm && searchResults) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const date = document.getElementById('date').value;
      const location = document.getElementById('location').value;
      const category_id = document.getElementById('category').value;

      // 构建查询参数
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (location) params.append('location', location);
      if (category_id) params.append('category_id', category_id);

      const url = `http://localhost:3000/api/events/search?${params.toString()}`;

      // 显示加载状态
      searchResults.innerHTML = `
        <div class="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p class="ml-3 text-gray-600">Searching...</p>
        </div>
      `;

      // 发起搜索请求
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.length) {
            searchResults.innerHTML = '';
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
              searchResults.appendChild(card);
            });
          } else {
            searchResults.innerHTML = `
              <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
                <i class="fas fa-frown text-5xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 text-lg">No events found matching your criteria.</p>
              </div>
            `;
          }
        })
        .catch(err => {
          searchResults.innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
              <i class="fas fa-exclamation-triangle text-5xl text-accent mb-4"></i>
              <p class="text-gray-600 text-lg">Failed to load search results. Please try again later.</p>
            </div>
          `;
          console.error('Search error:', err);
        });
    });
  }
});