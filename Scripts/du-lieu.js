/* Dữ liệu mẫu của cửa hàng. Giá tính bằng đồng; tồn kho áp dụng cho từng phiên bản. */
const STORE = {
  name: 'Trong mobile',
  phone: '0358580978',
  displayPhone: '0358 580 978',
  email: 'hoangthihuebinhlong@gmail.com',
  address: '36 đường Man Thiện, phường Tăng Nhơn Phú, Thành phố Hồ Chí Minh',
  hours: '08:00 – 21:00',
  shipping: 30000,
  freeShipping: 500000,
  coupon: {code: 'TRONG50', minimum: 1000000, value: 50000}
};

const CATEGORIES = [
  {id: 'dien-thoai', name: 'Điện thoại', icon: 'phone', image: 'iphone-16-pro', tint: '#f5eff9'},
  {id: 'laptop', name: 'Laptop', icon: 'laptop', image: 'macbook-air', tint: '#eef2fa'},
  {id: 'may-tinh-bang', name: 'Máy tính bảng', icon: 'tablet', image: 'ipad-air', tint: '#eaf4fb'},
  {id: 'dong-ho', name: 'Đồng hồ thông minh', short: 'Đồng hồ', icon: 'watch', image: 'apple-watch', tint: '#faf0f0'},
  {id: 'tai-nghe', name: 'Tai nghe', icon: 'headphones', image: 'sony-headphones', tint: '#f1eff9'},
  {id: 'phu-kien', name: 'Phụ kiện', icon: 'plug', image: 'sac-usb-c', tint: '#f2f1ec'}
];

