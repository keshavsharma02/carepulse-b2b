import { create } from 'zustand';

export type CalendarViewMode = 'monthly' | 'weekly';

interface ScheduleState {
  viewDate: Date;
  viewMode: CalendarViewMode;
  setViewDate: (date: Date) => void;
  setViewMode: (mode: CalendarViewMode) => void;
  goToToday: () => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}

const shiftMonth = (date: Date, delta: number) =>
  new Date(date.getFullYear(), date.getMonth() + delta, 1);

export const useScheduleStore = create<ScheduleState>((set) => ({
  viewDate: new Date(2024, 9, 1),
  viewMode: 'monthly',
  setViewDate: (date) => set({ viewDate: date }),
  setViewMode: (mode) => set({ viewMode: mode }),
  goToToday: () => set({ viewDate: new Date() }),
  goToPreviousMonth: () => set((state) => ({ viewDate: shiftMonth(state.viewDate, -1) })),
  goToNextMonth: () => set((state) => ({ viewDate: shiftMonth(state.viewDate, 1) })),
}));
