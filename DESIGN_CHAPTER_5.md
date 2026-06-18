# CHƯƠNG 5: XÚC XẮC CUỘC ĐỜI — Design Chi Tiết
*3 Lessons | Xác suất cổ điển, Quy tắc cộng/nhân, Hoán vị & Tổ hợp | Kinh tế: Rủi ro, Quỹ khẩn cấp, Phân bổ tài sản*

---

## LESSON 12: TUNG ĐỒNG XU (Xác suất cơ bản)

**Mục tiêu Toán**: Không gian mẫu $\Omega$, biến cố $A$, xác suất cổ điển $P(A) = \frac{|A|}{|\Omega|}$.
**Mục tiêu Tài chính**: Nhận diện rủi ro tài chính — mỗi sự kiện đời sống có xác suất cụ thể.
**Tổng slides**: 7

---

### Slide 1 — STORY: "Kế Hoạch Hoàn Hảo... Bị Phá"
**Slide type**: `STORY`
**Layout**: `diagram-card`, `max-w-3xl`, center. Icon `AlertTriangle` + accent bar trái đỏ.

**Nội dung**:
> Bạn vừa tốt nghiệp Mùa 1 — biết tiết kiệm, biết lãi kép, lên kế hoạch Annuity hoàn hảo: 760k/tháng, 36 tháng, 30 triệu.
>
> Tháng 3: xe máy hỏng → -2 triệu sửa.
> Tháng 7: ốm nặng → -5 triệu viện phí.
> Tháng 10: mất điện thoại → -3 triệu mua lại.
>
> Kế hoạch không sai. Nhưng cuộc đời có **xúc xắc**.

**Diagram**: Timeline ngang 12 tháng. Tháng 3, 7, 10 đánh dấu ⚡ đỏ. Thanh tiết kiệm tích luỹ bị "sụt" tại mỗi điểm sự cố. Animation: thanh đang lên đều → bị đập xuống → lên lại → đập → lên lại.

**mockLessons data**:
```ts
{
  id: 's1', type: 'STORY', title: 'Kế Hoạch Hoàn Hảo... Bị Phá',
  content: 'Bạn lên kế hoạch Annuity hoàn hảo. Nhưng xe hỏng, ốm nặng, mất đồ. Kế hoạch không sai — nhưng cuộc đời có xúc xắc.',
  diagramKey: 'PLAN_DISRUPTION',
  theme: 'STANDARD'
}
```

---

### Slide 2 — DIAGRAM: "Không Gian Mẫu"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card` full-width, `min-h-[400px]`.

**Cấu trúc SVG** (viewBox `0 0 800 400`):

**Panel 1 — Tung xu** (x: 0-250):
- Đồng xu ở giữa (animated spin)
- 2 outcome node: "Sấp" + "Ngửa"
- Label: $|\Omega| = 2$

**Panel 2 — Xúc xắc** (x: 270-520):
- Xúc xắc 3D (animated roll)
- 6 outcome nodes xếp 2 hàng: ⚀ ⚁ ⚂ ⚃ ⚄ ⚅
- Label: $|\Omega| = 6$

**Panel 3 — Rủi ro tháng này** (x: 540-800):
- 5 outcome nodes dọc, icon + text:
  - 🔧 Xe hỏng (15%)
  - 🤒 Ốm (5%)
  - 📱 Mất đồ (8%)
  - ⚡ Tai nạn (0.3%)
  - ✅ Bình thường (71.7%)
- Tô nền mỗi node theo xác suất (đậm = cao)

**Animation**: Panel 1 → 2 → 3 stagger 0.8s. Mỗi panel: drawLine + fadeUp nodes.

**Text dưới diagram**:
> Mỗi tình huống có một tập hợp các kết quả có thể xảy ra — đó là **Không gian mẫu** $\Omega$. Xác suất = đo "khả năng" mỗi kết quả.

**mockLessons data**:
```ts
{
  id: 's2', type: 'DIAGRAM', title: 'Không Gian Mẫu',
  content: 'Mỗi tình huống có một tập hợp các kết quả có thể xảy ra — đó là Không gian mẫu Ω.',
  diagramKey: 'SAMPLE_SPACE',
  theme: 'STANDARD'
}
```

---

### Slide 3 — THEOREM: "Công Thức Xác Suất"
**Slide type**: `THEOREM`
**Layout**: `theorem-plate`, grid 2 cột.

**Cột trái — Giải thích**:
> - $\Omega$ = Không gian mẫu (tất cả kết quả có thể)
> - $A$ = Biến cố (kết quả mà ta quan tâm)
> - $|A|$ = số kết quả thuận lợi
> - $|\Omega|$ = tổng số kết quả
> - $0 \leq P(A) \leq 1$: chắc chắn không xảy ra = 0, chắc chắn xảy ra = 1

