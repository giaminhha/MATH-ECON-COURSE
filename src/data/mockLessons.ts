export const mockLessons: Record<string, any> = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Bài 1: Nhật Ký Dòng Tiền',
    description: 'Chương 1: Khởi động hệ thống - Dãy số',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'DIAGRAM',
        title: 'Dòng Tiền Là Gì?',
        content: 'Mỗi tháng, tiền vào → tiền ra → còn lại một con số. Ghi lại con số đó, bạn có một **chuỗi số theo thời gian**.',
        diagramKey: 'CASHFLOW_FLOW',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Chuỗi Số = Dãy Số',
        content: 'Trong Toán học, khi ta xếp các con số theo thứ tự $u_1, u_2, u_3, ..., u_n$ — đó là một **Dãy Số**. Chỉ số $n$ ở đây chính là **tháng thứ mấy**.',
        diagramKey: 'SEQUENCE_CHAIN',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'DIAGRAM',
        title: 'Quy Luật Ẩn Sau Dãy Số',
        content: 'Không phải dãy số nào cũng ngẫu nhiên. Nhiều dãy có **quy luật**:\n- Nếu mỗi tháng bạn tiết kiệm thêm đúng 500k → dãy tăng đều\n- Nếu bạn chi tiêu gấp đôi mỗi tháng → dãy tăng nhanh khủng khiếp\n\nPhát hiện quy luật = **sức mạnh của Toán học**.',
        diagramKey: 'GROWTH_COMPARISON',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'MINIGAME',
        title: 'Nhập Dòng Tiền 3 Tháng',
        content: 'Thử nhập thu chi của bạn trong 3 tháng.',
        interactionKey: 'CASHFLOW_INPUT',
        variables: { months: 3, currency: 'k' }
      },
      {
        id: 's5',
        type: 'THEOREM',
        title: 'Ký Hiệu Dãy Số',
        mathFormula: '$$u_n \\text{ — Số hạng thứ } n \\text{ của dãy}$$',
        content: '- $u_1$ = giá trị đầu tiên.\n- $u_n$ = giá trị tại vị trí thứ $n$.\n- $n$ = chỉ số thứ tự.',
        theme: 'STANDARD'
      },
      {
        id: 's6',
        type: 'DECISION',
        title: 'Tháng Này Bạn Còn 2 Triệu',
        content: '2 triệu còn lại sau tháng đầu tiên — bạn sẽ để nó ở đâu tối nay?',
        choices: [
          { id: 'c1', text: 'Chuyển ngay vào tài khoản riêng, không đụng vào', feedback: 'Bạn đã tạo ra $u_1 = 2$ triệu. Dãy số bắt đầu! Tháng sau bạn sẽ so sánh được ngay.', impact: { moneyDelta: 10, healthDelta: 0, moodDelta: 5, energyDelta: -5 } },
          { id: 'c2', text: 'Để trong ví, lỡ cuối tháng cần thì tiêu dần', feedback: 'An toàn, nhưng tiền trong ví hay \'tự biến mất\'. Tháng sau $u_2$ có thể thấp hơn $u_1$ mà không rõ lý do.', impact: { moneyDelta: -5, healthDelta: 5, moodDelta: -5, energyDelta: 5 } },
          { id: 'c3', text: 'Rủ bạn đi ăn để ăn mừng tháng đầu tiên ghi sổ', feedback: 'Tinh thần lên cao! Nhưng $u_1$ giảm còn khoảng 1.2 triệu. Dãy số của bạn bắt đầu khác kế hoạch rồi.', impact: { moneyDelta: -15, healthDelta: 5, moodDelta: 5, energyDelta: 0 } },
        ]
      }
    ]
  },
  'lesson-2': {
    id: 'lesson-2',
    title: 'Bài 2: Xếp Tháp Block',
    description: 'Chương 1: Khởi động hệ thống - Cấp số cộng',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'DIAGRAM',
        title: 'Ống Heo Của Bạn',
        content: 'Tưởng tượng bạn quyết định: **mỗi tháng bỏ đúng 500.000đ vào ống heo**. Không rút, không thêm, không lãi suất — chỉ bỏ đều đặn.\n\nSau 1 tháng: 500k. Sau 2 tháng: 1 triệu. Sau 3 tháng: 1.5 triệu...\n\nĐây không còn là dãy số ngẫu nhiên nữa. Đây là dãy có **quy luật cộng đều**.',
        diagramKey: 'PIGGY_BANK',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Bậc Thang Tăng Đều',
        content: '',
        diagramKey: 'STAIRCASE',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'THEOREM',
        title: 'Công Thức Cấp Số Cộng',
        mathFormula: '$$u_n = u_1 + (n-1) \\cdot d$$',
        content: '- $u_1$ = số tiền tháng đầu tiên (giá trị khởi tạo)\n- $d$ = số tiền thêm mỗi tháng (công sai)\n- $n$ = tháng thứ mấy\n- $u_n$ = tổng tiền tại tháng $n$',
        diagramKey: 'FORMULA_CHAIN',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'DIAGRAM',
        title: 'Giải Mã Công Thức',
        content: '',
        diagramKey: 'DECODE_FORMULA_QUIZ',
        theme: 'STANDARD'
      },
      {
        id: 's5',
        type: 'MINIGAME',
        title: 'Xếp Tháp Block',
        content: 'Kéo slider để xây tháp tiết kiệm và trả lời câu hỏi bên dưới.',
        interactionKey: 'ISOMETRIC_STACKER',
        variables: { blocks: 5, showQuestion: true, u1: 200, d: 300 }
      },
      {
        id: 's6',
        type: 'DIAGRAM',
        title: 'Tại Sao Gọi Là Cấp Số CỘNG?',
        content: '',
        diagramKey: 'WHY_PLUS',
        theme: 'STANDARD'
      },
      {
        id: 's7',
        type: 'DECISION',
        title: 'Tiền Tiêu Vặt Hay Ống Heo?',
        content: 'Hôm nay mẹ cho thêm 500k tiêu vặt. Bạn vừa học xong công thức $u_n = u_1 + (n-1)d$. Bạn sẽ làm gì với 500k đó?',
        choices: [
          { id: 'c1', text: 'Bỏ vào ống heo ngay — $d = 500k$, 10 tháng ra 5 triệu', feedback: 'Bạn đã biến lý thuyết thành hành động! $u_{10} = 500 + 9 \\times 500 = 5000k$. Tháp block bắt đầu xếp rồi.', impact: { moneyDelta: 10, healthDelta: 0, moodDelta: 5, energyDelta: 0 } },
          { id: 'c2', text: 'Mua đồ ăn vặt + đồ dùng học tập còn thiếu', feedback: 'Chi tiêu có mục đích. Nhưng tháng này $d = 0$, tháp block của bạn không cao thêm được.', impact: { moneyDelta: -5, healthDelta: 5, moodDelta: 0, energyDelta: 5 } },
          { id: 'c3', text: 'Rủ cả nhóm đi cà phê, split bill', feedback: 'Giờ học xong cần giải trí thôi mà! 500k bay hết nhưng mood cả nhóm lên cao. Tháng sau tính lại.', impact: { moneyDelta: -10, healthDelta: 5, moodDelta: -5, energyDelta: 5 } },
        ]
      }
    ]
  },
  'lesson-3': {
    id: 'lesson-3',
    title: 'Bài 3: Lật Ngược Bậc Thang',
    description: 'Chương 1: Khởi động hệ thống - Tổng Cấp số cộng',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'STORY',
        title: 'Vé Concert 2 Triệu',
        content: 'Bạn muốn mua vé Concert Sơn Tùng MTP — giá **2 triệu đồng**.\n\nBạn quyết định tiết kiệm tăng dần: tháng 1 bỏ 200k, tháng 2 bỏ 300k, tháng 3 bỏ 400k...\n\nCâu hỏi: **tổng cộng sau bao nhiêu tháng thì đủ 2 triệu?**',
        diagramKey: 'CONCERT_STORY',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Diện Tích Bậc Thang = Tổng',
        content: 'Nhưng nếu có 100 bậc thì sao? Cộng tay 100 số? Gauss 10 tuổi đã tìm ra cách...',
        diagramKey: 'STAIRCASE_AREA',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'DIAGRAM',
        title: 'Mẹo Gauss — Lật Ngược',
        content: 'Nhân đôi tháp lên — tháp gốc **xanh** + tháp **đỏ** lật ngược ghép lại = hình chữ nhật. Tổng = $\\frac{n \\times (u_1 + u_n)}{2}$.',
        diagramKey: 'GAUSS_FLIP',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'THEOREM',
        title: 'Công Thức Tổng',
        mathFormula: '$$S_n = \\frac{n(u_1 + u_n)}{2}$$',
        content: '- $n$ = số lượng số hạng (số tháng)\n- $u_1$ = số hạng đầu\n- $u_n$ = số hạng cuối\n- $S_n$ = tổng của $n$ số hạng đầu tiên',
        diagramKey: 'GAUSS_FORMULA_MIN',
        theme: 'STANDARD'
      },
      {
        id: 's5',
        type: 'INFO',
        title: 'Giải Bài Vé Concert',
        content: 'Quay lại: $u_1 = 200k$, $d = 100k$. Cần $S_n \\geq 2000k$.\n\nThử $n = 5$:\n$$S_5 = \\frac{5 \\times (200 + 600)}{2} = \\frac{5 \\times 800}{2} = 2000k \\checkmark$$\n\n**Sau đúng 5 tháng, bạn có đủ 2 triệu mua vé!**',
        diagramKey: 'CONCERT_PROGRESS',
        theme: 'STANDARD'
      },
      {
        id: 's6',
        type: 'MINIGAME',
        title: 'Gauss Challenge',
        content: 'Tính nhanh tổng 1 + 2 + 3 + ... + 100',
        interactionKey: 'GAUSS_CHALLENGE',
        variables: { n: 100, answer: 5050 }
      },
      {
        id: 's7',
        type: 'MINIGAME',
        title: 'Lập Kế Hoạch Tiết Kiệm',
        content: 'Thiết lập mục tiêu và xem bao lâu bạn sẽ đạt được.',
        interactionKey: 'SAVINGS_PLANNER',
        variables: { defaultTarget: 5000, defaultU1: 200, defaultD: 100 }
      },
      {
        id: 's8',
        type: 'DECISION',
        title: 'Vé Concert = Bao Nhiêu Tháng?',
        content: 'Bạn vừa tính ra: tiết kiệm tăng dần 5 tháng là đủ tiền vé concert. Nhưng tháng 1 bạn chỉ có thể bỏ được 100k thôi. Bạn chọn cách nào?',
        choices: [
          {
            id: 'c1',
            text: 'Bắt đầu 100k tháng này, tăng dần — dù phải đợi thêm 1-2 tháng',
            feedback: 'Thực tế và bền vững. $u_1 = 100k$, $d = 100k$ → cần $n = 6$ tháng thay vì 5. Concert vẫn đến được!',
            impact: { moneyDelta: 5, healthDelta: 0, moodDelta: 10, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Vay bạn bè 500k để tháng đầu bỏ đủ 200k, hoàn lại sau',
            feedback: 'Đảm bảo 5 tháng đúng kế hoạch, nhưng nợ là biến số ngoài công thức — nếu quên trả thì sao?',
            impact: { moneyDelta: -10, healthDelta: -5, moodDelta: 0, energyDelta: -5 }
          },
          {
            id: 'c3',
            text: 'Thôi kệ, chờ ai resell vé giá rẻ hơn',
            feedback: 'Rủi ro cao — vé hot thường không giảm giá. Và bạn đã bỏ qua cơ hội luyện thói quen tiết kiệm có kế hoạch.',
            impact: { moneyDelta: 0, healthDelta: 5, moodDelta: -10, energyDelta: 10 }
          }
        ]
      }
    ]
  },
  'lesson-4': {
    id: 'lesson-4',
    title: 'Bài 4: Lỗ Hổng Khí Cầu',
    description: 'Chương 2: Lỗ hổng hệ thống - Cấp số nhân dạng giảm',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'STORY',
        title: '100 Triệu Của Bạn Đang Bị Ăn',
        content: 'Bạn có **100 triệu** giấu dưới gối. Không tiêu, không mất, không ai lấy.\nNhưng sau 10 năm, 100 triệu đó chỉ mua được lượng hàng hóa bằng... **60 triệu hôm nay**.\n\nKẻ trộm vô hình đó tên là **LẠM PHÁT**.',
        diagramKey: 'INFLATION_STORY',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Từ CSC Sang CSN',
        content: 'Nếu CSC là "cộng đều mỗi bước", thì **CSN** là "nhân đều mỗi bước". Khi $q < 1$ (VD: $q = 0.95$), mỗi bước nhỏ hơn → **suy giảm**.',
        diagramKey: 'CSC_TO_CSN',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'THEOREM',
        title: 'Cấp Số Nhân',
        mathFormula: '$$u_n = u_1 \\cdot q^{n-1} \\quad \\text{với } q = 1 - r$$',
        content: '- $u_1 = 100$ triệu (sức mua ban đầu)\n- $r = 5\\% = 0.05$ (tỷ lệ lạm phát mỗi năm)\n- $q = 1 - 0.05 = 0.95$ (công bội — hệ số nhân mỗi năm)\n- $u_n$ = sức mua thực tế sau $n$ năm',
        diagramKey: 'CSN_FORMULA',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'MINIGAME',
        title: 'Quả Bóng Xì Hơi',
        content: 'Kéo slider để xem sức mua (diện tích quả bóng) thay đổi thế nào qua các năm theo cấp số nhân.',
        interactionKey: 'INFLATION_BALLOON'
      },
      {
        id: 's5',
        type: 'INFO',
        title: 'Con Số Thật Của Việt Nam',
        content: 'Lạm phát trung bình Việt Nam ~3-4%/năm (2020-2025).\n\nVới $r = 4\\%$, sau 10 năm: $u_{10} = 100 \\times 0.96^9 \\approx 69.3$ triệu sức mua.\n\n**30% sức mua bốc hơi** mà bạn không hề hay biết!',
        diagramKey: 'VIETNAM_INFLATION',
        theme: 'STANDARD'
      },
      {
        id: 's6',
        type: 'MINIGAME',
        title: 'Tính Sức Mua',
        content: 'Bạn đã hiểu công thức? Thử tính giá trị thực của một bát phở trong tương lai xem.',
        interactionKey: 'PURCHASING_POWER_CALC'
      },
      {
        id: 's7',
        type: 'DECISION',
        title: '3 Triệu Hè Này Để Đâu?',
        content: 'Mùa hè này bạn đi làm thêm và dành dụm được 3 triệu. Bạn để khoản này ở đâu?\n\n*(Nhớ lại: $q = 0.96$ sau 1 năm — 3 triệu còn bảo giá trị làm sao?)*',
        choices: [
          {
            id: 'c1',
            text: 'Gửi vào tài khoản tiết kiệm có lãi — dù chỉ 3-4%',
            feedback: 'Lãi suất ngân hàng $\\approx$ lạm phát. Không thắng, nhưng không thua. Hơn giấu gối rất nhiều!',
            impact: { moneyDelta: 5, healthDelta: 0, moodDelta: 5, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Giấu tạm trong ngăn kéo, chờ cuối hè tính',
            feedback: 'Kết quả: $3000k \\times 0.96^{0.25} \\approx 2970k$ sau 3 tháng. Mất 30k không hay biết. Giấu gối là mất tiền câm lặng.',
            impact: { moneyDelta: -5, healthDelta: 5, moodDelta: -5, energyDelta: 5 }
          },
          {
            id: 'c3',
            text: 'Mua ngay đồ cho năm học mới — vừa có ích vừa tránh lạm phát',
            feedback: 'Logic này có lý! Đầu tư vật dụng thích hợp = giữ sức mua. Nhưng chọn đồ cần thiết, đừng mua vì tâm lý sợ lạm phát.',
            impact: { moneyDelta: -5, healthDelta: 5, moodDelta: 5, energyDelta: 5 }
          }
        ]
      }
    ]
  },
  'lesson-5': {
    id: 'lesson-5',
    title: 'Bài 5: Lăng Kính Thời Gian',
    description: 'Chương 2: Lỗ Hổng Hệ Thống - Hàm Mũ Suy Giảm (Half-life)',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'STORY',
        title: 'Bán Rã Tiền Tệ',
        content: 'Trong Vật lý, chất phóng xạ có **chu kỳ bán rã** — thời gian để một nửa nguyên tử phân rã.\nTiền cũng vậy. Với lạm phát, sức mua cũng có "Half-life" — thời gian để mất nửa giá trị.\n\nCâu hỏi: **Với lạm phát 5%, bao nhiêu năm để 100tr chỉ còn sức mua 50tr?**',
        diagramKey: 'HALFLIFE_STORY',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Đi Tìm Điểm 50%',
        content: 'Chỉ mất ~14 năm để sức mua giảm đi một nửa nếu lạm phát duy trì ở mức 5%.',
        diagramKey: 'HALFLIFE_INTERSECTION',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'THEOREM',
        title: 'Phương Trình Mũ',
        mathFormula: '$$ (1 - r)^n = 0.5 $$',
        content: 'Để tìm $n$, ta cần "hạ bậc" — tức dùng **Logarit**:\n$$n = \\frac{\\ln(0.5)}{\\ln(1-r)} = \\frac{-0.693}{\\ln(0.95)} \\approx 13.51 \\text{ năm}$$\n\n*Đừng sợ Logarit! Nó chỉ là phép tính ngược của lũy thừa — giống như phép chia là ngược của nhân.*',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'DIAGRAM',
        title: 'Logarit = Phép Tính Ngược',
        content: 'Logarit trả lời câu hỏi: cần NHÂN MẤY LẦN?',
        diagramKey: 'LOGARITHM_COMPARE',
        theme: 'STANDARD'
      },
      {
        id: 's5',
        type: 'MINIGAME',
        title: 'Lăng Kính Dò Tìm',
        content: 'Sử dụng lăng kính dọc để tìm xem tại năm bao nhiêu thì sức mua chạm ngưỡng 50%.',
        interactionKey: 'HALFLIFE_LENS'
      },
      {
        id: 's6',
        type: 'MINIGAME',
        title: 'Tính Half-life',
        content: 'Điều chỉnh tỷ lệ lạm phát để xem chu kỳ bán rã thay đổi thế nào.\n\n**Câu hỏi: Nếu lạm phát là 10% thì Half-life là bao nhiêu?** Kéo thanh trượt để tìm đáp án nhé.',
        interactionKey: 'HALFLIFE_CALC'
      },
      {
        id: 's7',
        type: 'DECISION',
        title: 'Bạn 17 Tuổi — Tiền Mất Nửa Khi Bạn 30?',
        content: 'Bạn có 500k trong ngăn bàn từ hồi Tết. Lạm phát 5% — sau 13 năm, 500k đó chỉ mua được bằng 250k hôm nay. Bạn sẽ?\n\n*(Nhắc lại: lạm phát 5% → half-life ~13.5 năm → nếu bạn 17 tuổi, lúc 30 tiền mất nửa)*',
        choices: [
          {
            id: 'c1',
            text: 'Gửi tiết kiệm — dù chỉ ngân hàng trường',
            feedback: 'Lãi tiết kiệm học sinh ~4-5%/năm. Xấp xỉ lạm phát — không giàu nhưng không mất sức mua. Tốt hơn nằm yên!',
            impact: { moneyDelta: 5, healthDelta: 0, moodDelta: 5, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Mua sách văn học thêm — kiến thức không lạm phát',
            feedback: 'Logic đúng! Đầu tư bản thân = tăng lương tương lai. Nhưng chọn sách có giá trị thực, đừng mua vì sợ lạm phát.',
            impact: { moneyDelta: -5, healthDelta: 0, moodDelta: 10, energyDelta: 5 }
          },
          {
            id: 'c3',
            text: 'Cứ để đó, có dịp gì thì dùng',
            feedback: '500k nằm im 13 năm = sức mua 250k. Không phải mất hết — nhưng bạn đang để lạm phát lấy lặng lẽ 50% kia.',
            impact: { moneyDelta: -10, healthDelta: 5, moodDelta: -10, energyDelta: 10 }
          }
        ]
      }
    ]
  },
  'lesson-6': {
    id: 'lesson-6',
    title: 'Bài 6: Khối Cầu Phân Bào',
    description: 'Chương 3: Bức Tường Lửa - Lãi Kép & Hàm Số Mũ',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'STORY',
        title: 'Vũ Khí Chống Lạm Phát',
        content: 'Chương 2 cho bạn thấy: để tiền chết = mất tiền.\nGiải pháp? Đặt tiền vào nơi nó **tự sinh ra tiền** — lãi suất ngân hàng.\n\nNhưng lãi kép không chỉ sinh thêm lãi từ vốn gốc — mà còn **sinh lãi từ lãi cũ**. Giống tế bào phân bào: 1 → 2 → 4 → 8...',
        diagramKey: 'CELL_DIVISION',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Lãi Đơn vs Lãi Kép',
        content: 'Sau 5 năm, lãi kép bắt đầu vượt xa lãi đơn nhờ cơ chế "Lãi mẹ đẻ lãi con".',
        diagramKey: 'SIMPLE_VS_COMPOUND',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'THEOREM',
        title: 'Công Thức Lãi Kép',
        mathFormula: '$$u_n = u_1 \\cdot (1+r)^n$$',
        content: '- $u_1$ = vốn gốc ban đầu\n- $r$ = lãi suất mỗi kỳ (năm/tháng)\n- $n$ = số kỳ\n- $(1+r)$ = công bội CSN — lần này $q > 1$ → tăng trưởng!\n\n**So sánh**: Lạm phát dùng $q = 1-r < 1$ → giảm. Lãi kép dùng $q = 1+r > 1$ → tăng.',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'MINIGAME',
        title: 'Phân Bào Lãi Kép',
        content: 'Thử xem 10tr gửi tiết kiệm sẽ sinh sôi như thế nào!',
        interactionKey: 'COMPOUND_GROWTH'
      },
      {
        id: 's5',
        type: 'INFO',
        title: 'Sức Mạnh Ẩn Của Lãi Kép',
        content: 'Warren Buffett bắt đầu đầu tư từ 11 tuổi. Ông nói: *"Tài sản của tôi đến từ sự kết hợp của: sống ở Mỹ, gen may mắn, và lãi kép."*\n\nVới $r = 10\\%$/năm:\n- 10 năm: $\\times 2.59$\n- 20 năm: $\\times 6.73$\n- 30 năm: $\\times 17.45$\n\n**Bắt đầu sớm 10 năm = gấp 2.7 lần kết quả!**',
        diagramKey: 'BUFFET_BARS',
        theme: 'STANDARD'
      },
      {
        id: 's6',
        type: 'DIAGRAM',
        title: 'Đánh Bại Lạm Phát',
        content: 'Lãi suất > Lạm phát = Tiền của bạn THẬT SỰ tăng trưởng. Khoảng cách giữa 2 đường cong chính là tài sản thực của bạn.',
        diagramKey: 'BEAT_INFLATION',
        theme: 'STANDARD'
      },
      {
        id: 's7',
        type: 'DECISION',
        title: 'Bạn Có 10 Triệu Từ Quà Tết',
        content: 'Cả nhà mừng sinh nhật 18 tuổi tặng bạn tổng cộng 10 triệu. Khoản này để làm gì?\n\n*(Nhắc lại: lãi kép = giải pháp chống lạm phát; lãi kép sinh lãi trên lãi)*',
        choices: [
          {
            id: 'c1',
            text: 'Gửi ngân hàng lãi 7%/năm, chờ 20 năm',
            feedback: '$10 \\times 1.07^{20} = 38.7$ triệu. 38 tuổi bạn có khoản này. Kiên nhẫn được thưởng.',
            impact: { moneyDelta: 20, healthDelta: 0, moodDelta: 10, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Mua 200 ly trà sữa trong 1 năm',
            feedback: '$u_n = 0$. Game over.',
            impact: { moneyDelta: -10, healthDelta: 5, moodDelta: -10, energyDelta: 5 }
          },
          {
            id: 'c3',
            text: 'Giấu gầm giường',
            feedback: 'Lạm phát 4%: $10 \\times 0.96^{20} = 4.4$ triệu sức mua. Mất hơn nửa!',
            impact: { moneyDelta: -5, healthDelta: 5, moodDelta: -15, energyDelta: 5 }
          }
        ]
      }
    ]
  },
  'lesson-7': {
    id: 'lesson-7',
    title: 'Bài 7: Điểm Bùng Phát',
    description: 'Chương 3: Bức Tường Lửa - Tương Giao Hàm Số',
    module: 'finance_intro',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'STORY',
        title: 'Hai Người Bạn',
        content: '**An**: Mỗi tháng bỏ ống heo 500k. Sau $n$ tháng có: $S = 500n$\n**Bình**: Gửi ngân hàng 5tr một lần, lãi 0.6%/tháng: $S = 5000 \\times 1.006^n$\n\n10 tháng đầu, An dẫn trước. Nhưng rồi...',
        diagramKey: 'TWO_FRIENDS',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DIAGRAM',
        title: 'Cuộc Đua Hai Đường',
        content: 'Đây là ĐIỂM BÙNG PHÁT — nơi đường cong Lãi kép vượt qua đường thẳng Tiết kiệm đều.',
        diagramKey: 'RACE_TWO_LINES',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'THEOREM',
        title: 'Giao Điểm Hàm Bậc Nhất & Hàm Mũ',
        mathFormula: '$$ ax + b = c \\cdot (1+r)^x $$',
        content: 'Phương trình này không có nghiệm đại số chính xác → phải dùng:\n- Đồ thị (vẽ + tìm giao)\n- Ước lượng (thử $n$ = 10, 11, 12...)\n- Logarit (phiên bản nâng cao)',
        theme: 'STANDARD'
      },
      {
        id: 's4',
        type: 'MINIGAME',
        title: 'Tìm Điểm Bùng Phát',
        content: 'An bỏ 500k/tháng. Bình gửi 5tr lãi 0.6%/tháng. Tháng nào Bình vượt An?',
        interactionKey: 'BREAKPOINT_FINDER'
      },
      {
        id: 's5',
        type: 'INFO',
        title: 'Bài Học Lãi Kép',
        content: '**Kết luận**: Lãi kép ban đầu THUA tiết kiệm đều. Nhưng theo thời gian, nó **luôn** thắng.\n\nĐó là lý do Einstein nói: *"Lãi kép là kỳ quan thứ 8 của thế giới."*\n\nTrong Toán: hàm mũ **luôn** vượt hàm bậc nhất khi $x \\to \\infty$.',
        theme: 'STANDARD'
      },
      {
        id: 's6',
        type: 'DECISION',
        title: 'An Và Bình — Bạn Chọn Ai?',
        content: 'Bạn 17 tuổi, có 3 triệu tiết kiệm và mỗi tháng có thể dành được thêm 300k. Giống An hay Bình hơn?\n\n*(Nhắc lại: An bỏ ống heo 500k/tháng vs Bình gửi ngân hàng 5tr một lần — điểm bùng phát tháng 11)*',
        choices: [
          {
            id: 'c1',
            text: 'Gửi 3tr vào ngân hàng + mỗi tháng bỏ thêm 300k',
            feedback: 'Kết HỢP cả hai! Chương 4 sẽ dạy công thức này. Bạn đã chọn "combo" mạnh nhất rồi!',
            impact: { moneyDelta: 5, healthDelta: 0, moodDelta: 10, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Chỉ bỏ ống heo 300k/tháng, 3tr để dự phòng',
            feedback: 'An toàn nhưng 3tr nằm yên thua lạm phát dài hạn.',
            impact: { moneyDelta: 2, healthDelta: 5, moodDelta: -5, energyDelta: 5 }
          },
          {
            id: 'c3',
            text: 'All-in crypto bằng cả 3tr',
            feedback: 'Rủi ro cực cao. Toán không dự đoán được thị trường bất hợp lý.',
            impact: { moneyDelta: -10, healthDelta: 0, moodDelta: -10, energyDelta: 0 }
          }
        ]
      }
    ]
  },
  'lesson-8': {
    id: 'lesson-8',
    title: 'Bài 8: Bẻ Cong Đồ Thị',
    description: 'Chương 3: Bức Tường Lửa - Trục Logarit',
    module: 'investing',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'THEOREM',
        title: 'Quy Tắc 72',
        mathFormula: '$$ n = \\log_{1+r}(2) $$',
        content: 'Đường cong phức tạp được giải bằng cách bẻ trục Y sang Logarit.',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DECISION',
        title: 'Anh/Chị Hỏi Muốn Tiền Gấp Đôi',
        content: 'Anh hỏi: "Anh muốn gửi 10tr, bao lâu để có 40tr?" Bạn vừa học xong Quy tắc 72. Bạn trả lời anh thế nào?',
        choices: [
          {
            id: 'c1',
            text: '~24 năm — vì ×4 cần 2 lần nhân đôi',
            feedback: 'Tuyệt! Bạn giải thích được cho anh. "Quy tắc 72 làm được cái này đưa!"',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: 10, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: '12 năm',
            feedback: 'Bạn trả lời chính xác cho x2, nhưng đó mới nhân đôi 1 lần (×2), chưa đến ×4.',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: -5, energyDelta: 0 }
          },
          {
            id: 'c3',
            text: '48 năm',
            feedback: 'Quá lâu! Bạn đang nghĩ tuyến tính (×4 = 4 lần ×). Lãi kép nhanh hơn thế!',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: -10, energyDelta: 0 }
          }
        ]
      }
    ]
  },
  'lesson-9': {
    id: 'lesson-9',
    title: 'Bài 9: Cơn Mưa Hình Khối',
    description: 'Chương 4: Trùm Cuối - Cấp Số Nhân Đa Tầng',
    module: 'mastery',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'THEOREM',
        title: 'Hệ thức truy hồi',
        mathFormula: '$$ u_n = u_{n-1}(1+r) + A $$',
        content: 'Kết hợp giữa việc gửi thêm A mỗi tháng và để lãi kép r sinh sôi.',
        theme: 'STANDARD'
      },
      {
        id: 's2',
        type: 'DECISION',
        title: 'An Bắt Đầu Lúc 18, Bình Lúc 28',
        content: 'An và Bình cùng gửi 500k/tháng, lãi 6%/năm. An bắt đầu lúc 18, Bình lúc 28. Lúc 58 tuổi, ai có nhiều hơn?',
        choices: [
          {
            id: 'c1',
            text: 'An — nhiều hơn gần gấp đôi',
            feedback: 'An gửi 40 năm, Bình 30 năm. Nhưng block đầu tiên của An có thêm 10 năm để phình! 10 năm sớm = khối tiền khổng lồ.',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: 10, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Bằng nhau',
            feedback: 'Sai! Compound interest không tuyến tính. 10 năm sớm của An = giá trị cực lớn.',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: -5, energyDelta: 0 }
          },
          {
            id: 'c3',
            text: 'Bình — vì kinh nghiệm hơn',
            feedback: 'Kinh nghiệm không thắng được thời gian trong lãi kép. Block Bình đơn giản là rơi trễ hơn!',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: -10, energyDelta: 0 }
          }
        ]
      }
    ]
  },
  'lesson-10': {
    id: 'lesson-10',
    title: 'Bài 10 & 11: Giao Diện Cân Bằng',
    description: 'Chương 4: Trùm Cuối - Dòng tiền đều (Annuity)',
    module: 'mastery',
    status: 'AVAILABLE',
    theme: 'STANDARD',
    slides: [
      {
        id: 's1',
        type: 'MINIGAME',
        title: 'Trình giả lập LiquidTank',
        content: 'Trực quan hóa khối tiền đổ vào mục tiêu.',
        interactionKey: 'LIQUID_TANK',
        variables: { level: 50.0 }
      },
      {
        id: 's2',
        type: 'THEOREM',
        title: 'Công thức Annuity',
        mathFormula: '$$ S_n = A \\cdot \\frac{(1+r)[(1+r)^n - 1]}{r} $$',
        content: 'Khóa cuối cùng để bạn làm chủ toàn bộ bài tính toán học sinh tồn.',
        theme: 'STANDARD'
      },
      {
        id: 's3',
        type: 'DECISION',
        title: 'Lời Hứa Với Bản Thân',
        content: 'Bạn vừa tính ra: gửi 760k/tháng, lãi 0.5%, sau 36 tháng có 30 triệu. Bạn có làm được không?',
        choices: [
          {
            id: 'c1',
            text: 'Bắt đầu gửi ngay tháng này — 760k/tháng',
            feedback: '$u_1$ của bạn đã được khởi tạo. Compound interest bắt đầu từ NGÀY BÂY GIỜ.',
            impact: { moneyDelta: 10, healthDelta: 0, moodDelta: 5, energyDelta: 0 }
          },
          {
            id: 'c2',
            text: 'Lập kế hoạch chi tiết 3 năm trước',
            feedback: 'Bạn đã dùng toán để thiết kế cuộc đời. Đó là sức mạnh thật sự.',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: 10, energyDelta: -5 }
          },
          {
            id: 'c3',
            text: 'Dạy lại cho bạn bè cách tính',
            feedback: 'Tri thức nhân bản = lãi kép tri thức. $(1+r)^n$ applied to knowledge!',
            impact: { moneyDelta: 0, healthDelta: 0, moodDelta: 10, energyDelta: -5 }
          }
        ]
      }
    ]
  }
};
