# CHƯƠNG 1: KHỞI ĐỘNG HỆ THỐNG — Design Chi Tiết
*3 Lessons | Dãy số & Cấp Số Cộng | Kinh tế: Tiết kiệm cơ bản*

---

## LESSON 1: NHẬT KÝ DÒNG TIỀN (Khái niệm Dãy số)

**Mục tiêu Toán**: Hiểu Dãy số $(u_n)$, chỉ số $n$, quy luật dãy.
**Mục tiêu Tài chính**: Ghi chép thu chi hàng tháng.
**Tổng slides**: 6

---

### Slide 1 — DIAGRAM: "Dòng Tiền Là Gì?"
**Slide type**: `DIAGRAM` — Custom SVG component, không dùng component có sẵn trong registry.
**Layout**: `diagram-card` full-width, `min-h-[420px]`, nền `var(--canvas-card)`.

**Components sử dụng**: `StickFigure`, `FlowArrow`, `FlowNode`, `NumberOdometer`, `DiagramLabel`

**Cấu trúc SVG** (viewBox `0 0 800 400`):
- Trung tâm (400, 200): `StickFigure` pose `standing`, scale 1.2
- Trái (80, 200): `FlowNode` rect, label "LƯƠNG", color `var(--money)`
  - `FlowArrow` từ (80,200) → (340,200), color `var(--money)`, label "8tr", animated dot chạy dọc
- Phải — 4 `FlowArrow` tỏa ra từ (460, 200) đến 4 node:
  - (700, 80): `FlowNode` rect "Ăn uống", label "2.5tr", color `var(--debt)`
  - (700, 160): `FlowNode` rect "Đi lại", label "1tr", color `var(--debt)`
  - (700, 240): `FlowNode` rect "Giải trí", label "1.5tr", color `var(--debt)`
  - (700, 320): `FlowNode` rect "Khác", label "1tr", color `var(--debt)`
- Dưới figure (400, 340): `FlowNode` rect, nền `var(--money-light)`, viền `var(--money)`
  - Bên trong: `NumberOdometer` đếm 8000 → 2000, suffix "k", color `var(--money)`
- (400, 380): `DiagramLabel` text "Tháng 1 — bạn còn 2 triệu", font Caveat

**Animation sequence** (dùng Framer `useAnimation` + `sequence`):
1. **(0s)** StickFigure draw-on: `drawLine` preset, duration 1.2s
2. **(1.2s)** FlowArrow trái: `drawLine` 0.8s + FlowNode "LƯƠNG" fade-in 0.3s
3. **(2.0s)** 4 FlowArrow phải: stagger 0.2s mỗi cái, `drawLine` 0.6s + label `fadeUpLabel` 0.3s
4. **(3.5s)** Node "Còn lại": scale `[0, 1]` spring + NumberOdometer đếm từ 8000→2000 (1s)
5. **(4.5s)** DiagramLabel: `fadeUpLabel` preset

**Text dưới diagram** (trong `diagram-card`, `pl-5`):
> Mỗi tháng, tiền vào → tiền ra → còn lại một con số. Ghi lại con số đó, bạn có một **chuỗi số theo thời gian**.

**mockLessons data**:
```ts
{
  id: 's1', type: 'DIAGRAM', title: 'Dòng Tiền Là Gì?',
  content: 'Mỗi tháng, tiền vào → tiền ra → còn lại một con số...',
  diagramKey: 'CASHFLOW_FLOW',  // Component riêng render SVG trên
  theme: 'STANDARD'
}
```

---

### Slide 2 — DIAGRAM: "Chuỗi Số = Dãy Số"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card` full-width, `min-h-[350px]`.

**Components**: `FlowDiagram` (dùng `buildChain`), `DiagramLabel`, `AnimatedPath`