**Cột phải — Công thức**: 
- Badge: "XASC SUẤT CỔ ĐIỂN"
- KaTeX: `$$P(A) = \frac{|A|}{|\Omega|}$$`
- Ví dụ bên dưới: *P(xe hỏng/năm) = 0.15 = 15% — cứ 100 người dùng xe cũ, khoảng 15 người gặp sự cố.*

**mockLessons data**:
```ts
{
  id: 's3', type: 'THEOREM', title: 'Công Thức Xác Suất',
  mathFormula: '$$P(A) = \\frac{|A|}{|\\Omega|}$$',
  content: 'Xác suất = số kết quả thuận lợi / tổng số kết quả. P nằm trong [0, 1].',
  theme: 'STANDARD'
}
```

---

### Slide 4 — MINIGAME: "Máy Tung Xu"
**Slide type**: `MINIGAME`
**InteractionKey**: `COIN_FLIP_SIM`
**Component**: `CoinFlipSim` (file mới: `src/components/interactions/CoinFlipSim.tsx`)

**Layout**: Grid 2 cột. Trái: controls + stats. Phải: histogram realtime.

**Controls**:
- Button "Tung 1 lần", "Tung 10 lần", "Tung 100 lần"
- Auto-flip toggle (tung liên tục 1/giây)
- Reset button

**Visual phải**:
- Histogram 2 cột: Heads (xanh) vs Tails (đỏ)
- Tỷ lệ % hiện trên mỗi cột, cập nhật realtime
- Đường ngang 50% nét đứt + label "50% kỳ vọng"
- `NumberOdometer` hiện tổng số lần tung

**Key insight** (hiện khi tung >50 lần): 
> *"Tung ít = kết quả ngẫu nhiên. Tung nhiều = tiệm cận 50/50. Đó là **Luật số lớn** — bài 22 sẽ chứng minh."*

**onComplete**: Tự pass khi tung ≥ 30 lần.

**mockLessons data**:
```ts
{
  id: 's4', type: 'MINIGAME', title: 'Máy Tung Xu',
  content: 'Tung xu nhiều lần — xem tỷ lệ có hội tụ về 50% không.',
  interactionKey: 'COIN_FLIP_SIM',
  variables: { minFlips: 30 }
}
```

---

### Slide 5 — INFO: "Bảng Xác Suất Đời Thường"
**Slide type**: `INFO`
**Layout**: `diagram-card`, bảng chính giữa + text dưới.

**Bảng** (styled table, alternating row colors):

| Sự kiện | P/năm | Nghĩa là... |
|---------|-------|-------------|
| 🔧 Xe máy hỏng vặt | ~15% | Cứ 6-7 năm, hỏng 1 lần |
| 📱 Mất/hỏng điện thoại | ~8% | Cứ 12 năm, mất 1 lần |
| 🤒 Ốm nặng (>3 ngày) | ~5% | Cứ 20 năm, 1 lần nằm viện |
| 🚗 Tai nạn giao thông | ~0.3% | 1/300 mỗi năm |
| 🏠 Hỏa hoạn | ~0.05% | Cực hiếm nhưng thiệt hại cực lớn |

**Text dưới bảng**:
> Xác suất thấp **không có nghĩa** không xảy ra. Hỏa hoạn 0.05% nhưng nếu xảy ra → mất toàn bộ. **Bài 20 sẽ dạy bạn dùng E(X) để quyết định mua bảo hiểm cho rủi ro nào.**

**mockLessons data**:
```ts
{
  id: 's5', type: 'INFO', title: 'Bảng Xác Suất Đời Thường',
  content: 'Mỗi rủi ro đều có xác suất cụ thể. Biết xác suất = có thể chuẩn bị.',
  theme: 'STANDARD'
}
```

---

### Slide 6 — MINIGAME: "Bản Đồ Rủi Ro Của Bạn"
**Slide type**: `MINIGAME`
**InteractionKey**: `RISK_ESTIMATOR`
**Component**: `RiskEstimator` (file mới)

**Triết lý thiết kế**: Không có đáp án đúng/sai. Xác suất rủi ro phụ thuộc vào hoàn cảnh mỗi người (xe mới vs xe cũ, nghề nghiệp nguy hiểm vs văn phòng, v.v.). Mục tiêu là tập **thói quen suy nghĩ định lượng** về rủi ro — dù con số có sai, quy trình mới là quan trọng.