function version(label, price, stock) {
  return {label, price, stock};
}
const PRODUCTS = [
  {
    id: 'iphone-16-pro',
    code: 'TM101',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    cat: 'dien-thoai',
    color: 'Titan sa mạc',
    condition: 'Mới',
    added: '2026-11-15',
    old: 27990000,
    versions: [version('128 GB', 24990000, 8), version('256 GB', 27490000, 5), version('512 GB', 31990000, 2)],
    desc: 'Khung titan màu sa mạc kết hợp màn hình 6,3 inch nhỏ gọn. Nút Điều khiển Camera giúp bạn mở máy ảnh và thay đổi góc chụp ngay khi đang cầm máy ngang.',
    specs: {'Bộ xử lý': 'Apple A18 Pro', 'Màn hình': '6,3 inch · Super Retina XDR', 'Camera chính': 'Fusion 48 MP', 'Cổng kết nối': 'USB-C'}
  },
  {
    id: 'galaxy-s24-ultra',
    code: 'TM102',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    cat: 'dien-thoai',
    color: 'Tím titan',
    condition: 'Đã qua sử dụng',
    added: '2026-11-13',
    old: 20990000,
    versions: [version('256 GB', 18490000, 3), version('512 GB', 20490000, 2)],
    desc: 'Màn hình lớn và bút S Pen tích hợp phù hợp khi bạn thường ghi chú, ký tài liệu hay phác thảo. Bản máy đã qua sử dụng có thể có vết xước nhẹ trên viền.',
    specs: {'Bộ xử lý': 'Snapdragon 8 Gen 3 for Galaxy', 'RAM': '12 GB', 'Màn hình': '6,8 inch · Dynamic AMOLED 2X', 'Điểm nổi bật': 'Bút S Pen tích hợp'}
  },
  {
    id: 'macbook-air',
    code: 'TM201',
    name: 'MacBook Air 13″ M3',
    brand: 'Apple',
    cat: 'laptop',
    color: 'Đêm xanh',
    condition: 'Mới',
    added: '2026-11-12',
    old: 25990000,
    versions: [version('16 GB / 256 GB', 22990000, 6), version('16 GB / 512 GB', 25990000, 4)],
    desc: 'Thiết kế mỏng, vận hành không quạt và bàn phím có đèn nền phù hợp với góc học tập yên tĩnh. Hai cổng Thunderbolt giúp kết nối màn hình hoặc ổ lưu trữ ngoài.',
    specs: {'Bộ xử lý': 'Apple M3', 'Màn hình': '13,6 inch · Liquid Retina', 'RAM': '16 GB', 'Sạc': 'MagSafe 3'}
  },
  {
    id: 'sony-headphones',
    code: 'TM501',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    cat: 'tai-nghe',
    color: 'Đen',
    condition: 'Mới',
    added: '2026-11-11',
    old: 7990000,
    versions: [version('Bluetooth', 5990000, 9)],
    desc: 'Tai nghe trùm tai với đệm mềm và chống ồn chủ động. Bạn có thể chuyển giữa âm thanh môi trường và chế độ chống ồn khi đi từ văn phòng ra đường.',
    specs: {'Kiểu tai nghe': 'Chụp tai', 'Kết nối': 'Bluetooth 5.2 / jack 3,5 mm', 'Tính năng': 'Chống ồn chủ động', 'Cổng sạc': 'USB-C'}
  },
  {
    id: 'iphone-15',
    code: 'TM103',
    name: 'iPhone 15',
    brand: 'Apple',
    cat: 'dien-thoai',
    color: 'Hồng',
    condition: 'Đã qua sử dụng',
    added: '2026-11-07',
    old: 13990000,
    versions: [version('128 GB', 13990000, 4), version('256 GB', 15990000, 1)],
    desc: 'Mặt lưng hồng nhạt và kích thước 6,1 inch vừa tay. Máy hỗ trợ sạc qua USB-C, tiện dùng chung cáp với máy tính bảng hoặc laptop tương thích.',
    specs: {'Bộ xử lý': 'Apple A16 Bionic', 'Màn hình': '6,1 inch · OLED', 'Camera chính': '48 MP', 'Cổng kết nối': 'USB-C'}
  },
  {
    id: 'xiaomi-phone',
    code: 'TM104',
    name: 'Xiaomi 13',
    brand: 'Xiaomi',
    cat: 'dien-thoai',
    color: 'Xanh',
    condition: 'Đã qua sử dụng',
    added: '2026-11-09',
    old: 8990000,
    versions: [version('8 GB / 256 GB', 7490000, 3), version('12 GB / 256 GB', 8190000, 0)],
    desc: 'Thân máy gọn và màn hình phẳng thuận tiện dùng bằng một tay. Hệ thống ba camera cho phép chuyển giữa góc rộng, góc siêu rộng và tele khi chụp.',
    specs: {'Bộ xử lý': 'Snapdragon 8 Gen 2', 'Màn hình': '6,36 inch · AMOLED', 'Tần số quét': 'Tối đa 120 Hz', 'Cổng kết nối': 'USB-C'}
  },
  {
    id: 'ipad-air',
    code: 'TM301',
    name: 'iPad Air 11″ M2',
    brand: 'Apple',
    cat: 'may-tinh-bang',
    color: 'Xanh dương',
    condition: 'Mới',
    added: '2026-11-10',
    old: 16990000,
    versions: [version('Wi-Fi / 128 GB', 14490000, 7), version('Wi-Fi / 256 GB', 16990000, 3)],
    desc: 'Màn hình 11 inch cho bạn không gian ghi chú, đọc tài liệu và chia đôi ứng dụng. Camera trước nằm ở cạnh dài để khung hình cân đối khi gọi video ở tư thế ngang.',
    specs: {'Bộ xử lý': 'Apple M2', 'Màn hình': '11 inch · Liquid Retina', 'Kết nối': 'Wi-Fi 6E', 'Tương thích bút': 'Apple Pencil Pro / USB-C'}
  },
  {
    id: 'galaxy-tab',
    code: 'TM302',
    name: 'Samsung Galaxy Tab S9 FE',
    brand: 'Samsung',
    cat: 'may-tinh-bang',
    color: 'Xám',
    condition: 'Mới',
    added: '2026-10-29',
    old: 10990000,
    versions: [version('Wi-Fi / 128 GB', 7990000, 4)],
    desc: 'Bút S Pen đi kèm phù hợp cho ghi chú trên slide, đánh dấu tập tin PDF hoặc vẽ sơ đồ. Màn hình tỉ lệ rộng giúp xem video thoải mái ở tư thế ngang.',
    specs: {'Bộ xử lý': 'Exynos 1380', 'Màn hình': '10,9 inch · 90 Hz', 'RAM': '6 GB', 'Phụ kiện kèm': 'S Pen'}
  },
  {
    id: 'apple-watch',
    code: 'TM401',
    name: 'Apple Watch Series 9 GPS',
    brand: 'Apple',
    cat: 'dong-ho',
    color: 'Hồng',
    condition: 'Mới',
    added: '2026-11-05',
    old: 8490000,
    versions: [version('41 mm', 6490000, 5), version('45 mm', 7190000, 3)],
    desc: 'Vỏ nhôm nhẹ kết hợp dây thể thao đồng màu. Khi ghép đôi với iPhone, bạn có thể xem thông báo, đặt hẹn giờ và theo dõi buổi tập ngay trên cổ tay.',
    specs: {'Bộ xử lý': 'Apple S9 SiP', 'Màn hình': 'Retina luôn bật', 'Vỏ': 'Nhôm', 'Ghép đôi': 'iPhone tương thích'}
  },
  {
    id: 'galaxy-watch',
    code: 'TM402',
    name: 'Samsung Galaxy Watch6',
    brand: 'Samsung',
    cat: 'dong-ho',
    color: 'Đen graphite',
    condition: 'Mới',
    added: '2026-10-28',
    old: 4990000,
    versions: [version('Bluetooth / 40 mm', 3290000, 5), version('Bluetooth / 44 mm', 3690000, 2)],
    desc: 'Mặt đồng hồ tròn dễ phối với nhiều kiểu dây. Bạn có thể nhận thông báo, điều khiển nhạc và ghi lại thời gian tập luyện khi ghép với điện thoại Android tương thích.',
    specs: {'Màn hình': 'Super AMOLED', 'Vỏ': 'Nhôm', 'Hệ điều hành': 'Wear OS', 'Kết nối': 'Bluetooth'}
  },
  {
    id: 'airpods',
    code: 'TM502',
    name: 'AirPods Pro 2 USB-C',
    brand: 'Apple',
    cat: 'tai-nghe',
    color: 'Trắng',
    condition: 'Mới',
    added: '2026-11-08',
    old: 5790000,
    versions: [version('Hộp sạc USB-C', 4690000, 8)],
    desc: 'Tai nghe nhét tai với nhiều cỡ nút silicone để điều chỉnh độ vừa. Hộp sạc nhỏ gọn, dùng cổng USB-C và hỗ trợ sạc không dây.',
    specs: {'Bộ xử lý': 'Apple H2', 'Kiểu tai nghe': 'Nhét tai', 'Tính năng': 'Chống ồn / xuyên âm', 'Cổng sạc': 'USB-C'}
  },
  {
    id: 'galaxy-buds',
    code: 'TM503',
    name: 'Samsung Galaxy Buds2 Pro',
    brand: 'Samsung',
    cat: 'tai-nghe',
    color: 'Tím Bora',
    condition: 'Mới',
    added: '2026-11-03',
    old: 2490000,
    versions: [version('Bluetooth', 2490000, 6)],
    desc: 'Tai nghe không dây màu tím với hộp sạc đồng bộ. Nút tai silicone giúp cố định tai nghe khi di chuyển và hỗ trợ hiệu quả chống ồn.',
    specs: {'Kiểu tai nghe': 'Nhét tai', 'Kết nối': 'Bluetooth 5.3', 'Tính năng': 'Chống ồn chủ động', 'Cổng sạc': 'USB-C'}
  },
  {
    id: 'sac-usb-c',
    code: 'TM601',
    name: 'Củ sạc Apple USB-C 20W',
    brand: 'Apple',
    cat: 'phu-kien',
    color: 'Trắng',
    condition: 'Mới',
    added: '2026-11-02',
    old: 550000,
    versions: [version('20 W', 390000, 16)],
    desc: 'Củ sạc một cổng USB-C có kích thước nhỏ gọn. Kết hợp với dây cáp phù hợp để sạc iPhone, iPad và thiết bị hỗ trợ USB Power Delivery.',
    specs: {'Công suất': '20 W', 'Đầu ra': '1 × USB-C', 'Chuẩn sạc': 'USB Power Delivery', 'Trong hộp': 'Củ sạc'}
  },
  {
    id: 'cap-usb-c',
    code: 'TM602',
    name: 'Cáp USB-C 60W',
    brand: 'Trong mobile',
    cat: 'phu-kien',
    color: 'Trắng',
    condition: 'Mới',
    added: '2026-11-06',
    old: 199000,
    versions: [version('1 m', 149000, 25), version('2 m', 199000, 14)],
    desc: 'Hai đầu USB-C và vỏ dây bện phù hợp dùng hằng ngày. Chọn dây 1 m cho túi xách hoặc 2 m khi ổ cắm nằm xa bàn làm việc.',
    specs: {'Đầu nối': 'USB-C sang USB-C', 'Công suất': 'Tối đa 60 W', 'Vỏ dây': 'Dây bện', 'Truyền dữ liệu': 'USB 2.0'}
  },
  {
    id: 'laptop-slim',
    code: 'TM202',
    name: 'Dell Inspiron 14 5445',
    brand: 'Dell',
    cat: 'laptop',
    color: 'Bạc',
    condition: 'Mới',
    added: '2026-11-04',
    old: 16490000,
    versions: [version('16 GB / 512 GB', 16490000, 4)],
    desc: 'Laptop 14 inch có bàn phím gọn và màn hình tỉ lệ 16:10. Cấu hình 16 GB RAM phù hợp việc mở tài liệu, trình duyệt và môi trường lập trình cùng lúc.',
    specs: {'Bộ xử lý': 'AMD Ryzen 5 8540U', 'Màn hình': '14 inch · 1920 × 1200', 'RAM': '16 GB', 'Ổ lưu trữ': 'SSD 512 GB'}
  },
  {
    id: 'chuot-logitech',
    code: 'TM603',
    name: 'Chuột Logitech G304',
    brand: 'Logitech',
    cat: 'phu-kien',
    color: 'Đen',
    condition: 'Mới',
    added: '2026-11-01',
    old: 699000,
    versions: [version('LIGHTSPEED', 699000, 10)],
    desc: 'Chuột không dây với đầu thu USB và sáu nút có thể tùy chỉnh. Khoang chứa đầu thu dưới nắp giúp bạn mang chuột theo mà ít lo thất lạc.',
    specs: {'Kết nối': 'USB 2,4 GHz', 'Cảm biến': 'HERO', 'Độ phân giải': 'Tối đa 12.000 DPI', 'Nguồn điện': '1 pin AA'}
  }
];

