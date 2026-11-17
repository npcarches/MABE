# MABE — Website chụp ảnh catalog và lookbook

Website Next.js (App Router, TypeScript), xuất ra HTML tĩnh: chạy `npm run build` là có thư mục `out/` để đưa lên bất kỳ hosting tĩnh nào. Không có form, không có máy chủ, không gửi dữ liệu đi đâu.

## Cài đặt và chạy

Cần Node.js 20.9 trở lên (Node 22 nếu muốn chạy `wrangler`).

```bash
npm install
npm run dev        # http://localhost:3000, tự tải lại khi sửa code
```

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy bản phát triển |
| `npm run build` | Nén ảnh thành WebP rồi xuất web tĩnh vào `out/` |
| `npm start` | Xem thử bản đã build (`out/`) |
| `npm run images` | Chỉ nén ảnh gốc thành WebP (dùng khi chạy `npm run dev` sau khi thêm ảnh) |
| `npm run lint` / `npm run typecheck` | Kiểm tra code |

## Đưa lên mạng (Cloudflare Workers)

Kết nối repo GitHub (Workers & Pages → Create → Import a repository), rồi điền:

| Mục | Giá trị |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler versions upload` |

`wrangler.jsonc` chỉ cho Cloudflare phục vụ thư mục `out/`. Phiên bản Node lấy từ `.node-version` (22, wrangler cần Node 22.12+). Nhánh được deploy chính thức đặt ở Settings → Build → Branch control → Production branch (hiện là `staging`); các nhánh khác có link xem thử riêng. Mỗi lần push, Cloudflare tự nén ảnh sang WebP, build và đưa web lên.

Nếu dùng Cloudflare Pages thay vì Workers: Build command `npm run build`, Build output directory `out`.

Ảnh WebP (`public/images/`) không lưu trong git, chỉ ảnh gốc trong `media-src/images/`. Khi chạy `npm run dev` ở máy mới, chạy `npm run images` một lần trước để có ảnh.

Hosting tĩnh khác: chạy `npm run build` rồi tải nội dung thư mục `out/` lên.

Web phải nằm ở gốc tên miền (ví dụ `mabe.vn/` hoặc `ten.github.io/`), không đặt trong thư mục con như `ten.github.io/mabe/`, vì đường dẫn ảnh và trang bắt đầu từ `/`.

Mỗi trang là một thư mục có `index.html` (ví dụ `out/bang-gia/index.html`), nên đường dẫn `/bang-gia/` chạy được trên hầu hết hosting mà không cần cấu hình thêm. Link cũ dạng `/#bang-gia` tự chuyển sang trang mới.

## Cấu trúc thư mục

```
MABE/
├── app/                    Các trang (mỗi thư mục = 1 đường dẫn) và layout chung
│   ├── layout.tsx          Khung trang: header, footer, phông chữ, mô tả SEO
│   ├── globals.css         Toàn bộ giao diện (màu chủ đạo ở :root, biến --brand)
│   ├── page.tsx            Trang chủ  → /
│   ├── du-an/              Dự án      → /du-an/
│   ├── bang-gia/           Bảng giá   → /bang-gia/
│   ├── quy-trinh/          Quy trình  → /quy-trinh/
│   └── lien-he/            Liên hệ    → /lien-he/
├── src/
│   ├── components/         Header, footer, bộ lọc dự án, tính chi phí, stepper quy trình, sao chép email…
│   ├── data/               Nội dung dạng dữ liệu: giá, dự án, quy trình, đường dẫn trang
│   ├── i18n/               Toàn bộ chữ của web: vi.ts (tiếng Việt), en.ts (tiếng Anh)
│   └── fonts/              Phông Be Vietnam Pro
├── public/
│   ├── images/             Ảnh WebP dùng trên web (tự tạo khi build, không lưu trong git)
│   └── logo/               Bộ logo MABE production (SVG)
├── media-src/images/       Ảnh gốc JPG/PNG (không đưa lên web)
├── scripts/                Script nén ảnh
└── docs/                   Tài liệu dự án (brief)
```

## Sửa nội dung

- **Chữ trên web (mọi trang):** `src/i18n/vi.ts` (tiếng Việt) và `src/i18n/en.ts` (tiếng Anh). Hai file có cùng cấu trúc, mỗi trang một nhóm (`home`, `pricing`, `contact`…).
- **Giá và số ảnh mỗi gói:** `src/data/pricing.ts`. Một chỗ duy nhất, tự cập nhật bảng giá, phần giá ở trang chủ và công cụ tính chi phí. Giá tự định dạng theo ngôn ngữ (600.000đ / 600,000 VND).
- **Dự án:** cấu trúc (loại, thương hiệu, danh sách ảnh) ở `src/data/projects.ts`; tên, lĩnh vực, thử thách ở `projects` trong `vi.ts`/`en.ts`, cùng `id`. Thêm dự án = thêm 1 dòng vào `projects.ts` và 1 mục vào cả hai file ngôn ngữ. Logo đối tác ở `app/du-an/page.tsx`.
- **Quy trình 5 bước:** chữ ở `flow` trong `vi.ts`/`en.ts`, ảnh từng bước ở `src/data/flow.ts`.
- **Liên hệ:** `src/data/contact.ts` (số điện thoại, Zalo, Telegram, WhatsApp, email, Instagram), dùng chung cho trang Liên hệ và footer.

## Thêm hoặc thay ảnh

1. Bỏ ảnh JPG vào `media-src/images/`, đặt tên không dấu, ví dụ `lb-5-1.jpg` (cạnh dài khoảng 1400px).
2. Chạy `npm run images` để xem ở máy (khi build, việc này tự chạy). Mỗi ảnh tạo 2 bản WebP: `lb-5-1-600.webp` (ảnh nhỏ) và `lb-5-1-1400.webp` (ảnh lớn).
3. Dùng tên ảnh không đuôi (`lb-5-1`) trong code hoặc dữ liệu, ví dụ trong mảng `imgs` của dự án.

## Ngôn ngữ (VI | EN)

Nút VI | EN ở header đổi ngôn ngữ ngay trên trang (cùng đường dẫn) và được nhớ cho lần sau. Toàn bộ chữ nằm ở `src/i18n/vi.ts` và `src/i18n/en.ts`; code trang chỉ tham chiếu, ví dụ `m.pricing.heading`.

- Sửa câu tiếng Việt: chỉ sửa trong `vi.ts`, bản tiếng Anh không bị ảnh hưởng.
- Thêm câu mới: thêm vào **cả hai** file với cùng tên mục. Nếu `en.ts` thiếu hoặc thừa mục so với `vi.ts`, `npm run typecheck` / `npm run build` báo lỗi, nên không thể quên dịch.

## Lưu ý

- Bảng giá và dự án hiện là dữ liệu mẫu, MABE cần xác nhận trước khi dùng thật.
- Phông chữ nằm sẵn trong code, không cần mạng.