**Layout**: Danh sách 5 rủi ro theo kịch bản nhân vật. Mỗi rủi ro có 1 slider (0%–50%) để ước tính P/năm. Sau khi kéo hết, bấm "Tính Quỹ" → hệ thống tính tổng chi phí kỳ vọng/năm → gợi ý mức quỹ khẩn cấp.

**5 rủi ro trong kịch bản** (nhân vật: sinh viên mới ra trường, xe máy 5 tuổi, làm văn phòng):
| # | Rủi ro | Slider range | Chi phí ước tính |
|---|--------|-------------|------------------|
| 1 | 🔧 Xe máy hỏng vặt | 0–50% | 1.5tr/lần |
| 2 | 🤒 Ốm phải nghỉ làm | 0–30% | 2tr/lần |
| 3 | 📱 Mất/vỡ điện thoại | 0–20% | 3tr/lần |
| 4 | 💸 Thu nhập giảm đột ngột | 0–20% | 5tr (1 tháng lương) |
| 5 | 🦷 Đau răng/nha khoa | 0–40% | 800k/lần |

**Sau khi ấn "Tính Quỹ"**:
- Tính: `Tổng E(chi phí/năm) = Σ P_i × Cost_i`
- Hiện kết quả: "Bạn ước tính sẽ tốn khoảng **X triệu/năm** cho sự cố"
- Gợi ý: "Quỹ khẩn cấp tối thiểu = X × 1.5 (buffer) ≈ Y triệu"
- Nút **"So sánh với thống kê"**: hiện phạm vi tham khảo (VD: 8–18% là hợp lý cho xe 5 tuổi) — không phê phán, chỉ để tham khảo

**Điều kiện hoàn thành**: Kéo tất cả 5 slider + bấm "Tính Quỹ".

**mockLessons data**:
```ts
{
  id: 's6', type: 'MINIGAME', title: 'Bản Đồ Rủi Ro Của Bạn',
  content: 'Ước tính xác suất rủi ro của BẠN — không có đúng/sai. Kết quả giúp tính mức quỹ khẩn cấp phù hợp.',
  interactionKey: 'RISK_ESTIMATOR',
  variables: {}
}
```

---

### Slide 7 — DECISION: "Bảo Hiểm Xe Máy"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Câu hỏi liên kết**: *(Nhắc lại Slide 5: P(xe hỏng/năm) = 40% cho xe cũ, chi phí sửa TB 1.5tr/lần)*

**Câu hỏi**: *"Bạn vừa mua xe máy cũ 8 triệu. P(hỏng vặt trong năm) = 40%. Sửa trung bình 1.5tr/lần. Cửa hàng mời mua bảo hiểm 800k/năm. Bạn có mua không?"*

**Hint text**: *Preview bài 20: E(chi phí sửa) = 0.4 × 1.5tr = 600k. Phí BH 800k > 600k — nhưng bạn đang "mua" sự chắc chắn.*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Mua bảo hiểm 800k — biết trước chi phí, không lo bất ngờ" | "Chi phí xác định 800k thay vì rủi ro 0~3tr. Bạn đang trade tiền lấy sự yên tâm. Bài 20 sẽ dạy cách tính xem deal này có xứng không." | `💰 -5` `❤️ +5` `🧠 +10` `⚡ 0` |
| `c2` | "Không mua, tự để dành quỹ sửa xe riêng 1.5tr" | "Self-insure! E(chi) = 600k, bạn để 1.5tr = dư buffer. Nhưng nếu hỏng 2 lần thì quỹ không đủ." | `💰 -5` `❤️ 0` `🧠 +5` `⚡ +5` |
| `c3` | "Không mua, kệ đi, hỏng tính sau" | "Không plan = plan thất bại. Nếu hỏng đúng tháng cần tiền gấp → domino sụp. Bài 13 sẽ chỉ rõ." | `💰 0` `❤️ -5` `🧠 -10` `⚡ +10` |

**mockLessons data**:
```ts
{
  id: 's7', type: 'DECISION', title: 'Bảo Hiểm Xe Máy',
  content: 'Xe cũ 8tr. P(hỏng) = 40%, sửa TB 1.5tr. BH 800k/năm. Mua không?',
  choices: [
    { id: 'c1', text: 'Mua bảo hiểm 800k — biết trước chi phí, không lo bất ngờ', feedback: '...', impact: { moneyDelta: -5, healthDelta: 5, moodDelta: 10, energyDelta: 0 } },
    { id: 'c2', text: 'Không mua, tự để dành quỹ sửa xe riêng 1.5tr', feedback: '...', impact: { moneyDelta: -5, healthDelta: 0, moodDelta: 5, energyDelta: 5 } },
    { id: 'c3', text: 'Không mua, kệ đi, hỏng tính sau', feedback: '...', impact: { moneyDelta: 0, healthDelta: -5, moodDelta: -10, energyDelta: 10 } },
  ]
}
```

