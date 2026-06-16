# CHƯƠNG 3: BỨC TƯỜNG LỬA — Design Chi Tiết
*3 Lessons | Lãi kép, Hàm mũ, Logarit | Kinh tế: Đầu tư & Lãi kép*

---

## LESSON 6: KHỐI CẦU PHÂN BÀO (Lãi kép chu kỳ đơn)

**Mục tiêu Toán**: $u_n = u_1 \cdot (1+r)^n$ — CSN tăng trưởng.
**Mục tiêu Tài chính**: Gửi ngân hàng một lần, lãi kép tự sinh.
**Tổng slides**: 7

### Slide 1 — STORY: "Vũ Khí Chống Lạm Phát"
**Nội dung**:
> Chương 2 cho bạn thấy: để tiền chết = mất tiền.
> Giải pháp? Đặt tiền vào nơi nó **tự sinh ra tiền** — lãi suất ngân hàng.
> 
> Nhưng lãi kép không đơn giản. Nó không chỉ sinh thêm lãi từ vốn gốc — mà còn **sinh lãi từ lãi cũ**. Giống tế bào phân bào: 1 → 2 → 4 → 8...

**Diagram**: Cell division animation — 1 vòng tròn → split thành 2 → mỗi cái split thành 2 → 4 cái... stagger 0.5s mỗi thế hệ.

---

### Slide 2 — DIAGRAM: "Lãi Đơn vs Lãi Kép"
**Storyboard** (so sánh song song):

**Bên trái — Lãi Đơn**:
1. Khối vuông "Vốn 10tr" (xanh lá)
2. Mỗi năm: 1 thanh mảnh "Lãi 500k" xếp bên cạnh (cùng size, vàng)
3. Sau 5 năm: 5 thanh vàng cùng kích thước = 2.5tr lãi
4. Label: *"Lãi đơn: chỉ tính trên vốn gốc"*

**Bên phải — Lãi Kép**:
1. Khối vuông "Vốn 10tr" (xanh lá)
2. Năm 1: thanh lãi 500k (vàng)
3. Năm 2: thanh lãi 525k (vàng, LỚN HƠN một chút) — lãi trên lãi!
4. Năm 3: 551k... mỗi thanh lớn hơn
5. Label: *"Lãi kép: lãi mẹ đẻ lãi con"*

**Kết luận**: Sau 5 năm lãi kép vượt lãi đơn. Đường draw-on 2 line, line kép vươn cao hơn.

---

### Slide 3 — THEOREM: "Công Thức Lãi Kép"
**Công thức**:
$$u_n = u_1 \cdot (1+r)^n$$

**Giải thích**:
> - $u_1$ = vốn gốc ban đầu
> - $r$ = lãi suất mỗi kỳ (năm/tháng)
> - $n$ = số kỳ
> - $(1+r)$ = công bội CSN — lần này $q > 1$ → tăng trưởng!
>
> **So sánh**: Lạm phát (Ch.2) dùng $q = 1-r < 1$ → giảm. Lãi kép dùng $q = 1+r > 1$ → tăng. Cùng công thức, khác hướng.

---

### Slide 4 — MINIGAME: "Phân Bào Lãi Kép"
**InteractionKey**: `COMPOUND_GROWTH`

**Mô tả UX**:
- Vòng tròn trung tâm = Vốn gốc, label "10tr"
- **Slider 1**: Lãi suất $r$ (1% — 15%/năm)
- **Slider 2**: Thời gian $n$ (1 — 30 năm)
- Khi kéo slider:
  - Vòng tròn phình ra (scale = $(1+r)^n$) — animate mượt
  - Mỗi năm: 1 vành đai mỏng mọc quanh vòng tròn (ring animation)
  - Vành đai cũ cũng phình ra (lãi trên lãi) — hiệu ứng fractal-like
  - NumberOdometer: hiển thị $u_n$ + tỷ lệ tăng %
  - Đồ thị bên phải: đường cong mũ draw-on, điểm $(n, u_n)$ pulse

**Câu hỏi**: *"10tr, lãi 8%/năm, 10 năm = ?"*
**Đáp án**: $10 \times 1.08^{10} \approx 21.59$ triệu (chấp nhận 21.5-21.6tr)

---

