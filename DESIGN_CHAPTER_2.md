# CHƯƠNG 2: LỖ HỔNG HỆ THỐNG — Design Chi Tiết
*2 Lessons | CSN suy giảm & Hàm mũ | Kinh tế: Lạm phát*

---

## LESSON 4: LỖ HỔNG KHÍ CẦU (Cấp số nhân dạng giảm)

**Mục tiêu Toán**: $u_n = u_1 \cdot q^{n-1}$ với $q < 1$
**Mục tiêu Tài chính**: Hiểu Lạm phát ăn mòn sức mua.
**Tổng slides**: 7

### Slide 1 — STORY: "100 Triệu Của Bạn Đang Bị Ăn"
**Nội dung**:
> Bạn có **100 triệu** giấu dưới gối. Không tiêu, không mất, không ai lấy.
> Nhưng sau 10 năm, 100 triệu đó chỉ mua được lượng hàng hóa bằng... **60 triệu hôm nay**.
> 
> Kẻ trộm vô hình đó tên là **LẠM PHÁT**.

**Diagram**: 
- Tờ 100tr SVG ở giữa (tỉ lệ 1:1)
- Xung quanh: các mũi tên đỏ mảnh chỉ vào từ mọi phía, label "lạm phát 5%/năm"
- Tờ tiền từ từ bị thu nhỏ (scale 1.0 → 0.6 qua 3 giây) nhưng số "100.000.000" vẫn giữ nguyên
- Label: *"Tiền vẫn là 100tr. Nhưng sức mua đã teo lại."*

---

### Slide 2 — DIAGRAM: "Từ CSC Sang CSN"
**Storyboard**:
1. Bên trái: bậc thang CSC từ Chương 1 (xanh lá, tăng đều) — label "Chương 1: Cộng đều"
2. Mũi tên lớn ở giữa: "Nhưng nếu mỗi bước NHÂN thay vì CỘNG?"
3. Bên phải: dãy blocks mới — mỗi block nhỏ hơn block trước (×0.95) — đỏ san hô
4. Label: *"Cấp Số NHÂN: $u_n = u_1 \times q^{n-1}$"*
5. Giữa 2 blocks liền kề: label "×q" thay vì "+d"

**Text**:
> Nếu CSC là "cộng đều mỗi bước", thì **CSN** là "nhân đều mỗi bước". Khi $q < 1$ (VD: $q = 0.95$), mỗi bước nhỏ hơn → **suy giảm**.

---

### Slide 3 — THEOREM: "Cấp Số Nhân"
**Công thức**:
$$u_n = u_1 \cdot q^{n-1} \quad \text{với } q = 1 - r$$

**Giải thích**:
> - $u_1 = 100$ triệu (sức mua ban đầu)
> - $r = 5\% = 0.05$ (tỷ lệ lạm phát mỗi năm)
> - $q = 1 - 0.05 = 0.95$ (công bội — hệ số nhân mỗi năm)
> - $u_n$ = sức mua thực tế sau $n$ năm

**Diagram**: Flow chain `100 —[×0.95]→ 95 —[×0.95]→ 90.25 —[×0.95]→ ...`

---

### Slide 4 — MINIGAME: "Quả Bóng Xì Hơi"
**InteractionKey**: `INFLATION_BALLOON`

**Mô tả UX**:
- Trung tâm: Hình tròn SVG lớn, bên trong label "Sức mua: 100tr"
- **Slider**: "Tỷ lệ lạm phát $r$" (range: 1% — 15%, step 0.5%)
- **Slider**: "Số năm $n$" (range: 1 — 30)
- Khi kéo slider:
  - Hình tròn animate scale: `scale = q^(n-1)` — teo lại mượt mà
  - Khi $r$ cao: thêm "nếp nhăn" (wavy border SVG) — bóng bị nhăn nheo
  - NumberOdometer: hiển thị $u_n$ real-time (VD: 60.5tr)
  - Đồ thị đường cong bên phải: curve draw-on, võng xuống
  - Label trên curve: *"Đường cong suy giảm"*
- Dưới chart: so sánh bar — "100tr danh nghĩa" (xám full) vs "Sức mua thực" (xanh, ngắn hơn)

---

### Slide 5 — INFO: "Con Số Thật Của Việt Nam"
**Nội dung**:
> Lạm phát trung bình Việt Nam ~3-4%/năm (2020-2025).
> 
> Với $r = 4\%$, sau 10 năm: $u_{10} = 100 \times 0.96^9 \approx 69.3$ triệu sức mua.
> 
> **30% sức mua bốc hơi** mà bạn không hề hay biết!

**Diagram**: Timeline 10 năm, mỗi năm 1 đồng xu teo dần. Đồng xu năm 1 to nhất, năm 10 nhỏ nhất.

---

### Slide 6 — MINIGAME: "Tính Sức Mua"
**InteractionKey**: `PURCHASING_POWER_CALC`