---
---

## LESSON 13: ĐƯỜNG DÂY DOMINO (Quy tắc cộng & nhân)

**Mục tiêu Toán**: Quy tắc cộng (OR), quy tắc nhân (AND), biến cố độc lập vs phụ thuộc.
**Mục tiêu Tài chính**: Rủi ro chồng rủi ro — tại sao cần quỹ khẩn cấp.
**Tổng slides**: 7

---

### Slide 1 — STORY: "Domino Rủi Ro"
**Slide type**: `STORY`
**Layout**: `diagram-card`, `max-w-3xl`. Icon `Zap`.

**Nội dung**:
> Tháng 3: xe hỏng.
> Tháng 3 **luôn**: bạn cũng bị cảm nặng.
>
> *"Xe hỏng VÀ ốm CÙNG tháng — xác suất bao nhiêu?"*
>
> Rủi ro hiếm khi đến một mình. Chúng thường kéo nhau đi — như domino.

**Diagram**: 3 quân domino xếp hàng. Quân 1 (🔧 Xe) đổ → đẩy quân 2 (🤒 Ốm) → đẩy quân 3 (💸 Hết tiền). Animation: stagger fall.

**mockLessons data**:
```ts
{
  id: 's1', type: 'STORY', title: 'Domino Rủi Ro',
  content: 'Xe hỏng VÀ ốm CÙNG tháng — xác suất bao nhiêu? Rủi ro hiếm khi đến một mình.',
  diagramKey: 'DOMINO_RISK',
  theme: 'STANDARD'
}
```

---

### Slide 2 — DIAGRAM: "Sơ Đồ Cây"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card` full-width, `min-h-[420px]`.

**Cấu trúc SVG** (viewBox `0 0 800 400`):

**Tree diagram 2 tầng**:
- Root (100, 200): node "Tháng này"
- Tầng 1 — Xe:
  - Nhánh trên (300, 100): "Hỏng" (15%), edge đỏ, width proportional
  - Nhánh dưới (300, 300): "Không hỏng" (85%), edge xanh
- Tầng 2 — Sức khoẻ (từ mỗi nhánh tầng 1):
  - Từ "Hỏng":
    - (550, 50): "Ốm" → P = 0.15 × 0.05 = **0.75%** ← tô đỏ đậm
    - (550, 150): "Khoẻ" → P = 0.15 × 0.95 = 14.25%
  - Từ "Không hỏng":
    - (550, 250): "Ốm" → P = 0.85 × 0.05 = 4.25%
    - (550, 350): "Khoẻ" → P = 0.85 × 0.95 = **80.75%** ← tô xanh đậm

- Lá cuối: mỗi lá hiện P dạng % + icon kết hợp (🔧🤒, 🔧✅, ✅🤒, ✅✅)

**Animation**: Vẽ tree từ gốc → tầng 1 → tầng 2, stagger 0.5s mỗi tầng. Xác suất fade-in tại lá.

**Text**: 
> Sơ đồ cây cho thấy: P(cả 2 xảy ra) = P(xe hỏng) × P(ốm) = 0.15 × 0.05 = **0.75%**. Nhỏ — nhưng không phải 0.

**mockLessons data**:
```ts
{
  id: 's2', type: 'DIAGRAM', title: 'Sơ Đồ Cây',
  content: 'Sơ đồ cây giúp thấy rõ xác suất kết hợp của nhiều biến cố.',
  diagramKey: 'TREE_DIAGRAM',
  theme: 'STANDARD'
}
```

---

### Slide 3 — THEOREM: "Quy Tắc Cộng & Nhân"
**Slide type**: `THEOREM`
**Layout**: `theorem-plate`, 2 công thức stacked.

**Công thức 1 — Quy tắc nhân (AND)**:
- Badge: "A VÀ B cùng xảy ra"
- KaTeX: `$$P(A \cap B) = P(A) \times P(B) \quad \text{(khi A, B độc lập)}$$`
- Ví dụ: $P(\text{xe hỏng VÀ ốm}) = 0.15 \times 0.05 = 0.0075$

**Công thức 2 — Quy tắc cộng (OR)**:
- Badge: "A HOẶC B xảy ra"
- KaTeX: `$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$`
- Ví dụ: $P(\text{xe hỏng HOẶC ốm}) = 0.15 + 0.05 - 0.0075 = 0.1925$

**Note** (nhỏ, italic):
> Hai biến cố **độc lập** = xảy ra cái này không ảnh hưởng cái kia. Xe hỏng và ốm thường độc lập. Nhưng "trời mưa" và "đường trơn" thì **phụ thuộc** — bài 23 (Bayes) sẽ xử lý.

