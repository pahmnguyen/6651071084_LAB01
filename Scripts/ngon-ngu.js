/* Bản tiếng Anh dùng ngoại tuyến. Giá, mã hàng, tham số URL và dữ liệu người mua
   giữ nguyên khi đổi ngôn ngữ; chỉ thay chữ hiển thị trên giao diện. */
(() => {
  'use strict';
  const words = new Map();
  const catalog = `
Đến nội dung chính|Skip to main content
Trang chủ|Home
Cửa hàng công nghệ|Tech store
Trong mobile – Trang chủ|Trong mobile – Home
Cửa hàng|Shop
Khuyến mãi|Deals
Góc công nghệ|Tech journal
Liên hệ|Contact
Tra cứu đơn hàng|Track an order
Tài khoản của tôi|My account
Tài khoản|Account
Điều hướng chính|Main navigation
Danh sách yêu thích|Wishlist
Mở giỏ hàng|Open cart
Giỏ hàng|Cart
Mở trình đơn|Open navigation
Miễn phí giao hàng từ 500.000 ₫|Free delivery on orders from ₫500,000
Miễn phí giao từ 500k|Free delivery from ₫500k
Tất cả sản phẩm|All products
Sản phẩm giảm giá|Sale products
Danh mục sản phẩm|Shop by category
Danh mục tìm kiếm|Search category
Tất cả|All
Điện thoại|Phones
Laptop|Laptops
Máy tính bảng|Tablets
Đồng hồ thông minh|Smartwatches
Đồng hồ|Watches
Tai nghe|Headphones
Phụ kiện|Accessories
Âm thanh|Audio
Từ khóa tìm sản phẩm|Product search terms
Bạn đang tìm sản phẩm gì?|What are you looking for?
Tìm kiếm|Search
Hotline tư vấn|Call the store
Đường dẫn|Breadcrumbs
Xem tất cả|View all
Khám phá cửa hàng|Explore the shop
Mua sắm|Shop
Yêu thích|Wishlist
So sánh sản phẩm|Compare products
So sánh|Compare
Hỗ trợ|Support
Giao hàng & thanh toán|Delivery & payment
Bảo hành & đổi trả|Warranty & returns
Liên hệ cửa hàng|Contact the store
Nhận tin ưu đãi|Get special offers
Đăng ký nhận tin về sản phẩm và ưu đãi mới.|Sign up for news about products and offers.
Email nhận tin|Newsletter email
Email của bạn|Your email
Đăng ký nhận tin|Subscribe
Website thực hành thiết kế web · Dữ liệu minh họa|Web design coursework · Sample data
Bạn có thể so sánh tối đa 3 sản phẩm.|You can compare up to 3 products.
Xem so sánh|View comparison
Xem danh sách|View list
Đã bỏ khỏi danh sách yêu thích.|Removed from your wishlist.
Đã thêm vào danh sách yêu thích.|Added to your wishlist.
Đã bỏ khỏi danh sách so sánh.|Removed from your comparison.
Đã thêm vào danh sách so sánh.|Added to your comparison.
Số lượng vượt quá tồn kho của phiên bản này.|There are not enough units of this version in stock.
Xem giỏ|View cart
Hãy cho phép lưu dữ liệu trình duyệt để sử dụng giỏ hàng.|Enable browser storage to use the cart.
Chưa có sản phẩm phù hợp.|No matching products.
Xem kết quả tìm kiếm|View search results
Email này đã được đăng ký trên thiết bị.|This email is already subscribed on this device.
Đã lưu đăng ký nhận tin trên thiết bị này.|Your subscription was saved on this device.
Trình duyệt chưa cho phép lưu đăng ký.|Your browser could not save the subscription.
Chip A18 Pro. Thiết kế titan sa mạc.|A18 Pro chip. Desert Titanium finish.
Mỏng nhẹ cho những ngày di chuyển.|Lightweight design for days on the move.
Sony · Âm thanh|Sony · Audio
Không gian riêng cho từng bản nhạc.|Make room for the music you love.
Từ|From
Khám phá ngay|Explore now
băng chuyền|carousel
Bộ sưu tập nổi bật|Featured collections
Chọn banner|Choose a banner
Banner trước|Previous banner
Banner sau|Next banner
Xem mục trước|Previous items
Xem mục sau|Next items
Mới về|New arrivals
Giảm giá nhiều|Biggest savings
Phụ kiện & âm thanh|Accessories & audio
Khám phá danh mục|Explore categories
Sản phẩm nổi bật|Featured products
Xem cửa hàng|Visit shop
Lọc sản phẩm nổi bật|Filter featured products
Không gian làm việc|Workspace
Laptop mỏng nhẹ|Lightweight laptops
Khám phá|Explore
Bộ sưu tập âm thanh|Audio collection
Tai nghe không dây|Wireless headphones
Tất cả bài viết|All articles
Kết quả tìm kiếm|Search results
Các mẫu đang có giá ưu đãi tại Trong mobile.|Discover the latest deals at Trong mobile.
Khám phá thiết bị và phụ kiện theo nhu cầu của bạn.|Find devices and accessories that suit you.
Bộ lọc|Filters
Danh mục|Category
Tất cả danh mục|All categories
Thương hiệu|Brand
Tất cả thương hiệu|All brands
Tình trạng|Condition
Tất cả tình trạng|All conditions
Tất cả phiên bản|All versions
Tất cả màu sắc|All colors
Mới|New
Đã qua sử dụng|Pre-owned
Khoảng giá (₫)|Price range (₫)
Giá từ|Min. price
Giá đến|Max. price
Áp dụng bộ lọc|Apply filters
Xóa bộ lọc|Clear filters
Mã TRONG50|Code TRONG50
Giảm 50.000 ₫ cho đơn từ 1.000.000 ₫.|Save ₫50,000 on orders of ₫1,000,000 or more.
Sắp xếp|Sort by
Mặc định|Featured
Mới nhất|Newest
Bán chạy|Best sellers
Giá tăng dần|Price: low to high
Giá giảm dần|Price: high to low
Dạng lưới|Grid view
Dạng danh sách|List view
Chưa tìm thấy sản phẩm|No products found
Thử từ khóa ngắn hơn hoặc xóa bớt điều kiện lọc.|Try a shorter search or remove some filters.
Xem tất cả sản phẩm|View all products
Phân trang|Pagination
Toàn cảnh|Full view
Cận cảnh|Close-up
Ảnh minh họa|Lifestyle photo
Phiên bản|Version
Màu sắc|Color
Tạm hết hàng|Out of stock
Giảm số lượng|Decrease quantity
Tăng số lượng|Increase quantity
Số lượng|Quantity
Thêm vào giỏ|Add to cart
Mua ngay|Buy now
Mã sản phẩm|Product code
Đánh giá|Reviews
Chưa có đánh giá. Bạn có thể chia sẻ trải nghiệm đầu tiên.|No reviews yet. Be the first to share your experience.
Tên hiển thị|Display name
Số sao|Star rating
Nhận xét|Your review
Đánh giá được lưu trên trình duyệt này.|Reviews are saved in this browser.
Lưu đánh giá|Save review
Phiên bản đang chọn là|Selected version:
Xem chính sách bảo hành|View warranty policy
Không tìm thấy sản phẩm|Product not found
Mã sản phẩm trong đường dẫn chưa có trong danh mục.|The product code in this link is not in our catalog.
Giao tận nơi hoặc nhận tại cửa hàng ở Man Thiện.|Home delivery or pickup at the Man Thiện store.
Nội dung sản phẩm|Product information
Mô tả sản phẩm|Description
Thông số kỹ thuật|Specifications
Có thể bạn quan tâm|You might also like
Đóng ảnh|Close photo
Ảnh trước|Previous photo
Ảnh sau|Next photo
Sản phẩm yêu thích|My wishlist
Danh sách còn trống|Your wishlist is empty
Nhấn biểu tượng trái tim trên sản phẩm bạn muốn xem lại.|Tap the heart on a product to save it for later.
Đặt tối đa 3 sản phẩm cạnh nhau để so giá và cấu hình.|Compare prices and specifications for up to 3 products side by side.
Tiêu chí|Feature
Bỏ so sánh|Remove
Chọn thêm sản phẩm|Add a product
Chưa chọn sản phẩm so sánh|No products selected
Chọn biểu tượng hai mũi tên trên thẻ sản phẩm hoặc ở trang chi tiết.|Select the two-arrow icon on a product card or product page.
Giá đến phải lớn hơn hoặc bằng giá từ.|The maximum price must be at least the minimum price.
Vui lòng nhập tên và nội dung nhận xét.|Please enter your name and review.
Đã lưu đánh giá của bạn.|Your review has been saved.
Chi tiết sản phẩm|Product details
Bài viết|Article
Đặt hàng|Checkout
Tạm tính|Subtotal
Phí giao hàng|Delivery
Miễn phí|Free
Tổng cộng|Total
Giỏ hàng đang trống|Your cart is empty
Chọn sản phẩm và phiên bản để bắt đầu một đơn hàng.|Choose a product and version to start an order.
Sản phẩm|Product
Thành tiền|Line total
Tiếp tục mua sắm|Continue shopping
Mã giảm giá|Discount code
Nhập|Enter
để giảm 50.000 ₫ cho đơn từ 1.000.000 ₫.|to save ₫50,000 when you spend ₫1,000,000 or more.
Nhập mã ưu đãi|Enter a discount code
Áp dụng|Apply
Gỡ mã|Remove code
Giỏ hàng chưa đủ điều kiện áp dụng mã.|Your cart does not qualify for this offer yet.
Tóm tắt đơn hàng|Order summary
Tiến hành đặt hàng|Proceed to checkout
Miễn phí giao hàng từ 500.000 ₫. Nhận tại cửa hàng luôn miễn phí.|Delivery is free on orders from ₫500,000. Store pickup is always free.
Chưa có sản phẩm để đặt|There are no items to order
Thêm sản phẩm vào giỏ trước khi nhập thông tin nhận hàng.|Add items to your cart before entering delivery details.
Kiểm tra sản phẩm và chọn cách nhận hàng.|Check your items and choose how to receive them.
Thông tin người nhận|Recipient details
Họ và tên|Full name
Số điện thoại|Phone number
Nhập số di động Việt Nam, ví dụ 0912345678|Enter a Vietnamese mobile number, for example 0912345678
Ví dụ 0912345678|e.g. 0912345678
Email (tùy chọn)|Email (optional)
Cách nhận hàng|Delivery method
Giao tận nơi|Home delivery
Nhận tại cửa hàng|Store pickup
Địa chỉ giao hàng|Delivery address
Số nhà, đường, phường/xã, tỉnh/thành phố|House number, street, ward and city/province
Ghi chú (tùy chọn)|Notes (optional)
Ví dụ: Gọi trước khi giao|e.g. Please call before delivery
Thanh toán|Payment
Thanh toán khi nhận hàng (COD)|Cash on delivery (COD)
Thanh toán tại cửa hàng|Pay at the store
Đây là đơn thực hành, được lưu trên trình duyệt của bạn.|This is a practice order. It is saved in your browser.
Đơn hàng của bạn|Your order
Xác nhận đặt hàng|Place order
Quay lại giỏ hàng|Back to cart
Giỏ hàng đã thay đổi. Hãy kiểm tra lại giỏ.|Your cart has changed. Please review it again.
Vui lòng kiểm tra họ tên và số điện thoại.|Please check your name and phone number.
Vui lòng ghi đầy đủ địa chỉ giao hàng.|Please enter your full delivery address.
Tồn kho đã thay đổi. Vui lòng điều chỉnh số lượng trong giỏ.|Stock has changed. Please adjust the quantity in your cart.
Trình duyệt chưa cho phép lưu đơn. Hãy bật lưu trữ rồi thử lại.|Your browser could not save the order. Enable browser storage and try again.
Đặt hàng thành công!|Order placed!
Lưu mã bên dưới để tra cứu đơn trên thiết bị này.|Keep the code below to track your order on this device.
Mã đơn hàng|Order code
Chờ xác nhận|Awaiting confirmation
Đã hủy|Cancelled
Người nhận|Recipient
Giao đến|Deliver to
Ghi chú|Notes
Hủy đơn này|Cancel this order
Giữ đơn hàng|Keep order
Xác nhận hủy đơn|Confirm cancellation
Xem sản phẩm, tổng tiền và trạng thái của đơn đã tạo trên trình duyệt này.|Check the items, total and status of orders placed in this browser.
Tìm đơn hàng|Find an order
Số điện thoại nhận hàng|Recipient’s phone number
Số điện thoại khi đặt hàng|Phone number used at checkout
Tra cứu|Track order
Không tìm thấy đơn khớp với mã và số điện thoại.|No order matches this code and phone number.
Đơn trong tài khoản|Account orders
Mã đơn nằm ở đâu?|Where is my order code?
Sau khi đặt hàng, mã bắt đầu bằng TM- xuất hiện trên phiếu xác nhận. Dùng mã đó cùng số điện thoại đã nhập để xem lại đơn.|After checkout, your confirmation shows a code starting with TM-. Enter it with the phone number you used to view your order.
Thông tin dùng để điền nhanh khi đặt hàng trên thiết bị này.|These details help you check out faster on this device.
Email liên hệ|Contact email
Lưu thông tin|Save details
Đơn hàng của tôi|My orders
Đăng xuất|Sign out
Đăng nhập để lưu thông tin người nhận và xem lại các đơn đã đặt.|Sign in to save recipient details and view your orders.
Đăng nhập|Sign in
Tạo tài khoản|Create account
Mật khẩu|Password
Tối thiểu 8 ký tự|At least 8 characters
Nhập mật khẩu|Enter your password
Đăng ký|Register
Tài khoản thực hành chỉ sử dụng trong trình duyệt trên thiết bị này.|This practice account works only in this browser on this device.
Mã ưu đãi không hợp lệ.|This discount code is not valid.
Đơn hàng cần đạt 1.000.000 ₫ để dùng mã này.|Spend ₫1,000,000 or more to use this code.
Họ và tên cần ít nhất 2 ký tự.|Enter at least 2 characters for the full name.
Đã lưu thông tin tài khoản.|Your account details were saved.
Số điện thoại đã có tài khoản trên thiết bị này.|An account with this phone number already exists on this device.
Vui lòng nhập đầy đủ họ tên.|Please enter your full name.
Số điện thoại đã được đăng ký.|This phone number has already been registered.
Trình duyệt chưa cho phép lưu tài khoản.|Your browser could not save the account.
Số điện thoại hoặc mật khẩu chưa đúng.|The phone number or password is incorrect.
Đọc bài viết|Read article
Kinh nghiệm chọn mua và sử dụng thiết bị cho học tập, công việc và giải trí.|Buying guides and practical tips for study, work and entertainment.
Từ khóa bài viết|Article search terms
Tìm bài viết|Search articles
Chưa có bài viết phù hợp|No matching articles
Thử chủ đề hoặc từ khóa khác.|Try a different topic or search term.
Xem tất cả bài viết|View all articles
Không tìm thấy bài viết|Article not found
Chọn một bài trong Góc công nghệ để tiếp tục.|Select an article from the Tech journal to continue.
Về Góc công nghệ|Back to Tech journal
Sản phẩm trong bài|Featured in this article
Đọc tiếp|Read next
Liên hệ Trong mobile|Contact Trong mobile
Ghé cửa hàng tại Man Thiện hoặc liên hệ để trao đổi về sản phẩm và đơn hàng.|Visit our Man Thiện store or get in touch about a product or order.
Đang mở cửa|Open now
Đang đóng cửa|Closed now
Cửa hàng Man Thiện|Man Thiện store
Địa chỉ|Address
Chỉ đường trên Google Maps|Get directions on Google Maps
Giờ mở cửa|Opening hours
Gửi lời nhắn|Send a message
Điền nội dung để soạn sẵn thư trong ứng dụng email của bạn.|Fill out this form to prepare a message in your email app.
Chủ đề|Subject
Tư vấn sản phẩm|Product advice
Hỏi về đơn hàng|Order inquiry
Bảo hành và đổi trả|Warranty and returns
Góp ý khác|Other feedback
Lời nhắn|Message
Soạn email|Compose email
Vui lòng nhập tên và lời nhắn.|Please enter your name and message.
Bấm gửi trong ứng dụng email để hoàn tất.|Click Send in your email app to finish.
Mở lại bản nháp|Reopen draft
Chính sách cửa hàng|Store policies
Thông tin giao nhận, thanh toán và hỗ trợ cho đơn hàng tại Trong mobile.|Delivery, payment and support for orders at Trong mobile.
Nội dung chính sách|Policy topics
Giao hàng và nhận tại cửa hàng|Delivery and store pickup
Nhận trực tiếp|Collect in person
Tra cứu hoặc hủy đơn|Track or cancel an order
Thanh toán và mã giảm giá|Payment and discount codes
Hình thức thanh toán|Payment methods
Kiểm tra khi nhận máy|Inspecting your device
Yêu cầu kiểm tra|Requesting an inspection
Khi cần đổi sản phẩm|Product exchanges
Dữ liệu của bản thực hành|Practice store data
Dữ liệu được lưu ở đâu?|Where is my data stored?
Ảnh và giá sản phẩm|Product pictures and prices
Nhập họ tên, số điện thoại và địa chỉ gồm số nhà, tên đường, phường/xã và tỉnh/thành. Phí giao hàng mẫu là 30.000 ₫ cho đơn dưới 500.000 ₫. Đơn từ 500.000 ₫ được miễn phí giao hàng, tính theo tạm tính trước mã giảm giá.|Enter your full name, phone number and address, including house number, street, ward and city or province. Sample delivery costs ₫30,000 on orders under ₫500,000. Orders of ₫500,000 or more qualify for free delivery, based on the subtotal before discounts.
Giữ mã TM- trên phiếu xác nhận. Mở Tra cứu đơn hàng, nhập đúng mã và số điện thoại để xem chi tiết. Đơn còn ở trạng thái Chờ xác nhận có thể hủy ngay trong phiếu.|Keep the TM- code on your confirmation. Open Track an order and enter the code and phone number to view the details. Orders awaiting confirmation can be cancelled from the receipt.
Chọn giao tận nơi để thanh toán khi nhận hàng (COD), hoặc thanh toán trực tiếp khi nhận tại cửa hàng. Bản thực hành lưu đơn trên thiết bị và không thu tiền.|Choose home delivery to pay on arrival (COD), or pay when collecting your order at the store. This practice site saves the order on your device and does not collect payments.
Mã TRONG50 giảm 50.000 ₫ khi tạm tính đạt 1.000.000 ₫. Áp dụng mã trong giỏ trước khi đặt hàng. Khi giảm số lượng xuống dưới mức tối thiểu, phần giảm giá được tính lại.|Use TRONG50 in the cart before checkout to save ₫50,000 on a subtotal of ₫1,000,000 or more. If a quantity change takes the subtotal below the minimum, the discount is recalculated.
Đối chiếu mã sản phẩm, phiên bản, màu sắc và phụ kiện với phiếu đơn. Với máy đã qua sử dụng, kiểm tra thêm ngoại hình, màn hình, camera và cổng kết nối.|Check the product code, version, color and included accessories against your receipt. For pre-owned devices, also check the casing, display, cameras and ports.
Trong chính sách mẫu, khách có thể yêu cầu kiểm tra lỗi phần cứng trong 10 ngày đầu kể từ khi nhận máy. Gửi mã đơn, mô tả lỗi và ảnh tình trạng đến email của Trong mobile để cửa hàng đối chiếu.|Under this sample policy, customers can request a hardware inspection within 10 days of receiving their device. Email Trong mobile with your order code, a description of the fault and photos of the device.
Giữ lại hộp và phụ kiện đã nhận. Cửa hàng sẽ đối chiếu tình trạng máy và trao đổi phương án đổi với khách trước khi tiếp nhận. Phạm vi bảo hành theo từng loại sản phẩm được xác nhận khi mua.|Keep the box and all included accessories. The store will check the device condition and discuss exchange options with you. Warranty coverage for each product is confirmed at purchase.
Giỏ hàng, sản phẩm yêu thích, đánh giá, đăng ký nhận tin, tài khoản và đơn thử được lưu trong trình duyệt hiện tại. Xóa dữ liệu trang hoặc đổi trình duyệt sẽ ảnh hưởng đến khả năng xem lại.|Your cart, wishlist, reviews, newsletter subscriptions, account and practice orders are stored in this browser. Clearing site data or switching browsers can affect access to them.
Ảnh là hình minh họa. Giá, chương trình ưu đãi, tồn kho, thời gian mở cửa và chính sách được đặt để trình diễn các chức năng của website.|Images illustrate the products. Prices, offers, stock levels, opening hours and policies are sample data used to demonstrate the website.
Bộ xử lý|Processor
Màn hình|Display
Camera chính|Main camera
Cổng kết nối|Port
Điểm nổi bật|Key feature
Bút S Pen tích hợp|Built-in S Pen
Sạc|Charging
Kiểu tai nghe|Design
Chụp tai|Over-ear
Kết nối|Connectivity
Tính năng|Features
Chống ồn chủ động|Active noise cancellation
Cổng sạc|Charging port
Tần số quét|Refresh rate
Tối đa 120 Hz|Up to 120 Hz
Tương thích bút|Stylus support
Phụ kiện kèm|Included accessory
Retina luôn bật|Always-On Retina
Vỏ|Case
Nhôm|Aluminum
Ghép đôi|Pairs with
iPhone tương thích|Compatible iPhone
Hệ điều hành|Operating system
Hộp sạc USB-C|USB-C charging case
Nhét tai|In-ear
Chống ồn / xuyên âm|Noise cancellation / transparency
Công suất|Power
Đầu ra|Output
Chuẩn sạc|Charging standard
Trong hộp|In the box
Củ sạc|Power adapter
Đầu nối|Connectors
USB-C sang USB-C|USB-C to USB-C
Tối đa 60 W|Up to 60 W
Vỏ dây|Cable covering
Dây bện|Braided
Truyền dữ liệu|Data transfer
Ổ lưu trữ|Storage
Cảm biến|Sensor
Độ phân giải|Resolution
Tối đa 12.000 DPI|Up to 12,000 DPI
Nguồn điện|Power source
1 pin AA|1 AA battery
Titan sa mạc|Desert Titanium
Tím titan|Titanium Violet
Đêm xanh|Midnight
Đen|Black
Hồng|Pink
Xanh|Green
Xanh dương|Blue
Xám|Gray
Đen graphite|Graphite
Trắng|White
Tím Bora|Bora Purple
Bạc|Silver
Củ sạc Apple USB-C 20W|Apple 20W USB-C Power Adapter
Cáp USB-C 60W|60W USB-C Cable
Chuột Logitech G304|Logitech G304 Mouse
`;
  for (const line of catalog.trim().split('\n')) {
    const [source, target] = line.split('|');
    words.set(source, target);
  }

  const productDescriptions = {
    'iphone-16-pro': 'A Desert Titanium frame surrounds a compact 6.3-inch display. Camera Control lets you open the camera and change your framing while holding the phone horizontally.',
    'galaxy-s24-ultra': 'The large display and built-in S Pen are handy for notes, signatures and sketches. This pre-owned unit may have light scratches around its frame.',
    'macbook-air': 'A slim design, fanless operation and a backlit keyboard suit a quiet study space. The two Thunderbolt ports can connect an external display or drive.',
    'sony-headphones': 'Soft over-ear cushions pair with active noise cancellation. Switch between ambient sound and noise cancellation as you move from the office to the street.',
    'iphone-15': 'The pale pink back and 6.1-inch size fit comfortably in one hand. USB-C charging lets you share a cable with a compatible tablet or laptop.',
    'xiaomi-phone': 'A compact body and flat screen make one-handed use easy. The triple camera system lets you switch between wide, ultra-wide and telephoto views.',
    'ipad-air': 'The 11-inch display gives you room for notes, documents and split-screen apps. The front camera sits on the long edge to keep you centered on landscape video calls.',
    'galaxy-tab': 'Use the included S Pen to take notes on slides, mark up PDFs or sketch diagrams. The wide display is comfortable for watching videos in landscape.',
    'apple-watch': 'A lightweight aluminum case pairs with a matching sport band. Connect a compatible iPhone to check notifications, set timers and track workouts on your wrist.',
    'galaxy-watch': 'The round case works with a variety of bands. Pair it with a compatible Android phone for notifications, music controls and workout tracking.',
    'airpods': 'These in-ear headphones have multiple silicone tip sizes for a comfortable fit. The compact case supports USB-C and wireless charging.',
    'galaxy-buds': 'These purple wireless earbuds come with a matching charging case. Silicone tips keep them secure on the move and help the noise cancellation work effectively.',
    'sac-usb-c': 'A compact power adapter with one USB-C port. Pair it with a suitable cable to charge an iPhone, iPad or other USB Power Delivery device.',
    'cap-usb-c': 'USB-C at both ends and a braided jacket make this cable practical for everyday use. Choose 1 m for your bag or 2 m for a desk farther from the socket.',
    'laptop-slim': 'This 14-inch laptop has a compact keyboard and a 16:10 display. With 16 GB of RAM, it can run documents, a browser and a coding environment together.',
    'chuot-logitech': 'A wireless mouse with a USB receiver and six customizable buttons. The compartment under the cover keeps the receiver together with the mouse when traveling.'
  };
  PRODUCTS.forEach(product => {
    if (productDescriptions[product.id]) words.set(product.desc, productDescriptions[product.id]);
  });

  // Mỗi bài theo đúng thứ tự của dữ liệu gốc: tựa, mở bài, rồi từng cặp đề mục/nội dung.
  const articles = {
    'chon-dung-dung-luong': [
      '128 GB or 256 GB for your next phone?',
      'The best clue to how much storage you need is the phone you use now. Start with your own photos, videos and apps.',
      'Check your current storage',
      'Open Storage in Settings and identify the three largest categories. Note how much space photos, downloaded videos and apps take up. If most of it is temporary data you can clear, you may prefer to spend the difference on another feature.',
      'Consider what you keep offline',
      'Video projects, maps, downloaded music and games tend to grow over time. If you shoot long clips or rarely transfer photos to a computer, 256 GB means less time spent clearing space.',
      'Think about your next two years',
      'If you still have plenty of space and already back up your files, consider 128 GB. If your phone fills up while you take photos, compare the price difference on the product page.'
    ],
    'chon-laptop-di-hoc': [
      'Choosing a laptop to take to class every day',
      'A laptop for class should fit in your backpack, run the software your course requires and have a keyboard you will enjoy using for a full lab session.',
      'Start with the software your course uses',
      'List the tools you need, such as a C++ environment, graphics software or an emulator. Check which operating systems they support before choosing a configuration.',
      'Try the keyboard and screen',
      'Type a long passage, try the function keys and open a document at your usual text size. A 16:10 screen gives you more vertical space for reading and writing code.',
      'Count what you carry',
      'Put the laptop, charger and mouse into your usual backpack. Check the ports you need for classroom displays, upgrade options and SSD space for your study tools.'
    ],
    'chon-tai-nghe': [
      'Over-ear headphones or earbuds: which suits you?',
      'Where you listen and how the headphones feel often determine which pair you reach for most.',
      'Check the fit first',
      'With over-ear headphones, check the clamping force and space inside the cushions. For earbuds, try different tip sizes until both sides seal without uncomfortable pressure.',
      'Compare them where you listen',
      'If you usually work in one place, large cushions and connections to multiple devices may help. If you are often on the move, consider the size of the case and where you’ll put the headphones during a conversation.',
      'Play something familiar',
      'Try a call and a familiar track at a moderate volume. Test skipping tracks, muting the microphone and switching devices before you decide.'
    ],
    'chon-cap-sac': [
      'Choosing a USB-C cable for your phone and laptop',
      'Two cables with identical USB-C plugs can support different charging power and data speeds. The specifications on the box can help you choose.',
      'Match the power rating',
      'Check the power rating of your charger and the requirements of your device. The charger, cable and device all need to support the right level to use fast charging.',
      'Check charging and data separately',
      'If you transfer large video files, check the listed data speed. The wattage tells you the supported power, not how fast the cable can transfer files.',
      'Choose a practical length',
      'A short cable is easier to carry. A longer one is convenient if the socket is far from your desk. Check that the plug fits the opening in your phone case.'
    ]
  };
  STORIES.forEach(story => {
    const local = articles[story.id];
    if (!local) return;
    [story.title, story.intro, ...story.sections.flat()].forEach((original, index) => words.set(original, local[index]));
  });
  const address = '36 Man Thiện Street, Tăng Nhơn Phú Ward, Ho Chi Minh City';
  words.set(STORE.address, address);
  words.set(STORE.hours + ' hằng ngày', STORE.hours + ' daily');
  words.set('Chọn “Nhận tại cửa hàng” khi đặt hàng. Địa điểm nhận là ' + STORE.address + '. Khách đến nhận trong khung giờ ' + STORE.hours + ' hằng ngày. Phương thức này luôn miễn phí vận chuyển.',
  'Select “Store pickup” at checkout. Collect your order at ' + address + ', between ' + STORE.hours + ' daily. Pickup is always free.');

  const get = text => words.get(text) || text;
  // Các hàm tìm kiếm đọc bí danh tiếng Anh mà không sửa danh mục hoặc khóa bộ lọc.
  TM.englishProductTerms = product => [
  get(product.name), get(TM.category(product.cat).name), get(product.color),
  get(product.condition), ...product.versions.map(version => get(version.label))
  ].join(' ');
  TM.englishStoryTerms = story => [get(story.title), get(story.intro), get(story.tag)].join(' ');

  function translated(text) {
    if (words.has(text)) return words.get(text);
    let match;
    if ((match = text.match(/^(.*) \| Trong mobile$/))) return get(match[1]) + ' | Trong mobile';
    if ((match = text.match(/^Sản phẩm phù hợp với từ khóa “(.*)”\.$/))) return 'Products matching “' + match[1] + '”.';
    if ((match = text.match(/^(\d+) sản phẩm(.*)$/))) {
      const count = Number(match[1]);
      const item = count === 1 ? 'item' : 'items';
      if (match[2] === ' đã lưu trên thiết bị này.') return count + ' ' + item + ' saved on this device.';
      if (match[2] === ' trong giỏ của bạn.') return count + ' ' + item + ' in your cart.';
      if (!match[2]) return count + (count === 1 ? ' product' : ' products');
    }
    if ((match = text.match(/^Còn (\d+) sản phẩm$/))) return match[1] + ' in stock';
    if ((match = text.match(/^Đánh giá sản phẩm \((\d+)\)$/))) return 'Product reviews (' + match[1] + ')';
    if ((match = text.match(/^(\d+) sao$/))) return match[1] + (match[1] === '1' ? ' star' : ' stars');
    if ((match = text.match(/^(\d+) phút đọc$/))) return match[1] + ' min read';
    if ((match = text.match(/^Giới thiệu (.+)$/))) return 'About ' + get(match[1]);
    if ((match = text.match(/^Mã (TM\d+)$/))) return 'SKU ' + match[1];
    if ((match = text.match(/^, màu (.+)\. Xem mục thông số để đối chiếu cấu hình trước khi thêm vào giỏ\.$/))) {
      const name = PRODUCTS.find(p => p.color.toLocaleLowerCase('vi') === match[1])?.color || match[1];
      return ', color: ' + get(name) + '. See Specifications for configuration details before adding it to your cart.';
    }
    if ((match = text.match(/^Đã thêm (.+) vào giỏ hàng\.$/))) return get(match[1]) + ' was added to your cart.';
    if ((match = text.match(/^Thêm (.+) vào giỏ$/))) return 'Add ' + get(match[1]) + ' to cart';
    if ((match = text.match(/^Xóa (.+) khỏi giỏ$/))) return 'Remove ' + get(match[1]) + ' from cart';
    if ((match = text.match(/^Đã áp dụng mã (.+)\.$/))) return 'Code ' + match[1] + ' applied.';
    if ((match = text.match(/^Đã hủy đơn (TM-[A-F0-9]+)\.$/))) return 'Order ' + match[1] + ' cancelled.';
    if ((match = text.match(/^Hủy đơn (TM-[A-F0-9]+) và trả các sản phẩm về tồn kho\?$/))) return 'Cancel order ' + match[1] + ' and return its items to stock?';
    if ((match = text.match(/^Trang (\d+)$/))) return 'Page ' + match[1];
    if ((match = text.match(/^(Từ|Đến) (.+₫)$/))) return (match[1] === 'Từ' ? 'From ': 'Up to ' ) +match[2];
    if ((match = text.match(/^(Xem|Yêu thích|So sánh|Giảm|Tăng|Phóng to ảnh) (.+)$/))) {
      const prefix = {
        'Xem': 'View',
        'Yêu thích': 'Save',
        'So sánh': 'Compare',
        'Giảm': 'Decrease quantity of',
        'Tăng': 'Increase quantity of',
        'Phóng to ảnh': 'Enlarge photo of'
      };
      return prefix[match[1]] + ' ' + get(match[2]);
    }
    if ((match = text.match(/^(.+) × (\d+)$/))) return get(match[1]) + ' × ' + match[2];
    if (text.includes(' · ')) return text.split(' · ').map(part => part === 'Giảm giá' ? 'Discount' : translated(part)).join(' · ');
    if (text.includes(' – ')) return text.split(' – ').map(get).join(' – ');
    // Nội dung kỹ thuật vẫn dùng đơn vị ghi trên sản phẩm.
    if (/\d,\d+ (inch|mm|GHz)/.test(text)) return text.replace(/(\d),(\d+)/g, '$1.$2');
    return text;
  }

  let language = TM.read('lang', 'vi') === 'en' ? 'en' : 'vi';
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const attributes = ['aria-label', 'aria-roledescription', 'placeholder', 'alt', 'title'];
  const skip = 'script, style, textarea, [contenteditable="true"], .review strong, .review p, .profile-title h2, .receipt-info dd, [data-act="lang"]';
  function switchValue(value, previous, translate = translated) {
    // Nếu một thành phần vừa cập nhật, nhận lại tiếng Việt mới thay vì dùng chữ cũ.
    const source = previous && value === previous.result ? previous.source : value;
    const result = language === 'en' ? source.replace(/^(\s*)(.*?)(\s*)$/s, (_, before, middle, after) => before + translate(middle) + after) : source;
    return {source, result};
  }
  function textNode(node) {
    const host = node.parentElement;
    if (!host || host.closest(skip)) return;
    // <option> không có value sẽ dùng chữ hiển thị làm giá trị. Giữ giá trị gốc
    // khi dịch để biểu mẫu và bộ lọc tiếp tục dùng các khóa ban đầu.
    if (language === 'en' && host.tagName === 'OPTION' && !host.hasAttribute('value')) host.value = host.text;
    const localText = host.matches('.store-item small') ? value => value === 'Điện thoại' ? 'Phone number': translated(value) : translated;
    const entry = switchValue(node.data, originalText.get(node), localText);
    if (node.data !== entry.result) node.data = entry.result;
    originalText.set(node, entry);
  }
  function element(node) {
    if (node.closest(skip)) return;
    const entries = originalAttributes.get(node) || new Map();
    for (const attr of attributes) {
      if (!node.hasAttribute(attr)) continue;
      const value = node.getAttribute(attr);
      const entry = switchValue(value, entries.get(attr));
      if (value !== entry.result) node.setAttribute(attr, entry.result);
      entries.set(attr, entry);
    }
    if (entries.size) originalAttributes.set(node, entries);
  }
  function visit(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      textNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(skip)) return;
    element(root);
    const tree = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: node => node.nodeType === Node.ELEMENT_NODE && node.matches(skip) ? NodeFilter.FILTER_REJECT: NodeFilter.FILTER_ACCEPT
    });
    let node;
    while ((node = tree.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) textNode(node); else element(node);
    }
  }
  function buttonLabel() {
    document.querySelectorAll('[data-act="lang"]').forEach(button => {
      const target = language === 'en' ? 'vi': 'en';
      const label = button.querySelector('[data-lang-label]') || button.querySelector('span') || button;
      const value = target.toUpperCase();
      if (label.textContent !== value) label.textContent = value;
      button.lang = target;
      button.setAttribute('aria-label', target === 'en' ? 'Switch to English': 'Chuyển sang tiếng Việt');
      button.title = target === 'en' ? 'English': 'Tiếng Việt';
    });
  }
  const observer = new MutationObserver(records => {
    observer.disconnect();
    for (const record of records) {
      if (record.type === 'attributes') element(record.target);
      else if (record.type === 'characterData') textNode(record.target);
      else record.addedNodes.forEach(visit);
    }
    buttonLabel();
    observe();
  });
  function observe() {
    if (language === 'en') observer.observe(document.documentElement, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes});
  }
  function apply() {
    observer.disconnect();
    document.documentElement.lang = language;
    visit(document.body);
    const title = document.querySelector('title');
    if (title) visit(title);
    buttonLabel();
    observe();
  }
  // Dịch tại chỗ để giữ nguyên nội dung đang nhập và lựa chọn trong giỏ hàng.
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-act="lang"]')) return;
    language = language === 'en' ? 'vi': 'en';
    TM.save('lang', language);
    apply();
  });
  document.addEventListener('invalid', event => {
    const field = event.target;
    if (language === 'en' && field.validity?.customError && words.has(field.validationMessage)) {
      field.setCustomValidity(words.get(field.validationMessage));
    }
  }, true);
  function syncLanguage() {
    const saved = TM.read('lang', 'vi') === 'en' ? 'en': 'vi';
    if (saved !== language) {
      language = saved;
      apply();
    }
  }
  window.addEventListener('pageshow', syncLanguage);
  window.addEventListener('storage', syncLanguage);
  if ((TM.page === 'shop' && TM.query.get('q') ) || (TM.page === 'blog' && TM.query.get('tu-khoa'))) TM.render();
  apply();
})();
