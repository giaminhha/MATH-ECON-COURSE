# CHƯƠNG 4: TRÙM CUỐI — Design Chi Tiết
*3 Lessons (9, 10, 11) | Hệ thức truy hồi & Annuity | Kinh tế: Dòng tiền đều*

---

## LESSON 9: CƠN MƯA HÌNH KHỐI (Hệ thức truy hồi)

**Mục tiêu Toán**: $u_n = u_{n-1}(1+r) + A$ — kết hợp lãi kép + gửi thêm đều.
**Mục tiêu Tài chính**: Gửi tiết kiệm đều đặn mỗi tháng kèm lãi kép.
**Tổng slides**: 7

### Slide 1 — STORY: "Kết Hợp Hai Sức Mạnh"
**Nội dung**:
> Chương 1: Bỏ ống heo đều → tăng **tuyến tính** (chậm).
> Chương 3: Gửi ngân hàng 1 lần → lãi kép **mũ** (mạnh nhưng cần vốn lớn).
> 
> Câu hỏi: **Nếu kết hợp cả hai** — vừa gửi thêm $A$ mỗi tháng, vừa để lãi kép $r$ chạy?
> 
> Đó là "combo cuối game" — và là bài toán **khó nhất Mùa 1**.

**Diagram**: 2 biểu tượng (piggy + bank) merge lại → biểu tượng mới (rocket?) với label "COMBO"

---

### Slide 2 — DIAGRAM: "Cơ Chế Truy Hồi"
**Storyboard** (~8s, animation chính):
1. "Hố chứa" (container) ở dưới — rỗng
2. **Tháng 1**: Block A (500k, vàng) rơi vào hố — spring drop. Tổng: 500k
3. **Tháng 2**: Block cũ phình ra 5% (scale 1.05, label +25k). Block A mới rơi vào. Tổng: 500×1.05 + 500 = 1025k
4. **Tháng 3**: 2 block cũ đều phình thêm 5%. Block A mới rơi. Tổng: 1025×1.05 + 500
5. **Tháng 4, 5**: Tương tự — block đầu tiên giờ to gấp đôi block mới nhất
6. Label chỉ vào block cũ nhất (to nhất): *"Block đầu tiên — phình lâu nhất, LỚN nhất"*
7. Label chỉ vào block mới nhất (nhỏ nhất): *"Block mới — mới rơi, chưa kịp phình"*
8. Kết luận: *"BẮT ĐẦU SỚM = khối tiền lớn nhất"*

---

### Slide 3 — THEOREM: "Hệ Thức Truy Hồi"
**Công thức**:
$$u_n = u_{n-1} \cdot (1+r) + A$$

**Giải thích**:
> - $u_{n-1}$ = tổng tiền cuối tháng trước
> - $(1+r)$ = nhân lên nhờ lãi suất (lãi kép trên toàn bộ số dư)
> - $A$ = số tiền gửi thêm mỗi tháng
> 
> "Truy hồi" = **mỗi bước phụ thuộc vào bước trước**. Không có công thức tắt (chưa)... hay là có?

**Diagram**: Flow chain:
```
u₀ = 0
u₁ = 0×(1+r) + A = A
u₂ = A×(1+r) + A  
u₃ = [A(1+r)+A]×(1+r) + A
...
```
Mỗi dòng draw-on tuần tự, ngày càng dài → tạo cảm giác phức tạp tăng dần.

---

### Slide 4 — MINIGAME: "Mô Phỏng Mưa Khối"
**InteractionKey**: `BLOCK_RAIN_SIM`

**Mô tả UX**:
- **Slider**: Gửi thêm mỗi tháng $A$ (100k — 2tr)
- **Slider**: Lãi suất $r$ (0.3% — 1.5%/tháng)
- **Nút Play/Pause**: Auto-advance tháng (1s/tháng)
- **Slider manual**: Số tháng $n$ (1 — 60)
- Khu vực chính: Container physics 2D
  - Mỗi tháng: block mới rơi xuống (vàng)
  - Tất cả block cũ phình ra (animate scale lên $(1+r)$)
  - Màu block thay đổi theo tuổi: vàng → cam → đỏ → tím (càng cũ càng đậm)
  - Label trên mỗi block: giá trị hiện tại