**Cấu trúc**: `FlowDiagram` chain ngang 6 nodes:
```ts
const nodes = [
  { id: 't1', label: '2tr',   x: 80,  y: 120, shape: 'rect', color: 'var(--money)' },
  { id: 't2', label: '1.8tr', x: 200, y: 120, shape: 'rect', color: 'var(--money)' },
  { id: 't3', label: '2.5tr', x: 320, y: 120, shape: 'rect', color: 'var(--money)' },
  { id: 't4', label: '1.2tr', x: 440, y: 120, shape: 'rect', color: 'var(--money)' },
  { id: 't5', label: '3tr',   x: 560, y: 120, shape: 'rect', color: 'var(--money)' },
  { id: 't6', label: '2tr',   x: 680, y: 120, shape: 'rect', color: 'var(--money)' },
];
```
- Label dưới mỗi node: "T1"..."T6", font mono `0.7rem`, color `var(--ink-secondary)`, `fadeUpLabel` stagger 0.15s
- Dấu ngoặc SVG: `AnimatedPath` cong bao quanh cả 6 nodes (y: 60→180), stroke `var(--formula)`, `drawLine` delay 1.5s
- Label ngoặc: "$(u_n)$ — Dãy Số", color `var(--formula)`, font bold 1.1rem
- Mũi tên chỉ vào T3: `DiagramLabel` text "$u_3 = 2.5$ triệu = Số hạng thứ 3", position `bottom`, delay 2s

**Text**: (bên dưới diagram, `pl-5`)
> Trong Toán học, khi ta xếp các con số theo thứ tự $u_1, u_2, u_3, ..., u_n$ — đó là một **Dãy Số**. Chỉ số $n$ ở đây chính là **tháng thứ mấy**.

---

### Slide 3 — INFO: "Quy Luật Ẩn Sau Dãy Số"
**Slide type**: `INFO`
**Layout**: `diagram-card`, grid 2 cột `lg:grid-cols-[1fr_1fr]`, gap `2rem`.

**Cột trái — Text** (`pl-5`):
> Không phải dãy số nào cũng ngẫu nhiên. Nhiều dãy có **quy luật**:
> - Nếu mỗi tháng bạn tiết kiệm thêm đúng 500k → dãy tăng đều
> - Nếu bạn chi tiêu gấp đôi mỗi tháng → dãy tăng nhanh khủng khiếp
>
> Phát hiện quy luật = **sức mạnh của Toán học**.

**Cột phải — Mini chart**: `CoordinateSystem` nhỏ (250×200px) + 2 `DataCurve`:
```ts
// Đường tăng đều (CSC)
<DataCurve fn={(x) => 500 + x * 500} range={[0, 6]} color="var(--money)" label="Tăng đều" />
// Đường tăng mũ
<DataCurve fn={(x) => 500 * Math.pow(1.5, x)} range={[0, 6]} color="var(--debt)" label="Gấp đôi" />
```
- Cả 2 đường dùng `drawLine` animation, đường đỏ delay thêm 0.5s
- Trục X label "Tháng", trục Y label "VNĐ (k)"

---

### Slide 4 — MINIGAME: "Nhập Dòng Tiền 3 Tháng"
**Slide type**: `MINIGAME`
**InteractionKey**: `CASHFLOW_INPUT`
**Component**: `CashflowInput` (file mới: `src/components/interactions/CashflowInput.tsx`)

> Chi tiết thiết kế component → xem **COMPONENTS.md § 4b — CashflowInput**

**mockLessons data**:
```ts
{
  id: 's4', type: 'MINIGAME', title: 'Nhập Dòng Tiền 3 Tháng',
  content: 'Thử nhập thu chi của bạn trong 3 tháng.',
  interactionKey: 'CASHFLOW_INPUT',
  variables: { months: 3, currency: 'k' }
}
```

**Validation**: Chấp nhận mọi số dương. Không có đáp án sai — mục đích là trải nghiệm tạo dãy số.

---

### Slide 5 — THEOREM: "Ký Hiệu Dãy Số"
**Slide type**: `THEOREM`
**Layout**: `theorem-plate`, grid 2 cột `lg:flex-row`.

