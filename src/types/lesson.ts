// Tác động lên Base Model
export interface StatImpact {
  moneyDelta?: number;   // +/- Tiền
  debtDelta?: number;    // +/- Nợ
  healthDelta?: number;  // +/- Sức khỏe
  moodDelta?: number;    // +/- Tinh thần
  energyDelta?: number;  // +/- Năng lượng
}

// Cấu trúc một lựa chọn của người chơi
export interface DecisionChoice {
  id: string;
  text: string;
  impact: StatImpact;
  requirement?: {
    money?: number;
    debt?: number;
    health?: number;
    mood?: number;
    energy?: number;
  };
  feedback?: string; // Lời phản hồi trực tiếp khi chọn đáp án này
  futureEventId?: string; // Gắn mầm mống cho sự kiện tương lai
}

// Phân loại các Slide trong một Bài Học đa bước
export type SlideType = 'STORY' | 'INFO' | 'DECISION' | 'MINIGAME' | 'CHAT' | 'THEOREM' | 'DIAGRAM';

export interface ChatMessage {
  speaker: 'npc' | 'user'; // 'npc' nằm bên trái, 'user' nằm bên phải
  name?: string;
  avatar?: string;
  text: string;
}

export interface SlideData {
  id: string;
  type: SlideType;
  
  // Dành cho slide STORY (Tình huống), INFO (Bổ sung kiến thức), DIAGRAM (Sơ đồ trực quan)
  theme?: 'DEFAULT' | 'NEWS' | 'NOTEBOOK' | 'EMAIL' | 'STANDARD' | 'CYBER';
  title?: string;
  content?: string;
  mathFormula?: string; // Dành riêng cho 'THEOREM'
  image?: string; 
  diagramKey?: string; // Dành cho 'DIAGRAM' hoặc 'INFO' cần chèn sơ đồ
  diagramPosition?: 'bottom' | 'right'; // Vị trí diagram khi nhúng vào STORY/INFO/THEOREM
  
  // Dành cho slide CHAT (Mô phỏng tin nhắn/hội thoại)
  chatMessages?: ChatMessage[];

  // Dành cho slide DECISION (Lựa chọn cuộc sống)
  choices?: DecisionChoice[];

  // Dành cho slide MINIGAME (Giải toán nhận thưởng)
  interactionKey?: string;
  variables?: any;
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  theme?: 'LIGHT' | 'CYBER';
  // Cấu trúc mới: 1 bài học là một chuỗi các slide trượt
  slides: SlideData[];
}

export interface UserStats {
  money: number;
  debt: number;
  health: number;
  mood: number;
  energy: number;
}

export interface InteractionProps {
  variables: any;
  currentStats?: UserStats; // Truyền stats hiện tại vào để UI render nếu cần
  onComplete: (isCorrect: boolean, score: number, impact?: StatImpact) => void;
}
