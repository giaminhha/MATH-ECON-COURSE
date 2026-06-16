# 🎨 DESIGN SYSTEM — MÙA 1: LIVING DIAGRAM
## Phong cách: Ray Dalio "How The Economic Machine Works"

---

## 1. TRIẾT LÝ THIẾT KẾ

Chuyển từ **"Educational Game App" (Kurzgesagt)** sang **"Living Diagram / Animated Whiteboard"**.

Mọi khái niệm toán học được giải thích bằng **sơ đồ sống** — hình vẽ tự xuất hiện trên màn hình, 
mũi tên tự vẽ, con số tự nhảy, nhân vật que minh họa hành động. Học sinh cảm giác đang xem
một bài giảng được "vẽ trực tiếp" trước mắt.

### So sánh Before/After

| Yếu tố | CŨ (Kurzgesagt) | MỚI (Ray Dalio) |
|---------|-----------------|-----------------|
| Nền | Trắng tinh `#FFF`, glassmorphism | Giấy kraft ấm `#F5F0E8`, texture nhẹ |
| Card | `rounded-[48px]`, shadow-2xl, blur | `rounded-2xl`, viền mảnh, không blur |
| Màu | Pastel vibrant (indigo, emerald) | Tông ấm muted (navy, gold, warm gray) |
| Đường nét | Bo tròn pebble, no border | Line art mảnh, technical drawing |
| Animation | Spring bounce, squish | Stroke drawing, morphing, flow |
| Chữ | Modern clean | Bold label, hand-drawn feel |
| Nhân vật | Không | Stick figures + icon minh họa |
| Tổng thể | Cảm giác app/game | Cảm giác bảng trắng sống |

---

## 2. BẢNG MÀU (COLOR PALETTE)

### Nền & Bề mặt
```
Canvas (nền chính):      #F5F0E8   — Giấy kraft ấm
Card surface:            #FFFBF5   — Trắng kem
Diagram dark bg:         #2C3E50   — Navy tối (dùng cho THEOREM slides)
Grid lines:              #E8DFD0   — Kẻ ô nhạt
```

### Mực & Chữ
```
Ink Primary:             #2C3441   — Chữ chính (mực đen xanh)
Ink Secondary:           #6B7B8D   — Chữ phụ
Ink Label:               #8B7355   — Label trên diagram
Ink Faint:               #B8AFA3   — Ghi chú mờ
```

### Semantic Colors (Ngữ nghĩa Toán-Tài chính)
```
🟢 Money/Growth:         #27AE60   — Tiền, tích cực, tăng trưởng
🔴 Debt/Risk:            #E74C3C   — Nợ, rủi ro, lạm phát
🟡 Interest/Rate:        #F39C12   — Lãi suất, tỷ lệ
🔵 Time/Variable x:      #3498DB   — Thời gian, biến độc lập
🟣 Formula/Math:         #9B59B6   — Công thức, kết quả toán
⚪ Neutral highlight:    #ECF0F1   — Vùng highlight nhẹ
```

### Gradient đặc trưng
```
Theorem gradient:        linear-gradient(135deg, #2C3E50 0%, #1a252f 100%)
Success glow:            radial-gradient(circle, rgba(39,174,96,0.15) 0%, transparent 70%)
Danger glow:             radial-gradient(circle, rgba(231,76,60,0.15) 0%, transparent 70%)
Paper texture:           radial-gradient(ellipse, #F5F0E8 0%, #EDE5D8 100%)
```

---

## 3. TYPOGRAPHY

### Font Stack
```css
--font-heading: 'DM Sans', 'Inter', sans-serif;     /* Đậm, geometric */
--font-body: 'Inter', sans-serif;                     /* Sạch, dễ đọc */
--font-mono: 'JetBrains Mono', monospace;             /* Số liệu, code */
--font-hand: 'Caveat', cursive;                       /* Ghi chú tay (label trên diagram) */
```

### Scale
```
Heading XL:    2.5rem / 800 weight  — Tiêu đề bài học
Heading L:     1.75rem / 700        — Tiêu đề slide
Body L:        1.25rem / 500        — Nội dung chính
Body M:        1rem / 400           — Nội dung phụ
Label:         0.8rem / 600         — Label trên diagram (UPPERCASE, tracking-wider)
Caption:       0.7rem / 500         — Chú thích nhỏ
```

---

## 4. SPATIAL SYSTEM (Cấu trúc không gian)

