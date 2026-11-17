/* Thành phần chung, điều hướng và dữ liệu lưu trong trình duyệt. Không cần máy chủ. */
'use strict';
const TM = (() => {
  const files = {
    home: 'index',
    shop: 'cua-hang',
    product: 'san-pham',
    cart: 'gio-hang',
    checkout: 'thanh-toan',
    orders: 'don-hang',
    favorites: 'yeu-thich',
    compare: 'so-sanh',
    blog: 'goc-cong-nghe',
    article: 'bai-viet',
    contact: 'lien-he',
    policy: 'chinh-sach',
    account: 'tai-khoan'
  };
  const pages = Object.create(null);
  const query = new URLSearchParams(location.search);
  const isFile = location.protocol === 'file:';
  const page = isFile && Object.hasOwn(files, query.get('trang')) ? query.get('trang') : document.body.dataset.page;
  function url(route, values = {}, hash = '') {
    const params = new URLSearchParams();
    // Dùng cùng một tài liệu khi mở bằng file:// để dữ liệu luôn đi theo người mua.
    if (isFile && route !== 'home') params.set('trang', route);
    Object.entries(values).forEach(([key, value]) => {
      if (value != null && String(value) !== '') params.set(key, value);
    });
    return (isFile ? 'index' : files[route] ) + '.html' + (params.size ? '?' + params : '') + (hash ? '#' + encodeURIComponent(hash) : '');
  }
  if (isFile && document.body.dataset.page !== 'home' && !query.has('trang')) {
    location.replace(url(document.body.dataset.page, Object.fromEntries(query)) + location.hash);
  }
  const item = id => PRODUCTS.find(p => p.id === id);
  const category = id => CATEGORIES.find(c => c.id === id);
  const money = amount => new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  const esc = str => String(str ?? '').replace(/[&<>'"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[c]));
  const norm = str => String(str ?? '').toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
  const matches = (p, term) => norm(term).split(/\s+/).every(word => norm([p.name, p.brand, p.code, p.color, category(p.cat).name, ...p.versions.map(v => v.label), TM.englishProductTerms?.(p) || ''].join(' ')).includes(word));
  const mapURL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(STORE.address);
  const localKey = name => 'trong-mobile.lab1.' + name;
  const transient = new Map();
  function read(name, fallback) {
    try {
      const value = localStorage.getItem(localKey(name));
      return value === null ? fallback : JSON.parse(value);
    }
    catch {
      return transient.get(name) ?? fallback;
    }
  }
  function save(name, value) {
    try {
      localStorage.setItem(localKey(name), JSON.stringify(value));
      return true;
    }
    catch {
      transient.set(name, value);
      return false;
    }
  }
  const shopState = () => read('shopping', {cart: [], orders: [], coupon: ''});
  function available(p, index = 0, state = shopState()) {
    const sold = state.orders.filter(o => o.status !== 'Đã hủy').flatMap(o => o.lines)
    .filter(line => line.id === p.id && line.v === index).reduce((n, line) => n + line.qty, 0);
    return Math.max(0, (p.versions[index]?.stock || 0 ) - sold);
  }
  function totals(state = shopState(), method = 'ship') {
    const sub = state.cart.reduce((sum, line) => sum + (item(line.id)?.versions[line.v]?.price || 0 ) *line.qty, 0);
    const discount = state.coupon === STORE.coupon.code && sub >= STORE.coupon.minimum ? STORE.coupon.value : 0;
    const shipping = sub && method !== 'pickup' && sub < STORE.freeShipping ? STORE.shipping : 0;
    return {sub, discount, shipping, total: sub - discount + shipping};
  }
  const paths = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/>',
    heart: '<path d="M20.5 5.9a5 5 0 0 0-7.1 0L12 7.3l-1.4-1.4a5 5 0 0 0-7.1 7.1L12 21l8.5-8a5 5 0 0 0 0-7.1Z"/>',
    bag: '<path d="M5 7.5h14l1.2 13H3.8l1.2-13Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.7"/><path d="m16 16 4.6 4.6"/>',
    phone: '<rect x="6.3" y="2.5" width="11.4" height="19" rx="2.5"/><path d="M10 5h4m-3 13.5h2"/>',
    laptop: '<rect x="4" y="4" width="16" height="12" rx="1.4"/><path d="m4 16-2 3h20l-2-3Z"/>',
    tablet: '<rect x="4.5" y="2.7" width="15" height="18.6" rx="2.4"/><path d="M11 18.5h2"/>',
    watch: '<rect x="5.8" y="6" width="12.4" height="12" rx="3.5"/><path d="m8 6 1-4h6l1 4m-8 12 1 4h6l1-4m-4-9v3l2 1"/>',
    headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="12" width="4.4" height="8" rx="2"/><rect x="16.6" y="12" width="4.4" height="8" rx="2"/>',
    plug: '<path d="M8 2v5m8-5v5M6 7h12v3a6 6 0 0 1-12 0Zm6 9v3a2 2 0 0 0 2 2h2"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    left: '<path d="m15 6-6 6 6 6"/>',
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    diagonal: '<path d="M6 18 18 6M7 6h11v11"/>',
    call: '<path d="m7 3 3 5-2.5 2A14 14 0 0 0 14 16l2-2.5 5 3c0 3-1.5 4.5-4 4C10 19 4 13 3.5 6.5 3 4.5 5 3 7 3Z"/>',
    truck: '<path d="M2 5h12v12H2zm12 4h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    box: '<path d="m3 7 9-5 9 5v10l-9 5-9-5Zm0 0 9 5 9-5M12 12v10m-4-17 9 5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 7 0 0 1 16 0v1"/>',
    tag: '<path d="M4 4h8l9 9-8 8-9-9Z"/><circle cx="8" cy="8" r="1"/>',
    shield: '<path d="M12 2c3 2 6 3 9 3v6c0 5-4 9-9 11-5-2-9-6-9-11V5c3 0 6-1 9-3Z"/><path d="m8 12 3 3 5-6"/>',
    refresh: '<path d="M20 7a8 8 0 1 0 .3 9M20 3v5h-5"/>',
    compare: '<path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4 4-4-4 4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3m-10 0 1 15h12l1-15M10 10v7m4-7v7"/>',
    star: '<path d="m12 2 3 6.3 7 1-5 5 1.2 7L12 18l-6.2 3.3L7 14.3l-5-5 7-1Z"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    zoom: '<circle cx="10" cy="10" r="6.8"/><path d="m15 15 6 6m-11-14v6m-3-3h6"/>',
    time: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    filter: '<path d="M3 6h7m4 0h7M3 12h11m4 0h3M3 18h3m4 0h11"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
    receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2Zm4 5h6m-6 4h6"/>',
    book: '<path d="M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3Zm9 2v15"/>',
    store: '<path d="m3 9 2-6h14l2 6M4 9v12h16V9M3 9c1 3 4 3 5 0 1 3 4 3 5 0 1 3 4 3 5 0 1 2 2 2 3 0M8 21v-6h5v6"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>'
  };
  function icon(name, size = 20) {
    return '<svg class="ico" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || '') + '</svg>';
  }
  function brand() {
    return '<a class="brand" aria-label="Trong mobile – Trang chủ" href="' + url('home') + '"><span class="brand-mark"><svg viewBox="0 0 42 42" aria-hidden="true"><path fill="currentColor" d="M7.4 12h18l-2.7 5.5h-5.2l-5.8 12.7H6.1l5.8-12.7H5Zm13.5 18.2L29.3 12h6.1l-1 17.9h-5.5l1.1-9.6-4.7 9.9Z"/></svg></span><span>Trong <b>mobile</b></span></a>';
  }
  const img = (id, alt, cls = '', eager = false) => '<img class="' + cls + '" src="Images/' + esc(id) + '.webp" alt="' + esc(alt) + '" loading="' + (eager ? 'eager': 'lazy') + '" decoding="async">';
  function toast(message, route, label) {
    const el = document.querySelector('#notice');
    if (!el) return;
    el.innerHTML = icon('check', 17) + '<span>' + esc(message) + '</span>' + (route ? '<a href="' + url(route) + '">' + esc(label) + '</a>': '');
    el.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      el.hidden = true;
    }, 3900);
  }
  function activeProfile() {
    const id = read('session', '');
    return read('accounts', []).find(a => a.id === id);
  }
  function header() {
    const current = page === 'product' ? 'shop' : page === 'article' ? 'blog' : page;
    const nav = [['home', 'Trang chủ'], ['shop', 'Cửa hàng'], ['sale', 'Khuyến mãi'], ['blog', 'Góc công nghệ'], ['contact', 'Liên hệ']];
    const sale = page === 'shop' && query.get('sale') === '1';
    return `<div class="utility"><div class="wrap utility-in"><a class="top-mail" href="mailto:${STORE.email}">${icon('mail', 15)}${STORE.email}</a><span class="ship-note">${icon('truck', 16)}<span class="shipping-long">Miễn phí giao hàng từ 500.000 ₫</span><span class="shipping-short">Miễn phí giao từ 500k</span></span><span class="spacer"></span><button type="button" class="lang-toggle" data-act="lang" aria-label="${read('lang', 'vi') === 'vi' ? 'Switch to English': 'Chuyển sang tiếng Việt'}">${read('lang', 'vi') === 'vi' ? 'EN': 'VI'}</button><a href="${url('orders')}">${icon('box', 15)}Tra cứu đơn hàng</a><a aria-label="Tài khoản" href="${url('account')}">${icon('user', 15)}<span>${activeProfile() ? 'Tài khoản của tôi': 'Tài khoản'}</span></a></div></div>
      <header class="site-header"><div class="wrap header-row">${brand()}<nav class="main-nav" aria-label="Điều hướng chính" id="main-nav">${nav.map(([route, label]) => {
      const on = route === 'sale' ? sale: current === route && !sale;
      return '<a ' + (on ? 'aria-current="page"': '') + ' href="' + (route === 'sale' ? url('shop', {sale: 1}): url(route)) + '">' + label + '</a>';
    }).join('')}</nav>
      <div class="head-actions"><a class="head-icon" aria-label="Danh sách yêu thích" href="${url('favorites')}">${icon('heart', 24)}<b id="wish-count"></b></a><span class="head-line"></span><a class="head-cart" aria-label="Mở giỏ hàng" href="${url('cart')}"><span class="head-icon">${icon('bag', 24)}<b id="cart-count"></b></span><span class="cart-words">Giỏ hàng<strong id="cart-money">0 ₫</strong></span></a><button class="icon-btn hamburger" data-act="nav" aria-label="Mở trình đơn" aria-controls="main-nav" aria-expanded="false">${icon('menu')}</button></div></div></header>`;
  }
  function counters() {
    const s = shopState();
    const pairs = {'wish-count': read('favorites', []).length, 'cart-count': s.cart.reduce((n, l) => n + l.qty, 0), 'cart-money': money(totals(s).sub)};
    Object.entries(pairs).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el)el.textContent = value;
    });
  }
  function categoryList() {
    return `<div class="cat-links" id="category-links"><a href="${url('shop')}">${icon('grid')}<span>Tất cả sản phẩm</span>${icon('right', 14)}</a>${CATEGORIES.map(c => `<a href="${url('shop', {cat: c.id})}">${icon(c.icon)}<span>${c.name}</span>${icon('right', 14)}</a>`).join('')}<a class="deal-link" href="${url('shop', {sale: 1})}">${icon('tag')}<span>Sản phẩm giảm giá</span>${icon('right', 14)}</a></div>`;
  }
  function categoryPanel(home = false) {
    return `<aside class="category-panel ${home ? 'home-cats': ''}"><button class="department" type="button" aria-expanded="${home ? 'true': 'false'}" aria-controls="category-links" data-act="depart">${icon('menu')}<span>Danh mục sản phẩm</span>${icon('down', 16)}</button>${categoryList()}</aside>`;
  }
  function searchbar() {
    return `<div class="search-row"><form class="site-search" id="site-search" role="search" autocomplete="off"><select aria-label="Danh mục tìm kiếm" name="cat"><option value="">Tất cả</option>${CATEGORIES.map(c => '<option value="' + c.id + '" ' + (query.get('cat') === c.id ? 'selected': '') + '>' + c.name + '</option>').join('')}</select><input type="search" name="q" aria-label="Từ khóa tìm sản phẩm" placeholder="Bạn đang tìm sản phẩm gì?" value="${esc(query.get('q') || '')}" maxlength="100"><button class="search-submit" type="submit">${icon('search', 19)}<span>Tìm kiếm</span></button><div class="suggestions" id="suggestions" hidden></div></form><a class="hotline" href="tel:${STORE.phone}"><span>${icon('call', 21)}</span><div><small>Hotline tư vấn</small><strong>${STORE.displayPhone}</strong></div></a></div>`;
  }
  const toolbar = () => `<div class="wrap inner-tools">${categoryPanel()}${searchbar()}</div>`;
  function crumbs(...parts) {
    return '<nav aria-label="Đường dẫn" class="crumbs"><a href="' + url('home') + '">Trang chủ</a>' + parts.map((part, i) => icon('right', 13) + (Array.isArray(part) ? '<a href="' + part[1] + '">' + esc(part[0]) + '</a>': '<span aria-current="' + (i === parts.length - 1 ? 'page': 'false') + '">' + esc(part) + '</span>')).join('') + '</nav>';
  }
  function heading(title, extra = '') {
    return '<div class="section-heading"><h2>' + esc(title) + '</h2>' + extra + '</div>';
  }
  function more(route, label = 'Xem tất cả', params = {}) {
    return '<a class="text-link" href="' + url(route, params) + '">' + esc(label) + icon('arrow', 17) + '</a>';
  }
  function empty(symbol, title, body, route = 'shop', link = 'Khám phá cửa hàng') {
    return `<div class="empty"><span class="empty-icon">${icon(symbol, 30)}</span><h2>${esc(title)}</h2><p>${esc(body)}</p><a class="btn primary" href="${url(route)}">${esc(link)} ${icon('arrow', 16)}</a></div>`;
  }
  function footer() {
    return `<footer class="footer"><div class="wrap footer-grid"><div>${brand()}<address><span>${icon('pin', 17)}${STORE.address}</span><a href="tel:${STORE.phone}">${icon('call', 17)}${STORE.phone}</a><a href="mailto:${STORE.email}">${icon('mail', 17)}${STORE.email}</a></address></div><div><h3>Mua sắm</h3><a href="${url('shop')}">Tất cả sản phẩm</a><a href="${url('favorites')}">Yêu thích</a><a href="${url('compare')}">So sánh sản phẩm</a><a href="${url('orders')}">Tra cứu đơn hàng</a></div><div><h3>Hỗ trợ</h3><a href="${url('policy', {}, 'giao-hang')}">Giao hàng & thanh toán</a><a href="${url('policy', {}, 'bao-hanh')}">Bảo hành & đổi trả</a><a href="${url('contact')}">Liên hệ cửa hàng</a><a href="${url('blog')}">Góc công nghệ</a></div><div><h3>Nhận tin ưu đãi</h3><p>Đăng ký nhận tin về sản phẩm và ưu đãi mới.</p><form id="newsletter"><label class="sr" for="news-email">Email nhận tin</label><input id="news-email" name="email" type="email" placeholder="Email của bạn" maxlength="100" required><button aria-label="Đăng ký nhận tin" title="Đăng ký nhận tin">${icon('arrow', 20)}</button></form><small id="news-status" role="status"></small></div></div><div class="wrap footer-bottom"><span>© 2026 Trong mobile</span><span>Website thực hành thiết kế web · Dữ liệu minh họa</span></div></footer>`;
  }
  function syncLists() {
    for (const name of ['favorites', 'compare']) {
      const values = read(name, []);
      document.querySelectorAll('[data-act="' + name + '"]').forEach(el => {
        const on = values.includes(el.dataset.id);
        el.setAttribute('aria-pressed', String(on));
        el.classList.toggle('selected', on);
      });
    }
  }
  function toggleList(name, id) {
    if (!item(id)) return;
    const list = read(name, []);
    const existed = list.includes(id);
    if (name === 'compare' && !existed && list.length >= 3) {
      toast('Bạn có thể so sánh tối đa 3 sản phẩm.', 'compare', 'Xem so sánh');
      return;
    }
    save(name, existed ? list.filter(x => x !== id): [...list, id]);
    counters();
    syncLists();
    if (page === name) TM.render();
    const label = name === 'favorites' ? 'yêu thích': 'so sánh';
    toast((existed ? 'Đã bỏ khỏi danh sách ': 'Đã thêm vào danh sách ' ) +label + '.', name, 'Xem danh sách');
  }
  function add(id, v = 0, qty = 1, go = false) {
    const p = item(id);
    const state = shopState();
    v = Number(v);
    qty = Number(qty);
    if (!p?.versions[v] || !Number.isInteger(qty) || qty < 1)return false;
    const line = state.cart.find(l => l.id === id && l.v === v);
    if ((line?.qty || 0 ) +qty > available(p, v, state)) {
      toast('Số lượng vượt quá tồn kho của phiên bản này.', 'cart', 'Xem giỏ');
      return false;
    }
    if (line)line.qty += qty; else state.cart.push({id, v, qty});
    if (!save('shopping', state)) {
      toast('Hãy cho phép lưu dữ liệu trình duyệt để sử dụng giỏ hàng.');
      return false;
    }
    counters();
    if (go)location.href = url('checkout'); else toast('Đã thêm ' + p.name + ' vào giỏ hàng.', 'cart', 'Xem giỏ');
    return true;
  }
  function searchSuggestions() {
    const form = document.querySelector('#site-search');
    if (!form)return;
    const box = form.querySelector('#suggestions'), q = form.elements.q.value.trim(), cat = form.elements.cat.value;
    if (!q) {
      box.hidden = true;
      return;
    }
    const found = PRODUCTS.filter(p => (!cat || p.cat === cat ) &&matches(p, q)).slice(0, 5);
    box.innerHTML = (found.length ? found.map(p => `<a class="suggest-item" href="${url('product', {id: p.id})}">${img(p.id, '')}<div><strong>${p.name}</strong><small>${money(p.versions[0].price)}</small></div>${icon('right', 15)}</a>`).join(''): '<p>Chưa có sản phẩm phù hợp.</p>' ) +`<a class="suggest-all" href="${url('shop', {q, cat})}">Xem kết quả tìm kiếm ${icon('arrow', 15)}</a>`;
    box.hidden = false;
  }
  function wire() {
    document.addEventListener('input', e => {
      if (e.target.matches('#site-search input'))searchSuggestions();
    });
    document.addEventListener('change', e => {
      if (e.target.matches('#site-search select'))searchSuggestions();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const box = document.querySelector('#suggestions');
        if (box)box.hidden = true;
        const pop = document.querySelector('.category-panel:not(.home-cats).opened .department');
        if (pop)pop.click();
      }
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.site-search')) {
        const box = document.querySelector('#suggestions');
        if (box)box.hidden = true;
      }
      const openPanel = document.querySelector('.category-panel:not(.home-cats).opened');
      if (openPanel && !openPanel.contains(e.target)) {
        openPanel.classList.remove('opened');
        openPanel.querySelector('button').setAttribute('aria-expanded', 'false');
      }
      const el = e.target.closest('[data-act]');
      if (!el)return;
      const act = el.dataset.act;
      if (act === 'depart') {
        const panel = el.closest('.category-panel'), home = panel.classList.contains('home-cats');
        const on = home ? !panel.classList.toggle('collapsed'): panel.classList.toggle('opened');
        el.setAttribute('aria-expanded', String(on));
      }
      if (act === 'nav') {
        const nav = document.querySelector('#main-nav');
        el.setAttribute('aria-expanded', String(nav.classList.toggle('visible')));
      }
      if (act === 'favorites' || act === 'compare')toggleList(act, el.dataset.id);
      if (act === 'quick-add')add(el.dataset.id, Number(el.dataset.v) || 0);
    });
    document.addEventListener('submit', e => {
      const form = e.target;
      if (form.id === 'site-search') {
        e.preventDefault();
        location.href = url('shop', {q: form.elements.q.value.trim(), cat: form.elements.cat.value});
      }
      if (form.id === 'newsletter') {
        e.preventDefault();
        const value = form.elements.email.value.trim().toLowerCase(), all = read('newsletter', []);
        const exists = all.includes(value);
        const ok = exists || save('newsletter', [...all, value]);
        document.querySelector('#news-status').textContent = ok ? (exists ? 'Email này đã được đăng ký trên thiết bị.': 'Đã lưu đăng ký nhận tin trên thiết bị này.'): 'Trình duyệt chưa cho phép lưu đăng ký.';
        if (ok)form.reset();
      }
    });
    window.addEventListener('pageshow', () => {
      counters();
      syncLists();
    });
    window.addEventListener('storage', () => {
      counters();
      syncLists();
      if (['cart', 'favorites', 'compare', 'orders'].includes(page))TM.render();
    });
  }
  return {
    files,
    pages,
    query,
    page,
    isFile,
    url,
    item,
    category,
    money,
    esc,
    norm,
    matches,
    mapURL,
    read,
    save,
    shopState,
    available,
    totals,
    icon,
    img,
    header,
    footer,
    counters,
    categoryPanel,
    searchbar,
    toolbar,
    crumbs,
    heading,
    more,
    empty,
    toast,
    syncLists,
    add,
    wire,
    activeProfile
  };
})();
