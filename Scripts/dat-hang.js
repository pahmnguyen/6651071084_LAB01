/* Giỏ hàng, đơn mua thử, tra cứu và tài khoản cục bộ. */
(() => {
  'use strict';
  const {url, item, esc, img, icon, money, toolbar, crumbs, empty, read, save, shopState, totals, available, toast} = TM;
  let lookup = null, accountMode = 'login', orderBusy = false;
  const telPattern = '(0[35789][0-9]{8}|\\+84[35789][0-9]{8})';
  const cleanPhone = s => String(s).replace(/[\s.\-()]/g, '').replace(/^\+84/, '0');
  function shell(title, description, body) {
    return toolbar() + '<div class="wrap inner-page">' + crumbs(title) + '<div class="page-title"><h1>' + esc(title) + '</h1>' + (description ? '<p>' + esc(description) + '</p>': '') + '</div>' + body + '</div>';
  }
  function summary(t) {
    return `<dl class="totals"><div><dt>Tạm tính</dt><dd>${money(t.sub)}</dd></div>${t.discount ? '<div class="positive"><dt>Giảm giá · ' + STORE.coupon.code + '</dt><dd>−' + money(t.discount) + '</dd></div>': ''}<div><dt>Phí giao hàng</dt><dd>${t.shipping ? money(t.shipping): 'Miễn phí'}</dd></div><div class="grand"><dt>Tổng cộng</dt><dd>${money(t.total)}</dd></div></dl>`;
  }
  function cart() {
    const s = shopState(), t = totals(s);
    if (!s.cart.length)return shell('Giỏ hàng', '', empty('bag', 'Giỏ hàng đang trống', 'Chọn sản phẩm và phiên bản để bắt đầu một đơn hàng.'));
    return shell('Giỏ hàng', s.cart.reduce((n, l) => n + l.qty, 0) + ' sản phẩm trong giỏ của bạn.', `<div class="order-layout"><div><div class="cart-table"><div class="cart-titles"><span>Sản phẩm</span><span>Số lượng</span><span>Thành tiền</span><span></span></div>${s.cart.map(l => {
      const p = item(l.id), v = p.versions[l.v];
      return `<div class="cart-line"><div class="cart-prod"><a href="${url('product', {id: p.id})}">${img(p.id, p.name)}</a><div><a href="${url('product', {id: p.id})}"><strong>${p.name}</strong></a><small>${v.label} · ${p.color}</small><span>${money(v.price)}</span></div></div><div class="stepper"><button data-act="cart-qty" data-id="${p.id}" data-v="${l.v}" data-dir="-1" aria-label="Giảm ${p.name}" ${l.qty <= 1 ? 'disabled': ''}>${icon('minus', 15)}</button><output>${l.qty}</output><button data-act="cart-qty" data-id="${p.id}" data-v="${l.v}" data-dir="1" aria-label="Tăng ${p.name}" ${l.qty >= available(p, l.v, s) ? 'disabled': ''}>${icon('plus', 15)}</button></div><strong class="line-sum">${money(v.price * l.qty)}</strong><button class="icon-btn remove" data-act="cart-remove" data-id="${p.id}" data-v="${l.v}" aria-label="Xóa ${p.name} khỏi giỏ">${icon('trash', 17)}</button></div>`;
    }).join('')}</div>
      <a class="text-link mt" href="${url('shop')}">${icon('left', 15)}Tiếp tục mua sắm</a><div class="coupon-box"><h2>${icon('tag', 19)} Mã giảm giá</h2><p>Nhập <strong>TRONG50</strong> để giảm 50.000 ₫ cho đơn từ 1.000.000 ₫.</p><form id="coupon"><label for="coupon-code" class="sr">Mã giảm giá</label><input id="coupon-code" name="code" placeholder="Nhập mã ưu đãi" maxlength="25" required value="${esc(s.coupon)}"><button class="btn soft">Áp dụng</button>${s.coupon ? '<button type="button" class="subtle" data-act="remove-coupon">Gỡ mã</button>': ''}</form><p id="coupon-status" role="status">${s.coupon ? (t.discount ? 'Đã áp dụng mã ' + STORE.coupon.code + '.': 'Giỏ hàng chưa đủ điều kiện áp dụng mã.') : ''}</p></div></div>
      <aside class="summary-box"><h2>Tóm tắt đơn hàng</h2>${summary(t)}<a class="btn primary full" href="${url('checkout')}">Tiến hành đặt hàng ${icon('arrow', 17)}</a><small>Miễn phí giao hàng từ 500.000 ₫. Nhận tại cửa hàng luôn miễn phí.</small></aside></div>`);
  }
  function cartSignature(state) {
    return JSON.stringify([state.cart.map(line => [line.id, line.v, line.qty]), state.coupon]);
  }
  function checkout() {
    const s = shopState(), profile = TM.activeProfile(), t = totals(s);
    if (!s.cart.length)return shell('Đặt hàng', '', empty('bag', 'Chưa có sản phẩm để đặt', 'Thêm sản phẩm vào giỏ trước khi nhập thông tin nhận hàng.'));
    return shell('Đặt hàng', 'Kiểm tra sản phẩm và chọn cách nhận hàng.', `<form id="checkout" class="order-layout" data-cart-key="${esc(cartSignature(s))}"><div class="checkout-fields"><section class="form-panel"><h2>Thông tin người nhận</h2><div class="form-pair"><label>Họ và tên <span>*</span><input name="name" required minlength="2" maxlength="80" autocomplete="name" value="${esc(profile?.name || '')}"></label><label>Số điện thoại <span>*</span><input name="phone" type="tel" pattern="${telPattern}" title="Nhập số di động Việt Nam, ví dụ 0912345678" required autocomplete="tel" placeholder="Ví dụ 0912345678" value="${esc(profile?.phone || '')}"></label></div><label>Email (tùy chọn)<input type="email" name="email" maxlength="120" autocomplete="email" value="${esc(profile?.email || '')}"></label></section>
      <section class="form-panel"><h2>Cách nhận hàng</h2><div class="radio-row"><label><input type="radio" name="delivery" value="ship" checked> Giao tận nơi</label><label><input type="radio" name="delivery" value="pickup"> Nhận tại cửa hàng</label></div><div id="delivery-address"><label>Địa chỉ giao hàng <span>*</span><input name="address" maxlength="180" minlength="5" required autocomplete="street-address" placeholder="Số nhà, đường, phường/xã, tỉnh/thành phố"></label></div><p id="pickup-address" class="callout" hidden>${icon('pin', 18)}${STORE.address}</p><label>Ghi chú (tùy chọn)<textarea name="note" rows="3" maxlength="400" placeholder="Ví dụ: Gọi trước khi giao"></textarea></label></section>
      <section class="form-panel"><h2>Thanh toán</h2><div class="callout">${icon('receipt', 19)}<div><strong id="pay-method">Thanh toán khi nhận hàng (COD)</strong><p>Đây là đơn thực hành, được lưu trên trình duyệt của bạn.</p></div></div></section></div>
      <aside class="summary-box"><h2>Đơn hàng của bạn</h2><div class="checkout-lines">${s.cart.map(l => {
      const p = item(l.id), v = p.versions[l.v];
      return '<div>' + img(p.id, '') + '<span><strong>' + p.name + '</strong><small>' + v.label + ' × ' + l.qty + '</small></span><b>' + money(v.price * l.qty) + '</b></div>';
    }).join('')}</div><div id="checkout-sum">${summary(t)}</div><button type="submit" class="btn primary full">Xác nhận đặt hàng ${icon('arrow', 16)}</button><a class="clear-filter" href="${url('cart')}">Quay lại giỏ hàng</a><p id="checkout-error" role="alert" class="error"></p></aside></form>`);
  }
  function createOrder(form) {
    const s = shopState(), d = Object.fromEntries(new FormData(form)), recipient = d.name.trim(), phone = cleanPhone(d.phone);
    if (!s.cart.length || form.dataset.cartKey !== cartSignature(s)) {
      throw new Error('Giỏ hàng đã thay đổi. Hãy kiểm tra lại giỏ.');
    }
    if (recipient.length < 2 || !/^0[35789]\d{8}$/.test(phone))throw new Error('Vui lòng kiểm tra họ tên và số điện thoại.');
    if (d.delivery === 'ship' && d.address.trim().length < 5)throw new Error('Vui lòng ghi đầy đủ địa chỉ giao hàng.');
    const lines = s.cart.map(l => {
      const p = item(l.id), v = p?.versions[l.v];
      if (!v || !Number.isInteger(l.qty) || l.qty < 1 || l.qty > available(p, l.v, s))throw new Error('Tồn kho đã thay đổi. Vui lòng điều chỉnh số lượng trong giỏ.');
      return {...l, name: p.name, label: v.label, color: p.color, price: v.price};
    });
    let id;
    do {
      id = 'TM-' + Array.from(crypto.getRandomValues(new Uint8Array(4)), x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    }while (s.orders.some(o => o.id === id));
    const order = {
      id,
      created: new Date().toISOString(),
      status: 'Chờ xác nhận',
      recipient,
      phone,
      email: d.email.trim(),
      address: d.delivery === 'pickup' ? STORE.address: d.address.trim(),
      note: d.note.trim(),
      method: d.delivery,
      lines,
      ...totals(s, d.delivery),
      account: TM.activeProfile()?.id || ''
    };
    if (!save('shopping', {cart: [], coupon: '', orders: [order, ...s.orders]}))throw new Error('Trình duyệt chưa cho phép lưu đơn. Hãy bật lưu trữ rồi thử lại.');
    try {
      sessionStorage.setItem('trong-mobile.receipt', id);
    } catch{}
    return id;
  }
  function dateTime(v) {
    return new Intl.DateTimeFormat('vi-VN', {dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh'}).format(new Date(v));
  }
  function receipt(o, created = false) {
    return `<section class="receipt-card">${created ? '<div class="success-banner">' + icon('check', 23) + '<div><h2>Đặt hàng thành công!</h2><p>Lưu mã bên dưới để tra cứu đơn trên thiết bị này.</p></div></div>': ''}<div class="receipt-head"><div><small>Mã đơn hàng</small><h2>${esc(o.id)}</h2><span>${dateTime(o.created)}</span></div><b class="status-chip">${esc(o.status)}</b></div><dl class="receipt-info"><div><dt>Người nhận</dt><dd>${esc(o.recipient)} · ${esc(o.phone)}</dd></div><div><dt>${o.method === 'pickup' ? 'Nhận tại cửa hàng': 'Giao đến'}</dt><dd>${esc(o.address)}</dd></div>${o.email ? '<div><dt>Email</dt><dd>' + esc(o.email) + '</dd></div>': ''}${o.note ? '<div><dt>Ghi chú</dt><dd>' + esc(o.note) + '</dd></div>': ''}</dl>
    <div class="checkout-lines">${o.lines.map(l => '<div>' + img(l.id, '') + '<span><strong>' + esc(l.name) + '</strong><small>' + esc(l.label) + ' × ' + l.qty + '</small></span><b>' + money(l.price * l.qty) + '</b></div>').join('')}</div>${summary(o)}<div class="receipt-actions"><a class="btn soft" href="${url('shop')}">Tiếp tục mua sắm</a>${o.status === 'Chờ xác nhận' ? '<button class="subtle" data-act="request-cancel" data-id="' + o.id + '">Hủy đơn này</button>': ''}</div><div class="cancel-confirm" id="cancel-${o.id}" hidden><p>Hủy đơn ${o.id} và trả các sản phẩm về tồn kho?</p><button class="btn soft" data-act="keep-order" data-id="${o.id}">Giữ đơn hàng</button> <button class="btn dark" data-act="cancel-order" data-id="${o.id}">Xác nhận hủy đơn</button></div></section>`;
  }
  function orders() {
    const s = shopState(), requested = TM.query.get('ma'), p = TM.activeProfile();
    let last = '';
    try {
      last = sessionStorage.getItem('trong-mobile.receipt') || '';
    } catch{}
    const found = lookup ? s.orders.find(o => o.id === lookup.id && o.phone === lookup.phone): s.orders.find(o => o.id === requested && (o.id === last || (p && o.account === p.id)));
    const history = p ? s.orders.filter(o => o.account === p.id): [];
    return shell('Tra cứu đơn hàng', 'Xem sản phẩm, tổng tiền và trạng thái của đơn đã tạo trên trình duyệt này.', `<div class="order-lookup"><form id="lookup" class="form-panel form-stack"><h2>Tìm đơn hàng</h2><label>Mã đơn hàng<input name="orderCode" required maxlength="21" placeholder="TM-XXXXXXXX" value="${esc(lookup?.id || requested || '')}"></label><label>Số điện thoại nhận hàng<input name="phone" type="tel" pattern="${telPattern}" required placeholder="Số điện thoại khi đặt hàng" value="${esc(lookup?.phone || '')}"></label><button class="btn primary">Tra cứu ${icon('search', 17)}</button>${lookup && !found ? '<p class="error" role="status">Không tìm thấy đơn khớp với mã và số điện thoại.</p>': ''}${history.length ? '<div class="account-orders"><h3>Đơn trong tài khoản</h3>' + history.map(o => '<a href="' + url('orders', {ma: o.id}) + '"><b>' + o.id + '</b><span>' + esc(o.status) + '</span></a>').join('') + '</div>': ''}</form><div>${found ? receipt(found, !!requested && found.id === last && !lookup && found.status === 'Chờ xác nhận'): ('<div class="lookup-guide">' + icon('receipt', 32) + '<h2>Mã đơn nằm ở đâu?</h2><p>Sau khi đặt hàng, mã bắt đầu bằng TM- xuất hiện trên phiếu xác nhận. Dùng mã đó cùng số điện thoại đã nhập để xem lại đơn.</p></div>')}</div></div>`);
  }
  async function hashPassword(password, salt) {
    const bytes = new TextEncoder().encode(password), key = await crypto.subtle.importKey('raw', bytes, 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({name: 'PBKDF2', salt: new Uint8Array(salt), iterations: 120000, hash: 'SHA-256'}, key, 256);
    return Array.from(new Uint8Array(bits), x => x.toString(16).padStart(2, '0')).join('');
  }
  function account() {
    const p = TM.activeProfile();
    if (p) {
      return shell('Tài khoản của tôi', 'Thông tin dùng để điền nhanh khi đặt hàng trên thiết bị này.', `<section class="form-panel account-panel"><div class="profile-title"><span class="empty-icon">${icon('user', 26)}</span><div><h2>${esc(p.name)}</h2><p>${esc(p.phone)}</p></div></div><form id="profile" class="form-stack"><label>Họ và tên<input name="name" value="${esc(p.name)}" required minlength="2" maxlength="80"></label><label>Email liên hệ<input name="email" type="email" maxlength="120" value="${esc(p.email)}"></label><button class="btn primary">Lưu thông tin</button></form><div class="profile-links"><a class="text-link" href="${url('orders')}">Đơn hàng của tôi ${icon('arrow', 15)}</a><button class="subtle" data-act="logout">Đăng xuất</button></div></section>`);
    }
    const reg = accountMode === 'register';
    return shell('Tài khoản', 'Đăng nhập để lưu thông tin người nhận và xem lại các đơn đã đặt.', `<section class="form-panel account-panel"><div class="tabs"><button data-act="account-mode" data-mode="login" aria-pressed="${!reg}">Đăng nhập</button><button data-act="account-mode" data-mode="register" aria-pressed="${reg}">Tạo tài khoản</button></div><form class="form-stack" id="auth">${reg ? '<label>Họ và tên<input name="name" required minlength="2" maxlength="80" autocomplete="name"></label>': ''}<label>Số điện thoại<input name="phone" type="tel" pattern="${telPattern}" required placeholder="Ví dụ 0912345678" autocomplete="tel"></label><label>Mật khẩu<input name="password" type="password" required minlength="${reg ? 8: 1}" maxlength="128" placeholder="${reg ? 'Tối thiểu 8 ký tự': 'Nhập mật khẩu'}" autocomplete="${reg ? 'new-password': 'current-password'}"></label><button class="btn primary">${reg ? 'Đăng ký': 'Đăng nhập'}</button><p id="auth-error" class="error" role="alert"></p><small>Tài khoản thực hành chỉ sử dụng trong trình duyệt trên thiết bị này.</small></form></section>`);
  }
  Object.assign(TM.pages, {cart, checkout, orders, account});
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b)return;
    const {act, id, v, dir, mode} = b.dataset;
    if (act === 'cart-remove' || act === 'cart-qty' || act === 'remove-coupon') {
      const s = shopState();
      if (act === 'remove-coupon')s.coupon = ''; else {
        const idx = s.cart.findIndex(l => l.id === id && l.v === Number(v));
        if (idx < 0)return;
        if (act === 'cart-remove')s.cart.splice(idx, 1); else {
          const qty = s.cart[idx].qty + Number(dir);
          if (qty < 1 || qty > available(item(id), Number(v), s))return;
          s.cart[idx].qty = qty;
        }
        if (!s.cart.length)s.coupon = '';
      }
      save('shopping', s);
      TM.render();
      return;
    }
    if (act === 'request-cancel' || act === 'keep-order') {
      document.getElementById('cancel-' + id).hidden = act === 'keep-order';
      return;
    }
    if (act === 'cancel-order') {
      const s = shopState(), o = s.orders.find(o => o.id === id);
      if (!o || o.status !== 'Chờ xác nhận')return;
      o.status = 'Đã hủy';
      save('shopping', s);
      lookup = {id: o.id, phone: o.phone};
      TM.render();
      toast('Đã hủy đơn ' + id + '.');
    }
    if (act === 'account-mode') {
      accountMode = mode;
      TM.render();
    }
    if (act === 'logout') {
      save('session', '');
      accountMode = 'login';
      location.href = url('account');
    }
  });
  document.addEventListener('change', e => {
    if (e.target.name !== 'delivery')return;
    const pickup = e.target.value === 'pickup', address = document.querySelector('[name="address"]');
    address.required = !pickup;
    address.disabled = pickup;
    document.querySelector('#delivery-address').hidden = pickup;
    document.querySelector('#pickup-address').hidden = !pickup;
    document.querySelector('#pay-method').textContent = pickup ? 'Thanh toán tại cửa hàng': 'Thanh toán khi nhận hàng (COD)';
    document.querySelector('#checkout-sum').innerHTML = summary(totals(shopState(), e.target.value));
  });
  document.addEventListener('submit', async e => {
    const f = e.target;
    if (f.id === 'coupon') {
      e.preventDefault();
      const s = shopState(), code = f.elements.code.value.trim().toUpperCase();
      let msg;
      if (code !== STORE.coupon.code)msg = 'Mã ưu đãi không hợp lệ.'; else if (totals(s).sub < STORE.coupon.minimum)msg = 'Đơn hàng cần đạt 1.000.000 ₫ để dùng mã này.';
      if (msg) {
        document.querySelector('#coupon-status').textContent = msg;
        return;
      }
      s.coupon = code;
      save('shopping', s);
      TM.render();
      toast('Đã áp dụng mã ' + code + '.');
    }
    if (f.id === 'checkout') {
      e.preventDefault();
      if (orderBusy)return;
      orderBusy = true;
      const button = f.querySelector('[type="submit"]');
      button.disabled = true;
      try {
        const sharedLock = !TM.isFile && navigator.locks;
        const id = sharedLock
          ? await sharedLock.request('trong-mobile-checkout', () => createOrder(f))
          : createOrder(f);
        location.href = url('orders', {ma: id});
      }
      catch (err) {
        document.querySelector('#checkout-error').textContent = err.message;
        button.disabled = false;
        orderBusy = false;
      }
    }
    if (f.id === 'lookup') {
      e.preventDefault();
      lookup = {id: f.elements.orderCode.value.trim().toUpperCase(), phone: cleanPhone(f.elements.phone.value)};
      TM.render();
    }
    if (f.id === 'profile') {
      e.preventDefault();
      const profiles = read('accounts', []), p = profiles.find(x => x.id === read('session', ''));
      const name = f.elements.name.value.trim();
      if (!p || name.length < 2) {
        toast('Họ và tên cần ít nhất 2 ký tự.');
        return;
      }
      p.name = name;
      p.email = f.elements.email.value.trim();
      save('accounts', profiles);
      TM.render();
      toast('Đã lưu thông tin tài khoản.');
    }
    if (f.id === 'auth') {
      e.preventDefault();
      const button = f.querySelector('button');
      button.disabled = true;
      const error = document.querySelector('#auth-error');
      try {
        const phone = cleanPhone(f.elements.phone.value), pass = f.elements.password.value;
        let accounts = read('accounts', []), p = accounts.find(a => a.phone === phone);
        if (accountMode === 'register') {
          if (p)throw new Error('Số điện thoại đã có tài khoản trên thiết bị này.');
          const name = f.elements.name.value.trim();
          if (name.length < 2)throw new Error('Vui lòng nhập đầy đủ họ tên.');
          const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)));
          const hash = await hashPassword(pass, salt);
          accounts = read('accounts', []);
          if (accounts.some(a => a.phone === phone))throw new Error('Số điện thoại đã được đăng ký.');
          p = {id: phone, name, phone, email: '', salt, hash};
          if (!save('accounts', [...accounts, p]))throw new Error('Trình duyệt chưa cho phép lưu tài khoản.');
        } else if (!p || await hashPassword(pass, p.salt) !== p.hash)throw new Error('Số điện thoại hoặc mật khẩu chưa đúng.');
        save('session', p.id);
        location.href = url('account');
      } catch (err) {
        error.textContent = err.message;
        button.disabled = false;
      }
    }
  });
})();