### Slide 5 — INFO: "Sức Mạnh Ẩn Của Lãi Kép"
**Nội dung**:
> Warren Buffett bắt đầu đầu tư từ 11 tuổi. Ông nói: *"Tài sản của tôi đến từ sự kết hợp của: sống ở Mỹ, gen may mắn, và lãi kép."*
> 
> Với $r = 10\%$/năm:
> - 10 năm: $\times 2.59$
> - 20 năm: $\times 6.73$ 
> - 30 năm: $\times 17.45$
> 
> **Bắt đầu sớm 10 năm = gấp 2.7 lần kết quả!**

**Diagram**: 3 bars so sánh, mỗi bar animate từ 0 → giá trị. Bar 30 năm vượt xa.

---

### Slide 6 — DIAGRAM: "Đánh Bại Lạm Phát"
**Storyboard** (callback Chương 2):
1. Đường đỏ (lạm phát 4%): $100 \times 0.96^n$ — draw-on, đi xuống
2. Đường xanh (lãi kép 7%): $100 \times 1.07^n$ — draw-on, đi lên
3. Khoảng cách giữa 2 đường mở rộng — fill gradient xanh nhạt
4. Label: *"Lãi suất > Lạm phát = Tiền của bạn THẬT SỰ tăng trưởng"*
5. Vùng dưới đường đỏ fill đỏ nhạt: "Vùng nguy hiểm"

---

### Slide 7 — DECISION: "Bạn Có 10 Triệu Từ Quà Tết"
**Câu hỏi liên kết**: *(Nhắc lại Slide 1: lãi kép = giải pháp chống lạm phát; Slide 2: lãi kép sinh lãi trên lãi)*

**Câu hỏi**: *"Cả nhà mừng sinh nhật 18 tuổi tặng bạn tổng cộng 10 triệu. Khoản này để làm gì?"*

**Choices**:

1. ✅ "Gửi ngân hàng lãi 7%/năm, chờ 20 năm" → *"$10 \times 1.07^{20} = 38.7$ triệu. 28 tuổi bạn có khoản này. Kiên nhẫn được thưởng."* | `💰 +20` `❤️ 0` `🧠 +10` `⚡ 0`
2. "Mua 200 ly trà sữa trong 1 năm" → *"$u_n = 0$. Game over."* | `💰 -10` `❤️ +5` `🧠 -10` `⚡ +5`
3. "Giấu gầm giường" → *"Lạm phát 4%: $10 \times 0.96^{20} = 4.4$ triệu sức mua. Mất hơn nửa!"* | `💰 -5` `❤️ +5` `🧠 -15` `⚡ +5`

---
---

## LESSON 7: ĐIỂM BÙNG PHÁT (Tương giao Hàm bậc nhất & Hàm mũ)

**Mục tiêu Toán**: So sánh đường thẳng $y = ax + b$ và đường cong $y = c \cdot (1+r)^x$.
**Mục tiêu Tài chính**: Tiết kiệm đều (CSC) vs Lãi kép một lần (CSN).
**Tổng slides**: 6

### Slide 1 — STORY: "Hai Người Bạn"
**Nội dung**:
> **An**: Mỗi tháng bỏ ống heo 500k. Sau $n$ tháng có: $S = 500n$ (nghìn)
> **Bình**: Gửi ngân hàng 5tr một lần, lãi 0.6%/tháng: $S = 5000 \times 1.006^n$
> 
> 10 tháng đầu, An dẫn trước. Nhưng rồi...

**Diagram**: 2 stick figures, label "An" (piggy bank) và "Bình" (bank icon).

---

### Slide 2 — DIAGRAM: "Cuộc Đua Hai Đường"
**Animation chính** (~8s):
1. Hệ trục tọa độ draw-on
2. Đường thẳng An (xanh lá) draw-on: $y = 500x$ — tiến đều
3. Đường cong Bình (vàng gold) draw-on: $y = 5000 \times 1.006^x$ — ban đầu thấp hơn
4. Camera giữ nguyên 20 tháng đầu — An dẫn trước
5. **BÙM** — tại ~tháng 11, đường cong vượt đường thẳng! Điểm giao pulse đỏ
6. Camera zoom out (scale down): thấy tháng 30, 40, 50 — đường cong bỏ xa
7. Tháng 60: đường cong đâm ra khỏi viewport trên → camera zoom out tiếp
8. Label: *"Đây là ĐIỂM BÙNG PHÁT — nơi lãi kép vượt qua tiết kiệm đều"*

---

