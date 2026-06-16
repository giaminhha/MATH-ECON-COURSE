# 📚 TOÁN TỒN TẠI — MÙA 1: HOLD THE BAG
## Tóm tắt nội dung các Lesson

---

## 🔵 CHƯƠNG 1: KHỞI ĐỘNG HỆ THỐNG
*Dãy số & Cấp Số Cộng | Kinh tế: Tiết kiệm cơ bản*

---

### Lesson 1 — NHẬT KÝ DÒNG TIỀN
**Toán**: Khái niệm Dãy số $(u_n)$, chỉ số $n$, quy luật dãy.
**Tài chính**: Ghi chép thu chi hàng tháng.
**Slides**: 6

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | DIAGRAM | Sơ đồ dòng tiền: Lương → Chi tiêu → Còn lại. StickFigure + FlowNode animated. |
| 2 | DIAGRAM | 6 tháng thu chi xếp thành chuỗi node → giới thiệu ký hiệu $(u_n)$. |
| 3 | INFO | So sánh dãy số ngẫu nhiên vs dãy có quy luật (đồ thị tăng đều vs tăng mũ). |
| 4 | MINIGAME | **CashflowInput**: Nhập thu chi 3 tháng → tạo dãy số đầu tiên, vẽ đồ thị real-time. |
| 5 | THEOREM | Ký hiệu dãy số: $u_1, u_2, ..., u_n$. FlowDiagram chain với label "?" gợi mở. |
| 6 | DECISION | *"2 triệu còn lại sau tháng đầu — bạn để nó ở đâu tối nay?"* — liên kết Slide 1 (sơ đồ dòng tiền). |

**DECISION cuối (Lesson 1)**:
- Chuyển vào tài khoản riêng ngay → `💰 +10` `❤️ 0` `🧠 +5` `⚡ -5`
- Để trong ví, lỡ cần thì tiêu dần → `💰 -5` `❤️ +5` `🧠 -5` `⚡ +5`
- Rủ bạn đi ăn mừng tháng đầu ghi sổ → `💰 -15` `❤️ +5` `🧠 +5` `⚡ 0`

---

### Lesson 2 — XẾP THÁP BLOCK
**Toán**: Công thức số hạng tổng quát CSC: $u_n = u_1 + (n-1)d$.
**Tài chính**: Tiết kiệm cố định hàng tháng (ống heo, không lãi).
**Slides**: 7

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | Mỗi tháng bỏ 500k vào ống heo → dãy tăng đều. CoinIcon rơi vào piggy bank. |
| 2 | DIAGRAM | 5 blocks bậc thang animated, mũi tên "+d" giữa các block. Đường chéo nối đỉnh. |
| 3 | THEOREM | Công thức $u_n = u_1 + (n-1)d$. FlowDiagram chain với label "+d". |
| 4 | INFO | Ví dụ: $u_1=500k$, $d=500k$ → $u_{12}=6$ triệu. Block 12 glow vàng. |
| 5 | MINIGAME | **BentoStacker**: Slider u₁, d, n → tháp block real-time. Câu hỏi tính $u_{10}$. |
| 6 | DIAGRAM | So sánh "Dãy số BẤT KỲ" (lộn xộn) vs "Cấp số CỘNG" (bậc thang đều). |
| 7 | DECISION | *"Hôm nay mẹ cho 500k tiêu vặt — bỏ ống heo hay tiêu?"* — liên kết công thức $u_n = u_1 + (n-1)d$. |

**DECISION cuối (Lesson 2)**:
- Bỏ vào ống heo ngay — $d = 500k$, 10 tháng ra 5tr → `💰 +10` `❤️ 0` `🧠 +5` `⚡ 0`
- Mua đồ ăn vặt + đồ học tập còn thiếu → `💰 -5` `❤️ +5` `🧠 0` `⚡ +5`
- Rủ cả nhóm đi cà phê, split bill → `💰 -10` `❤️ +5` `🧠 -5` `⚡ +5`