**Câu hỏi**: *"Bát phở hôm nay giá 40k. Với lạm phát 5%/năm, 10 năm sau giá bao nhiêu?"*

**Hint**: Giá tăng = $40 \times (1.05)^{10}$. Hoặc sức mua 40k giảm = $40 / (0.95)^{10}$.
**Đáp án**: ~65.2k (làm tròn 65k chấp nhận)
- Đúng → Đồng xu 40k morph thành 65k (scale up + đổi label)
- Sai → Shake + hint

---

### Slide 7 — DECISION: "3 Triệu Hè Này Để Đâu?"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Câu hỏi liên kết**: *(Nhắc lại Slide 1: tiền giấu gối mà không có lãi → lạm phát ăn mòn)*

**Câu hỏi**: *"Mùa hè này bạn đi làm thêm và dành dụm được 3 triệu. Bạn để khoản này ở đâu?"*

**Câu hỏi con** (hiển thị nhỏ bên dưới, `var(--ink-faint)`, font Caveat): *Nhớ lại: $q = 0.96$ sau 1 năm — 3 triệu còn bảo giá trị làm sao?*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Gửi vào tài khoản tiết kiệm có lãi — dù chỉ 3-4%" | "Lãi suất ngân hàng $\approx$ lạm phát. Không thắng, nhưng không thua. Hơn giấu gối rất nhiều!" | `💰 +5` `❤️ 0` `🧠 +5` `⚡ 0` |
| `c2` | "Giấu tạm trong ngăn kéo, chờ cuối hè tính" | "Kết quả: $3000k \times 0.96^{0.25} \approx 2970k$ sau 3 tháng. Mất 30k không hay biết. Giấu gối là mất tiền câm lặng." | `💰 -5` `❤️ +5` `🧠 -5` `⚡ +5` |
| `c3` | "Mua ngay đồ cho năm học mới — vừa có ích vừa tránh lạm phát" | "Logic này có lý! Đầu tư vật dụng thích hợp = giữ sức mua. Nhưng chọn đồ cần thiết, đừng mua vì tâm lý sợ lạm phát." | `💰 -5` `❤️ +5` `🧠 +5` `⚡ +5` |

**mockLessons data**:
```ts
{
  id: 's7', type: 'DECISION', title: '3 Triệu Hè Này Để Đâu?',
  content: 'Mùa hè này bạn đi làm thêm và dành dụm được 3 triệu. Bạn để khoản này ở đâu?',
  choices: [
    { id: 'c1', text: 'Gửi vào tài khoản tiết kiệm có lãi', feedback: '...', impact: { moneyDelta: 5, healthDelta: 0, mentalDelta: 5, energyDelta: 0 } },
    { id: 'c2', text: 'Giấu tạm trong ngăn kéo, chờ cuối hè tính', feedback: '...', impact: { moneyDelta: -5, healthDelta: 5, mentalDelta: -5, energyDelta: 5 } },
    { id: 'c3', text: 'Mua ngay đồ cho năm học mới', feedback: '...', impact: { moneyDelta: -5, healthDelta: 5, mentalDelta: 5, energyDelta: 5 } },
  ]
}
```

---
---

## LESSON 5: LĂNG KÍNH THỜI GIAN (Half-life của tiền tệ)

**Mục tiêu Toán**: Giải $(1-r)^n = 0.5$, làm quen Logarit.
**Mục tiêu Tài chính**: Bao lâu để sức mua giảm một nửa.
**Tổng slides**: 7

### Slide 1 — STORY: "Bán Rã Tiền Tệ"
**Nội dung**:
> Trong Vật lý, chất phóng xạ có **chu kỳ bán rã** — thời gian để một nửa nguyên tử phân rã.
> Tiền cũng vậy. Với lạm phát, sức mua cũng có "Half-life" — thời gian để mất nửa giá trị.
>
> Câu hỏi: **Với lạm phát 5%, bao nhiêu năm để 100tr chỉ còn sức mua 50tr?**

**Diagram**: Thanh bar 100% → đường cong suy giảm → giao mốc 50% — dấu "?" tại điểm giao.

---

### Slide 2 — DIAGRAM: "Đi Tìm Điểm 50%"
**Storyboard**:
1. Hệ trục tọa độ draw-on: trục X = năm, trục Y = sức mua (%)
2. Đường cong $y = 0.95^x \times 100$ draw-on từ trái sang phải
3. Đường ngang đứt nét tại y = 50% draw-on
4. Điểm giao nhấp nháy (pulse animation) — label "?" 
5. Đường gióng xuống trục X — giao tại $n \approx 13.5$ năm
6. Label: *"Mất ~14 năm để sức mua giảm một nửa"*

---

### Slide 3 — THEOREM: "Phương Trình Mũ"
**Công thức**:
$$(1 - r)^n = 0.5$$

**Giải thích**:
> Để tìm $n$, ta cần "hạ bậc" — tức dùng **Logarit**:
> $$n = \frac{\ln(0.5)}{\ln(1-r)} = \frac{-0.693}{\ln(0.95)} \approx 13.51 \text{ năm}$$