- **Panel phải**:
  - NumberOdometer: Tổng $u_n$
  - Mini chart: đường cong tổng tích lũy
  - Breakdown: "Từ gửi thêm: ___" vs "Từ lãi kép: ___"

---

### Slide 5 — INFO: "Sức Mạnh Thời Gian"
**Nội dung**:
> Với $A = 500k$/tháng, $r = 0.5\%$/tháng:
> 
> | Sau | Tổng gửi | Tổng có (gồm lãi) | Lãi kép sinh |
> |-----|---------|-------------------|-------------|
> | 12 tháng | 6tr | 6.17tr | 170k |
> | 60 tháng | 30tr | 34.9tr | 4.9tr |
> | 120 tháng | 60tr | 82.0tr | **22tr** |
> 
> **10 năm: lãi kép sinh thêm 22 triệu từ hư không.** Và phần lớn lãi đến từ những tháng ĐẦU TIÊN (compound dài nhất).

**Diagram**: Stacked bar chart — mỗi bar = tổng, chia 2 màu: xanh (gốc gửi) + vàng (lãi). Phần vàng ngày càng lớn.

---

### Slide 6 — DECISION: "An Bắt Đầu Lúc 18, Bình Lúc 28"
**Câu hỏi liên kết**: *(Nhắc lại Slide 2: block rơi vào hố mỗi tháng + phình ra theo lãi — block càng cũ càng to)*

**Câu hỏi**: *"An và Bình cùng gửi 500k/tháng, lãi 6%/năm. An bắt đầu lúc 18, Bình lúc 28. Lúc 58 tuổi, ai có nhiều hơn?"*

**Hint** (hiển thị sau khi chọn, font Caveat): *Nhớ diagram block rơi — block An đầu tiên gửi lúc 18, lúc 58 nó đã phình ra 40 năm!*

1. ✅ "An — nhiều hơn gần gấp đôi" → *"An gửi 40 năm, Bình 30 năm. Nhưng block đầu tiên của An có thêm 10 năm để phình! 10 năm sớm = khối tiền khổng lồ."* | `💰 0` `❤️ 0` `🧠 +10` `⚡ 0`
2. "Bằng nhau" → *"Sai! Compound interest không tuyến tính. 10 năm sớm của An = giá trị cực lớn."* | `💰 0` `❤️ 0` `🧠 -5` `⚡ 0`
3. "Bình — vì kinh nghiệm hơn" → *"Kinh nghiệm không thắng được thời gian trong lãi kép. Block Bình đơn giản là rơi trễ hơn!"* | `💰 0` `❤️ 0` `🧠 -10` `⚡ 0`

---

### Slide 7 — INFO: "Preview Bài Cuối"
**Nội dung**:
> Hệ thức truy hồi $u_n = u_{n-1}(1+r) + A$ rất mạnh, nhưng tính thủ công rất mệt.
> 
> Bài 10 & 11 sẽ cho bạn **công thức tổng đóng** — một phương trình duy nhất tính ra đáp số ngay, không cần lặp.
> 
> Đó là **công thức Annuity** — vũ khí cuối cùng.

---
---

## LESSON 10 & 11: GIAO DIỆN CÂN BẰNG (Dòng tiền đều — Annuity)

**Mục tiêu Toán**: $S_n = A \cdot \frac{(1+r)[(1+r)^n - 1]}{r}$ — chứng minh + ứng dụng.
**Mục tiêu Tài chính**: Tính chính xác tiền gửi hàng tháng để đạt mục tiêu.
**Tổng slides**: 10 (chia 2 phần: 10 = chứng minh, 11 = ứng dụng)

---

### PHẦN 10A: CHỨNG MINH CÔNG THỨC

### Slide 1 — STORY: "Mật Mã Cuối Cùng"
**Nội dung**:
> Bạn cần **30 triệu** nộp học phí đại học trong 3 năm (36 tháng).
> Lãi suất ngân hàng: 0.5%/tháng.
> 
> Câu hỏi sống còn: **Mỗi tháng cần gửi bao nhiêu?**
> 
> Để trả lời, ta cần công thức cuối cùng — và để có nó, ta phải **chứng minh**.

---

### Slide 2 — DIAGRAM: "Khai Triển Hệ Thức Truy Hồi"
**Storyboard** (animation toán học, draw-on từng dòng):

