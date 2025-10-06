document.addEventListener('DOMContentLoaded', () => {
  // 首页移动端菜单
  const mobileMenuButtonIndex = document.getElementById('mobile-menu-button');
  const mobileMenuIndex = document.getElementById('mobile-menu');
  if (mobileMenuButtonIndex && mobileMenuIndex) {
    mobileMenuButtonIndex.addEventListener('click', () => {
      mobileMenuIndex.classList.toggle('hidden');
    });
  }

  // 搜索页移动端菜单
  const mobileMenuButtonSearch = document.getElementById('mobile-menu-button-search');
  const mobileMenuSearch = document.getElementById('mobile-menu-search');
  if (mobileMenuButtonSearch && mobileMenuSearch) {
    mobileMenuButtonSearch.addEventListener('click', () => {
      mobileMenuSearch.classList.toggle('hidden');
    });
  }

  // 详情页移动端菜单
  const mobileMenuButtonEvent = document.getElementById('mobile-menu-button-event');
  const mobileMenuEvent = document.getElementById('mobile-menu-event');
  if (mobileMenuButtonEvent && mobileMenuEvent) {
    mobileMenuButtonEvent.addEventListener('click', () => {
      mobileMenuEvent.classList.toggle('hidden');
    });
  }
});