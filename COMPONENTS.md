# HỆ SINH THÁI COMPONENTS — MÙA 1: LIVING DIAGRAM
*Phong cách Ray Dalio "How The Economic Machine Works". Triết lý: Sơ đồ sống, đường nét tự vẽ, nhân vật que minh họa. Tech: Framer Motion + SVG + Tailwind. Không WebGL/D3.*

Tổ chức thư mục:
```
src/components/
├── layout/              # Khung bài học, navigation
├── diagrams/            # SVG animated diagrams (MỚI - core của design)
├── interactions/        # Slider, input, minigame
├── simulators/          # Mô phỏng phức tạp (tank, blocks, balloon)
├── typography/          # Số đếm, công thức, label
└── feedback/            # Success/error states
```

---

## 1. LAYOUT — Khung Sườn Bài Học

### `LessonCanvas`
Container gốc bọc toàn bộ bài học.
- Nền giấy kraft `#F5F0E8` + grid paper pattern (đường kẻ `#E8DFD0`, 24px gap, opacity 0.5)
- `max-w-[1200px] mx-auto`, padding `2rem`
- Không dùng glassmorphism/blur. Sạch, thoáng, ấm.

### `DiagramCard`
Card chứa nội dung slide STORY/INFO/DIAGRAM.
- Nền `#FFFBF5` (trắng kem), `rounded-2xl`, border `1px solid #E8DFD0`
- Shadow siêu nhẹ: `0 2px 8px rgba(44,52,65,0.06)`
- Thanh accent bên trái: `w-1 h-full bg-gradient-to-b from-[#3498DB] to-[#27AE60]`
- **KHÔNG** rounded-[48px], **KHÔNG** shadow-2xl, **KHÔNG** backdrop-blur

### `TheoremPlate`
Card đặc biệt cho slide THEOREM — nổi bật, trang trọng.
- Nền `linear-gradient(135deg, #2C3E50, #1a252f)` (navy tối)
- Grid pattern overlay: `rgba(255,255,255,0.03)`, size 24px
- Glow orbs mờ ở góc (indigo 10% opacity, blur 80px)
- Chia 2 cột: trái = giải thích (text trắng), phải = công thức (card navy nhạt hơn, viền mảnh)
- Label "PHƯƠNG TRÌNH CỐT LÕI" pill badge trên khung công thức

### `TimelineBar`
Progress bar dạng thước kẻ thay vì bar phát sáng.
- Nền `#E8DFD0`, chiều cao `6px`, `rounded-full`
- Vạch chia nhỏ cho mỗi slide (tick marks)
- Indicator = chấm tròn `#2C3E50` 12px, di chuyển mượt (`transition-all 700ms`)
- Label nhỏ dưới indicator: "Bước 3/8"

### `SlideNavigator`
Nút điều hướng prev/next.
- Prev: icon `ArrowLeft`, circle button viền mảnh `#E8DFD0`, hover bg `#F5F0E8`
- Next: nền `#2C3E50` (navy), text trắng, `rounded-xl`, hover nhạt hơn
- **KHÔNG** glow, **KHÔNG** shadow lớn. Phẳng, sạch.

---

## 2. DIAGRAMS — Core Của Design Mới (THƯ MỤC MỚI)

*Đây là nhóm component quan trọng nhất — tạo nên phong cách "Living Diagram".*

### `AnimatedPath`
SVG `<path>` tự vẽ ra màn hình.
- Props: `d` (path data), `color`, `strokeWidth`, `duration`, `delay`
- Dùng Framer Motion `pathLength`: `0 → 1`
- Default: `stroke="#34495E"`, `strokeWidth={2}`, `fill="none"`, `strokeLinecap="round"`
- Hỗ trợ dash pattern cho đường đứt nét (axes, guidelines)
- **Dùng cho**: trục tọa độ, đường cong đồ thị, viền hình, mũi tên

### `FlowNode`
Một node trong flow chart / sơ đồ.
- Props: `label`, `x`, `y`, `shape` (`circle` | `rect` | `diamond`), `color`, `active`
- Render: SVG shape + text label centered
- Active state: `pulse` animation (scale 1→1.15→1, loop)
- Hover: `scale(1.1)` + border highlight
- Default size: circle r=28, rect 56×36

