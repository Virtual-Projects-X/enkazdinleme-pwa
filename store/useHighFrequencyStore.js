import { create } from 'zustand';

export const useHighFrequencyStore = create((set) => ({
    highFrequencyValue: 3500,
    setHighFrequencyValue: (highFrequencyValue) =>
        set(() => ({ highFrequencyValue })),
}));
