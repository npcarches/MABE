  var IMGS = {
  "tee": "assets/images/tee.jpg",
  "hoodie": "assets/images/hoodie.jpg",
  "shirt": "assets/images/shirt.jpg",
  "sneaker": "assets/images/sneaker.jpg",
  "backpack": "assets/images/backpack.jpg",
  "wallet": "assets/images/wallet.jpg",
  "sunglasses": "assets/images/sunglasses.jpg",
  "tote": "assets/images/tote.jpg",
  "mug": "assets/images/mug.jpg",
  "candle": "assets/images/candle.jpg",
  "serum": "assets/images/serum.jpg",
  "headphones": "assets/images/headphones.jpg",
  "vase": "assets/images/vase.jpg",
  "lipbalm": "assets/images/lipbalm.jpg"
};

  // Gán ảnh từ từ điển
  document.querySelectorAll('img[data-img]').forEach(function (el) { el.src = IMGS[el.getAttribute('data-img')] || ''; });

  // Ẩn thông báo demo
  document.getElementById('demo-x').addEventListener('click', function () { document.getElementById('demo').style.display = 'none'; });

  // ===== Router theo hash =====
  var views = document.querySelectorAll('[data-view]');
  var navLinks = document.querySelectorAll('[data-nav]');
  function route() {
    var h = (location.hash || '').replace('#', '') || 'home';
    var found = false;
    views.forEach(function (v) { if (v.getAttribute('data-view') === h) found = true; });
    if (!found) h = 'home';
    views.forEach(function (v) {
      var on = v.getAttribute('data-view') === h;
      v.hidden = !on;
      if (on) document.title = v.getAttribute('data-title');
    });
    navLinks.forEach(function (a) {
      if (a.getAttribute('data-nav') === h) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    if (h === 'quy-trinh') Stepper.start(); else Stepper.stop();
  }
  window.addEventListener('hashchange', route);

  // ===== Tính nhanh chi phí =====
  var Est = (function () {
    var mode = 'cat', last = '';
    function vnd(n) { return new Intl.NumberFormat('vi-VN').format(Math.round(n)) + 'đ'; }
    function num(id, min) { var v = parseInt(document.getElementById(id).value, 10); if (isNaN(v)) v = 0; return Math.max(min || 0, v); }
    function calc() {
      var rows = [], total = 0, summary = '';
      if (mode === 'cat') {
        var sku = Math.max(1, num('c-sku', 0));
        var sel = document.getElementById('c-pack');
        var price = parseInt(sel.value, 10), n = parseInt(sel.options[sel.selectedIndex].getAttribute('data-n'), 10);
        total = sku * price; rows.push([sku + ' SKU × ' + vnd(price), vnd(total)], ['Tổng số ảnh', (sku * n) + ' tấm']);
        summary = 'Ước tính catalog: ' + sku + ' SKU, gói ' + n + ' tấm, tổng ' + vnd(total) + '.';
      } else {
        var looks = Math.max(1, num('l-look', 0));
        var t = document.getElementById('l-tier');
        var tp = parseInt(t.value, 10), tn = parseInt(t.options[t.selectedIndex].getAttribute('data-n'), 10);
        total = looks * tp; rows.push([looks + ' look × ' + vnd(tp), vnd(total)], ['Tổng số ảnh', (looks * tn) + ' tấm']);
        summary = 'Ước tính lookbook: ' + looks + ' look, gói ' + tn + ' tấm, tổng ' + vnd(total) + '.';
      }
      document.getElementById('r-total').textContent = vnd(total);
      document.getElementById('r-dep').textContent = vnd(total * 0.5);
      document.getElementById('r-list').innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
      last = summary;
    }
    function setMode(m) {
      mode = m;
      document.getElementById('m-cat').setAttribute('aria-pressed', m === 'cat');
      document.getElementById('m-look').setAttribute('aria-pressed', m === 'look');
      document.getElementById('f-cat').hidden = m !== 'cat';
      document.getElementById('f-look').hidden = m !== 'look';
      calc();
    }
    document.getElementById('m-cat').addEventListener('click', function () { setMode('cat'); });
    document.getElementById('m-look').addEventListener('click', function () { setMode('look'); });
    document.querySelectorAll('#f-cat input, #f-cat select, #f-look input, #f-look select').forEach(function (el) { el.addEventListener('input', calc); el.addEventListener('change', calc); });
    calc();
  })();

  // ===== Quy trình: dữ liệu =====
  var FLOW = {
    cat: {
      note: 'Tiện lợi theo kiểu gửi hàng và chụp, đồng nhất giữa các mã hàng, chính xác về màu sắc và chất liệu.',
      steps: [
        { s: 'Chốt SKU và báo giá', t: 'Chốt danh mục sản phẩm (SKU) và báo giá', img: 'vase', chips: ['Gói 4 góc, 6 góc, tùy chỉnh'], b: ['Bạn gửi danh sách sản phẩm (số mã, chất liệu đặc thù như kim loại, kính, vải tối màu) và chọn gói 4 góc, 6 góc hoặc tùy chỉnh.', 'Thống nhất phông nền (trắng #FFFFFF, xám nhạt hoặc tách nền PNG) và xác nhận báo giá.'] },
        { s: 'Bàn giao, kiểm đếm', t: 'Bàn giao và kiểm đếm sản phẩm', img: 'tote', chips: ['Cọc 50%'], b: ['Gửi sản phẩm về studio, hoặc đặt lịch ekip đến chụp tại kho, showroom.', 'MABE quay video mở kiện, kiểm đếm, bảo quản, ủi phẳng trang phục, lau bụi và vân tay trên phụ kiện.'] },
        { s: 'Chụp mẫu, chụp loạt', t: 'Chụp mẫu duyệt, rồi chụp hàng loạt', img: 'headphones', chips: ['Duyệt 1 mẫu trước'], b: ['MABE chụp thử 1 sản phẩm và gửi ngay để bạn duyệt góc máy, ánh sáng, độ chuẩn màu.', 'Bạn đồng ý, ekip chụp đồng loạt các mã còn lại để cả bộ sưu tập đồng bộ 100%.'] },
        { s: 'Hậu kỳ chuẩn màu', t: 'Hậu kỳ chuẩn màu và tách nền', img: 'serum', chips: ['3–5 ngày làm việc', 'Hỏa tốc 24h'], b: ['Cân bằng trắng theo màu thật, xóa bụi và vết xước nhỏ, crop đồng đều tỷ lệ khung hình.', 'Gửi file trong 3–5 ngày làm việc, hoặc 24h với gói hỏa tốc.'] },
        { s: 'Bàn giao, hoàn trả', t: 'Bàn giao file và hoàn trả sản phẩm', img: 'wallet', chips: ['2 lần sửa miễn phí', 'Thanh toán 50% còn lại'], b: ['Bạn nghiệm thu bộ ảnh, được chỉnh sửa miễn phí tối đa 2 lần, và thanh toán 50% còn lại.', 'Nhận link file đặt tên, phân thư mục theo mã SKU. Sản phẩm được đóng gói hoàn trả nguyên vẹn.'] }
      ]
    },
    look: {
      note: 'Cần phối hợp chặt chẽ về concept, bối cảnh, người mẫu và trang phục trước khi bấm máy.',
      steps: [
        { s: 'Tiếp nhận, tư vấn', t: 'Tiếp nhận yêu cầu và tư vấn giải pháp', img: 'shirt', chips: ['Chọn gói Tiêu chuẩn, Nâng cao, Thiết kế riêng'], b: ['Trao đổi số look, tinh thần bộ sưu tập, ngân sách dự kiến và kênh bán chính (mạng xã hội, website hay sàn thương mại điện tử).', 'Tư vấn gói phù hợp và chốt báo giá chi tiết.'] },
        { s: 'Tiền kỳ, chốt lịch', t: 'Tiền kỳ và chốt lịch', img: 'hoodie', chips: ['Cọc 50%', 'Moodboard'], b: ['Đặt cọc để giữ lịch sản xuất.', 'MABE lên moodboard (góc chụp, ánh sáng, dáng pose, tone màu), đề xuất người mẫu, MUA và bối cảnh, studio phù hợp.', 'Bạn gửi trước danh sách trang phục để ekip sắp xếp thứ tự chụp, tiết kiệm thời gian.'] },
        { s: 'Chụp tại hiện trường', t: 'Sản xuất tại hiện trường', img: 'sneaker', chips: ['Xem ảnh trực tiếp tại set'], b: ['Kiểm tra phom dáng, dựng ánh sáng, chụp thử màu và ánh sáng trước từng look.', 'Bạn xem ảnh trực tiếp trên màn hình tại set, hoặc duyệt nhanh qua ảnh gửi online.'] },
        { s: 'Lọc ảnh, hậu kỳ', t: 'Lọc ảnh và hậu kỳ chuyên sâu', img: 'tee', chips: ['Ảnh lọc trong 24h', 'Hậu kỳ 3–5 ngày làm việc'], b: ['Trong 24h sau buổi chụp, bạn nhận toàn bộ ảnh đã lọc (file xem trước) để chọn tấm ưng ý.', 'Cân màu chuẩn thực tế, retouch da, nắn phom trang phục theo số lượng trong gói.'] },
        { s: 'Nghiệm thu, bàn giao', t: 'Nghiệm thu và bàn giao', img: 'backpack', chips: ['2 lần sửa miễn phí', 'Thanh toán 50% còn lại'], b: ['Kiểm tra bản hoàn thiện, được chỉnh sửa miễn phí tối đa 2 lần.', 'Thanh toán 50% còn lại và nhận link tải trọn bộ file chất lượng cao, xuất sẵn các kích thước theo yêu cầu.'] }
      ]
    }
  };

  // ===== Quy trình: stepper có animation =====
  var Stepper = (function () {
    var svc = 'cat', idx = 0, timer = null, playing = true, visible = false, DUR = 6000, hover = false;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var track = document.getElementById('track'), fill = document.getElementById('fill'),
        stage = document.getElementById('stage'), ti = document.getElementById('timer-i'), tm = document.getElementById('timer');
    function build() {
      var old = track.querySelectorAll('.node'); old.forEach(function (n) { n.remove(); });
      FLOW[svc].steps.forEach(function (st, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'node'; b.setAttribute('aria-label', 'Bước ' + (i + 1) + ': ' + st.s);
        b.innerHTML = '<span class="dot">' + (i + 1) + '</span><span class="lbl">' + st.s + '</span>';
        b.addEventListener('click', function () { go(i, true); });
        track.appendChild(b);
      });
      document.getElementById('s-note').textContent = FLOW[svc].note;
    }
    function paint(animate) {
      var steps = FLOW[svc].steps, st = steps[idx];
      var nodes = track.querySelectorAll('.node');
      nodes.forEach(function (n, i) { n.classList.toggle('done', i < idx); n.classList.toggle('on', i === idx); if (i === idx) n.setAttribute('aria-current', 'step'); else n.removeAttribute('aria-current'); });
      fill.style.width = (idx / (steps.length - 1) * 100) + '%';
      var apply = function () {
        document.getElementById('st-title').textContent = 'Bước ' + (idx + 1) + ': ' + st.t;
        document.getElementById('st-list').innerHTML = st.b.map(function (x) { return '<li>' + x + '</li>'; }).join('');
        document.getElementById('st-chips').innerHTML = st.chips.map(function (x) { return '<span class="chip">' + x + '</span>'; }).join('');
        var im = document.getElementById('st-img'); im.src = IMGS[st.img]; im.alt = 'Ảnh mẫu minh họa cho bước ' + (idx + 1);
        document.getElementById('st-count').textContent = (idx + 1) + ' / ' + steps.length;
        stage.classList.remove('swap');
      };
      if (animate && !reduce) { stage.classList.add('swap'); setTimeout(apply, 280); } else apply();
      restartTimer();
    }
    function restartTimer() {
      clearTimeout(timer);
      ti.classList.remove('run'); void ti.offsetWidth;
      if (playing && visible && !reduce) {
        ti.style.setProperty('--dur', DUR + 'ms'); ti.classList.add('run');
        timer = setTimeout(function () { if (!hover) go((idx + 1) % FLOW[svc].steps.length, false); else restartTimer(); }, DUR);
      } else if (reduce) { ti.classList.add('run'); }
    }
    function go(i, user) { idx = i; paint(true); }
    function setSvc(s) {
      svc = s; idx = 0;
      document.getElementById('s-cat').setAttribute('aria-pressed', s === 'cat');
      document.getElementById('s-look').setAttribute('aria-pressed', s === 'look');
      build(); paint(false);
    }
    document.getElementById('s-cat').addEventListener('click', function () { setSvc('cat'); });
    document.getElementById('s-look').addEventListener('click', function () { setSvc('look'); });
    stage.addEventListener('mouseenter', function () { hover = true; tm.classList.add('paused'); });
    stage.addEventListener('mouseleave', function () { hover = false; tm.classList.remove('paused'); });
    stage.addEventListener('focusin', function () { hover = true; tm.classList.add('paused'); });
    stage.addEventListener('focusout', function () { hover = false; tm.classList.remove('paused'); });
    setSvc('cat');
    return {
      start: function () { visible = true; idx = 0; paint(false); },
      stop: function () { visible = false; clearTimeout(timer); ti.classList.remove('run'); }
    };
  })();


  // ===== Dự án =====
  (function () {
    var P = [
      { type: 'look', typeName: 'Lookbook', title: 'Bộ sưu tập Linen mùa hè', brand: 'Thương hiệu mẫu A', industry: 'Thời trang', scope: '12 look, 1 người mẫu', time: 'Ảnh lọc sau 24h, hậu kỳ 4 ngày', imgs: ['shirt', 'tee', 'hoodie'], c: 'Vải linen dễ nhăn và đổi màu dưới ánh sáng, trong khi bộ sưu tập cần một tông màu nhất quán.', a: 'Lên moodboard tone màu, chụp thử màu và ánh sáng trước từng look, nắn phom trang phục ở hậu kỳ.', r: 'Bộ ảnh đồng nhất, đặt tên theo từng look, xuất sẵn kích thước cho website và mạng xã hội.' },
      { type: 'cat', typeName: 'Catalog', title: 'Phụ kiện da và ba lô', brand: 'Thương hiệu mẫu B', industry: 'Phụ kiện', scope: '40 SKU, gói 6 góc', time: 'Hậu kỳ 5 ngày làm việc', imgs: ['wallet', 'backpack', 'sunglasses'], c: 'Da và kim loại dễ phản chiếu, màu da cần giống thật để khách không hoàn hàng.', a: 'Dựng sáng mềm, chụp thử 1 mẫu để duyệt, cân bằng trắng theo màu da thật của sản phẩm.', r: 'Ảnh nền xám nhạt đồng nhất, file phân thư mục theo mã SKU.' },
      { type: 'cat', typeName: 'Catalog', title: 'Gia dụng thủ công', brand: 'Thương hiệu mẫu C', industry: 'Gia dụng, decor', scope: '30 SKU, gói 4 góc', time: 'Hậu kỳ 3 ngày làm việc', imgs: ['mug', 'vase', 'candle'], c: 'Men gốm lốm đốm và bề mặt thô cần giữ được chất liệu thật, không bị làm phẳng khi retouch.', a: 'Ánh sáng xiên nhẹ để lộ bề mặt, xóa bụi nhỏ nhưng giữ vân gốm tự nhiên.', r: 'Bộ ảnh đăng sàn thương mại điện tử, có bản tách nền PNG cho banner.' },
      { type: 'look', typeName: 'Lookbook', title: 'Streetwear mùa mới', brand: 'Thương hiệu mẫu D', industry: 'Thời trang', scope: '15 look, 2 người mẫu và MUA', time: 'Ảnh lọc sau 24h, hậu kỳ 5 ngày', imgs: ['hoodie', 'sneaker', 'tee'], c: 'Cần cả bộ sưu tập kể một câu chuyện thống nhất, từ áo đến giày.', a: 'Moodboard đầy đủ, xem ảnh trực tiếp tại set để khách duyệt ngay, chốt line-up trang phục trước ngày chụp.', r: 'Ảnh lookbook cho cả mạng xã hội và website, xuất sẵn nhiều kích thước.' },
      { type: 'cat', typeName: 'Catalog', title: 'Chăm sóc da', brand: 'Thương hiệu mẫu E', industry: 'Mỹ phẩm', scope: '24 SKU, gói 6 góc', time: 'Hậu kỳ 4 ngày làm việc', imgs: ['serum', 'lipbalm', 'candle'], c: 'Chai thủy tinh trong suốt khó chụp, dễ lộ vân tay và bụi.', a: 'Lau sạch bề mặt trước khi chụp, dựng sáng tách viền thủy tinh, cân màu chất lỏng theo màu thật.', r: 'Ảnh nền trắng chuẩn #FFFFFF, đồng bộ cả dòng sản phẩm.' },
      { type: 'cat', typeName: 'Catalog', title: 'Công nghệ cá nhân', brand: 'Thương hiệu mẫu F', industry: 'Phụ kiện công nghệ', scope: '20 SKU, gói 4 góc', time: 'Hậu kỳ 3 ngày làm việc', imgs: ['headphones', 'sunglasses', 'backpack'], c: 'Bề mặt đen bóng và nhựa mờ cần tách chi tiết, không cháy sáng.', a: 'Chụp thử ánh sáng cho chất liệu tối màu, kiểm soát phản chiếu, tách nền PNG theo yêu cầu.', r: 'Ảnh sắc nét, giữ chi tiết vùng tối, file đặt tên theo SKU.' }
    ];
    var grid = document.getElementById('proj-grid');
    var dlg = document.getElementById('pd');
    var cur = null;
    function render(f) {
      grid.innerHTML = '';
      P.forEach(function (p, i) {
        if (f !== 'all' && p.type !== f) return;
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'proj';
        b.setAttribute('aria-label', 'Xem dự án ' + p.title);
        b.innerHTML = '<div class="ph"><img alt="" src="' + IMGS[p.imgs[0]] + '"></div><div class="proj-body"><span class="chip">' + p.typeName + '</span> <span class="chip gray">' + p.industry + '</span><h3>' + p.title + '</h3><p>' + p.scope + '</p></div>';
        b.addEventListener('click', function () { openP(i); });
        grid.appendChild(b);
      });
    }
    function setMain(k) {
      document.getElementById('pd-main').src = IMGS[k];
      document.querySelectorAll('#pd-thumbs button').forEach(function (b) { b.setAttribute('aria-current', b.getAttribute('data-k') === k ? 'true' : 'false'); });
    }
    function openP(i) {
      var p = P[i]; cur = p;
      document.getElementById('pd-type').textContent = p.typeName;
      document.getElementById('pd-title').textContent = p.title;
      document.getElementById('pd-main').alt = 'Ảnh mẫu dự án ' + p.title;
      document.getElementById('pd-dl').innerHTML =
        '<div><dt>Thương hiệu</dt><dd>' + p.brand + '</dd></div><div><dt>Lĩnh vực</dt><dd>' + p.industry + '</dd></div><div><dt>Phạm vi</dt><dd>' + p.scope + '</dd></div><div><dt>Tiến độ</dt><dd>' + p.time + '</dd></div>';
      document.getElementById('pd-c').textContent = p.c;
      document.getElementById('pd-a').textContent = p.a;
      document.getElementById('pd-r').textContent = p.r;
      var th = document.getElementById('pd-thumbs'); th.innerHTML = '';
      p.imgs.forEach(function (k) {
        var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-k', k); b.setAttribute('aria-label', 'Xem ảnh ' + k);
        b.innerHTML = '<img alt="" src="' + IMGS[k] + '">';
        b.addEventListener('click', function () { setMain(k); });
        th.appendChild(b);
      });
      setMain(p.imgs[0]);
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    }
    function closeP() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
    document.getElementById('pd-close').addEventListener('click', closeP);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeP(); });
    document.getElementById('pd-cta').addEventListener('click', closeP);
    document.querySelectorAll('[data-f]').forEach(function (b) {
      if (b.closest('.seg') && b.closest('[data-view="du-an"]')) {
        b.addEventListener('click', function () {
          document.querySelectorAll('[data-view="du-an"] [data-f]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          render(b.getAttribute('data-f'));
        });
      }
    });
    render('all');
  })();

  route();
