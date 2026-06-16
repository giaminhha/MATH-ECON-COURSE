# BLUEPRINT: TOÁN TỒN TẠI (MATH-ECON) - MÙA 1
## TÊN MÙA: HOLD THE BAG - KỸ NĂNG TÍCH LŨY SINH TỒN

## MÔ TẢ PHONG CÁCH: DYNAMIC VECTOR EDUCATION (LIVING MATH)
Đây là "bộ luật" thiết kế tổng thể cho toàn bộ Lesson Engine, đảm bảo mọi bài toán đại số, hình học hay đồ thị tài chính đều chia sẻ chung một quy tắc thẩm mỹ và tương tác (giống phong cách Kurzgesagt/TED-Ed).

### 1. Spatial Structure (Cấu trúc không gian)
- **Fluid & Single-Column Canvas:** Loại bỏ việc chia nửa màn hình bó hẹp. Các bài học được trình bày như một luồng cuộn dọc. Phần Lý thuyết nằm xen kẽ mượt mà với phần Thực hành (Playground). Đồ thị SVG Interactive được phép full-width (100%) để không gian tương tác rộng lớn.
- **Soft Components:** Mọi khối (Cards), nút bấm, ô nhập liệu đều sử dụng góc bo siêu lớn (`border-radius: 32px` đến `48px`). Giao diện trông giống như những viên đá cuội (Pebbles), tạo cảm giác an toàn và "game hóa". Không có góc sắc nhọn.

### 2. Ngôn ngữ Hình ảnh & Bảng màu Sáng (Airy, Light & Semantic Palette)
Sử dụng nền sáng và High-Contrast để các yếu tố "động" bật lên rực rỡ nhất:
- **Background (The Canvas):** Trắng tinh (`#FFFFFF`) hoặc Trắng kem/Ghi siêu nhạt (`bg-slate-50`).
- **Semantic Math Palette (Bảng màu Toán học cố định):**
  - 🔵 **Màu gốc (Chữ/Công thức tĩnh):** Deep Slate (`slate-800/900`) hoặc Xanh Đen, không dùng đen thuần.
  - 🟣 **Biến Độc Lập ($x, t$ - Thời gian/Input):** Tím nhạt / Xanh Indigo sáng.
  - 🟢 **Kết quả Tích cực ($y, S$ - Tiết kiệm/Đích đến):** Xanh Lục bảo / Emerald. Đại diện cho sự tăng trưởng.
  - 🍉 **Cảnh báo/Rủi ro (Chi phí/Lạm phát):** Đỏ San hô / Cam Coral.
- **Lighting (Đổ bóng):** Không dùng viền đen (`border: 0` hoặc viền nhạt cùng màu nền). Phân lớp UI bằng bóng đổ sâu, phân tán mềm (VD: `shadow-2xl shadow-indigo-500/10`) tạo cảm giác thẻ bài "lơ lửng bồng bềnh".

### 3. Động lực học (Motion & Spring Physics)
Tuân thủ định luật vật lý ảo (dùng Framer Motion), không có chuyển động linear (đều đều):
- **Spring-Loaded Interactions:** Các Slider khi kéo nảy và căng như dây chun mượt mà (`stiffness: 300, damping: 20`).
- **Odometer Dynamics:** Mọi con số thay đổi đều "nhảy số/cuộn" vòng liên tục (Không nhảy cái từ $10$ lên $100$ mà đếm lên nhanh).
- **Path Drawing:** Các đồ thị SVG tự thân vẽ ra màn hình (stroke-dasharray), như có người cầm bút trực tiếp.
- **Tactile Squish:** Thẻ hay Nút khi nhấn chuột vào sẽ lún vỡ siêu nhẹ (`Scale 0.95`) và nảy đàn hồi khi thả (`Scale 1.05 -> 1.0`).

### 4. Reward & Error Feedback (Vòng lặp tương tác)
- **Ăn điểm (Success):** Không dùng popup khô khan. Số hoặc công thức toán học sẽ "lóe sáng/Glow aura" màu xanh lục bảo trong 1-2s. Bắn hạt particle Confetti ẩn.
- **Làm sai (Error):** Khi số liệu gây hụt vốn hoặc tính sai, khối UI/công thức tự động giật lắc hai bên (Shake/Wiggle), cảnh báo đỏ san hô nền tảng.