**Cột trái — Giải thích** (text trắng, `rgba(255,255,255,0.82)`):
> - $u_1$ = giá trị đầu tiên (tháng 1)
> - $u_n$ = giá trị tại vị trí thứ $n$
> - $n$ = chỉ số thứ tự (ở đây = tháng)

**Cột phải — Công thức**: Card nền `rgba(255,255,255,0.05)`, viền `rgba(255,255,255,0.12)`
- Badge: "PHƯƠNG TRÌNH CỐT LÕI"
- KaTeX: `$$u_n \text{ — Số hạng thứ } n \text{ của dãy}$$`
- Bên dưới công thức: `FlowDiagram` chain mini
  ```ts
  buildChain(['u₁', 'u₂', 'u₃', '...', 'uₙ'], { arrowLabel: '?' })
  ```
  - Nodes color `var(--time-var)`, label "?" trên mỗi mũi tên = mystery → lesson tiếp theo sẽ giải đáp

**mockLessons data**:
```ts
{
  id: 's5', type: 'THEOREM', title: 'Ký Hiệu Dãy Số',
  mathFormula: '$$u_n \\text{ — Số hạng thứ } n \\text{ của dãy}$$',
  content: '$u_1$ = giá trị đầu tiên. $u_n$ = giá trị tại vị trí thứ $n$. $n$ = chỉ số thứ tự.',
  theme: 'STANDARD'
}
```

---

### Slide 6 — DECISION: "Tháng Này Bạn Còn 2 Triệu"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Câu hỏi liên kết**: *(Nhắc lại sơ đồ dòng tiền Slide 1: Lương 8tr → Chi tiêu 6tr → Còn lại **2 triệu**)*

**Câu hỏi**: *"2 triệu còn lại sau tháng đầu tiên — bạn sẽ để nó ở đâu tối nay?"*

**Hint text** (nhỏ, italic, `var(--ink-faint)`): *Bạn vừa học rằng con số này là $u_1$ của dãy tiết kiệm. Bước tiếp theo quyết định $u_2$.*

**Choices** (dùng `ChoiceButton` style — viền `var(--grid-line)`, hover shift-right 4px):

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Chuyển ngay vào tài khoản riêng, không đụng vào" | "Bạn đã tạo ra $u_1 = 2$ triệu. Dãy số bắt đầu! Tháng sau bạn sẽ so sánh được ngay." | `💰 +10` `❤️ 0` `🧠 +5` `⚡ -5` |
| `c2` | "Để trong ví, lỡ cuối tháng cần thì tiêu dần" | "An toàn, nhưng tiền trong ví hay 'tự biến mất'. Tháng sau $u_2$ có thể thấp hơn $u_1$ mà không rõ lý do." | `💰 -5` `❤️ +5` `🧠 -5` `⚡ +5` |
| `c3` | "Rủ bạn đi ăn để ăn mừng tháng đầu tiên ghi sổ" | "Tinh thần lên cao! Nhưng $u_1$ giảm còn khoảng 1.2 triệu. Dãy số của bạn bắt đầu khác kế hoạch rồi." | `💰 -15` `❤️ +5` `🧠 +5` `⚡ 0` |

**mockLessons data**:
```ts
{
  id: 's6', type: 'DECISION', title: 'Tháng Này Bạn Còn 2 Triệu',
  content: '2 triệu còn lại sau tháng đầu tiên — bạn sẽ để nó ở đâu tối nay?',
  choices: [
    { id: 'c1', text: 'Chuyển ngay vào tài khoản riêng, không đụng vào', feedback: '...', impact: { moneyDelta: 10, healthDelta: 0, mentalDelta: 5, energyDelta: -5 } },
    { id: 'c2', text: 'Để trong ví, lỡ cuối tháng cần thì tiêu dần', feedback: '...', impact: { moneyDelta: -5, healthDelta: 5, mentalDelta: -5, energyDelta: 5 } },
    { id: 'c3', text: 'Rủ bạn đi ăn để ăn mừng tháng đầu tiên ghi sổ', feedback: '...', impact: { moneyDelta: -15, healthDelta: 5, mentalDelta: 5, energyDelta: 0 } },
  ]
}
```

