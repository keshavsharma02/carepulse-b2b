import { create } from 'zustand';
import { patients as seedPatients } from '../data/mockData';
import type { Patient } from '../types';

type ViewMode = 'grid' | 'list';

interface PatientState {
  patients: Patient[];
  searchTerm: string;
  activeView: ViewMode;
  setSearchTerm: (value: string) => void;
  setActiveView: (view: ViewMode) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: seedPatients,
  searchTerm: '',
  activeView: 'grid',
  setSearchTerm: (value) => set({ searchTerm: value }),
  setActiveView: (view) => set({ activeView: view }),
}));