```
u₁ = A
u₂ = A(1+r) + A = A[(1+r) + 1]  
u₃ = A[(1+r)² + (1+r) + 1]
...
uₙ = A[(1+r)^(n-1) + (1+r)^(n-2) + ... + (1+r) + 1]
```

1. Mỗi dòng draw-on tuần tự (0.8s/dòng)
2. Phần trong ngoặc vuông highlight vàng
3. Label: *"Nhận ra chưa? Trong ngoặc là TỔNG cấp số nhân!"*
4. Brace bracket bao quanh phần CSN → label "Tổng CSN, $q = (1+r)$, $n$ số hạng"

---

### Slide 3 — THEOREM: "Tổng CSN → Công Thức Annuity"
**Bước 1** — Tổng CSN:
$$1 + q + q^2 + ... + q^{n-1} = \frac{q^n - 1}{q - 1}$$

**Bước 2** — Thay $q = (1+r)$:
$$S_n = A \cdot \frac{(1+r)^n - 1}{(1+r) - 1} = A \cdot \frac{(1+r)^n - 1}{r}$$

**Bước 3** — Hoặc dạng đầy đủ (lãi cuối kỳ):
$$S_n = A \cdot \frac{(1+r)[(1+r)^n - 1]}{r}$$

**Diagram**: Flow từ hệ thức truy hồi → khai triển → nhận dạng CSN → đóng công thức. Mỗi bước là 1 node trong flowchart, mũi tên draw-on.

---

### Slide 4 — INFO: "Giải Bài Toán 30 Triệu"
**Nội dung**:
> $S_{36} = 30000k$, $r = 0.005$, $n = 36$. Tìm $A$.
> 
> $$A = \frac{S_n \cdot r}{(1+r)[(1+r)^n - 1]}$$
> 
> $$A = \frac{30000 \times 0.005}{1.005 \times [1.005^{36} - 1]} = \frac{150}{1.005 \times 0.1967} = \frac{150}{0.1977} \approx 758.6k$$
> 
> **Mỗi tháng gửi ~760k, sau 3 năm bạn có 30 triệu!**

**Diagram**: 
- NumberOdometer đếm từ 0 → 758,600
- Progress bar fill đến mốc 30tr
- Label: *"Tổng thực gửi: $760k \times 36 = 27.36tr$. Lãi kép tặng thêm: 2.64tr"*

---

### PHẦN 10B: ỨNG DỤNG (LESSON 11)

### Slide 5 — MINIGAME: "Simulator Dòng Tiền"
**InteractionKey**: `ANNUITY_SIMULATOR`

**Đây là interaction TRÙM CUỐI — phức tạp nhất, visual nhất.**

**Mô tả UX**:
- **Layout**: Bể nước trung tâm + panel điều khiển bên trái
- **Bể nước** (FillableTank upgraded):
  - Chiều cao = mục tiêu (VD: 30tr)
  - Mực nước = tổng hiện tại
  - Mỗi tháng: giọt nước nhỏ từ van $A$ vào (drop animation)
  - Nước trong bể tự "nở" ra do lãi (mực tăng nhẹ + ripple effect)
  - Vạch mốc mục tiêu ở trên cùng (đường đỏ đứt nét)
- **Panel trái**:
  - Van $A$ = slider (100k — 2tr) — xoay van = thay đổi flow
  - Van $r$ = slider (0.1% — 2%/tháng)
  - Input: Mục tiêu (triệu VNĐ)
  - Input: Thời gian $n$ (tháng)
- **Panel phải**:
  - NumberOdometer: $S_n$ real-time
  - Công thức Annuity hiển thị với giá trị thay thế live
  - Trạng thái: "Thiếu ___" / "Đạt mục tiêu!" / "Dư ___"
- **Mục tiêu game**: Vặn van $A$ sao cho nước **vừa đủ chạm mốc** — không thiếu, không tràn
- Đạt (±5%): glow xanh + "Chính xác!" + confetti
- Tràn: nước đổ ra ngoài animation + "Dư rồi, giảm $A$ lại!"
- Thiếu: mực nước dừng dưới mốc + "Chưa đủ, tăng $A$ hoặc $n$!"

---

### Slide 6 — MINIGAME: "Giải Mã Mật Mã"
**InteractionKey**: `ANNUITY_SOLVE`