---

### Lesson 3 — LẬT NGƯỢC BẬC THANG
**Toán**: Tổng CSC: $S_n = \frac{n(u_1 + u_n)}{2}$ — Định lý Gauss.
**Tài chính**: Tính tổng tiền tích góp để mua vé Concert 2 triệu.
**Slides**: 8

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | Mục tiêu: mua vé concert 2tr bằng cách tiết kiệm tăng dần 200k→300k→... |
| 2 | DIAGRAM | Diện tích bậc thang = Tổng $S_5$. Fill animation từ dưới lên. |
| 3 | DIAGRAM | **GaussFlipDiagram**: Tháp xanh + tháp đỏ lật 180° + ghép thành hình chữ nhật. |
| 4 | THEOREM | Công thức $S_n = \frac{n(u_1 + u_n)}{2}$. Diagram mini SVG chia đôi đường chéo. |
| 5 | INFO | Giải bài vé concert: $n=5$ tháng đủ 2 triệu. Progress bar animate. |
| 6 | MINIGAME | **GaussChallenge**: Tính nhanh $1+2+...+100=5050$ với gợi ý cặp đầu+cuối. |
| 7 | MINIGAME | **SavingsPlanner**: Slider mục tiêu + u₁ + d → tính số tháng cần thiết real-time. |
| 8 | DECISION | *"Tiết kiệm tăng dần 5 tháng đủ tiền vé — nhưng tháng 1 chỉ bỏ được 100k thôi"* — liên kết bài toán concert Slide 1. |

**DECISION cuối (Lesson 3)**:
- Bắt đầu 100k, tăng dần — đợi thêm 1-2 tháng → `💰 +5` `❤️ 0` `🧠 +10` `⚡ 0`
- Vay bạn bè 500k để tháng đầu bỏ đủ 200k → `💰 -10` `❤️ -5` `🧠 0` `⚡ -5`
- Thôi kệ, chờ resell vé giá rẻ → `💰 0` `❤️ +5` `🧠 -10` `⚡ +10`

---

## 🔴 CHƯƠNG 2: LỖ HỔNG HỆ THỐNG
*CSN suy giảm & Hàm mũ | Kinh tế: Lạm phát*

---

### Lesson 4 — LỖ HỔNG KHÍ CẦU
**Toán**: Cấp số nhân dạng giảm: $u_n = u_1 \cdot q^{n-1}$ với $q < 1$.
**Tài chính**: Lạm phát ăn mòn sức mua của tiền.
**Slides**: 7

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | 100tr giấu gối, sau 10 năm chỉ còn sức mua 60tr. Kẻ trộm vô hình = Lạm phát. |
| 2 | DIAGRAM | So sánh CSC (cộng đều, bậc thang) vs CSN (nhân đều, dãy teo). Label "×q" thay "+d". |
| 3 | THEOREM | $u_n = u_1 \cdot q^{n-1}$, $q = 1 - r$. Flow chain: 100 →[×0.95]→ 95 →[×0.95]→... |
| 4 | MINIGAME | **InflationBalloon**: Kéo slider lạm phát → hình tròn teo lại, nhăn nheo khi $r$ cao. |
| 5 | INFO | Số liệu thực: lạm phát VN ~3-4%/năm. Sau 10 năm mất 30% sức mua. |
| 6 | MINIGAME | **PurchasingPowerCalc**: "Bát phở 40k + lạm phát 5%/10 năm = bao nhiêu?" → ~65k. |
| 7 | DECISION | *"Mùa hè dành dụm được 3 triệu — để ở đâu?"* — liên kết Slide 1 (tiền giấu gối bị lạm phát ăn). |