**mockLessons data**:
```ts
{
  id: 's3', type: 'THEOREM', title: 'Quy Tắc Cộng & Nhân',
  mathFormula: '$$P(A \\cap B) = P(A) \\times P(B)$$\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$',
  content: 'Nhân = cả hai cùng xảy ra. Cộng = ít nhất một xảy ra. Trừ phần giao để không đếm trùng.',
  theme: 'STANDARD'
}
```

---

### Slide 4 — MINIGAME: "Cỗ Máy Tháng"
**Slide type**: `MINIGAME`
**InteractionKey**: `MONTH_SIM`
**Component**: `MonthSim` (file mới)

**Triết lý thiết kế**: Không có slider tự do, không có đúng/sai về con số xác suất. Xác suất đã được **cố định trong kịch bản** (dựa trên dữ liệu thống kê). Người chơi học bằng cách **quan sát mô phỏng** và tự nhận ra quy luật.

**Kịch bản cố định** (không thay đổi được):
- P(xe hỏng/tháng) = **15%**
- P(ốm/tháng) = **5%**
- Hai biến cố độc lập

**Layout**: 2 cột.
- **Cột trái**: Panel điều khiển
  - Button "Mô phỏng 1 tháng" → chạy 1 trial, highlight kết quả
  - Button "Mô phỏng 100 tháng" → chạy nhanh
  - Counter: số tháng đã chạy
  - Bảng đếm 4 kết quả: 🔧🤒 | 🔧✅ | ✅🤒 | ✅✅
- **Cột phải**: Sơ đồ cây trực quan
  - Tree diagram 2 tầng (giống Slide 2)
  - Các xác suất lý thuyết được hiển thị sẵn
  - Sau mỗi trial, highlight nhánh kết quả tương ứng trong 1s
  - Sau 50+ trial, hiện cột **"Thực tế vs Lý thuyết"** cạnh nhau

**Điểm học tập tự nhiên** (không hỏi, tự hiện):
- Sau ~20 trial: hiện tooltip *"Chú ý: 🔧🤒 rất hiếm — đúng như P × P = 0.75%"*
- Sau ~50 trial: hiện tooltip *"Thực tế đang hội tụ về lý thuyết — đây là Luật số lớn!"*
- Sau ~100 trial: hiện insight *"Cứ 100 tháng, khoảng 1 tháng xảy ra cả xe hỏng lẫn ốm. Bạn đã chuẩn bị chưa?"*

**Điều kiện hoàn thành**: Chạy tối thiểu **50 mô phỏng**.

**mockLessons data**:
```ts
{
  id: 's4', type: 'MINIGAME', title: 'Cỗ Máy Tháng',
  content: 'Mô phỏng 50+ tháng ngẫu nhiên — xem tần suất thực tế có khớp với lý thuyết P(A∩B) không.',
  interactionKey: 'MONTH_SIM',
  variables: { minTrials: 50 }
}
```

---

### Slide 5 — INFO: "72% Bạn SẼ Gặp Sự Cố"
**Slide type**: `INFO`
**Layout**: `diagram-card`, text + mini calculation animated.

**Nội dung chính**:
> Nếu mỗi tháng P(có sự cố) = 10%, thì:
>
> P(cả năm yên ổn) = $(1 - 0.1)^{12} = 0.9^{12} \approx 0.283$
>
> **P(ít nhất 1 sự cố trong năm) = 1 - 0.283 = 71.7%**
>
> Gần ¾ khả năng bạn gặp sự cố trong năm. Quỹ khẩn cấp không phải "nếu" — mà là "khi nào".

**Diagram**: Lịch 12 tháng (grid 3×4). Animation: random tô đỏ 1-3 ô mỗi lần chạy (mỗi ô P=10%). Chạy 5 lần → thấy hầu hết đều có ít nhất 1 ô đỏ.

**mockLessons data**:
```ts
{
  id: 's5', type: 'INFO', title: '72% Bạn SẼ Gặp Sự Cố',
  content: 'P(ít nhất 1 rủi ro/năm) = 1 - 0.9^12 ≈ 72%. Quỹ khẩn cấp là PHẢI CÓ.',
  diagramKey: 'YEAR_RISK_CALENDAR',
  theme: 'STANDARD'
}
```

---

### Slide 6 — DIAGRAM: "Áo Giáp Tài Chính"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card` full-width.

**Cấu trúc**: So sánh 2 scenario song song:

