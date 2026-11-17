/* Góc công nghệ, thông tin cửa hàng và các hướng dẫn mua sắm. */
(() => {
  'use strict';
  const {url, item, esc, img, icon, toolbar, crumbs, empty, heading, more, query} = TM;
  function storyCard(s) {
    return `<article class="story-card"><a class="story-image" tabindex="-1" aria-label="${esc(s.title)}" href="${url('article', {id: s.id})}">${img(s.image, s.title)}</a><div class="story-meta"><span>${s.tag}</span><i></i>${s.date}</div><h3><a href="${url('article', {id: s.id})}">${s.title}</a></h3><p>${s.intro}</p><a class="text-link" href="${url('article', {id: s.id})}">Đọc bài viết ${icon('arrow', 15)}</a></article>`;
  }
  function blog() {
    const tag = query.get('chu-de') || '', term = query.get('tu-khoa') || '', tags = [...new Set(STORIES.map(s => s.tag))];
    const result = STORIES.filter(s => (!tag || s.tag === tag ) &&TM.norm(s.title + ' ' + s.intro + ' ' + s.tag + ' ' + (TM.englishStoryTerms?.(s) || '')).includes(TM.norm(term)));
    return `${toolbar()}<div class="wrap inner-page">${crumbs('Góc công nghệ')}<div class="page-title"><h1>Góc công nghệ</h1><p>Kinh nghiệm chọn mua và sử dụng thiết bị cho học tập, công việc và giải trí.</p></div><div class="blog-control"><div class="tabs"><a aria-current="${!tag}" href="${url('blog', {'tu-khoa': term})}">Tất cả</a>${tags.map(t => '<a aria-current="' + (t === tag) + '" href="' + url('blog', {'chu-de': t, 'tu-khoa': term}) + '">' + t + '</a>').join('')}</div><form id="blog-search"><label class="sr" for="blog-q">Từ khóa bài viết</label><input id="blog-q" name="q" maxlength="120" type="search" value="${esc(term)}" placeholder="Tìm bài viết"><button type="submit" aria-label="Tìm bài viết">${icon('search', 18)}</button></form></div>${result.length ? '<div class="story-grid article-grid">' + result.map(storyCard).join('') + '</div>': empty('book', 'Chưa có bài viết phù hợp', 'Thử chủ đề hoặc từ khóa khác.', 'blog', 'Xem tất cả bài viết')}</div>`;
  }
  function article() {
    const s = STORIES.find(x => x.id === (query.get('id') || STORIES[0].id));
    if (!s)return toolbar() + '<div class="wrap inner-page">' + empty('book', 'Không tìm thấy bài viết', 'Chọn một bài trong Góc công nghệ để tiếp tục.', 'blog', 'Về Góc công nghệ') + '</div>';
    const p = item(s.product);
    return `${toolbar()}<div class="wrap inner-page">${crumbs(['Góc công nghệ', url('blog')], s.tag)}<article class="article-body"><div class="story-meta"><a href="${url('blog', {'chu-de': s.tag})}">${s.tag}</a><i></i>${s.date}<i></i>${s.time} phút đọc</div><h1>${s.title}</h1><p class="article-deck">${s.intro}</p>${img(s.image, s.title, 'article-cover', true)}${s.sections.map(([h, b]) => '<section><h2>' + h + '</h2><p>' + b + '</p></section>').join('')}<a class="article-product" href="${url('product', {id: p.id})}">${img(p.id, '')}<div><small>Sản phẩm trong bài</small><strong>${p.name}</strong></div>${icon('arrow')}</a></article><section class="home-section">${heading('Đọc tiếp', more('blog', 'Tất cả bài viết'))}<div class="story-grid">${STORIES.filter(x => x.id !== s.id).slice(0, 3).map(storyCard).join('')}</div></section></div>`;
  }
  function shopOpen() {
    const h = Number(new Intl.DateTimeFormat('en-GB', {hour: '2-digit', hourCycle: 'h23', timeZone: 'Asia/Ho_Chi_Minh'}).format(new Date()));
    return h >= 8 && h < 21;
  }
  function contact() {
    const open = shopOpen();
    return `${toolbar()}<div class="wrap inner-page">${crumbs('Liên hệ')}<div class="page-title"><h1>Liên hệ Trong mobile</h1><p>Ghé cửa hàng tại Man Thiện hoặc liên hệ để trao đổi về sản phẩm và đơn hàng.</p></div>
    <div class="contact-grid"><section class="store-panel"><div class="store-top">${icon('store', 27)}<span class="store-open"><i></i>${open ? 'Đang mở cửa': 'Đang đóng cửa'}</span></div><h2>Cửa hàng Man Thiện</h2><div class="store-item">${icon('pin', 19)}<div><small>Địa chỉ</small><strong>${STORE.address}</strong><a class="text-link" href="${TM.mapURL}" target="_blank" rel="noopener">Chỉ đường trên Google Maps ${icon('diagonal', 14)}</a></div></div><div class="store-item">${icon('time', 19)}<div><small>Giờ mở cửa</small><strong>${STORE.hours} hằng ngày</strong></div></div><div class="store-item">${icon('call', 19)}<div><small>Điện thoại</small><a href="tel:${STORE.phone}">${STORE.phone}</a></div></div><div class="store-item">${icon('mail', 19)}<div><small>Email</small><a href="mailto:${STORE.email}">${STORE.email}</a></div></div></section>
    <section class="form-panel"><h2>Gửi lời nhắn</h2><p class="form-intro">Điền nội dung để soạn sẵn thư trong ứng dụng email của bạn.</p><form class="form-stack" id="contact-form"><label>Họ và tên<input name="name" required maxlength="80"></label><label>Email liên hệ<input name="email" type="email" required maxlength="120"></label><label>Chủ đề<select name="subject"><option>Tư vấn sản phẩm</option><option>Hỏi về đơn hàng</option><option>Bảo hành và đổi trả</option><option>Góp ý khác</option></select></label><label>Lời nhắn<textarea name="message" rows="4" required maxlength="1800"></textarea></label><button class="btn primary" type="submit">${icon('mail', 17)}Soạn email</button><p id="contact-status" role="status"></p></form></section></div></div>`;
  }
  const policies = [
    {
      id: 'giao-hang',
      title: 'Giao hàng và nhận tại cửa hàng',
      icon: 'truck',
      entries: [
        [
          'Giao tận nơi',
          'Nhập họ tên, số điện thoại và địa chỉ gồm số nhà, tên đường, phường/xã và tỉnh/thành. Phí giao hàng mẫu là 30.000 ₫ cho đơn dưới 500.000 ₫. Đơn từ 500.000 ₫ được miễn phí giao hàng, tính theo tạm tính trước mã giảm giá.'
        ],
        [
          'Nhận trực tiếp',
          'Chọn “Nhận tại cửa hàng” khi đặt hàng. Địa điểm nhận là ' + STORE.address + '. Khách đến nhận trong khung giờ ' + STORE.hours + ' hằng ngày. Phương thức này luôn miễn phí vận chuyển.'
        ],
        [
          'Tra cứu hoặc hủy đơn',
          'Giữ mã TM- trên phiếu xác nhận. Mở Tra cứu đơn hàng, nhập đúng mã và số điện thoại để xem chi tiết. Đơn còn ở trạng thái Chờ xác nhận có thể hủy ngay trong phiếu.'
        ]
      ]
    },
    {
      id: 'thanh-toan',
      title: 'Thanh toán và mã giảm giá',
      icon: 'receipt',
      entries: [
        ['Hình thức thanh toán', 'Chọn giao tận nơi để thanh toán khi nhận hàng (COD), hoặc thanh toán trực tiếp khi nhận tại cửa hàng. Bản thực hành lưu đơn trên thiết bị và không thu tiền.'],
        ['Mã TRONG50', 'Mã TRONG50 giảm 50.000 ₫ khi tạm tính đạt 1.000.000 ₫. Áp dụng mã trong giỏ trước khi đặt hàng. Khi giảm số lượng xuống dưới mức tối thiểu, phần giảm giá được tính lại.']
      ]
    },
    {
      id: 'bao-hanh',
      title: 'Bảo hành và đổi trả',
      icon: 'shield',
      entries: [
        ['Kiểm tra khi nhận máy', 'Đối chiếu mã sản phẩm, phiên bản, màu sắc và phụ kiện với phiếu đơn. Với máy đã qua sử dụng, kiểm tra thêm ngoại hình, màn hình, camera và cổng kết nối.'],
        [
          'Yêu cầu kiểm tra',
          'Trong chính sách mẫu, khách có thể yêu cầu kiểm tra lỗi phần cứng trong 10 ngày đầu kể từ khi nhận máy. Gửi mã đơn, mô tả lỗi và ảnh tình trạng đến email của Trong mobile để cửa hàng đối chiếu.'
        ],
        [
          'Khi cần đổi sản phẩm',
          'Giữ lại hộp và phụ kiện đã nhận. Cửa hàng sẽ đối chiếu tình trạng máy và trao đổi phương án đổi với khách trước khi tiếp nhận. Phạm vi bảo hành theo từng loại sản phẩm được xác nhận khi mua.'
        ]
      ]
    },
    {
      id: 'du-lieu',
      title: 'Dữ liệu của bản thực hành',
      icon: 'lock',
      entries: [
        [
          'Dữ liệu được lưu ở đâu?',
          'Giỏ hàng, sản phẩm yêu thích, đánh giá, đăng ký nhận tin, tài khoản và đơn thử được lưu trong trình duyệt hiện tại. Xóa dữ liệu trang hoặc đổi trình duyệt sẽ ảnh hưởng đến khả năng xem lại.'
        ],
        ['Ảnh và giá sản phẩm', 'Ảnh là hình minh họa. Giá, chương trình ưu đãi, tồn kho, thời gian mở cửa và chính sách được đặt để trình diễn các chức năng của website.']
      ]
    }
  ];
  function policy() {
    return `${toolbar()}<div class="wrap inner-page">${crumbs('Chính sách cửa hàng')}<div class="page-title"><h1>Chính sách cửa hàng</h1><p>Thông tin giao nhận, thanh toán và hỗ trợ cho đơn hàng tại Trong mobile.</p></div><div class="policy-layout"><nav class="policy-nav" aria-label="Nội dung chính sách">${policies.map(p => '<a href="#' + p.id + '">' + icon(p.icon, 17) + p.title + '</a>').join('')}</nav><div>${policies.map(p => '<section class="policy-block" id="' + p.id + '"><h2>' + p.title + '</h2>' + p.entries.map(([h, body]) => '<h3>' + h + '</h3><p>' + body + '</p>').join('') + '</section>').join('')}</div></div></div>`;
  }
  Object.assign(TM.pages, {blog, article, contact, policy});
  TM.storyCard = storyCard;
  document.addEventListener('submit', e => {
    const f = e.target;
    if (f.id === 'blog-search') {
      e.preventDefault();
      location.href = url('blog', {'tu-khoa': f.elements.q.value.trim(), 'chu-de': query.get('chu-de')});
    }
    if (f.id === 'contact-form') {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(f));
      if (!data.name.trim() || !data.message.trim()) {
        TM.toast('Vui lòng nhập tên và lời nhắn.');
        return;
      }
      const mail = 'mailto:' + STORE.email + '?subject=' + encodeURIComponent('[Trong mobile] ' + data.subject) + '&body=' + encodeURIComponent('Họ tên: ' + data.name.trim() + '\nEmail liên hệ: ' + data.email + '\n\n' + data.message.trim());
      const status = document.querySelector('#contact-status');
      status.innerHTML = 'Bấm gửi trong ứng dụng email để hoàn tất. <a class="text-link" href="' + esc(mail) + '">Mở lại bản nháp</a>';
      location.href = mail;
    }
  });
})();