**DECISION cuối (Lesson 4)**:
- Mua vàng hoặc ngoại tệ để giữ giá trị tài sản — `💰 +5` `❤️ 0` `🧠 +10` `⚡ -5`
- Gửi tiết kiệm ngân hàng để bù đắp một phần lạm phát — `💰 0` `❤️ 0` `🧠 +5` `⚡ 0`
- Chi tiêu ngay cho trải nghiệm vì "tiền mất giá" — `💰 -10` `❤️ +10` `🧠 -10` `⚡ +5`

---

### Lesson 5 — LĂNG KÍNH THỜI GIAN
**Toán**: Giải $(1-r)^n = 0.5$, làm quen Logarit cơ bản.
**Tài chính**: Bao lâu để sức mua của tiền giảm một nửa (Half-life).
**Slides**: 7

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | Khái niệm Half-life từ Vật lý → áp dụng cho tiền tệ. Lạm phát 5% → bao lâu mất nửa? |
| 2 | DIAGRAM | Đồ thị cong suy giảm + đường ngang 50% + "?" tại điểm giao (~13.5 năm). |
| 3 | THEOREM | $(1-r)^n = 0.5$ → $n = \frac{\ln(0.5)}{\ln(1-r)}$. Giới thiệu Logarit. |
| 4 | DIAGRAM | So sánh Lũy thừa ↔ Logarit: "biết n tìm kết quả" vs "biết kết quả tìm n". |
| 5 | MINIGAME | **HalflifeLens**: Kéo "lăng kính" dọc đồ thị để tìm điểm giao y=50%. |
| 6 | MINIGAME | **HalflifeCalc**: Slider lãi suất → tính half-life real-time. Câu hỏi: lạm phát 10%?→ ~6.6 năm. |
| 7 | DECISION | *"Bạn 17 tuổi, có 500k trong ngăn bàn từ hồi Tết — lạm phát 5% sẽ lấy 50% sau 13 năm"* — liên kết half-life từ Slide 1. |

---

## 🟡 CHƯƠNG 3: BỨC TƯỜNG LỬA
*Lãi kép, Hàm mũ, Logarit | Kinh tế: Đầu tư & Lãi kép*

---

### Lesson 6 — KHỐI CẦU PHÂN BÀO
**Toán**: CSN tăng trưởng: $u_n = u_1 \cdot (1+r)^n$.
**Tài chính**: Gửi ngân hàng một lần, lãi kép tự sinh trưởng.
**Slides**: 7

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | Giải pháp chống lạm phát: để tiền sinh ra tiền. Lãi kép = tế bào phân bào 1→2→4→8. |
| 2 | DIAGRAM | So sánh song song Lãi đơn vs Lãi kép. Thanh lãi kép ngày càng to hơn (lãi trên lãi). |
| 3 | THEOREM | $u_n = u_1 \cdot (1+r)^n$. So sánh với Ch.2: $q>1$ thì tăng, $q<1$ thì giảm. |
| 4 | MINIGAME | **CompoundGrowth**: Slider vốn + lãi suất + thời gian → vòng tròn phình, vành đai mọc. |
| 5 | INFO | Sức mạnh ẩn: lãi 10%/năm → 30 năm × 17.45 lần. Bắt đầu sớm 10 năm = gấp 2.7x. |
| 6 | DIAGRAM | Đường đỏ (lạm phát 4%) đi xuống vs đường xanh (lãi kép 7%) đi lên. |
| 7 | DECISION | *"Sinh nhật 18 tuổi được tặng 10 triệu — gửi ngân hàng, mua trà sữa, hay giấu gầm giường?"* — liên kết lãi kép Slide 1+2. |

---

