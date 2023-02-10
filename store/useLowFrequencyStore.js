import { create } from 'zustand';

export const useLowFrequencyStore = create((set) => ({
    lowFrequencyValue: 300,
    setLowFrequencyValue: (lowFrequencyValue) =>
        set(() => ({ lowFrequencyValue })),
}));