const STORIES = [
  {
    id: 'chon-dung-dung-luong',
    title: '128 GB hay 256 GB cho chiếc điện thoại tiếp theo?',
    tag: 'Điện thoại',
    date: '16/11/2026',
    time: 4,
    image: 'story-phone',
    product: 'iphone-16-pro',
    intro: 'Dung lượng cần mua thường nằm ngay trong chiếc điện thoại bạn đang dùng. Hãy bắt đầu từ ảnh, video và ứng dụng thực tế của mình.',
    sections: [
      [
        'Đọc lại bộ nhớ hiện tại',
        'Mở phần Dung lượng trong Cài đặt và xem ba nhóm đang chiếm nhiều chỗ nhất. Ghi lại số GB của ảnh, video tải về và ứng dụng. Nếu phần lớn là dữ liệu tạm có thể dọn, bạn có thể dành ngân sách cho một tính năng khác.'
      ],
      [
        'Để ý những tệp bạn muốn giữ ngoại tuyến',
        'Video quay cho bài tập, bản đồ, nhạc tải về và trò chơi thường tăng dần theo thời gian. Nếu bạn hay quay clip dài hoặc ít chuyển ảnh sang máy tính, bản 256 GB giúp giảm số lần phải dọn bộ nhớ.'
      ],
      [
        'Chọn theo thói quen trong hai năm tới',
        'Nếu hiện tại bạn còn nhiều chỗ trống và đã có thói quen sao lưu, 128 GB là lựa chọn đáng cân nhắc. Nếu máy thường xuyên báo đầy trong lúc chụp ảnh, hãy so phần tiền chênh giữa hai phiên bản ngay trên trang sản phẩm.'
      ]
    ]
  },
  {
    id: 'chon-laptop-di-hoc',
    title: 'Chọn laptop mang đến giảng đường mỗi ngày',
    tag: 'Laptop',
    date: '12/11/2026',
    time: 5,
    image: 'story-laptop',
    product: 'laptop-slim',
    intro: 'Một chiếc laptop đi học cần vừa chiếc ba lô, chạy được phần mềm của ngành và có bàn phím bạn muốn dùng suốt một buổi thực hành.',
    sections: [
      ['Bắt đầu từ phần mềm của môn học', 'Liệt kê công cụ bạn cần, chẳng hạn môi trường C++, phần mềm đồ họa hay trình giả lập. Kiểm tra hệ điều hành được hỗ trợ trước khi chọn cấu hình.'],
      [
        'Thử cả bàn phím lẫn màn hình',
        'Gõ một đoạn văn dài có dấu, thử hàng phím chức năng và xem một trang tài liệu ở kích thước chữ quen dùng. Màn hình tỉ lệ 16:10 hiển thị thêm không gian theo chiều dọc khi đọc hoặc viết mã.'
      ],
      [
        'Tính cả những món mang theo',
        'Hãy đặt máy, củ sạc và chuột vào ba lô thường dùng. Kiểm tra cổng kết nối với màn hình ở lớp, khả năng nâng cấp và dung lượng SSD cho các bộ công cụ học tập.'
      ]
    ]
  },
  {
    id: 'chon-tai-nghe',
    title: 'Tai nghe chụp tai hay nhét tai hợp với bạn?',
    tag: 'Âm thanh',
    date: '08/11/2026',
    time: 3,
    image: 'story-audio',
    product: 'sony-headphones',
    intro: 'Không gian nghe và cảm giác đeo thường quyết định chiếc tai nghe nào được bạn sử dụng nhiều nhất.',
    sections: [
      ['Thử độ vừa trước khi chọn', 'Với tai nghe chụp tai, kiểm tra lực kẹp và khoảng trống của đệm. Với tai nghe nhét tai, thử nhiều cỡ nút để hai bên kín và không gây áp lực.'],
      [
        'So sánh trong bối cảnh sử dụng',
        'Nếu làm việc nhiều ở một chỗ, đệm lớn và kết nối được nhiều thiết bị có thể hữu ích. Nếu thường xuyên đi lại, hãy để ý kích thước hộp sạc và cách cất tai nghe khi cần nói chuyện.'
      ],
      ['Dùng chính đoạn âm thanh quen thuộc', 'Thử một cuộc gọi và một bản nhạc quen ở mức âm lượng vừa phải. Kiểm tra thao tác chuyển bài, tắt mic và đổi thiết bị trước khi quyết định.']
    ]
  },
  {
    id: 'chon-cap-sac',
    title: 'Chọn cáp USB-C cho điện thoại và laptop',
    tag: 'Phụ kiện',
    date: '05/11/2026',
    time: 3,
    image: 'story-charge',
    product: 'cap-usb-c',
    intro: 'Hai sợi cáp cùng đầu USB-C có thể hỗ trợ công suất sạc và tốc độ dữ liệu khác nhau. Thông số trên bao bì sẽ giúp bạn chọn đúng.',
    sections: [
      ['Đối chiếu công suất', 'Xem công suất bộ sạc đang dùng và mức công suất thiết bị yêu cầu. Bộ sạc, cáp và thiết bị cần cùng hỗ trợ mức phù hợp để tận dụng sạc nhanh.'],
      [
        'Tách nhu cầu sạc và chép dữ liệu',
        'Nếu dùng cáp để chuyển video dung lượng lớn, hãy đọc thông số tốc độ truyền. Con số watt cho biết công suất, không cho biết cáp truyền dữ liệu nhanh đến đâu.'
      ],
      ['Chọn chiều dài phù hợp', 'Một sợi cáp ngắn thường gọn khi mang theo. Cáp dài hơn thuận tiện ở bàn làm việc có ổ cắm đặt xa. Kiểm tra đầu cáp có vừa với khe hở trên ốp lưng hay không.']
    ]
  }
];