### `FlowArrow`
Mũi tên animated nối 2 FlowNode.
- Props: `from`, `to`, `label`, `color`, `animated`
- Render: `AnimatedPath` + arrowhead marker
- Label text (nếu có) nằm giữa path, font `Caveat` (hand-drawn feel)
- Optional: animated dot chạy dọc path (`offset-path` + keyframe)
- **Dùng cho**: `u₁ →[+d]→ u₂ →[+d]→ u₃`, flow chain CSC/CSN

### `FlowDiagram`
Container compose nhiều `FlowNode` + `FlowArrow`.
- Props: `nodes[]`, `arrows[]`, `staggerDelay`
- Auto-layout ngang hoặc dọc
- Stagger reveal: nodes + arrows xuất hiện tuần tự
- Viewport SVG tự scale theo nội dung

### `DiagramLabel`
Label + mũi tên chỉ vào element trên diagram.
- Props: `text`, `targetX`, `targetY`, `position` (`top`|`bottom`|`left`|`right`)
- Font: `Caveat` (ghi chú tay) hoặc `DM Sans` bold
- Animation: `fadeUpLabel` (opacity 0→1, y +12→0, duration 0.5s)
- Mũi tên cong mỏng từ label đến target point
- Màu: `#8B7355` (ink label) hoặc semantic color

### `CoordinateSystem`
Hệ trục tọa độ Oxy animated.
- Props: `xLabel`, `yLabel`, `xRange`, `yRange`, `gridLines`
- Trục X, Y = `AnimatedPath` draw-on
- Mũi tên ở đầu trục
- Grid lines (optional): đứt nét nhạt, stagger reveal
- Tick marks + số liệu trên trục
- **Dùng cho**: mọi đồ thị toán học trong khóa (suy giảm, mũ, log, tương giao)

### `DataCurve`
Đường cong dữ liệu trên `CoordinateSystem`.
- Props: `fn` (hàm toán), `range`, `color`, `strokeWidth`, `label`
- Generate path data từ hàm → SVG path → `AnimatedPath` draw-on
- Hỗ trợ: đường thẳng, parabola, exponential, log
- Điểm data (dots) pulse khi hover
- `TrackingLens`: vertical + horizontal dashed line follow cursor, hiện $(x,y)$

### `StickFigure`
Nhân vật que SVG đơn giản.
- Props: `pose` (`standing`|`happy`|`sad`|`pointing`|`receiving`), `x`, `y`, `scale`
- SVG: head circle + body line + arms + legs
- Framer Motion animate giữa các pose
- Màu: `#2C3441` stroke, `strokeWidth={2.5}`
- **Dùng cho**: minh họa hành động (nhận tiền, bỏ ống heo, so sánh 2 người)

### `CoinIcon`
Đồng xu flat SVG.
- Props: `value`, `size`, `color`
- Circle vàng gold `#F39C12` + viền đậm hơn + label "$" hoặc số tiền
- Animation: `blockDrop` (rơi từ trên + spring bounce khi chạm)
- Stack variant: nhiều coins xếp chồng, stagger drop

### `GridPaper`
Background component — giấy kẻ ô vuông.
- CSS-only: `background-image` linear-gradient tạo grid
- Props: `cellSize` (default 24px), `lineColor`, `opacity`
- Render dưới dạng `<div>` absolute behind content

---

## 3. INTERACTIONS — Điều Khiển & Nhập Liệu (Restyled)

### `FluidSlider`
Thanh trượt input — restyled flat.
- Track: đường ngang `2px`, màu `#E8DFD0`
- Active track: màu semantic (xanh lá cho tiền, vàng cho lãi suất, xanh dương cho thời gian)
- Thumb: chấm tròn `16px`, nền `#2C3E50`, viền trắng `3px`
- Label trên thumb: giá trị hiện tại (font mono, pill badge nhỏ)
- Kéo: thumb scale 1.2 + shadow nhẹ
- **KHÔNG** neon glow, **KHÔNG** gradient phức tạp