### Layout
```
Max content width:       1200px
Card padding:            2rem — 2.5rem
Card border-radius:      1rem (16px) — mềm nhưng KHÔNG pebble
Card border:             1px solid #E8DFD0 (viền mảnh ấm)
Card shadow:             0 2px 8px rgba(44,52,65,0.06) — shadow nhẹ, không blur nhiều
```

### Spacing Scale (8px grid)
```
xs: 0.25rem (4px)    sm: 0.5rem (8px)     md: 1rem (16px)
lg: 1.5rem (24px)    xl: 2rem (32px)      2xl: 3rem (48px)
```

### Grid Paper Background
```css
.grid-paper {
  background-image: 
    linear-gradient(rgba(232,223,208,0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(232,223,208,0.5) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## 5. MOTION SYSTEM (Hệ thống chuyển động)

### Nguyên tắc core
1. **Draw-on**: Mọi đường nét, đồ thị đều tự vẽ ra (stroke-dasharray → 0)
2. **Reveal**: Nội dung xuất hiện tuần tự, không đồng loạt
3. **Flow**: Mũi tên, dòng tiền chảy dọc path liên tục
4. **Morph**: Hình dạng biến đổi mượt mà (scale, clip-path)
5. **Count**: Mọi con số đếm lên/xuống, không nhảy cóc

### Animation Presets (Framer Motion)
```typescript
// Đường tự vẽ
const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, opacity: 1,
    transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.3 } }
  }
};

// Label xuất hiện
const fadeUpLabel = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Node pulse khi active
const pulseNode = {
  scale: [1, 1.15, 1],
  transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
};

// Slide transition
const slideTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