*Đối tượng: Học sinh cấp 3 (Trọng tâm Toán 11 & 12).*
*Chủ đề Toán học: Dãy Số, Cấp Số Cộng (CSC), Cấp Số Nhân (CSN), Hàm Số Mũ & Logarit.*
*Chủ đề Kinh tế: Tiết kiệm, Quản lý dòng tiền, Lạm phát và Lãi kép.*
*Art & Interaction Style: Premium Educational Vector (như Kurzgesagt/TED-Ed), dùng Physics/Spring Animation mượt mà, màu sắc Pastel/Trưởng thành, tương tác trực tiếp lên khối hình học để giải toán.*

### CHƯƠNG 1: KHỞI ĐỘNG HỆ THỐNG (Khái niệm Dãy số & Cấp Số Cộng)
*Mục tiêu Toán học: Hiểu quy luật Dãy số, Công thức tổng quát $u_n$ và Tổng $S_n$ của Cấp Số Cộng.*

*   **Lesson 1: Nhật Ký Dòng Tiền (Khái niệm Dãy số)**
    *   **Kinh tế:** Ghi chép thu chi hàng tháng cơ bản.
    *   **Toán học:** Làm quen với Dãy số $(u_n)$. Chỉ số $n$ là tháng thứ $n$.
    *   **Interaction:** Học sinh gõ các con số chi tiêu. Dữ liệu chạy ra thành một dãy số (Array). Các con số tick mượt mà thành một đường zig-zag tĩnh trên biểu đồ neon xanh lá.

*   **Lesson 2: Xếp Tháp Block (Số hạng tổng quát Cấp Số Cộng)**
    *   **Kinh tế:** Tiết kiệm cố định hàng tháng (đút ống heo rỗng, không lãi).
    *   **Toán học:** Công thức $u_n = u_1 + (n-1)d$. Học sinh tìm khối lượng tài sản ở tháng thứ $n$.
    *   **Interaction:** Giao diện 3D Isometric. Mỗi tháng tiết kiệm ($d$) là một khối lập phương thả từ trên xuống. Học sinh chỉnh van "Tiền tiết kiệm hằng tháng". Các khối xếp chồng lên nhau thành bậc thang.

*   **Lesson 3: Lật Ngược Bậc Thang (Tổng của Cấp Số Cộng)**
    *   **Kinh tế:** Đặt mục tiêu mua vé Concert hay một đôi Sneaker bằng cách tích góp.
    *   **Toán học:** Tính tổng chuỗi tiết kiệm $S_n = \frac{n(u_1 + u_n)}{2}$ (Định lý Gauss).
    *   **Interaction:** Từ tháp bậc thang phần trước, khi chuyển chế độ tính Tổng, tháp tự động nhân bản, đổi màu, lật ngược $180^\circ$ và ghép khít vào tháp ban đầu tạo thành khối hộp chữ nhật hoàn hảo. Trực quan hóa phép tính chia 2.

### CHƯƠNG 2: LỖ HỔNG HỆ THỐNG (Cấp Số Nhân Suy Giảm & Lạm Phát)
*Mục tiêu Toán học: Khái quát Cấp số nhân (với công bội $q < 1$) và Hàm số mũ suy giảm.*

*   **Lesson 4: Lỗ Hổng Khí Cầu (Cấp số nhân dạng giảm)**
    *   **Kinh tế:** Sự thật phũ phàng về Lạm phát (Inflation) khi để tiền "chết".
    *   **Toán học:** Số hạng tổng quát CSN: $u_n = u_1 \cdot q^{n-1}$ (với $q = 1 - r$).
    *   **Interaction:** Hình ảnh khối cầu hoàn hảo (Sức mua 100tr). Học sinh kéo slider "Tỷ lệ lạm phát". Quả cầu xì hơi, nhăn nheo lại. Đồ thị đường cong bên cạnh võng xuống. (Tiền vẫn là 100tr nhưng kích thước vật lý teo lại).

*   **Lesson 5: Lăng Kính Thời Gian (Phương trình Exponential Suy Giảm)**
    *   **Kinh tế:** Đo lường thời gian để sức mua của một số tiền bị chia đôi (Half-life của tiền tệ).
    *   **Toán học:** Giải phương trình hàm mũ: $(1-r)^n = 0.5$. Làm quen Logarit cơ bản.
    *   **Interaction:** Học sinh điều khiển "Lăng kính" rượt dọc trục X (thời gian) trên đồ thị hàm suy giảm, đi tìm toạ độ biến $x$ sao cho đường gióng trục Y chạm đúng mốc 50%.

