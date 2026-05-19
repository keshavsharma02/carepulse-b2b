import { create } from 'zustand';

interface ReportsState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const useReportsStore = create<ReportsState>((set) => ({
  searchTerm: '',
  setSearchTerm: (value) => set({ searchTerm: value }),
}));