**3 bài toán áp dụng** (mỗi bài = 1 sub-slide):

**Bài 1** (Tìm $A$): *"Mục tiêu 50tr, 5 năm, lãi 6%/năm. Mỗi tháng = ?"*
- $r = 0.5\%$/tháng, $n = 60$
- $A = \frac{50000 \times 0.005}{1.005 \times (1.005^{60}-1)} \approx 717k$

**Bài 2** (Tìm $n$): *"Gửi 1tr/tháng, lãi 0.5%/tháng. Bao lâu để có 100tr?"*
- $100000 = 1000 \times \frac{1.005 \times (1.005^n - 1)}{0.005}$
- Ước lượng: $n \approx 82$ tháng (~7 năm)

**Bài 3** (Tìm $r$): *"Gửi 500k/tháng, 10 năm, muốn 100tr. Cần lãi suất?"*
- Phương trình siêu việt, cần thử/ước lượng
- $r \approx 0.65\%$/tháng ~ 7.8%/năm

Mỗi bài: Input underline → check → đúng glow + next, sai shake + hint.

---

### Slide 7 — DIAGRAM: "Bản Đồ Toàn Cảnh Mùa 1"
**Layout**: Full-width recap diagram.

**Storyboard** (tổng kết hành trình):
1. **Node 1** (xanh lá): "Dãy số" — CSC — `+d` — draw-on
2. **Mũi tên** → **Node 2** (đỏ): "CSN giảm" — Lạm phát — `×q<1`
3. **Mũi tên** → **Node 3** (vàng): "Lãi kép" — CSN tăng — `×q>1`
4. **Mũi tên** → **Node 4** (tím, to nhất): "Annuity" — Combo — `×(1+r)+A`
5. Mỗi node khi active → hiện mini diagram/công thức tương ứng
6. Label trung tâm: *"Từ số cộng đơn giản đến công thức tài chính chuyên nghiệp"*

---

### Slide 8 — INFO: "Kết Thúc Mùa 1"
**Nội dung**:
> Bạn vừa hoàn thành **Mùa 1: Hold The Bag**.
> 
> Bạn đã học được:
> - ✅ Dãy số & Cấp số cộng — quản lý thu chi
> - ✅ Cấp số nhân suy giảm — hiểu lạm phát
> - ✅ Hàm mũ & Logarit — lãi kép và quy tắc 72
> - ✅ Annuity — lập kế hoạch tài chính thực tế
> 
> **Mùa 2 sắp tới**: Xác suất, Thống kê & Rủi ro Đầu tư. Stay tuned.

---

### Slide 9 — DECISION: "Lời Hứa Với Bản Thân"
**Câu hỏi liên kết**: *(Nhắc lại bài toán Slide 1: cần 30 triệu học phí trong 36 tháng → mỗi tháng gửi ~760k)*

**Câu hỏi**: *"Bạn vừa tính ra: gửi 760k/tháng, lãi 0.5%, sau 36 tháng có 30 triệu. Bạn có làm được không?"*

1. "Bắt đầu gửi ngay tháng này — 760k/tháng" → *"$u_1$ của bạn đã được khởi tạo. Compound interest bắt đầu từ NGÀY BÂY GIờ."* | `💰 +10` `❤️ 0` `🧠 +5` `⚡ 0`
2. "Lập kế hoạch chi tiết 3 năm trước" → *"Bạn đã dùng toán để thiết kế cuộc đời. Đó là sức mạnh thật sự."* | `💰 0` `❤️ 0` `🧠 +10` `⚡ -5`
3. "Dạy lại cho bạn bè cách tính" → *"Tri thức nhân bản = lãi kép tri thức. $(1+r)^n$ applied to knowledge!"* | `💰 0` `❤️ 0` `🧠 +10` `⚡ -5`

---

### Slide 10 — STORY: "Credits"
**Layout**: Nền navy tối, chữ trắng, cuộn chậm.

> **TOÁN TỒN TẠI — MÙA 1: HOLD THE BAG**
> 
> *Toán học không phải để thi.*
> *Toán học là để SỐNG.*
> 
> Thiết kế: [Tên bạn]
> Engine: MATH-ECON v1
> 
> *Hẹn gặp lại ở Mùa 2.*