### `ActionInput`
Ô nhập số / text — style underline.
- **KHÔNG** dùng bordered box. Chỉ có bottom border `2px solid #E8DFD0`
- Focus: border đổi sang `#3498DB` (xanh dương)
- Font: `JetBrains Mono`, size lớn (`1.5rem`)
- Cursor nhấp nháy custom
- Error state: border `#E74C3C` + Framer shake animation `x: [-8, 8, -8, 8, 0]` duration 0.4s
- Success state: border `#27AE60` + scale pop `1→1.05→1`
- Label phía trên: font `DM Sans`, `0.8rem`, uppercase, tracking wider

### `ChoiceButton`
Nút lựa chọn trong slide DECISION.
- Border `2px solid #E8DFD0`, `rounded-xl`, padding `1.25rem`
- Hover: border `#3498DB`, bg `#F5F0E8`, shift-right `4px`
- Active/selected: border `#27AE60`, bg `rgba(39,174,96,0.05)`
- Số thứ tự: circle badge bên phải, viền mảnh
- Framer: `whileHover={{ x: 4 }}`, `whileTap={{ scale: 0.98 }}`

---

## 4. SIMULATORS — Mô Phỏng Visual (Restyled)

### `StackingBlocks`
Tháp block xếp chồng — biểu diễn CSC.
- Mỗi block: `div` vuông/hcn, nền solid (không gradient), viền mảnh `1px`
- Màu blocks: scale từ nhạt → đậm theo thứ tự (xanh lá nhạt → xanh lá đậm)
- Drop animation: Framer spring `{ y: [-60, 0], opacity: [0, 1], scale: [0.8, 1] }`
- Label trên mỗi block: giá trị tiền (font mono nhỏ)
- **Gauss mode**: clone tháp → đổi màu coral → rotate 180° → merge = rectangle
  - Animation: `rotate: [0, 180]` duration 1.5s → `x: [200, 0]` merge

### `InflationBalloon`
Bóng lạm phát — biểu diễn CSN giảm (thay thế `BalloonAsset`).
- SVG circle lớn trung tâm, stroke `#E74C3C`, fill nhạt
- Label bên trong: "Sức mua: {value}tr"
- Khi lạm phát tăng: `scale` giảm mượt (Framer `animate={{ scale }}`)
- Khi scale < 0.7: thêm wavy border (SVG filter hoặc clip-path) — bóng nhăn nheo
- Bên cạnh: đường cong suy giảm `DataCurve` trên `CoordinateSystem`
- So sánh bar ngang bên dưới: "Danh nghĩa" (full, xám) vs "Thực tế" (ngắn hơn, xanh)

### `FillableTank`
Bể nước — biểu diễn tổng tích lũy / Annuity.
- Container: `div` dọc, viền mảnh `#34495E`, `rounded-lg`, nền trắng
- Nước: `div` absolute bottom, bg `#3498DB` gradient nhẹ, `height: ${percent}%`
- Transition: `height 800ms ease-out`
- Ripple effect: CSS animation wave nhẹ trên mặt nước
- Vạch mục tiêu: đường ngang đỏ đứt nét + label "Mục tiêu: 30tr"
- Giọt nước: khi thêm tiền, 1 droplet SVG rơi từ van phía trên → splash nhỏ
- Tràn: nước đổ qua mép + label cảnh báo

### `CompoundGrowthOrb`
Vòng tròn phân bào — biểu diễn lãi kép (thay thế `CoinFlood`).
- Vòng tròn trung tâm SVG, label vốn gốc
- Mỗi kỳ lãi: thêm 1 vành đai (ring) bao quanh, stroke `#F39C12`, `strokeWidth` tăng dần
- Vành cũ cũng phình ra (scale up nhẹ) — lãi trên lãi
- Sau nhiều kỳ: fractal-like visual, rings chồng lên nhau
- Bên cạnh: `DataCurve` exponential real-time

### `BlockRainContainer`
Mô phỏng physics — hệ thức truy hồi (Lesson 9).
- Container/"hố chứa" ở dưới, viền mảnh
- Blocks rơi xuống mỗi tháng (spring drop animation)
- Blocks cũ phình ra `scale *= (1+r)` mỗi tháng — animate mượt
- Màu blocks gradient theo tuổi: vàng (mới) → cam → đỏ → tím (cũ nhất)
- Label trên mỗi block: giá trị hiện tại
- Block cũ nhất → to nhất = visual lesson "bắt đầu sớm"