---
---

## LESSON 2: XẾP THÁP BLOCK (Số hạng tổng quát CSC)

**Mục tiêu Toán**: Công thức $u_n = u_1 + (n-1)d$
**Mục tiêu Tài chính**: Tiết kiệm cố định hàng tháng (ống heo, không lãi).
**Tổng slides**: 7

---

### Slide 1 — STORY: "Ống Heo Của Bạn"
**Slide type**: `STORY`
**Layout**: `diagram-card`, `max-w-3xl`, center. Icon `BookOpen` + accent bar trái.

**Text** (`pl-5`, font `1.125rem`, color `var(--ink-secondary)`):
> Tưởng tượng bạn quyết định: **mỗi tháng bỏ đúng 500.000đ vào ống heo**. Không rút, không thêm, không lãi suất — chỉ bỏ đều đặn.
>
> Sau 1 tháng: 500k. Sau 2 tháng: 1 triệu. Sau 3 tháng: 1.5 triệu...
>
> Đây không còn là dãy số ngẫu nhiên nữa. Đây là dãy có **quy luật cộng đều**.

**Diagram phụ** (bên dưới text, trong cùng `diagram-card`):
- SVG piggy bank đơn giản (stroke `var(--ink-primary)`, fill `var(--money-light)`)
- 3 `CoinIcon` rơi vào piggy bank: `blockDrop` preset, stagger 0.4s
- `NumberOdometer` bên cạnh: đếm 500 → 1000 → 1500, suffix "k", color `var(--money)`

**mockLessons data**:
```ts
{ id: 's1', type: 'STORY', title: 'Ống Heo Của Bạn',
  content: 'Tưởng tượng bạn quyết định: **mỗi tháng bỏ đúng 500.000đ vào ống heo**...', theme: 'STANDARD' }
```

---

### Slide 2 — DIAGRAM: "Bậc Thang Tăng Đều"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card` full-width, `min-h-[400px]`.

**Components**: `CoordinateSystem`, `StackingBlocks`-style divs, `AnimatedPath`, `DiagramLabel`

**Cấu trúc**:
- `CoordinateSystem` (viewBox `0 0 600 300`):
  - Trục X: label "Tháng", ticks T1–T5, `drawLine` 0.8s
  - Trục Y: label "VNĐ (k)", range 0–3000, `drawLine` 0.8s delay 0.3s
- 5 blocks xếp bậc thang tại T1–T5:
  - Block i: height tỷ lệ với `u_i = 500 + (i-1)*500`, width `60px`
  - Nền `var(--money-light)`, viền `1px solid var(--money)`, `rounded-t-sm`
  - Animation: `blockDrop` preset, stagger `0.2s` (delay = `0.8 + i*0.2`s)
  - Label trên block: `u_i` value, font mono `0.65rem`
- Đường chéo nối đỉnh 5 blocks: `AnimatedPath` draw-on, stroke `var(--time-var)`, delay 2s, `strokeDasharray: "4 4"`
- Giữa block i và block i+1: mũi tên đỏ nhỏ, label "+d", `fadeUpLabel` stagger

**DiagramLabel**: *"Mỗi bậc cao hơn bậc trước đúng $d$ = 500k"*, font Caveat, delay 2.5s

---

### Slide 3 — THEOREM: "Công Thức Cấp Số Cộng"
**Slide type**: `THEOREM`
**Layout**: `theorem-plate`, 2 cột `lg:flex-row`.

**Cột trái — Giải thích**:
> - $u_1$ = số tiền tháng đầu tiên (giá trị khởi tạo)
> - $d$ = số tiền thêm mỗi tháng (công sai — khoảng cách đều)
> - $n$ = tháng thứ mấy
> - $u_n$ = tổng tiền trong ống heo tại tháng $n$

