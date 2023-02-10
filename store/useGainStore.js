import { create } from 'zustand';

export const useGainStore = create((set) => ({
    gainValue: 1,
    setGainValue: (gainValue) => set(() => ({ gainValue })),
}));
