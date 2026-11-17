/* Các trang dùng chung đầu trang, chân trang và đường dẫn tương đối. */
(() => {
  'use strict';
  const names = {
    home: 'Cửa hàng công nghệ',
    shop: 'Cửa hàng',
    product: 'Chi tiết sản phẩm',
    favorites: 'Sản phẩm yêu thích',
    compare: 'So sánh sản phẩm',
    cart: 'Giỏ hàng',
    checkout: 'Đặt hàng',
    orders: 'Tra cứu đơn hàng',
    account: 'Tài khoản',
    blog: 'Góc công nghệ',
    article: 'Bài viết',
    policy: 'Chính sách cửa hàng',
    contact: 'Liên hệ'
  };
  const main = document.getElementById('main');
  document.getElementById('top').innerHTML = TM.header();
  document.getElementById('bottom').innerHTML = TM.footer();
  TM.render = function() {
    main.innerHTML = (TM.pages[TM.page] || TM.pages.home)();
    if (TM.page === 'home' && matchMedia('(max-width: 900px)').matches) {
      const panel = main.querySelector('.home-cats');
      panel.classList.add('collapsed');
      panel.querySelector('button').setAttribute('aria-expanded', 'false');
    }
    TM.counters();
    TM.syncLists();
  };
  TM.render();
  TM.wire();
  const title = TM.page === 'product' ? TM.item(TM.query.get('id') || PRODUCTS[0].id)?.name: TM.page === 'article' ? STORIES.find(s => s.id === (TM.query.get('id') || STORIES[0].id))?.title: null;
  document.title = (title || names[TM.page] || names.home ) +' | Trong mobile';
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }
})();