### Slide 3 — THEOREM: "Giao Điểm Hàm Bậc Nhất & Hàm Mũ"
**Công thức**:
$$ax + b = c \cdot (1+r)^x$$

**Giải thích**:
> Phương trình này không có nghiệm đại số chính xác → phải dùng:
> - Đồ thị (vẽ + tìm giao)
> - Ước lượng (thử $n$ = 10, 11, 12...)
> - Logarit (phiên bản nâng cao)

---

### Slide 4 — MINIGAME: "Tìm Điểm Bùng Phát"
**InteractionKey**: `BREAKPOINT_FINDER`

**Mô tả UX**:
- **Slider**: An's monthly saving (200k — 1tr)
- **Slider**: Bình's initial deposit (1tr — 20tr) 
- **Slider**: Interest rate r (0.3% — 1.5%/tháng)
- Đồ thị: 2 đường real-time, điểm giao highlight khi tồn tại
- **Bảng bên phải**: Table so sánh $n$ = 1→60, highlight dòng An < Bình
- Drag-to-zoom trên chart

**Câu hỏi**: *"An bỏ 500k/tháng. Bình gửi 5tr lãi 0.6%/tháng. Tháng nào Bình vượt An?"*
**Đáp án**: Khoảng tháng 11 (chấp nhận 10-12)

---

### Slide 5 — INFO: "Bài Học Lãi Kép"
**Nội dung**:
> **Kết luận**: Lãi kép ban đầu THUA tiết kiệm đều. Nhưng theo thời gian, nó **luôn** thắng.
> 
> Đó là lý do Einstein (được cho là) nói: *"Lãi kép là kỳ quan thứ 8 của thế giới."*
> 
> Trong Toán: hàm mũ **luôn** vượt hàm bậc nhất khi $x \to \infty$.

---

### Slide 6 — DECISION: "An Và Bình — Bạn Chọn Ai?"
**Câu hỏi liên kết**: *(Nhắc lại story Slide 1: An bỏ ống heo 500k/tháng vs Bình gửi ngân hàng 5tr một lần — điểm bùng phát tháng 11)*

**Câu hỏi**: *"Bạn 17 tuổi, có 3 triệu tiết kiệm và mỗi tháng có thể dành được thêm 300k. Giống An hay Bình hơn?"*

**Choices**:

1. ✅ "Gửi 3tr vào ngân hàng + mỗi tháng bỏ thêm 300k" → *"Kết HỢP cả hai! Chương 4 sẽ dạy công thức này. Bạn đã chọn 'combo' mạnh nhất rồi!"* | `💰 +5` `❤️ 0` `🧠 +10` `⚡ 0`
2. "Chỉ bỏ ống heo 300k/tháng, 3tr để dự phòng" → *"An toàn nhưng 3tr nằm yên thua lạm phát dài hạn."* | `💰 +2` `❤️ +5` `🧠 -5` `⚡ +5`
3. "All-in crypto bằng cả 3tr" → *"Rủi ro cực cao. Toán không dự đoán được thị trường bất hợp lý."* | `💰 -10` `❤️ 0` `🧠 -10` `⚡ 0`

---
---

## LESSON 8: BẺ CONG ĐỒ THỊ (Logarit trong Tài chính)

**Mục tiêu Toán**: $n = \log_{(1+r)} 2$, Quy tắc 72, trục Log.
**Mục tiêu Tài chính**: Nhân đôi tài khoản mất bao lâu.
**Tổng slides**: 7

### Slide 1 — STORY: "Câu Hỏi Nhân Đôi"
**Nội dung**:
> Câu hỏi đơn giản: Gửi tiền lãi 8%/năm, bao lâu để **nhân đôi**?
> 
> Tức là: $(1.08)^n = 2$. Tìm $n$.
> 
> Nhìn đồ thị hàm mũ — đường cong uốn éo, khó đo. Có cách nào "kéo thẳng" nó ra không?

**Diagram**: Đường cong mũ, mốc "×2" ngang, dấu "?" tại điểm giao.

---

### Slide 2 — THEOREM: "Logarit Giải Phóng"
**Công thức**:
$$n = \log_{(1+r)} 2 = \frac{\ln 2}{\ln(1+r)}$$

**Giải thích**:
> Logarit = "Bao nhiêu lần nhân $(1+r)$ để được 2?"
> 
> Với $r = 8\%$: $n = \frac{0.693}{0.077} \approx 9$ năm
>
> **Quy tắc 72** (xấp xỉ nhanh): $n \approx \frac{72}{r\%} = \frac{72}{8} = 9$ năm