### Lesson 7 — ĐIỂM BÙNG PHÁT
**Toán**: Tương giao hàm bậc nhất $y=ax+b$ và hàm mũ $y=c\cdot(1+r)^x$.
**Tài chính**: Tiết kiệm đều (CSC) vs Lãi kép một lần (CSN) — ai thắng?
**Slides**: 6

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | An (ống heo 500k/tháng) vs Bình (gửi ngân hàng 5tr một lần). 10 tháng đầu, An dẫn... |
| 2 | DIAGRAM | 2 đường draw-on. Camera zoom out → đường cong vượt đường thẳng tại tháng ~11. **ĐIỂM BÙNG PHÁT**. |
| 3 | THEOREM | $ax+b = c \cdot (1+r)^x$ — không có nghiệm đại số → dùng đồ thị hoặc ước lượng. |
| 4 | MINIGAME | **BreakpointFinder**: 3 slider (tiết kiệm/tháng, vốn ban đầu, lãi suất) → xác định điểm giao. |
| 5 | INFO | Kết luận: Lãi kép ban đầu thua, nhưng LUÔN thắng khi $x \to \infty$. |
| 6 | DECISION | *"Bạn 17 tuổi, có 3tr + dành 300k/tháng — combo như An+Bình hay chọn một?"* — liên kết story An vs Bình Slide 1. |

---

### Lesson 8 — BẺ CONG ĐỒ THỊ
**Toán**: $n = \log_{(1+r)} 2$, Quy tắc 72, trục Logarit.
**Tài chính**: Cần bao lâu để nhân đôi tài khoản.
**Slides**: 7

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | $(1.08)^n = 2$. Tìm $n$. Đường cong uốn éo → có cách "kéo thẳng" ra không? |
| 2 | THEOREM | $n = \frac{\ln 2}{\ln(1+r)}$. **Quy tắc 72**: $n \approx \frac{72}{r\%}$. |
| 3 | DIAGRAM | Bảng so sánh Quy tắc 72 vs chính xác (4%, 6%, 8%, 12%). Sai số rất nhỏ! |
| 4 | MINIGAME | **LogScaleMorph**: Kéo trục Y từ Linear → Logarithmic → đường cong mũ "xẹp" thành đường thẳng. |
| 5 | INFO | Tại sao dùng trục Log? Đường thẳng trên trục Log = tăng trưởng ổn định. |
| 6 | MINIGAME | **Rule72Quiz**: 3 câu hỏi nhanh 10 giây: lãi 6%→12 năm, lãi 9%→8 năm, nhân đôi 6 năm→cần 12%. |
| 7 | DECISION | *"Anh hỏi gửi 10tr lãi 6% muốn có 40tr — bạn dùng Quy tắc 72 trả lời"* — liên kết Quy tắc 72 từ Slide 2+3. |

---

## 🟣 CHƯƠNG 4: TRÙM CUỐI
*Hệ thức truy hồi & Annuity | Kinh tế: Dòng tiền đều*

---

### Lesson 9 — CƠN MƯA HÌNH KHỐI
**Toán**: Hệ thức truy hồi: $u_n = u_{n-1}(1+r) + A$.
**Tài chính**: Gửi tiết kiệm đều đặn mỗi tháng kèm lãi kép.
**Slides**: 7

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | Kết hợp Ch.1 (ống heo đều) + Ch.3 (lãi kép) = "combo cuối game" — bài toán khó nhất. |
| 2 | DIAGRAM | Animation: blocks rơi vào hố mỗi tháng, blocks cũ phình ra (×1+r). Block đầu = to nhất. |
| 3 | THEOREM | $u_n = u_{n-1}(1+r) + A$. Khai triển truy hồi từng bước. |
| 4 | MINIGAME | **BlockRainSim**: Slider A + r + n. Physics 2D: block rơi + phình. Breakdown "gốc vs lãi". |
| 5 | INFO | Bảng so sánh: 12/60/120 tháng — lãi kép tặng thêm 22tr sau 10 năm. |
| 6 | DECISION | *"An bắt đầu 18 tuổi, Bình 28 tuổi — ai có nhiều hơn lúc 58?"* — liên kết diagram block rơi Slide 2. |
| 7 | INFO | Preview bài 10-11: sẽ có công thức tổng đóng — không cần tính truy hồi thủ công. |