**Cột phải — Công thức**:
- Badge: "PHƯƠNG TRÌNH CỐT LÕI"
- KaTeX: `$$u_n = u_1 + (n-1) \cdot d$$`
- Bên dưới: `FlowDiagram` chain:
  ```ts
  buildChain(['u₁', 'u₂', 'u₃', '...', 'uₙ'], { arrowLabel: '+d', color: 'var(--money)' })
  ```
  Nodes `var(--money)`, arrows draw-on tuần tự, label "+d" `fadeUpLabel`

**mockLessons data**:
```ts
{ id: 's3', type: 'THEOREM', title: 'Công Thức Cấp Số Cộng',
  mathFormula: '$$u_n = u_1 + (n-1) \\cdot d$$',
  content: '$u_1$ = giá trị khởi tạo. $d$ = công sai. $n$ = tháng thứ mấy.', theme: 'STANDARD' }
```

---

### Slide 4 — INFO: "Giải Mã Công Thức"
**Slide type**: `INFO`
**Layout**: `diagram-card`, 2 cột — text trái, diagram phải.

**Text trái**:
> **Ví dụ**: $u_1 = 500k$, $d = 500k$. Hỏi tháng thứ 12 có bao nhiêu?
>
> $u_{12} = 500 + (12-1) \times 500 = 500 + 5500 = 6000$ (nghìn đồng) = **6 triệu**

**Diagram phải**: 12 blocks bậc thang (cùng style slide 2):
- Blocks 1–11: stagger nhanh `0.05s`, nền `var(--money-light)`, opacity 0.7
- Block 12: delay thêm 0.3s, nền `var(--interest)` (vàng), `pulse` animation 2 lần
- Label block 12: "6tr", font mono bold, color `var(--interest)`, `drop-shadow` nhẹ

---

### Slide 5 — MINIGAME: "Xếp Tháp Block"
**Slide type**: `MINIGAME`
**InteractionKey**: `STACKING_BLOCKS`
**Component**: `BentoStacker` (đã có trong `Simulators.tsx`, cần nâng cấp)

**Nâng cấp cần thiết so với component hiện tại**:
1. Thêm **Slider u₁** (hiện chỉ có n và d): range 100k–2tr, step 100k, color `emerald`
2. Block height = `u₁ + i*d` thay vì `(i+1)*d` (để phản ánh đúng công thức CSC)
3. Mỗi block có label số tiền: font mono `0.6rem`, centered
4. `NumberOdometer` phía trên: hiển thị `u_n` real-time, suffix "k"
5. `AnimatedPath` đường chéo nối đỉnh blocks

**Câu hỏi cuối** (trong cùng component):
- Text: "Nếu $u_1=200k$, $d=300k$, tìm $u_{10}$?"
- `ActionInput` underline, placeholder "Nhập đáp án (k)"
- Đáp án: 2900 → `200 + 9×300 = 2900k`
- Đúng → block 10 glow `var(--money)` + `onComplete(true, 100)`
- Sai → `ErrorShake`

**mockLessons data**:
```ts
{ id: 's5', type: 'MINIGAME', title: 'Xếp Tháp Block',
  content: 'Kéo slider để xây tháp tiết kiệm.',
  interactionKey: 'STACKING_BLOCKS',
  variables: { blocks: 5, showQuestion: true, u1: 500, d: 500 } }
```

---

### Slide 6 — DIAGRAM: "Tại Sao Gọi Là Cấp Số CỘNG?"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card`, grid 2 cột `lg:grid-cols-2`, gap `2rem`.

**Cột trái — "Dãy số BẤT KỲ"**:
- 5 blocks chiều cao lộn xộn: `[3, 7, 2, 9, 1]` (scale ×20px)
- Nền `var(--grid-line)`, viền `var(--ink-faint)`, opacity 0.6
- Label trên: "Dãy số BẤT KỲ", font bold, color `var(--ink-secondary)`

**Cột phải — "Cấp số CỘNG"**:
- 5 blocks bậc thang hoàn hảo: `[2, 4, 6, 8, 10]` (scale ×20px)
- Nền gradient `var(--money-light)` → `var(--money)`, viền `var(--money)`
- Label trên: "Cấp số CỘNG", font bold, color `var(--money)`
- Mũi tên "+2" giữa mỗi cặp block: `FlowArrow`, color `var(--debt)`, `drawLine` stagger