---

### Slide 3 — DIAGRAM: "Quy Tắc 72"
**Layout**: Bảng so sánh animated.

| Lãi suất $r$ | Chính xác ($\frac{\ln 2}{\ln(1+r)}$) | Quy tắc 72 ($\frac{72}{r\%}$) | Sai số |
|---|---|---|---|
| 4% | 17.67 năm | 18 năm | 1.9% |
| 6% | 11.90 | 12 | 0.8% |
| 8% | 9.01 | 9 | 0.1% |
| 12% | 6.12 | 6 | 2.0% |

Mỗi dòng fade-in stagger. Cột "Sai số" glow xanh (rất nhỏ!).
Label: *"72 ÷ lãi suất = số năm nhân đôi. Chính xác đáng sợ!"*

---

### Slide 4 — MINIGAME: "Bẻ Cong Đồ Thị"
**InteractionKey**: `LOG_SCALE_MORPH`

**Đây là interaction signature của Lesson 8**.

**Mô tả UX**:
- Đồ thị hàm mũ $y = (1.08)^x$ hiển thị bình thường (trục Y linear)
- Đường cong uốn mạnh → khó đo tọa độ chính xác
- **Interaction**: Học sinh kéo chuột lên trục Y → trục Y **biến đổi liên tục** từ Linear → Logarithmic
- Khi chuyển sang Log scale: đường cong mũ "xẹp" xuống thành ĐƯỜNG THẲNG
- Lúc này dễ dàng đọc: giao mốc $y = 2$ tại $x = 9$
- Label: *"Trục Log biến đường cong thành đường thẳng — dễ đọc!"*

**Animation**: Morph mượt mà — mỗi điểm trên curve di chuyển từ vị trí linear sang vị trí log.

---

### Slide 5 — INFO: "Tại Sao Trục Log?"
**Nội dung**:
> Trục Logarit "nén" các giá trị lớn lại, "giãn" giá trị nhỏ.
> 
> Trong tài chính, mọi đồ thị chứng khoán dài hạn đều dùng trục Log.
> Lý do: trên trục Log, **mức tăng trưởng đều = đường thẳng**.
>
> Nếu thấy đường thẳng trên trục Log → tăng trưởng ổn định.
> Nếu thấy đường cong lên → tăng tốc (bong bóng?).

---

### Slide 6 — MINIGAME: "Quy Tắc 72 Speed Run"
**InteractionKey**: `RULE_72_QUIZ`

**Format**: 3 câu hỏi nhanh, mỗi câu 10 giây.
1. "Lãi 6%, nhân đôi?" → **12 năm**
2. "Lãi 9%, nhân đôi?" → **8 năm**  
3. "Muốn nhân đôi trong 6 năm, cần lãi?" → **12%** ($72/6$)

Đúng → NumberOdometer flash xanh. Sai → shake + đáp án hiện.

---

### Slide 7 — DECISION: "Anh/Chị Hỏi Muốn Tiền Gấp Đôi"
**Câu hỏi liên kết**: *(Nhắc lại Quy tắc 72 — 72 ÷ lãi suất = số năm nhân đôi)*

**Câu hỏi**: *"Anh hỏi: 'Anh muốn gửi 10tr, bao lâu để có 40tr?' Bạn vừa học xong Quy tắc 72. Bạn trả lời anh thế nào?"*

**Hint**: ×4 = ×2 × ×2. Cần 2 lần nhân đôi. Mỗi lần 72/6 = 12 năm. Tổng = 24 năm.

1. ✅ "~24 năm — vì ×4 cần 2 lần nhân đôi" → *"Tuyệt! Bạn giải thích được cho anh. 'Quy tắc 72 làm được cái này đưa!'"* | `💰 0` `❤️ 0` `🧠 +10` `⚡ 0`
2. "12 năm" → *"Bạn trả lời chính xác cho x2, nhưng đó mới nhân đôi 1 lần (×2), chưa đến ×4."* | `💰 0` `❤️ 0` `🧠 -5` `⚡ 0`
3. "48 năm" → *"Quá lâu! Bạn đang nghĩ tuyến tính (×4 = 4 lần ×). Lãi kép nhanh hơn thế!"* | `💰 0` `❤️ 0` `🧠 -10` `⚡ 0`
