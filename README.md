# Thanh Ly Sơn: ĐẠI ĐẠO VÔ HẠN

Một game RPG 2D trên trình duyệt, tối ưu cho điện thoại Android, với thế giới mở, di chuyển top-down, chuyển cảnh, NPC và chiến đấu cơ bản.

## Chạy game

### Cách 1: mở file trực tiếp
- Tải thư mục lên máy tính.
- Mở `index.html` trong trình duyệt.
- Game sẽ chạy ngay và lưu tiến độ bằng `localStorage`.

### Cách 2: dùng máy chủ tĩnh
```bash
cd /đường/dẫn/đến/thư/mục
python3 -m http.server 8000
```
Sau đó mở:
```text
http://localhost:8000
```

## Giai đoạn 1 đã triển khai
- Bản đồ 2D theo hướng trên xuống.
- Di chuyển bằng phím hoặc bàn điều khiển ảo trên điện thoại.
- Bộ ba bản đồ thực sự: Thành Ly Sơn, Rừng Huyền Sâm, Tông Môn Thanh Ly, và Bí Cảnh Cổ Đạo.
- Chuyển cảnh và va chạm bản đồ.
- NPC tương tác cơ bản.
- Quái vật di chuyển theo người chơi và chiến đấu cơ bản.
- Lưu tiến độ trong trình duyệt.
- Giao diện tiếng Việt.

## Lưu ý
Đây là phiên bản giai đoạn 1: chơi được và mở rộng tiếp theo. Các hệ thống cửa hàng, túi đồ, tu luyện, đấu giá, và AI sẽ được triển khai theo đúng thứ tự trong các giai đoạn tiếp theo mà không phá vỡ các chức năng đã hoàn thành.