**Label kết luận** (dưới cùng, centered):
*"CỘNG vì mỗi bước ta CỘNG thêm đúng $d$"* — font Caveat `1.1rem`, color `var(--ink-label)`

---

### Slide 7 — DECISION: "Tiền Tiêu Vặt Hay Ống Heo?"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Câu hỏi liên kết**: *(Nhắc lại: ống heo trong Slide 1 — bỏ đều 500k/tháng → tháp block tăng dần)*

**Câu hỏi**: *"Hôm nay mẹ cho thêm 500k tiêu vặt. Bạn vừa học xong công thức $u_n = u_1 + (n-1)d$. Bạn sẽ làm gì với 500k đó?"*

**Hint text** (nhỏ, italic, `var(--ink-faint)`): *Nếu bỏ vào ống heo mỗi tháng, đây chính là $d$ trong công thức.*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Bỏ vào ống heo ngay — $d = 500k$, 10 tháng ra 5 triệu" | "Bạn đã biến lý thuyết thành hành động! $u_{10} = 500 + 9 \times 500 = 5000k$. Tháp block bắt đầu xếp rồi." | `💰 +10` `❤️ 0` `🧠 +5` `⚡ 0` |
| `c2` | "Mua đồ ăn vặt + đồ dùng học tập còn thiếu" | "Chi tiêu có mục đích. Nhưng tháng này $d = 0$, tháp block của bạn không cao thêm được." | `💰 -5` `❤️ +5` `🧠 0` `⚡ +5` |
| `c3` | "Rủ cả nhóm đi cà phê, split bill" | "Giờ học xong cần giải trí thôi mà! 500k bay hết nhưng mood cả nhóm lên cao. Tháng sau tính lại." | `💰 -10` `❤️ +5` `🧠 -5` `⚡ +5` |

---
---

## LESSON 3: LẬT NGƯỢC BẬC THANG (Tổng CSC — Định lý Gauss)

**Mục tiêu Toán**: $S_n = \frac{n(u_1 + u_n)}{2}$
**Mục tiêu Tài chính**: Tính tổng tiền tích góp để đạt mục tiêu mua sắm.
**Tổng slides**: 8

---

### Slide 1 — STORY: "Vé Concert 2 Triệu"
**Slide type**: `STORY`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Text**:
> Bạn muốn mua vé Concert Sơn Tùng MTP — giá **2 triệu đồng**.
> Bạn quyết định tiết kiệm tăng dần: tháng 1 bỏ 200k, tháng 2 bỏ 300k, tháng 3 bỏ 400k...
>
> Câu hỏi: **tổng cộng sau bao nhiêu tháng thì đủ 2 triệu?**

**Diagram phụ** (dưới text):
- SVG vé concert đơn giản (rect `200×80`, `rounded-lg`, nền gradient `var(--formula-light)` → `var(--formula)`)
- Price tag: "2.000.000đ", font mono bold, color white
- Progress bar bên dưới: track `var(--grid-line)`, fill `0%`, label "0 / 2.000k"

**mockLessons data**:
```ts
{ id: 's1', type: 'STORY', title: 'Vé Concert 2 Triệu',
  content: 'Bạn muốn mua vé Concert — giá **2 triệu đồng**...', theme: 'STANDARD' }
```

---

### Slide 2 — DIAGRAM: "Diện Tích Bậc Thang = Tổng"
**Slide type**: `DIAGRAM`
**Layout**: `diagram-card`, `min-h-[380px]`.

**Components**: `CoordinateSystem`, blocks (HTML divs), `AnimatedPath` (fill), `NumberOdometer`

**Cấu trúc**:
- 5 blocks bậc thang (cùng style L2-S2), xuất hiện **instant** (không animate lại)
- Fill animation: mỗi block từ từ được fill màu `var(--money-light)` từ dưới lên
  - Framer: `clipPath: inset(100% 0 0 0)` → `inset(0)`, stagger 0.3s, duration 0.5s