---

## 4b. LESSON MINIGAMES — Tương Tác Bài Học

*Các component minigame gắn với slide MINIGAME cụ thể. Dùng chung hệ thống `diagram-card`, `underline-input`, semantic color, Framer Motion.*

### `CashflowInput`
Nhập dòng tiền 3 tháng → tạo dãy số đầu tiên. **(Lesson 1, InteractionKey: `CASHFLOW_INPUT`)**

**Layout**: Chia 2 vùng — trái: input panel, phải: mini chart.

**Input panel** (bên trái, `w-1/2`):
- 3 ô `underline-input` xếp dọc, mỗi ô có label: *"Tháng 1"*, *"Tháng 2"*, *"Tháng 3"*
- Font: `JetBrains Mono`, `1.5rem`, color `var(--ink-primary)`
- Bottom border `2px solid var(--grid-line)`, focus → `var(--time-var)`
- Khi nhập xong 1 ô (blur hoặc Enter) → số "bay" sang chart bên phải: Framer `{ opacity: [0,1], x: [-20, 0], y: [0, targetY] }` duration 0.4s
- Validation: chỉ chấp nhận số dương. Số âm/text → `ErrorShake` trên ô đó

**Mini chart** (bên phải, `w-1/2`):
- `CoordinateSystem` nhỏ (chiều cao 200px), trục X = "Tháng" (1–3), trục Y = "VNĐ (nghìn)"
- Khi nhập xong mỗi ô → 1 `CoinIcon` drop animation xuống vị trí tọa độ tương ứng
- Sau khi nhập đủ 3 → `AnimatedPath` draw-on nối 3 điểm = đường gấp khúc xanh lá `var(--money)`
- Dấu ngoặc SVG lớn bao quanh 3 điểm, label `(u₁, u₂, u₃)` fade-up, color `var(--formula)` (tím)

**Button cuối**: `"Tạo Dãy Số của bạn"`, nền `var(--canvas-dark)`, `rounded-xl`
- Click → toàn bộ chart glow nhẹ `drop-shadow(0 0 16px rgba(136,96,208,0.3))` 1.5s
- Gọi `onComplete(true, 100)`

**Responsive**: Trên mobile (`< 640px`), chuyển sang layout dọc — input trên, chart dưới.

---

### `GaussChallenge`
Tính nhanh tổng $1 + 2 + ... + 100$ bằng mẹo Gauss. **(Lesson 3, InteractionKey: `GAUSS_CHALLENGE`)**

**Layout**: `diagram-card` đơn, center content, max-w `600px`.

**Phần trên — Câu hỏi**:
- Text: *"Tính nhanh: 1 + 2 + 3 + ... + 100 = ?"*
- Font: `DM Sans`, `1.25rem`, bold, color `var(--ink-primary)`
- Dãy số minh họa bên dưới: `FlowDiagram` chain ngang `1 → 2 → 3 → ... → 100`
  - Chỉ hiện 6 nodes: `1, 2, 3, ..., 98, 99, 100` (node `...` dạng diamond, nhạt hơn)
  - Mũi tên `+1` giữa mỗi cặp

**Phần giữa — Hint (ẩn, toggle)**:
- Button `"Gợi ý 💡"`, viền mảnh `var(--grid-line)`, `rounded-lg`
- Click → expand panel (Framer `height: [0, auto]`, opacity fade-in 0.3s):
  - Diagram cặp đầu+cuối: 3 hàng SVG ngang
    ```
    (1 + 100) = 101
    (2 + 99)  = 101
    (3 + 98)  = 101
    ```
  - Mỗi cặp: 2 `FlowNode` rect + mũi tên cong nối nhau, label tổng `= 101`
  - Label kết luận: *"50 cặp × 101 = ?"* — font `Caveat`, color `var(--ink-label)` (`#8B7355`)
  - Node số nhỏ animate draw-on stagger 0.1s

**Phần dưới — Input**:
- 1 ô `underline-input` lớn (`2rem`, `JetBrains Mono`), centered, width `200px`
- Placeholder: `"..."`
- Đáp án đúng: `5050`

