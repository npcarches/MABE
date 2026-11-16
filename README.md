# MABE — Website chụp ảnh catalog và lookbook

Website tĩnh nhiều trang (HTML, CSS, JavaScript thuần), không cần cài đặt gì.

## Cấu trúc thư mục

```
MABE/
├── index.html            Khung trang, nội dung 5 trang
├── css/style.css         Toàn bộ giao diện (màu chủ đạo ở :root, biến --brand)
├── js/app.js             Chuyển trang, tính chi phí, quy trình, dự án, menu điện thoại, sao chép email
├── js/i18n.js            Từ điển Việt–Anh và nút chuyển ngôn ngữ (VI | EN)
├── assets/images/        Ảnh thật của MABE (lookbook, catalog, product lifestyle) và logo khách hàng
├── assets/logo/          Bộ logo MABE production (SVG: logo chính, logo phụ, submark, icon)
├── docs/                 Tài liệu dự án (brief)
├── CREDITS.md            Nguồn ảnh mẫu
└── README.md
```

## Các trang (chuyển bằng hash trên URL)

| Trang | URL | Nội dung |
|---|---|---|
| Trang chủ | `index.html#home` | Giới thiệu, dịch vụ, ảnh mẫu, giá khởi điểm |
| Dự án | `index.html#du-an` | Dự án tiêu biểu, đối tác |
| Bảng giá | `index.html#bang-gia` | Giá catalog và lookbook, tính nhanh chi phí |
| Quy trình | `index.html#quy-trinh` | Stepper có animation, chi tiết 5 bước |
| Liên hệ | `index.html#lien-he` | Số điện thoại (Zalo, Telegram, WhatsApp), Instagram, email |

## Chạy thử

Mở thẳng `index.html` bằng trình duyệt, hoặc chạy server cục bộ:

```bash
cd /Users/cuongnguyen/MABE
python3 -m http.server 8000
# mở http://localhost:8000
```

## Cần thay bằng dữ liệu thật

- **Bảng giá:** giá hiện tại là mẫu. Sửa trong `index.html` (mục `data-view="bang-gia"`) và hàm tính chi phí trong `js/app.js` (khối `Est`).
- **Ảnh:** thay file trong `assets/images/` bằng ảnh thật của MABE, giữ nguyên tên file (tỷ lệ vuông 1:1 là đẹp nhất).
- **Dự án và đối tác:** mảng `P` trong `js/app.js`, và các ô `.partner` trong `index.html`. Hiện là nội dung mẫu.
- **Liên hệ:** số điện thoại, email `mabe.product@gmail.com` và Instagram `@mabeproduction` đã điền. Liên kết Telegram dùng số điện thoại, đổi sang tên người dùng nếu có.
- **Logo:** hiện là chữ MABE kèm ô vuông, thay bằng file logo khi có.

## Lưu ý

- Phông chữ Be Vietnam Pro tải từ Google Fonts nên cần có mạng; không có mạng sẽ dùng phông hệ thống.
- Trang không có form và không gửi dữ liệu lên máy chủ nào. Nút "Gửi mail" mở ứng dụng thư, nút "Sao chép email" chép địa chỉ vào bộ nhớ tạm.
- Ngôn ngữ: nút VI | EN ở header. Khi sửa chữ tiếng Việt trong `index.html`, cập nhật câu tương ứng trong `js/i18n.js`.