---

### Lesson 10 & 11 — GIAO DIỆN CÂN BẰNG *(Annuity)*
**Toán**: $S_n = A \cdot \frac{(1+r)[(1+r)^n - 1]}{r}$ — chứng minh + ứng dụng.
**Tài chính**: Tính chính xác tiền gửi hàng tháng để đạt mục tiêu 30 triệu học phí.
**Slides**: 10 *(Lesson 10 = chứng minh, Lesson 11 = ứng dụng)*

| # | Type | Nội dung chính |
|---|------|----------------|
| 1 | STORY | Mục tiêu: 30tr học phí trong 36 tháng, lãi 0.5%/tháng. **Mỗi tháng cần gửi bao nhiêu?** |
| 2 | DIAGRAM | Khai triển hệ thức truy hồi → nhận ra phần trong ngoặc là **Tổng CSN**. |
| 3 | THEOREM | Tổng CSN → Công thức Annuity: $S_n = A \cdot \frac{(1+r)^n - 1}{r}$. Flowchart 3 bước. |
| 4 | INFO | Giải bài 30tr: $A \approx 758k$/tháng. Tổng gốc gửi: 27.36tr, lãi kép tặng thêm 2.64tr. |
| 5 | MINIGAME | **AnnuitySimulator**: Bể nước trung tâm. Vặn van A → nước nhỏ giọt + tự "nở" do lãi. Mục tiêu: vừa chạm mốc. |
| 6 | MINIGAME | **AnnuitySolve**: 3 bài toán — Tìm $A$, Tìm $n$, Tìm $r$ (≈ 717k, 82 tháng, 7.8%/năm). |
| 7 | DIAGRAM | **Bản đồ toàn cảnh Mùa 1**: Node CSC → CSN giảm → CSN tăng → Annuity. |
| 8 | INFO | Kết thúc Mùa 1. Recap 4 chủ đề đã học. Preview Mùa 2: Xác suất & Rủi ro Đầu tư. |
| 9 | DECISION | *"Bạn vừa tính ra phải gửi 760k/tháng để có 30tr học phí — bạn có làm được không?"* — liên kết bài toán mở đầu Lesson 10. |
| 10 | STORY | Credits. Nền navy, cuộn chậm: *"Toán học không phải để thi. Toán học là để SỐNG."* |

---

## 📊 Tổng quan toàn Mùa 1

| Chương | Lessons | Số slides | Chủ đề Toán | Chủ đề Tài chính |
|--------|---------|-----------|-------------|-----------------|
| **1** Khởi Động | 1, 2, 3 | 21 | Dãy số, CSC, Tổng CSC | Thu chi, Tiết kiệm, Mục tiêu |
| **2** Lỗ Hổng | 4, 5 | 14 | CSN giảm, Hàm mũ, Logarit | Lạm phát, Half-life tiền tệ |
| **3** Bức Tường Lửa | 6, 7, 8 | 20 | CSN tăng, Tương giao, Log scale | Lãi kép, Điểm bùng phát, Quy tắc 72 |
| **4** Trùm Cuối | 9, 10, 11 | 17 | Hệ thức truy hồi, Annuity | Dòng tiền đều, Lập kế hoạch |
| **Tổng** | **11 lessons** | **~72 slides** | | |

---

## 🎮 Hệ thống Life Metrics

Mỗi DECISION slide tác động lên 4 chỉ số sinh tồn:

| Metric | Icon | Đại diện |
|--------|------|----------|
| **Money** | 💰 | Tiền mặt, tài chính |
| **Health** | ❤️ | Sức khỏe thể chất |
| **Mental** | 🧠 | Tinh thần, stress |
| **Energy** | ⚡ | Năng lượng, thời gian rảnh |

**Không có lựa chọn hoàn hảo** — mọi quyết định đều là đánh đổi (trade-off).
