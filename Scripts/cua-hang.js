/* Trang chủ, bộ lọc, trang chi tiết và hai danh sách cá nhân. */
(() => {
  'use strict';
  const {url, item, category, money, esc, img, icon, query, heading, more, crumbs, toolbar, empty, read} = TM;
  const state = {slide: 0, featured: '', version: 0, qty: 1, photo: 0, tab: 'intro', shelves: [0, 0, 0]};
  const homeIds = ['iphone-16-pro', 'galaxy-s24-ultra', 'macbook-air', 'sony-headphones', 'ipad-air', 'apple-watch', 'airpods', 'sac-usb-c'];
  const initialProduct = item(query.get('id') || PRODUCTS[0].id);
  const wantedVersion = Number(query.get('v'));
  if (initialProduct && Number.isInteger(wantedVersion) && initialProduct.versions[wantedVersion])state.version = wantedVersion;
  const slides = [
    {
      id: 'iphone-16-pro',
      label: 'Apple · iPhone',
      title: 'iPhone 16 Pro',
      note: 'Chip A18 Pro. Thiết kế titan sa mạc.',
      image: 'hero-iphone',
      style: 'iphone',
      price: 24990000
    },
    {
      id: 'macbook-air',
      label: 'Apple · MacBook',
      title: 'MacBook Air M3',
      note: 'Mỏng nhẹ cho những ngày di chuyển.',
      image: 'feature-laptop',
      style: 'laptop',
      price: 22990000
    },
    {
      id: 'sony-headphones',
      label: 'Sony · Âm thanh',
      title: 'WH-1000XM5',
      note: 'Không gian riêng cho từng bản nhạc.',
      image: 'feature-audio',
      style: 'audio',
      price: 5990000
    }
  ];
  function priceLine(p, v = 0) {
    const price = p.versions[v].price, old = p.old + price - p.versions[0].price;
    return '<strong class="price">' + money(price) + '</strong>' + (old > price ? '<s>' + money(old) + '</s>': '');
  }
  function listButton(kind, p) {
    const name = kind === 'favorites' ? 'Yêu thích': 'So sánh';
    const on = read(kind, []).includes(p.id);
    return '<button type="button" class="icon-btn ' + (on ? 'selected': '') + '" aria-label="' + name + ' ' + esc(p.name) + '" aria-pressed="' + on + '" title="' + name + '" data-act="' + kind + '" data-id="' + p.id + '">' + icon(kind === 'favorites' ? 'heart': 'compare', 17) + '</button>';
  }
  function card(p, v = 0) {
    const selected = p.versions[v], old = p.old + selected.price - p.versions[0].price;
    const discount = Math.round((1 - selected.price / old ) *100);
    const productLink = url('product', {id: p.id, v: v || ''});
    return `<article class="product-card"><div class="card-photo"><a href="${productLink}" tabindex="-1" aria-label="Xem ${esc(p.name)}">${img(p.id, p.name)}</a>${discount > 0 ? '<span class="discount">−' + discount + '%</span>': ''}<div class="card-shortcuts">${listButton('favorites', p)}${listButton('compare', p)}</div></div>
    <div class="card-copy"><span class="product-brand">${p.brand}</span><h3><a href="${productLink}">${p.name}</a></h3><p>${selected.label} <span>·</span> ${p.color}</p><div class="card-bottom"><div class="price-block">${priceLine(p, v)}</div><button type="button" class="add-circle" aria-label="Thêm ${esc(p.name)} vào giỏ" title="Thêm vào giỏ" data-act="quick-add" data-id="${p.id}" data-v="${v}" ${TM.available(p, v) === 0 ? 'disabled': ''}>${icon('plus', 18)}</button></div></div></article>`;
  }
  const grid = (products, chooseVersion = () => 0) => '<div class="product-grid">' + products.map(p => card(p, chooseVersion(p))).join('') + '</div>';
  const arrows = (what, index = '') => `<div class="arrows"><button type="button" aria-label="Xem mục trước" data-act="${what}" data-dir="-1" data-shelf="${index}">${icon('left', 16)}</button><button type="button" aria-label="Xem mục sau" data-act="${what}" data-dir="1" data-shelf="${index}">${icon('right', 16)}</button></div>`;
  function hero() {
    const s = slides[state.slide];
    return `<div class="hero hero-${s.style}" aria-roledescription="băng chuyền" aria-label="Bộ sưu tập nổi bật"><img class="hero-art" src="Images/${s.image}.webp" alt="" fetchpriority="high"><div class="hero-shade"></div><div class="hero-copy"><div class="hero-label"><i></i>${s.label}</div><h1>${s.title}</h1><p>${s.note}</p><div class="hero-price">Từ <strong>${money(s.price)}</strong></div><a href="${url('product', {id: s.id})}" class="hero-cta">Khám phá ngay ${icon('arrow', 17)}</a></div><div class="slide-dots" aria-label="Chọn banner">${slides.map((v, i) => `<button data-act="slide" data-index="${i}" aria-label="Banner ${i + 1} – ${v.title}" aria-pressed="${i === state.slide}"></button>`).join('')}</div><div class="hero-arrows"><button aria-label="Banner trước" data-act="slide-step" data-dir="-1">${icon('left', 16)}</button><button aria-label="Banner sau" data-act="slide-step" data-dir="1">${icon('right', 16)}</button></div></div>`;
  }
  function featured() {
    const products = state.featured ? PRODUCTS.filter(p => p.cat === state.featured): homeIds.map(item);
    return grid(products);
  }
  function shelves() {
    const highest = PRODUCTS.slice().sort((a, b) => b.old - b.versions[0].price - (a.old - a.versions[0].price));
    const latest = PRODUCTS.slice().sort((a, b) => b.added.localeCompare(a.added));
    const accessories = PRODUCTS.filter(p => ['phu-kien', 'tai-nghe'].includes(p.cat)).sort((a, b) => a.versions[0].price - b.versions[0].price);
    return [['Mới về', latest], ['Giảm giá nhiều', highest], ['Phụ kiện & âm thanh', accessories]].map(([title, list], i) => {
      const rows = [0, 1, 2].map(n => list[(state.shelves[i] + n ) %list.length]);
      return `<section class="shelf"><div class="shelf-head"><h3>${title}</h3>${arrows('shelf', i)}</div>${rows.map(p => `<a class="mini-product" href="${url('product', {id: p.id})}">${img(p.id, '')}<div><strong>${p.name}</strong><small>${money(p.versions[0].price)}</small></div></a>`).join('')}</section>`;
    }).join('');
  }
  function home() {
    return `<div class="wrap"><div class="home-top">${TM.categoryPanel(true)}<div class="home-lead">${TM.searchbar()}<div id="hero-slot">${hero()}</div></div></div>
      <section class="home-section cats-section">${heading('Khám phá danh mục', arrows('categories'))}<div class="cat-track" id="cat-track">${CATEGORIES.map(c => `<a class="visual-category" href="${url('shop', {cat: c.id})}" style="--tile:${c.tint}">${img(c.image, '')}<strong>${c.short || c.name}</strong></a>`).join('')}</div></section>
      <section class="home-section featured-section">${heading('Sản phẩm nổi bật', more('shop', 'Xem cửa hàng'))}<div class="tabs featured-tabs" aria-label="Lọc sản phẩm nổi bật">${[['', 'Tất cả'], ...CATEGORIES.map(c => [c.id, c.short || c.name])].map(([id, name]) => '<button type="button" data-act="featured" data-id="' + id + '" aria-pressed="' + (id === state.featured) + '">' + name + '</button>').join('')}</div><div id="featured-grid">${featured()}</div></section>
      <div class="promos"><a class="promo promo-laptop" href="${url('shop', {cat: 'laptop'})}">${img('feature-laptop', '')}<div><small>Không gian làm việc</small><h2>Laptop mỏng nhẹ</h2><span>Khám phá ${icon('arrow', 16)}</span></div></a><a class="promo promo-audio" href="${url('shop', {cat: 'tai-nghe'})}">${img('feature-audio', '')}<div><small>Bộ sưu tập âm thanh</small><h2>Tai nghe không dây</h2><span>Khám phá ${icon('arrow', 16)}</span></div></a></div>
      <div class="shelves" id="shelves">${shelves()}</div><section class="home-section blog-section">${heading('Góc công nghệ', more('blog', 'Tất cả bài viết'))}<div class="story-grid">${STORIES.slice(0, 3).map(TM.storyCard).join('')}</div></section></div>`;
  }
  function shop() {
    const cat = query.get('cat') || '', term = (query.get('q') || '').trim(), brand = query.get('brand') || '', condition = query.get('condition') || '', sale = query.get('sale') === '1';
    const sort = query.get('sort') || 'featured', min = query.get('min') || '', max = query.get('max') || '', layout = query.get('view') === 'list' ? 'list': 'grid';
    const color = query.get('color') || '', version = query.get('version') || '';
    const variantIndex = p => version ? p.versions.findIndex(v => v.label === version): 0;
    const shownPrice = p => p.versions[variantIndex(p)].price;
    let list = PRODUCTS.filter(p => (!color || p.color === color ) && variantIndex(p) >= 0 && (!cat || p.cat === cat) && (!brand || p.brand === brand) && (!condition || condition === p.condition) && matchesFilter(p));
    function matchesFilter(p) {
      return (!term || TM.matches(p, term) ) &&(!sale || p.old > p.versions[0].price) && (!min || shownPrice(p) >= Number(min)) && (!max || shownPrice(p) <= Number(max));
    }
    const sold = {};
    for (const order of TM.shopState().orders.filter(o => o.status !== 'Đã hủy')) {
      for (const line of order.lines)sold[line.id] = (sold[line.id] || 0 ) +line.qty;
    }
    const sorters = {
      sold: (a, b) => (sold[b.id] || 0 ) -(sold[a.id] || 0),
      asc: (a, b) => shownPrice(a) - shownPrice(b),
      desc: (a, b) => shownPrice(b) - shownPrice(a),
      new: (a, b) => b.added.localeCompare(a.added),
      discount: (a, b) => (1 - b.versions[0].price / b.old ) -(1 - a.versions[0].price / a.old)
    };
    if (sorters[sort])list.sort(sorters[sort]);
    const size = 9, totalPages = Math.max(1, Math.ceil(list.length / size)), n = Math.max(1, Math.min(totalPages, parseInt(query.get('p'), 10) || 1));
    const vals = Object.fromEntries(query);
    delete vals.trang;
    const go = (updates) => url('shop', {...vals, p: '', ...updates});
    const options = (pairs, value) => pairs.map(([v, t]) => `<option value="${esc(v)}" ${v === value ? 'selected': ''}>${esc(t)}</option>`).join('');
    const hasFilters = cat || term || brand || color || version || condition || min || max;
    const title = term ? 'Kết quả tìm kiếm': (sale ? 'Khuyến mãi': category(cat)?.name || 'Cửa hàng');
    const activeTags = [
      ['q', term ? ('“' + term + '”'): ''],
      ['cat', category(cat)?.name],
      ['brand', brand],
      ['color', color],
      ['version', version],
      ['condition', condition],
      ['min', min ? 'Từ ' + money(Number(min)): ''],
      ['max', max ? 'Đến ' + money(Number(max)): '']
    ].filter(a => a[1]);
    return `${toolbar()}<div class="wrap inner-page">${crumbs(title)}<div class="page-title"><h1>${esc(title)}</h1><p>${sale ? 'Các mẫu đang có giá ưu đãi tại Trong mobile.': term ? 'Sản phẩm phù hợp với từ khóa “' + esc(term) + '”.': 'Khám phá thiết bị và phụ kiện theo nhu cầu của bạn.'}</p></div>
    <div class="shop-layout"><aside class="filters"><div class="filter-heading">${icon('filter', 19)}<h2>Bộ lọc</h2></div><form id="filters"><label>Danh mục<select name="cat">${options([['', 'Tất cả danh mục'], ...CATEGORIES.map(c => [c.id, c.name])], cat)}</select></label><label>Thương hiệu<select name="brand">${options([['', 'Tất cả thương hiệu'], ...[...new Set(PRODUCTS.map(p => p.brand))].sort().map(x => [x, x])], brand)}</select></label><label>Tình trạng<select name="condition">${options([['', 'Tất cả tình trạng'], ['Mới', 'Mới'], ['Đã qua sử dụng', 'Đã qua sử dụng']], condition)}</select></label><label>Màu sắc<select name="color">${options([['', 'Tất cả màu sắc'], ...[...new Set(PRODUCTS.map(p => p.color))].sort().map(x => [x, x])], color)}</select></label><label>Phiên bản<select name="version">${options([['', 'Tất cả phiên bản'], ...[...new Set(PRODUCTS.flatMap(p => p.versions.map(v => v.label)))].map(x => [x, x])], version)}</select></label><fieldset><legend>Khoảng giá (₫)</legend><label class="sr" for="min-price">Giá từ</label><input id="min-price" name="min" type="number" step="1" min="0" placeholder="Giá từ" value="${esc(min)}"><label class="sr" for="max-price">Giá đến</label><input id="max-price" name="max" type="number" step="1" min="0" placeholder="Giá đến" value="${esc(max)}"></fieldset>
      <button type="submit" class="btn primary full">Áp dụng bộ lọc</button>${hasFilters ? '<a class="clear-filter" href="' + url('shop', {sale: sale ? 1: ''}) + '">Xóa bộ lọc</a>': ''}</form><div class="coupon-tease">${icon('tag', 23)}<strong>Mã TRONG50</strong><p>Giảm 50.000 ₫ cho đơn từ 1.000.000 ₫.</p></div></aside>
    <section class="shop-results"><div class="sort-row"><strong>${list.length} sản phẩm</strong><label>Sắp xếp <select id="sort">${options([['featured', 'Mặc định'], ['new', 'Mới nhất'], ['sold', 'Bán chạy'], ['asc', 'Giá tăng dần'], ['desc', 'Giá giảm dần'], ['discount', 'Giảm giá nhiều']], sort)}</select></label><div class="view-toggle"><a aria-label="Dạng lưới" aria-current="${layout === 'grid'}" href="${go({view: ''})}">${icon('grid', 17)}</a><a aria-label="Dạng danh sách" aria-current="${layout === 'list'}" href="${go({view: 'list'})}">${icon('list', 18)}</a></div></div>
    ${activeTags.length ? '<div class="filter-tags">' + activeTags.map(([k, v]) => '<a href="' + go({[k]: ''}) + '">' + esc(v) + icon('x', 13) + '</a>').join('') + '</div>': ''}
    <div class="shop-cards ${layout === 'list' ? 'as-list': ''}">${list.length ? grid(list.slice((n - 1 ) *size, n * size), variantIndex): empty('search', 'Chưa tìm thấy sản phẩm', 'Thử từ khóa ngắn hơn hoặc xóa bớt điều kiện lọc.', 'shop', 'Xem tất cả sản phẩm')}</div>
    ${totalPages > 1 ? '<nav class="pagination" aria-label="Phân trang">' + Array.from({length: totalPages}, (_, i) => '<a aria-label="Trang ' + (i + 1) + '" ' + (n === i + 1 ? 'aria-current="page"': '') + ' href="' + go({p: i + 1}) + '">' + (i + 1) + '</a>').join('') + '</nav>': ''}</section></div></div>`;
  }
  const galleryScenes = {
    'iphone-16-pro': 'story-phone',
    'macbook-air': 'feature-laptop',
    'sony-headphones': 'feature-audio',
    'cap-usb-c': 'story-charge',
    'sac-usb-c': 'story-charge'
  };
  function photos(p) {
    const all = [{id: p.id, label: 'Toàn cảnh', zoom: false}, {id: p.id, label: 'Cận cảnh', zoom: true}];
    if (galleryScenes[p.id])all.push({id: galleryScenes[p.id], label: 'Ảnh minh họa', scene: true});
    return all;
  }
  function gallery(p) {
    const all = photos(p), view = all[state.photo];
    return `<div class="gallery-main ${view.zoom ? 'zoomed': ''} ${view.scene ? 'scene': ''}"><button type="button" data-act="zoom" aria-label="Phóng to ảnh ${esc(p.name)}">${img(view.id, p.name + ' – ' + view.label, '', true)}<span>${icon('zoom', 17)}</span></button></div>
    <div class="gallery-thumbs">${all.map((v, i) => `<button data-act="photo" data-index="${i}" aria-label="${v.label}" aria-pressed="${state.photo === i}" class="${v.zoom ? 'zoomed': ''}">${img(v.id, '')}<span>${v.label}</span></button>`).join('')}</div>`;
  }
  function buyBox(p) {
    const v = p.versions[state.version], stock = TM.available(p, state.version);
    return `<div class="detail-price">${priceLine(p, state.version)}</div><div class="detail-options"><span class="field-name">Phiên bản</span><div class="pills">${p.versions.map((x, i) => `<button type="button" data-act="version" data-index="${i}" aria-pressed="${i === state.version}">${x.label}</button>`).join('')}</div><p class="color-label">Màu sắc <strong>${p.color}</strong></p><span class="stock ${stock ? '': 'out'}"><i></i>${stock ? 'Còn ' + stock + ' sản phẩm': 'Tạm hết hàng'}</span></div>
    <div class="purchase-controls"><div class="stepper"><button type="button" data-act="qty" data-dir="-1" aria-label="Giảm số lượng" ${state.qty <= 1 ? 'disabled': ''}>${icon('minus', 16)}</button><output aria-label="Số lượng">${state.qty}</output><button type="button" data-act="qty" data-dir="1" aria-label="Tăng số lượng" ${state.qty >= stock ? 'disabled': ''}>${icon('plus', 16)}</button></div><button class="btn primary" data-act="add-detail" ${stock ? '': 'disabled'}>${icon('bag', 18)}Thêm vào giỏ</button><button class="btn dark" data-act="buy" ${stock ? '': 'disabled'}>Mua ngay</button></div>`;
  }
  function panelContent(p) {
    if (state.tab === 'specs')return '<dl class="spec-table">' + Object.entries({...p.specs, 'Phiên bản': p.versions[state.version].label, 'Màu sắc': p.color, 'Tình trạng': p.condition, 'Mã sản phẩm': p.code}).map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('') + '</dl>';
    if (state.tab === 'reviews') {
      const reviews = read('reviews', []).filter(r => r.id === p.id);
      return `<div class="reviews"><div><h3>Đánh giá sản phẩm (${reviews.length})</h3>${reviews.length ? reviews.slice().reverse().map(r => '<div class="review"><strong>' + esc(r.name) + '</strong> <span class="stars" aria-label="' + r.stars + ' sao">' + '★'.repeat(r.stars) + '</span><p>' + esc(r.text) + '</p></div>').join(''): '<p>Chưa có đánh giá. Bạn có thể chia sẻ trải nghiệm đầu tiên.</p>'}</div><form id="review" class="form-stack"><label>Tên hiển thị<input name="name" required maxlength="60"></label><label>Số sao<select name="stars">${[5, 4, 3, 2, 1].map(n => '<option value="' + n + '">' + n + ' sao</option>').join('')}</select></label><label>Nhận xét<textarea name="text" required maxlength="700" rows="3"></textarea></label><small>Đánh giá được lưu trên trình duyệt này.</small><button class="btn primary">Lưu đánh giá</button></form></div>`;
    }
    return `<div class="description"><h3>Giới thiệu ${p.name}</h3><p>${p.desc}</p><p>Phiên bản đang chọn là <strong>${p.versions[state.version].label}</strong>, màu ${p.color.toLocaleLowerCase('vi')}. Xem mục thông số để đối chiếu cấu hình trước khi thêm vào giỏ.</p><a class="text-link" href="${url('policy', {}, 'bao-hanh')}">Xem chính sách bảo hành ${icon('arrow', 16)}</a></div>`;
  }
  function product() {
    const p = item(query.get('id') || PRODUCTS[0].id);
    if (!p)return toolbar() + '<div class="wrap inner-page">' + empty('box', 'Không tìm thấy sản phẩm', 'Mã sản phẩm trong đường dẫn chưa có trong danh mục.') + '</div>';
    const related = [...PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat), ...PRODUCTS.filter(x => x.cat !== p.cat)].slice(0, 4);
    return `${toolbar()}<div class="wrap inner-page">${crumbs(['Cửa hàng', url('shop')], [category(p.cat).name, url('shop', {cat: p.cat})], p.name)}<div class="detail-layout"><div id="gallery">${gallery(p)}</div><section class="detail-copy"><div class="detail-meta"><span class="eyebrow">${p.brand}</span><span>Mã ${p.code}</span><span>${p.condition}</span></div><h1>${p.name}</h1><p class="detail-intro">${p.desc}</p><div id="buy-box">${buyBox(p)}</div><div class="detail-tools">${listButton('favorites', p)}<span>Yêu thích</span>${listButton('compare', p)}<a href="${url('compare')}">Xem so sánh</a></div><div class="delivery-note">${icon('truck', 19)}<span>Giao tận nơi hoặc nhận tại cửa hàng ở Man Thiện.</span></div></section></div>
    <section class="detail-tabs"><div class="tabs" aria-label="Nội dung sản phẩm">${[['intro', 'Mô tả sản phẩm'], ['specs', 'Thông số kỹ thuật'], ['reviews', 'Đánh giá']].map(([id, label]) => '<button data-act="detail-tab" data-id="' + id + '" aria-pressed="' + (state.tab === id) + '">' + label + '</button>').join('')}</div><div id="detail-panel">${panelContent(p)}</div></section><section class="home-section">${heading('Có thể bạn quan tâm', more('shop', 'Xem cửa hàng'))}${grid(related)}</section><dialog id="lightbox" class="lightbox"><button autofocus data-act="close-zoom" aria-label="Đóng ảnh" class="icon-btn">${icon('x')}</button><div id="light-image"></div></dialog></div>`;
  }
  function favorites() {
    const list = read('favorites', []).map(item).filter(Boolean);
    return toolbar() + '<div class="wrap inner-page">' + crumbs('Yêu thích') + '<div class="page-title"><h1>Sản phẩm yêu thích</h1><p>' + list.length + ' sản phẩm đã lưu trên thiết bị này.</p></div>' + (list.length ? grid(list): empty('heart', 'Danh sách còn trống', 'Nhấn biểu tượng trái tim trên sản phẩm bạn muốn xem lại.')) + '</div>';
  }
  function compare() {
    const list = read('compare', []).map(item).filter(Boolean);
    const specKeys = [...new Set(list.flatMap(p => Object.keys(p.specs)))];
    const rows = [
      ['Giá từ', p => money(p.versions[0].price)],
      ['Thương hiệu', p => p.brand],
      ['Danh mục', p => category(p.cat).name],
      ['Phiên bản', p => p.versions.map(x => x.label).join(' · ')],
      ['Tình trạng', p => p.condition],
      ['Màu sắc', p => p.color],
      ...specKeys.map(k => [k, p => p.specs[k] || '—'])
    ];
    return `${toolbar()}<div class="wrap inner-page">${crumbs('So sánh')}<div class="page-title"><h1>So sánh sản phẩm</h1><p>Đặt tối đa 3 sản phẩm cạnh nhau để so giá và cấu hình.</p></div>${list.length ? `<div class="compare-wrap"><table class="compare-table"><thead><tr><th>Tiêu chí</th>${list.map(p => `<th>${img(p.id, p.name)}<a href="${url('product', {id: p.id})}">${p.name}</a><button class="subtle" data-act="compare" data-id="${p.id}">Bỏ so sánh</button></th>`).join('')}</tr></thead><tbody>${rows.map(([label, fn]) => '<tr><th scope="row">' + label + '</th>' + list.map(p => '<td>' + esc(fn(p)) + '</td>').join('') + '</tr>').join('')}</tbody></table></div><a class="btn soft mt" href="${url('shop')}">${icon('plus', 16)} Chọn thêm sản phẩm</a>`: empty('compare', 'Chưa chọn sản phẩm so sánh', 'Chọn biểu tượng hai mũi tên trên thẻ sản phẩm hoặc ở trang chi tiết.')} </div>`;
  }
  Object.assign(TM.pages, {home, shop, product, favorites, compare});
  function updateDetail(p) {
    document.querySelector('#buy-box').innerHTML = buyBox(p);
    document.querySelector('#detail-panel').innerHTML = panelContent(p);
  }
  function showLight(p) {
    const v = photos(p)[state.photo];
    document.querySelector('#light-image').innerHTML = `<div class="large-photo ${v.zoom ? 'zoomed': ''}">${img(v.id, p.name + ' – ' + v.label)}</div><div class="light-controls"><button data-act="light-step" data-dir="-1" aria-label="Ảnh trước">${icon('left')}</button><span>${v.label} · ${state.photo + 1}/${photos(p).length}</span><button data-act="light-step" data-dir="1" aria-label="Ảnh sau">${icon('right')}</button></div>`;
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el)return;
    const a = el.dataset.act, d = el.dataset, dir = Number(d.dir), idx = Number(d.index);
    if (a === 'slide' || a === 'slide-step') {
      state.slide = a === 'slide' ? idx: (state.slide + dir + slides.length ) %slides.length;
      document.querySelector('#hero-slot').innerHTML = hero();
      document.querySelector('#hero-slot [data-act="' + a + '"][' + (a === 'slide' ? 'data-index="' + idx: 'data-dir="' + dir) + '"]').focus({preventScroll: true});
    }
    if (a === 'categories') {
      const track = document.querySelector('#cat-track');
      const width = track.children[0].getBoundingClientRect().width + 14;
      const end = track.scrollWidth - track.clientWidth;
      const target = dir > 0 && track.scrollLeft >= end - 2 ? 0: dir < 0 && track.scrollLeft <= 2 ? end: track.scrollLeft + dir * width;
      track.scrollTo({left: target, behavior: 'smooth'});
    }
    if (a === 'featured') {
      state.featured = d.id;
      document.querySelectorAll('[data-act="featured"]').forEach(b => b.setAttribute('aria-pressed', String(b === el)));
      document.querySelector('#featured-grid').innerHTML = featured();
    }
    if (a === 'shelf') {
      const i = Number(d.shelf), length = i === 2 ? PRODUCTS.filter(p => ['phu-kien', 'tai-nghe'].includes(p.cat)).length: PRODUCTS.length;
      state.shelves[i] = (state.shelves[i] + 3 * dir + length ) %length;
      document.querySelector('#shelves').innerHTML = shelves();
    }
    if (TM.page !== 'product')return;
    const p = item(query.get('id') || PRODUCTS[0].id);
    if (!p)return;
    if (a === 'version') {
      state.version = idx;
      state.qty = 1;
      updateDetail(p);
    }
    if (a === 'qty') {
      state.qty = Math.max(1, Math.min(TM.available(p, state.version), state.qty + dir));
      document.querySelector('#buy-box').innerHTML = buyBox(p);
    }
    if (a === 'add-detail' || a === 'buy')TM.add(p.id, state.version, state.qty, a === 'buy');
    if (a === 'photo') {
      state.photo = idx;
      document.querySelector('#gallery').innerHTML = gallery(p);
    }
    if (a === 'zoom') {
      showLight(p);
      document.querySelector('#lightbox').showModal();
    }
    if (a === 'light-step') {
      state.photo = (state.photo + dir + photos(p).length ) %photos(p).length;
      showLight(p);
      document.querySelector('#gallery').innerHTML = gallery(p);
    }
    if (a === 'close-zoom')document.querySelector('#lightbox').close();
    if (a === 'detail-tab') {
      state.tab = d.id;
      document.querySelectorAll('[data-act="detail-tab"]').forEach(b => b.setAttribute('aria-pressed', String(b === el)));
      document.querySelector('#detail-panel').innerHTML = panelContent(p);
    }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'sort') {
      const vals = Object.fromEntries(query);
      delete vals.trang;
      location.href = url('shop', {...vals, p: '', sort: e.target.value});
    }
  });
  document.addEventListener('submit', e => {
    const f = e.target;
    if (f.id === 'filters') {
      e.preventDefault();
      const v = Object.fromEntries(new FormData(f));
      if (v.min && v.max && Number(v.min) > Number(v.max)) {
        f.elements.max.setCustomValidity('Giá đến phải lớn hơn hoặc bằng giá từ.');
        f.elements.max.reportValidity();
        return;
      }
      const params = Object.fromEntries(query);
      delete params.trang;
      location.href = url('shop', {...params, ...v, p: ''});
    }
    if (f.id === 'review') {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(f));
      if (!data.name.trim() || !data.text.trim()) {
        TM.toast('Vui lòng nhập tên và nội dung nhận xét.');
        return;
      }
      const p = item(query.get('id') || PRODUCTS[0].id);
      TM.save('reviews', [...read('reviews', []), {id: p.id, name: data.name.trim(), stars: Number(data.stars), text: data.text.trim()}]);
      document.querySelector('#detail-panel').innerHTML = panelContent(p);
      TM.toast('Đã lưu đánh giá của bạn.');
    }
  });
  document.addEventListener('input', e => {
    if (e.target.closest('#filters'))document.querySelector('#max-price').setCustomValidity('');
  });
})();