**Bên trái — "Không có quỹ khẩn cấp"**:
- Timeline: Thu nhập 8tr → Chi tiêu 6tr → Tiết kiệm 2tr
- Tháng 5: ⚡ Sự cố 3tr → Khoản tiết kiệm bị rút → Phá vỡ kế hoạch Annuity
- Kết quả: Mục tiêu 30tr bị delay 6+ tháng

**Bên phải — "Có quỹ khẩn cấp 10tr"**:
- Timeline: Thu nhập 8tr → Chi tiêu 6tr → 1.5tr quỹ KK + 500k tiết kiệm
- Tháng 5: ⚡ Sự cố 3tr → Rút từ quỹ KK → Kế hoạch tiết kiệm KHÔNG bị ảnh hưởng
- Kết quả: Mục tiêu 30tr đúng hạn

**Animation**: 2 timeline chạy song song, đến tháng 5 cả hai gặp sự cố → kết quả khác nhau.

**mockLessons data**:
```ts
{
  id: 's6', type: 'DIAGRAM', title: 'Áo Giáp Tài Chính',
  content: 'Quỹ khẩn cấp 3-6 tháng chi tiêu = áo giáp chống domino rủi ro.',
  diagramKey: 'EMERGENCY_FUND_COMPARE',
  theme: 'STANDARD'
}
```

---

### Slide 7 — DECISION: "Chia Tiền Hàng Tháng"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`.

**Câu hỏi liên kết**: *(Nhắc lại Slide 5: P(sự cố/năm) = 72%. Slide 6: quỹ khẩn cấp là "áo giáp")*

**Câu hỏi**: *"Thu nhập 8tr/tháng. Chi tiêu 6tr. Còn 2tr. Bạn chia bao nhiêu cho quỹ khẩn cấp vs tiết kiệm dài hạn?"*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "1.5tr quỹ khẩn cấp + 500k tiết kiệm — ưu tiên an toàn" | "Sau 7 tháng bạn có 10.5tr quỹ KK — đủ 'áo giáp' 1.5 tháng chi tiêu. Tiết kiệm chậm hơn nhưng không bao giờ bị phá." | `💰 +5` `❤️ +10` `🧠 +5` `⚡ -5` |
| `c2` | "500k quỹ khẩn cấp + 1.5tr tiết kiệm — ưu tiên tăng trưởng" | "Lãi kép chạy mạnh! Nhưng quỹ KK cần 20 tháng mới đủ 10tr. Nếu sự cố đến sớm → phải rút tiết kiệm → mất lãi kép." | `💰 +10` `❤️ -5` `🧠 +5` `⚡ 0` |
| `c3` | "2tr tiết kiệm hết, quỹ KK = 0 — ALL-IN lãi kép" | "Compound interest mạnh thật! Nhưng 72% bạn sẽ gặp sự cố — lúc đó phải rút tiết kiệm + mất lãi + stress." | `💰 +15` `❤️ -10` `🧠 -10` `⚡ +5` |

**mockLessons data**:
```ts
{
  id: 's7', type: 'DECISION', title: 'Chia Tiền Hàng Tháng',
  content: 'Thu nhập 8tr, chi 6tr, còn 2tr. Bạn chia quỹ khẩn cấp vs tiết kiệm thế nào?',
  choices: [
    { id: 'c1', text: '1.5tr quỹ khẩn cấp + 500k tiết kiệm', feedback: '...', impact: { moneyDelta: 5, healthDelta: 10, moodDelta: 5, energyDelta: -5 } },
    { id: 'c2', text: '500k quỹ khẩn cấp + 1.5tr tiết kiệm', feedback: '...', impact: { moneyDelta: 10, healthDelta: -5, moodDelta: 5, energyDelta: 0 } },
    { id: 'c3', text: '2tr tiết kiệm hết, quỹ KK = 0', feedback: '...', impact: { moneyDelta: 15, healthDelta: -10, moodDelta: -10, energyDelta: 5 } },
  ]
}
```

---
---

## LESSON 14: BÀN CỜ TỔ HỢP (Hoán vị & Tổ hợp)

**Mục tiêu Toán**: Hoán vị $P(n,k) = \frac{n!}{(n-k)!}$, Tổ hợp $C(n,k) = \binom{n}{k}$, Tam giác Pascal.
**Mục tiêu Tài chính**: Bao nhiêu cách phân bổ tiền vào $k$ hạng mục từ $n$ lựa chọn?
**Tổng slides**: 7

---

### Slide 1 — STORY: "5 Cánh Cửa"
**Slide type**: `STORY`
**Layout**: `diagram-card`, `max-w-3xl`. Icon `Grid`.