### CHƯƠNG 3: BỨC TƯỜNG LỬA (Lãi Kép & Hàm Số Mũ)
*Mục tiêu Toán học: Cấp số nhân tăng trưởng, Hàm Mũ mở rộng và Logarit trong thực tế.*

*   **Lesson 6: Khối Cầu Phân Bào (Lãi kép chu kỳ đơn)**
    *   **Kinh tế:** Gửi tiền vào Ngân hàng một lần để chống lại kẻ cắp lạm phát.
    *   **Toán học:** Công thức $u_n = u_1 \cdot (1+r)^n$. Sự khác biệt giữa tịnh tiến và hàm mũ.
    *   **Interaction:** Vòng tròn 2D trung tâm. Mỗi tháng năm, vòng tròn phình ra một vành đai mỏng (lãi). Năm sau, vành đai mỏng tự mọc thêm nhúm của riêng nó. Khi kéo thời gian dài, khối cầu bùng nổ theo dạng fractal vô hạn.

*   **Lesson 7: Điểm Bùng Phát (Tương giao Hàm Bậc Nhất & Hàm Mũ)**
    *   **Kinh tế:** Gửi heo đều đặn vs. Có sẵn tiền gửi ngân hàng lãi kép một lần.
    *   **Toán học:** Giải/Ước lượng hoành độ giao điểm của Đường thẳng và Đường cong hàm mũ.
    *   **Interaction:** Một đường thẳng nằm là là dưới đáy. Khi tăng $n$ vượt mốc, đường đồ thị kia giật thót, bẻ cong $90^\circ$ và đâm xuyên cạnh trên màn hình. Camera tự động scale-out để học sinh thấy sức mạnh lãi kép.

*   **Lesson 8: Bẻ Cong Đồ Thị (Logarit trong Tài chính)**
    *   **Kinh tế:** Mất bao lâu để nhân đôi tài khoản (Quy tắc 72).
    *   **Toán học:** Giải phương trình $n = \log_{(1+1)} 2$. Hiểu bản chất của trục toạ độ Logarit.
    *   **Interaction:** Học sinh dùng chuột nắm đuôi đường cong hàm mũ và "kéo giãn" nó xụp xuống để biến nó thành đường thẳng (Trục Y chuyển từ Linear sang Logarithmic). Học sinh đo được dễ dàng năm $n$.

### CHƯƠNG 4: TRÙM CUỐI (Tổng Cấu Trúc - Annuity)
*Mục tiêu Toán học: Tính tổng của CSN khi thêm mới chuỗi liên tục. Dạng toán khó.*

*   **Lesson 9: Cơn Mưa Hình Khối (Hệ thức truy hồi)**
    *   **Kinh tế:** Gửi tiết kiệm thêm đều đặn mỗi tháng kèm số dư có lãi.
    *   **Toán học:** Hệ thức $u_n = u_{n-1}(1+r) + A$.
    *   **Interaction:** Mô phỏng Physics 2D. Khối vuông rớt xuống hố. Khi chạm, 2 khối phình ra $r\%$. Tháng sau khối thứ 3 rớt, các khối cũ lại phình. Học sinh thấy khối cũ nhất (năm 1) đã phình khổng lồ, khối mới (năm $n$) rất nhỏ bé. Dạy bài học "Bắt đầu càng sớm càng tốt".

*   **Lesson 10 & 11: Giao Diện Cân Bằng (Bài toán dòng tiền đều)**
    *   **Kinh tế:** Tính toán chính xác mỗi tháng cất bao nhiêu để đạt 30tr nộp học phí trong 3 năm ($A = ?$).
    *   **Toán học:** Thiết lập, chứng minh và đảo công thức: $S_n = A \cdot \frac{(1+r)[(1+r)^n - 1]}{r}$.
    *   **Interaction:** Trình giả lập (Simulator) với van $A$ và van $r$. Nước nhỏ giọt vào balo mục tiêu 30. Nước tự "nở" ra do lãi. Học sinh phải tự nháp công thức, vặn chính xác van $A$ để nước vừa đầy tràn miệng chứ không đổ lố. Giải mã mật mã cửa thoát hiểm mở cánh cửa cuối của khóa học.