**Đúng**:
- Input border flash `var(--money)` + scale pop `1→1.06→1`
- Hình chữ nhật animated xuất hiện phía trên input:
  - SVG rect 200×100, fill `var(--money-light)`, stroke `var(--money)`
  - Đường chéo chia đôi draw-on: nửa trên `var(--money)`, nửa dưới `var(--debt-light)` opacity 0.3
  - Label trung tâm: `NumberOdometer` đếm từ 0 → 5050, font mono bold, color `var(--money)`
- Gọi `onComplete(true, 100)`

**Sai**:
- `ErrorShake` trên ô input (x: `[-8, 8, -6, 6, -3, 3, 0]`, 0.5s)
- Nếu hint chưa mở → auto-mở hint panel
- Text đỏ nhỏ dưới input: *"Thử lại — xem gợi ý nhé!"*, fade-in, color `var(--debt)`

---

### `SavingsPlanner`
Lập kế hoạch tiết kiệm real-time với công thức Gauss. **(Lesson 3, InteractionKey: `SAVINGS_PLANNER`)**

**Layout**: 2 cột trên desktop (`lg:grid-cols-2`), 1 cột trên mobile. Gap `1.5rem`.

**Cột trái — Input Panel** (`diagram-card`, padding `1.5rem`):
- Label header: *"THIẾT LẬP MỤC TIÊU"* — `text-xs`, uppercase, tracking-widest, color `var(--ink-secondary)`
- 3 ô `FluidSlider` xếp dọc:
  1. **"Mục tiêu (VNĐ)"** — range: `500k – 20tr`, step `500k`, color `coral`, unit `" k"`
  2. **"Tháng đầu bỏ (u₁)"** — range: `100k – 5tr`, step `100k`, color `emerald`, unit `" k"`
  3. **"Tăng thêm/tháng (d)"** — range: `0 – 2tr`, step `50k`, color `indigo`, unit `" k"`
- Dưới 3 slider: pill badge kết quả real-time
  - Nền `var(--money-light)`, viền `var(--money)`, `rounded-full`, padding `0.5rem 1rem`
  - Text: *"Đạt mục tiêu tại tháng "* + `NumberOdometer` hiện số tháng, bold, color `var(--money)`
  - Nếu không đạt trong 36 tháng → pill đổi nền `var(--debt-light)`, text *"Chưa đạt trong 36 tháng"*

**Cột phải — Visual Panel** (`diagram-card`, padding `1rem`, min-height `320px`):
- **Bậc thang blocks** (phía trên, `h-[200px]`):
  - Các block `StackingBlocks` style — `flex items-end`, mỗi block width `clamp(16px, 4vw, 32px)`
  - Block chiều cao `= u_i * scale_factor` (auto-scale sao cho block cao nhất = 180px)
  - Màu: gradient từ `var(--money-light)` (block 1) → `var(--money)` (block cuối)
  - Block tháng đạt mục tiêu: viền `2px solid var(--formula)`, nền nhạt tím
  - Framer spring drop stagger `0.04s` khi slider thay đổi
  - Label `u_n` trên block cuối, font mono `0.6rem`

- **Progress bar** (phía dưới, margin-top `1rem`):
  - Track: `h-[8px]`, nền `var(--grid-line)`, `rounded-full`
  - Fill: `var(--money)`, width = `min(100%, (S_current / target) * 100)%`, transition `width 600ms ease-out`
  - Khi fill đạt 100%: flash `var(--money)` 2 lần (pulse), label *"ĐẠT!"* pop scale
  - Label 2 đầu: trái = `NumberOdometer` tổng hiện tại `S_n`, phải = mục tiêu (tĩnh)

- **Gauss mini** (góc phải trên, `absolute top-3 right-3`):
  - SVG rect nhỏ `48×32px`, chia đôi chéo: nửa xanh + nửa đỏ nhạt
  - Tooltip hover: *"Công thức Gauss: S = n(u₁+uₙ)/2"*
  - Opacity 0.6, hover → 1.0

**Tính toán real-time** (logic):
```
u_n = u1 + (n-1) * d
S_n = n * (u1 + u_n) / 2
Tìm n nhỏ nhất sao cho S_n >= target (brute-force loop, max 36)
```

**Button hoàn thành**: *"Xác Nhận Kế Hoạch"*, nền `var(--canvas-dark)`, full-width, `rounded-xl`
- Chỉ hiện khi đã đạt mục tiêu (S_n >= target)
- Click → `onComplete(true, 100)`