- `DiagramLabel` bên phải: *"Diện tích = Tổng $S_5$"*, delay 2s
- `NumberOdometer` (absolute top-right): đếm tổng `200+300+400+500+600 = 2000`, suffix "k"

**Text dưới**: *"Nhưng nếu có 100 bậc thì sao? Cộng tay 100 số? Gauss 10 tuổi đã tìm ra cách..."*

---

### Slide 3 — DIAGRAM: "Mẹo Gauss — Lật Ngược"
**Slide type**: `DIAGRAM` — **ANIMATION CHÍNH CỦA LESSON 3**
**Layout**: `diagram-card`, `min-h-[450px]`, center.
**Component riêng**: `GaussFlipDiagram` (custom, cần tạo mới)

**Cấu trúc SVG** (viewBox `0 0 700 350`):
- Tháp 5 blocks xanh lá, xếp ngang tại y=250 (gốc dưới), mỗi block width=60px:
  - Block i: height = `40 + i*40`px, fill `var(--money-light)`, stroke `var(--money)`
- Bản sao đỏ: clone cùng hình dạng, fill `var(--debt-light)`, stroke `var(--debt)`

**Animation sequence** (Framer `useAnimation` + `async/await`):
1. **(0s)** Tháp xanh xuất hiện tại x=100: `blockDrop` stagger 0.15s
2. **(1.2s)** Clone tháp đỏ xuất hiện tại x=400: fade-in 0.5s
3. **(2s)** Tháp đỏ lật 180°: `rotateX: [0, 180]`, duration 1.2s, ease `easeInOut`
4. **(3.5s)** Tháp đỏ trượt sang trái: `x: [400, 100]`, duration 0.8s, ease `easeOut`
5. **(4.5s)** Merge: cả 2 tạo hình chữ nhật. Dimension labels `fadeUpLabel`:
   - Chiều rộng: "$n$ cột" (dưới), chiều cao: "$u_1 + u_n$" (bên trái)
6. **(5.5s)** Label trung tâm: *"Diện tích = $n × (u_1 + u_n)$. Nhưng ta chỉ cần NỬA → chia 2!"*
7. **(6.5s)** Nửa đỏ opacity → 0.2, nửa xanh `drop-shadow(0 0 12px var(--money))` 1.5s

---

### Slide 4 — THEOREM: "Công Thức Tổng"
**Slide type**: `THEOREM`
**Layout**: `theorem-plate`, 2 cột `lg:flex-row`.

**Cột trái — Giải thích**:
> - $n$ = số lượng số hạng (số tháng)
> - $u_1$ = số hạng đầu
> - $u_n$ = số hạng cuối
> - $S_n$ = tổng của $n$ số hạng đầu tiên

**Cột phải — Công thức**:
- Badge: "PHƯƠNG TRÌNH CỐT LÕI"
- KaTeX: `$$S_n = \frac{n(u_1 + u_n)}{2}$$`
- Diagram mini: SVG rect `120×80`, chia đôi đường chéo:
  - Nửa dưới-trái: fill `var(--money-light)`, label "$S_n$"
  - Nửa trên-phải: fill `var(--debt-light)`, opacity 0.3

**mockLessons data**:
```ts
{ id: 's4', type: 'THEOREM', title: 'Công Thức Tổng',
  mathFormula: '$$S_n = \\frac{n(u_1 + u_n)}{2}$$',
  content: '$n$ = số tháng. $u_1$ = số hạng đầu. $u_n$ = số hạng cuối.', theme: 'STANDARD' }
```

---

### Slide 5 — INFO: "Giải Bài Vé Concert"
**Slide type**: `INFO`
**Layout**: `diagram-card`, 2 cột.

**Text trái**:
> Quay lại: $u_1 = 200k$, $d = 100k$. Cần $S_n \geq 2000k$.
>
> Thử $n = 5$: $S_5 = \frac{5 \times (200 + 600)}{2} = \frac{5 \times 800}{2} = 2000k$ ✅
>
> **Sau đúng 5 tháng, bạn có đủ 2 triệu mua vé!**