**Lưu ý**: *"Đừng sợ Logarit! Nó chỉ là phép tính ngược của lũy thừa — giống như phép chia là ngược của nhân."*

---

### Slide 4 — DIAGRAM: "Logarit = Phép Tính Ngược"
**Layout**: So sánh 2 chiều.

```
LŨY THỪA (biết n, tìm kết quả):     2^3 = ?  → 8
LOGARIT (biết kết quả, tìm n):       2^? = 8  → 3
```

**Storyboard**:
1. Phép lũy thừa draw-on: `2³ = 8` (mũi tên phải)
2. Phép logarit draw-on ngược: `log₂(8) = 3` (mũi tên trái, đỏ)
3. Label: *"Logarit trả lời câu hỏi: cần MÃY LẦN nhân?"*

---

### Slide 5 — MINIGAME: "Lăng Kính Dò Tìm"
**InteractionKey**: `HALFLIFE_LENS`

**Mô tả UX**:
- Đồ thị hàm suy giảm $(0.95)^x$ full-width, draw-on
- Mốc 50% = đường ngang đỏ đứt nét
- Học sinh kéo **"Lăng kính"** (vertical line) dọc trục X
- Khi kéo: đường gióng dọc + gióng ngang xuất hiện real-time
- Tọa độ $(x, y)$ hiển thị live trên label gắn với lăng kính
- Mục tiêu: kéo lăng kính đến vị trí y ≈ 50% (±2%)
- Khi khớp: điểm giao pulse + glow xanh + label "n ≈ 13.5 năm!" draw-on

---

### Slide 6 — MINIGAME: "Tính Half-life"
**InteractionKey**: `HALFLIFE_CALC`

**Slider**: "Tỷ lệ lạm phát $r$" (1% — 20%)
**Output real-time**:
- NumberOdometer: "$n$ = ___ năm" (tính = ln(0.5)/ln(1-r))
- Đồ thị cập nhật: curve dốc hơn khi $r$ lớn
- Bar bên dưới: "Nhanh hơn 1 đời người?" nếu $n < 30$

**Câu hỏi**: *"Lạm phát 10%. Half-life = ?"*
**Đáp án**: ~6.6 năm (chấp nhận 6-7)

---

### Slide 7 — DECISION: "Bạn 17 Tuổi — Tiền Mất Nửa Khi Bạn 30?"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Câu hỏi liên kết**: *(Nhắc lại Slide 1: lạm phát 5% → half-life ~13.5 năm → nếu bạn 17 tuổi, lúc 30 tiền mất nửa)*

**Câu hỏi**: *"Bạn có 500k trong ngăn bàn từ hồi Tết. Lạm phát 5% — sau 13 năm, 500k đó chỉ mua được bằng 250k hôm nay. Bạn sẽ?"*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Gửi tiết kiệm — dù chỉ ngân hàng trường" | "Lãi tiết kiệm học sinh ~4-5%/năm. Xấp xỉ lạm phát — không giàu nhưng không mất sức mua. Tốt hơn nằm yên!" | `💰 +5` `❤️ 0` `🧠 +5` `⚡ 0` |
| `c2` | "Mua sách văn học thêm — kiến thức không lạm phát" | "Logić đúng! Đầu tư bản thân = tăng lương tương lai. Nhưng chọn sách có giá trị thực, đừng mua vì sợ lạm phát." | `💰 -5` `❤️ 0` `🧠 +10` `⚡ +5` |
| `c3` | "Cứ để đó, có dịp gì thì dùng" | "500k nằm im 13 năm = sức mua 250k. Không phải mất hết — nhưng bạn đang để lạm phát lấy lặng lẽ 50% kia." | `💰 -10` `❤️ +5` `🧠 -10` `⚡ +10` |

**mockLessons data**:
```ts
{
  id: 's7', type: 'DECISION', title: 'Bạn 17 Tuổi — Tiền Mất Nửa Khi Bạn 30?',
  content: 'Bạn có 500k trong ngăn bàn từ hồi Tết. Lạm phát 5% — sau 13 năm, sức mua chỉ còn 250k. Bạn sẽ?',
  choices: [
    { id: 'c1', text: 'Gửi tiết kiệm — dù chỉ ngân hàng trường', feedback: '...', impact: { moneyDelta: 5, healthDelta: 0, mentalDelta: 5, energyDelta: 0 } },
    { id: 'c2', text: 'Mua sách văn học thêm — kiến thức không lạm phát', feedback: '...', impact: { moneyDelta: -5, healthDelta: 0, mentalDelta: 10, energyDelta: 5 } },
    { id: 'c3', text: 'Cứ để đó, có dịp gì thì dùng', feedback: '...', impact: { moneyDelta: -10, healthDelta: 5, mentalDelta: -10, energyDelta: 10 } },
  ]
}