---

## 5. TYPOGRAPHY — Số & Công Thức Sống Động

### `NumberOdometer`
Số đếm cuộn mượt mà (core component, dùng khắp nơi).
- Dùng Framer `useSpring({ value, stiffness: 100, damping: 30 })`
- `Math.round()` trên `useTransform` để hiển thị số nguyên
- Format: locale VN (`toLocaleString('vi-VN')`) — dấu chấm phân cách nghìn
- Font: `JetBrains Mono`, weight 600
- Suffix prop: "đ", "tr", "%", " năm"
- Màu semantic tự động: xanh khi tăng, đỏ khi giảm (so với giá trị trước)

### `GlowEquation`
Render công thức KaTeX + hiệu ứng.
- Render bằng KaTeX `renderToString`
- Biến số tô màu semantic: $x/n$ = xanh dương, $u_n/S_n$ = xanh lá, $r$ = vàng
- Success state: `drop-shadow(0 0 12px rgba(39,174,96,0.4))` 1.5s + scale pop
- Wrap trong `DiagramCard` hoặc `TheoremPlate`

### `HandwrittenLabel`
Label style viết tay — dùng trên diagram.
- Font: `Caveat`, size `1.1rem`, color `#8B7355`
- Optional: underline wavy nhẹ (SVG path dưới text)
- Animation: `fadeUpLabel` standard
- **Dùng cho**: chú thích trên diagram, ghi chú bên lề, giải thích nhanh

---

## 6. FEEDBACK — Phản Hồi Kết Quả

### `SuccessFlash`
Hiệu ứng khi trả lời đúng.
- Viền element chuyển `#27AE60`, pulse 2 lần (opacity 1→0.5→1)
- Background glow nhẹ: `radial-gradient(circle, rgba(39,174,96,0.08), transparent)`
- Icon ✓ draw-on (SVG checkmark, `pathLength` animation)
- Text feedback fade-in bên dưới
- **KHÔNG** confetti quá mức. Tối đa: 8-10 particle nhỏ, fade nhanh.

### `ErrorShake`
Hiệu ứng khi trả lời sai.
- Element shake ngang: `x: [-8, 8, -6, 6, -3, 3, 0]` duration 0.5s
- Viền flash `#E74C3C` 1 lần
- Text "Thử lại" fade-in, màu đỏ nhạt
- Sau 2s: reset về trạng thái bình thường

### `NeutralTransition`
Chuyển slide không có đúng/sai (STORY, INFO).
- Chỉ dùng `slideTransition`: opacity + translateX
- Không hiệu ứng đặc biệt

---

## 7. MAPPING: Component → Lesson

| Lesson | Components chính |
|--------|-----------------|
| **1** Nhật Ký Dòng Tiền | `StickFigure`, `FlowDiagram`, `CashflowInput`, `CoordinateSystem` |
| **2** Xếp Tháp Block | `StackingBlocks`, `FluidSlider`, `FlowDiagram`, `NumberOdometer` |
| **3** Lật Ngược Bậc Thang | `StackingBlocks` (Gauss mode), `GaussChallenge`, `SavingsPlanner`, `GlowEquation` |
| **4** Lỗ Hổng Khí Cầu | `InflationBalloon`, `FluidSlider`, `CoordinateSystem`, `DataCurve` |
| **5** Lăng Kính Thời Gian | `CoordinateSystem`, `DataCurve`, `TrackingLens`, `FlowDiagram` |
| **6** Khối Cầu Phân Bào | `CompoundGrowthOrb`, `FluidSlider`, `DataCurve` |
| **7** Điểm Bùng Phát | `CoordinateSystem`, `DataCurve` (×2 lines), `NumberOdometer` |
| **8** Bẻ Cong Đồ Thị | `CoordinateSystem` (morphable axis), `DataCurve`, `GlowEquation` |
| **9** Cơn Mưa Hình Khối | `BlockRainContainer`, `FluidSlider`, `NumberOdometer` |
| **10-11** Giao Diện Cân Bằng | `FillableTank`, `FluidSlider` (×2 vans), `GlowEquation`, `ActionInput` |