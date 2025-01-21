import { create } from 'zustand';

import { UserType } from './interface';

interface State {
  user: UserType | null;
  setUser: (value: UserType | null) => void;
  openBar: boolean;
  setOpenBar: (value: boolean) => void;
  message: string;
  severity: string;
  errorMessage: (value: string) => void;
  successMessage: (value: string) => void;
  closeMessage: () => void;
  token: string;
  setToken: (value: string) => void;
}

export const useStore = create<State>((set) => ({
  user: null,
  setUser: (user: UserType | null) => set(() => ({ user })),
  token: '',
  setToken: (newToken :string) => set(() => ({token: newToken})),
  openBar: false,
  setOpenBar: (bool: boolean) => set(() => ({ openBar: bool })),
  message: '',
  severity: '',
  errorMessage: (newMessage: string) =>
    set(() => ({
      openBar: true,
      message: newMessage,
      severity: 'error',
    })),
  successMessage: (newMessage: string) =>
    set(() => ({
      openBar: true,
      message: newMessage,
      severity: 'success',
    })),
  closeMessage: () => set(() => ({ message: '', openBar: false })),
  // messages: [],
  // addMessage: (message: string) =>
  //   set((state) => {
  //     return {
  //       messages: [...state.messages, message],
  //     };
  //   }),
}));