**Nội dung**:
> Sau Bài 12-13, bạn biết: rủi ro là thật, quỹ khẩn cấp là phải có.
>
> Giờ câu hỏi mới: **Tiền tiết kiệm nên đặt ở đâu?**
>
> 5 hạng mục: Tiết kiệm ngân hàng, Cổ phiếu, Quỹ mở, Vàng, Bảo hiểm.
> Bạn muốn chọn 3. **Có bao nhiêu cách chọn?**
>
> Trực giác: "vài cách". Toán: chính xác **10 cách**.

**Diagram**: 5 cánh cửa (animated door), mỗi cửa label 1 hạng mục + icon. Khi click → mở ra. Bạn chỉ được mở 3.

**mockLessons data**:
```ts
{
  id: 's1', type: 'STORY', title: '5 Cánh Cửa',
  content: '5 hạng mục đầu tư, chọn 3. Có bao nhiêu cách? Trực giác nói "vài" — Toán nói "chính xác 10".',
  diagramKey: 'FIVE_DOORS',
  theme: 'STANDARD'
}
```

---

### Slide 2 — DIAGRAM: "Hoán Vị vs Tổ Hợp"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card` full-width, 2 panels.

**Panel trái — Hoán vị** (thứ tự QUAN TRỌNG):
- 3 ghế xếp hàng, 3 thẻ tên (A, B, C)
- Animation: shuffle 6 cách xếp (ABC, ACB, BAC, BCA, CAB, CBA)
- Label: "3 người vào 3 ghế = $3! = 6$ cách"

**Panel phải — Tổ hợp** (thứ tự KHÔNG quan trọng):
- 5 cards (5 hạng mục), chọn 3
- Animation: highlight 10 nhóm khác nhau (fade in/out)
- Label: "$C(5,3) = \frac{5!}{3!2!} = 10$ cách"

**Divider giữa**: Mũi tên lớn từ trái sang phải + text: *"Chia $k!$ vì thứ tự không quan trọng"*

**mockLessons data**:
```ts
{
  id: 's2', type: 'DIAGRAM', title: 'Hoán Vị vs Tổ Hợp',
  content: 'Hoán vị: thứ tự quan trọng. Tổ hợp: thứ tự không quan trọng. Chia k! để loại bỏ thứ tự.',
  diagramKey: 'PERMUTATION_VS_COMBINATION',
  theme: 'STANDARD'
}
```

---

### Slide 3 — THEOREM: "Công Thức Tổ Hợp & Tam Giác Pascal"
**Slide type**: `THEOREM`
**Layout**: `theorem-plate`, 2 cột.

**Cột trái**:
- Hoán vị: `$$P(n,k) = \frac{n!}{(n-k)!}$$`
- Tổ hợp: `$$C(n,k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$$`
- Quan hệ: $C(n,k) = \frac{P(n,k)}{k!}$

**Cột phải**: Tam giác Pascal mini (5 hàng):
```
        1
       1 1
      1 2 1
     1 3 3 1
    1 4 6 4 1
   1 5 10 10 5 1
```
- Highlight ô $C(5,3) = 10$
- Note: mỗi ô = tổng 2 ô phía trên

**mockLessons data**:
```ts
{
  id: 's3', type: 'THEOREM', title: 'Công Thức Tổ Hợp',
  mathFormula: '$$C(n,k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}$$',
  content: 'Tổ hợp = chọn k từ n, không quan tâm thứ tự. Tam giác Pascal chứa tất cả giá trị C(n,k).',
  theme: 'STANDARD'
}
```

---

### Slide 4 — MINIGAME: "Xây Tam Giác Pascal"
**Slide type**: `MINIGAME`
**InteractionKey**: `PASCAL_BUILDER`
**Component**: `PascalBuilder` (file mới)

**Layout**: Tam giác Pascal 7 hàng. Hàng 0-2 đã điền. Hàng 3-6: ô trống → click vào → nhập số.

**Mechanics**:
- Click ô trống → input popup
- Hint: "Mỗi ô = tổng 2 ô phía trên"
- Đúng → ô sáng xanh, spring animation
- Sai → rung + hint lại
- Khi điền xong hàng 5 → highlight $C(5,3) = 10$ + celebration

**onComplete**: Hoàn thành đến hàng 5.

**mockLessons data**:
```ts
{
  id: 's4', type: 'MINIGAME', title: 'Xây Tam Giác Pascal',
  content: 'Điền số vào Tam giác Pascal — mỗi ô = tổng 2 ô phía trên.',
  interactionKey: 'PASCAL_BUILDER',
  variables: { rows: 6 }
}
```

---

### Slide 5 — INFO: "56 Cách Chọn Cổ Phiếu"
**Slide type**: `INFO`
**Layout**: `diagram-card`, text + ví dụ animated.