// Block rơi xuống (stacking)
const blockDrop = {
  hidden: { y: -60, opacity: 0, scale: 0.8 },
  visible: { 
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

// Số đếm (odometer)  
// Dùng useSpring({ value, stiffness: 100, damping: 30 })
```

### Timing Guidelines
```
Stroke drawing:      1.0s — 2.0s (tùy độ dài path)
Label appear:        0.3s — 0.5s
Number counting:     0.6s — 1.0s
Slide transition:    0.4s
Block drop:          spring (stiffness 400, damping 25)
Stagger delay:       0.1s — 0.15s giữa các element
```

---

## 6. COMPONENT CATALOG

### 6.1 Layout Components

| Component | Mô tả | Visual |
|-----------|--------|--------|
| `LessonCanvas` | Container chính, nền kraft + grid paper nhẹ | Full viewport, padding 2rem |
| `DiagramCard` | Card chứa diagram/content | Viền mảnh, nền trắng kem, shadow nhẹ |
| `TheoremPlate` | Card đặc biệt cho THEOREM slides | Nền navy tối, grid pattern, glow nhẹ |
| `TimelineBar` | Progress bar dạng thước kẻ | Có vạch chia + số slide, indicator dot |

### 6.2 Diagram Components (MỚI)

| Component | Mô tả | Animation |
|-----------|--------|-----------|
| `AnimatedPath` | SVG path tự vẽ | stroke-dasharray → full, duration 1-2s |
| `FlowNode` | Node tròn/vuông trong flowchart | Pulse khi active, scale up khi hover |
| `FlowArrow` | Mũi tên nối nodes | Draw-on + dot chạy dọc path |
| `DiagramLabel` | Label + mũi tên chỉ | Fade-up với delay stagger |
| `GridPaper` | Background grid ô vuông | Static, opacity thấp |
| `StickFigure` | SVG nhân vật que | Animate tay/chân đơn giản |
| `CoinIcon` | Đồng xu SVG flat | Drop animation, stack lên |
| `NumberOdometer` | Số đếm cuộn mượt | useSpring, format locale VN |

### 6.3 Interaction Components (Restyled)

| Component | Thay đổi Style |
|-----------|----------------|
| `FluidSlider` | Track = đường kẻ mảnh, thumb = chấm tròn navy + label số |
| `ActionInput` | Viền dưới only (underline input), font mono, cursor nhấp nháy |
| `LivingChart` | Trục = animated path, data line = draw-on, dots = pulse |
| `StackingBlocks` | Flat blocks, viền mảnh, đổ màu solid, drop animation |
| `BalloonAsset` | Circle SVG + animated scale + wrinkle lines khi xẹp |

### 6.4 Feedback Components

| Trạng thái | Visual |
|-------------|--------|
| **Success** | Viền xanh lá pulse 2s, icon ✓ draw-on, background glow xanh nhẹ |
| **Error** | Shake X nhẹ (3 lần), viền đỏ flash, label "Thử lại" fade in |
| **Neutral** | Không effect, chỉ transition sang slide tiếp |

---

## 7. SLIDE TYPE MẠNG HÌNH

### STORY / INFO
```
┌─────────────────────────────────────────────┐
│  ▎ [Icon]  TIÊU ĐỀ SLIDE                   │
│  ▎                                           │
│  ▎  Nội dung text với $công thức$ inline     │
│  ▎  được highlight màu tím.                  │
│  ▎                                           │
│  ▎  ┌──── Diagram Area ────┐                │
│  ▎  │  (SVG animated)       │                │
│  ▎  │  stick figures, flows │                │
│  ▎  └──────────────────────┘                │
└─────────────────────────────────────────────┘
```

### THEOREM
```
┌═══════════════════════════════════════════════┐
║  ◈  TIÊU ĐỀ ĐỊNH LÝ            [grid bg]   ║
║                                               ║
║  ┌─ Giải thích ─┐  ┌── Công Thức Core ──┐   ║
║  │ Text mô tả   │  │                     │   ║
║  │ ý nghĩa toán │  │  $$u_n = u_1+nd$$   │   ║
║  │ học + tài     │  │                     │   ║
║  │ chính         │  │  [PHƯƠNG TRÌNH]     │   ║
║  └───────────────┘  └─────────────────────┘   ║
╚═══════════════════════════════════════════════╝
```

### DIAGRAM (MỚI)
```
┌─────────────────────────────────────────────┐
│                                              │
│     ○ Node A ──────→ ○ Node B               │
│        │         $+d$    │                   │
│        │                 ▼                   │
│     [label]          ○ Node C               │
│                          │                   │
│                     ───→ ...                 │
│                                              │
│  "Mỗi tháng thêm d đồng, dãy tăng đều"    │
└─────────────────────────────────────────────┘
```

### MINIGAME
```
┌─────────────────────────────────────────────┐
│  Hướng dẫn ngắn + context                   │
│  ┌─────────────────────────────────────┐    │
│  │                                      │    │
│  │     INTERACTIVE COMPONENT            │    │
│  │     (Slider, Input, Chart, Blocks)   │    │
│  │                                      │    │
│  └─────────────────────────────────────┘    │
│                              [Kiểm tra →]   │
└─────────────────────────────────────────────┘
```

---

## 8. LIFE METRICS SYSTEM (Hệ Sinh Thái 4 Chỉ Số)

Mùa 1 tích hợp hệ thống 4 chỉ số sinh tồn để phản ánh sự đánh đổi (trade-offs) trong tài chính.

### 8.1. Các Chỉ Số

| Metric | Icon | Màu sắc | Đại diện cho |
|--------|------|---------|--------------|
| **Money** | `💰` | `#27AE60` (Xanh lá) | Tiền mặt hiện có, tài chính |
| **Health** | `❤️` | `#E74C3C` (Đỏ) | Sức khỏe thể chất |
| **Mental** | `🧠` | `#9B59B6` (Tím) | Tinh thần, mức độ stress |
| **Energy** | `⚡` | `#F39C12` (Vàng) | Năng lượng, thời gian rảnh |

**Giá trị khởi tạo đề xuất**:
- `Money`: 50
- `Health`: 80
- `Mental`: 70
- `Energy`: 80

*Luật Scarcity (Sự khan hiếm)*: Trong Mùa 1, `Money` luôn ở mức thấp. Các khoản chi phí cố định (ẩn hoặc hiện) sẽ bào mòn tiền.

### 8.2. Trong Bài Học (DECISION Slides)
- **Không có lựa chọn hoàn hảo**: Mỗi lựa chọn luôn có trade-off (ví dụ: tiết kiệm tiền thì mất sức khỏe/năng lượng, đi chơi thì được tinh thần nhưng mất tiền).
- Hiển thị: Bên dưới mỗi lựa chọn, show các badge tác động `[💰 -5] [❤️ +5] [🧠 0] [⚡ -10]`.

### 8.3. Ngoại Khóa: Tính năng "Làm Thêm" (Side Hustle)
- **Cơ chế riêng biệt**: Không nằm trong slide DECISION, mà là một tính năng khả dụng trên bản đồ khóa học (giữa các bài học).
- **Mục đích**: Khi `Money` xuống quá thấp, học sinh có quyền bấm nút "Đi làm thêm".
- **Impact cố định**: Nhận được `💰 +15` đến `+25`, nhưng đánh đổi `❤️ -5`, `🧠 -5`, `⚡ -15`.
- **Bài học rút ra**: Đi làm thêm giúp giải quyết khủng hoảng tiền mặt trước mắt, nhưng bào mòn con người, là vòng lặp bế tắc nếu không có quản lý tài chính tốt.