**Diagram phải**:
- Progress bar animate `0%→100%`, duration 1.5s, fill `var(--money)`
- Khi đạt 100%: vé concert SVG (từ slide 1) glow `drop-shadow(0 0 16px var(--formula))` + scale pop `1→1.05→1`
- `NumberOdometer` dưới bar: đếm 0 → 2000, suffix "k"

---

### Slide 6 — MINIGAME: "Gauss Challenge"
**Slide type**: `MINIGAME`
**InteractionKey**: `GAUSS_CHALLENGE`
**Component**: `GaussChallenge` (file mới: `src/components/interactions/GaussChallenge.tsx`)

> Chi tiết thiết kế component → xem **COMPONENTS.md § 4b — GaussChallenge**

**mockLessons data**:
```ts
{ id: 's6', type: 'MINIGAME', title: 'Gauss Challenge',
  content: 'Tính nhanh tổng 1 + 2 + 3 + ... + 100',
  interactionKey: 'GAUSS_CHALLENGE',
  variables: { n: 100, answer: 5050 } }
```

---

### Slide 7 — MINIGAME: "Lập Kế Hoạch Tiết Kiệm"
**Slide type**: `MINIGAME`
**InteractionKey**: `SAVINGS_PLANNER`
**Component**: `SavingsPlanner` (file mới: `src/components/interactions/SavingsPlanner.tsx`)

> Chi tiết thiết kế component → xem **COMPONENTS.md § 4b — SavingsPlanner**

**mockLessons data**:
```ts
{ id: 's7', type: 'MINIGAME', title: 'Lập Kế Hoạch Tiết Kiệm',
  content: 'Thiết lập mục tiêu và xem bao lâu bạn sẽ đạt được.',
  interactionKey: 'SAVINGS_PLANNER',
  variables: { defaultTarget: 5000, defaultU1: 200, defaultD: 100 } }
```

---

### Slide 8 — DECISION: "Vé Concert = Bao Nhiêu Tháng?"
**Slide type**: `DECISION`
**Layout**: `diagram-card`, `max-w-3xl`, center.

**Câu hỏi liên kết**: *(Nhắc lại bài toán vé concert Slide 1: cần 2 triệu, tiết kiệm tăng dần 200k→300k→...)*

**Câu hỏi**: *"Bạn vừa tính ra: tiết kiệm tăng dần 5 tháng là đủ tiền vé concert. Nhưng tháng 1 bạn chỉ có thể bỏ được 100k thôi. Bạn chọn cách nào?"*

**Hint text** (nhỏ, italic, `var(--ink-faint)`): *$S_5 = \frac{5 \times (u_1 + u_5)}{2} = 2000k$. Nếu $u_1 = 100k$, cần tính lại $n$.*

**Choices**:

| id | text | feedback | impact |
|----|------|----------|--------|
| `c1` | "Bắt đầu 100k tháng này, tăng dần — dù phải đợi thêm 1-2 tháng" | "Thực tế và bền vững. $u_1 = 100k$, $d = 100k$ → cần $n = 6$ tháng thay vì 5. Concert vẫn đến được!" | `💰 +5` `❤️ 0` `🧠 +10` `⚡ 0` |
| `c2` | "Vay bạn bè 500k để tháng đầu bỏ đủ 200k, hoàn lại sau" | "Đảm bảo 5 tháng đúng kế hoạch, nhưng nợ là biến số ngoài công thức — nếu quên trả thì sao?" | `💰 -10` `❤️ -5` `🧠 0` `⚡ -5` |
| `c3` | "Thôi kệ, chờ ai resell vé giá rẻ hơn" | "Rủi ro cao — vé hot thường không giảm giá. Và bạn đã bỏ qua cơ hội luyện thói quen tiết kiệm có kế hoạch." | `💰 0` `❤️ +5` `🧠 -10` `⚡ +10` |