**Nội dung**:
> Ứng dụng thực tế: có 8 cổ phiếu tiềm năng, bạn muốn mua 3.
>
> $C(8,3) = \frac{8!}{3!5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$ cách.
>
> 56 portfolio khác nhau! Toán giúp **đếm** — nhưng $E(X)$ và $\sigma$ (Bài 16, 19) sẽ giúp **chọn**.

**Diagram**: Grid 56 ô nhỏ, mỗi ô = 1 combo (3 icon cổ phiếu). Highlight 3 combo "tốt nhất" (random, sẽ giải thích sau).

**mockLessons data**:
```ts
{
  id: 's5', type: 'INFO', title: '56 Cách Chọn Cổ Phiếu',
  content: 'C(8,3) = 56 portfolio khác nhau. Toán đếm — E(X) và σ chọn.',
  theme: 'STANDARD'
}
```

---

### Slide 6 — MINIGAME: "Xây Portfolio"
**Slide type**: `MINIGAME`
**InteractionKey**: `COMBO_BUILDER`
**Component**: `ComboBuilder` (file mới)

**Layout**: 5 cards hạng mục (chọn 3 bằng click/toggle). Panel kết quả bên phải hiện E(X) và σ ước tính.

**5 hạng mục** (simplified):
| Hạng mục | E (annual) | σ |
|----------|-----------|---|
| 🏦 Tiết kiệm | 5% | 1% |
| 📈 Cổ phiếu | 12% | 20% |
| 📊 Quỹ mở | 8% | 10% |
| 🥇 Vàng | 6% | 15% |
| 🛡️ Bảo hiểm | 4% | 2% |

**Hiển thị kết quả**: Weighted average E, approximate σ (simplified), "rating" (⭐ đến ⭐⭐⭐⭐⭐).

**onComplete**: Chọn bất kỳ combo nào + click "Xác nhận".

**mockLessons data**:
```ts
{
  id: 's6', type: 'MINIGAME', title: 'Xây Portfolio',
  content: 'Chọn 3 từ 5 hạng mục đầu tư — xem E(X) và σ của combo.',
  interactionKey: 'COMBO_BUILDER',
  variables: { pick: 3 }
}
```

---

### Slide 7 — DECISION: "Combo Cho 5 Năm Tới"
**Slide type**: `DECISION`

**Câu hỏi liên kết**: *(Nhắc lại Slide 6: bạn vừa thử 10 combo, giờ chọn 1 cho kế hoạch thật)*

**Câu hỏi**: *"3 combo tốt nhất từ minigame — bạn chọn combo nào cho kế hoạch tài chính 5 năm tới?"*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Tiết kiệm + Vàng + Bảo hiểm — E thấp, σ cực thấp" | "An toàn tuyệt đối. E ≈ 5%, σ ≈ 5%. Tiền không mất, nhưng cũng không tăng nhanh. Hợp với mục tiêu ngắn hạn (1-3 năm)." | `💰 +5` `❤️ +10` `🧠 +5` `⚡ 0` |
| `c2` | "Tiết kiệm + Cổ phiếu + Quỹ mở — E vừa, σ vừa" | "Cân bằng! E ≈ 8.3%, σ ≈ 10%. Có thể dao động nhưng dài hạn tốt. Hợp 5-10 năm." | `💰 +10` `❤️ +5` `🧠 +10` `⚡ 0` |
| `c3` | "Cổ phiếu + Quỹ mở + Vàng — E cao, σ cao" | "Aggressive! E ≈ 8.7%, σ ≈ 15%. Có thể lãi lớn hoặc lỗ nặng ngắn hạn. Chỉ hợp nếu bạn không cần rút trong 7+ năm." | `💰 +15` `❤️ -5` `🧠 +5` `⚡ -5` |

**mockLessons data**:
```ts
{
  id: 's7', type: 'DECISION', title: 'Combo Cho 5 Năm Tới',
  content: '3 combo tốt nhất — bạn chọn nào cho kế hoạch 5 năm?',
  choices: [
    { id: 'c1', text: 'Tiết kiệm + Vàng + Bảo hiểm — an toàn', feedback: '...', impact: { moneyDelta: 5, healthDelta: 10, moodDelta: 5, energyDelta: 0 } },
    { id: 'c2', text: 'Tiết kiệm + Cổ phiếu + Quỹ mở — cân bằng', feedback: '...', impact: { moneyDelta: 10, healthDelta: 5, moodDelta: 10, energyDelta: 0 } },
    { id: 'c3', text: 'Cổ phiếu + Quỹ mở + Vàng — tấn công', feedback: '...', impact: { moneyDelta: 15, healthDelta: -5, moodDelta: 5, energyDelta: -5 } },
  ]
}
```
