import { create } from "zustand";

interface UserState {
  coins: number;
  level: number;
  setCoins: (coins: number) => void;
  addCoins: (amount: number) => void;
}

export const useStore = create<UserState>((set) => ({
  coins: 0, // Sẽ được sync với database sau khi đăng nhập
  level: 1,
  setCoins: (coins) => set({ coins }),
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
}));
