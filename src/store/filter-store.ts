import { create } from 'zustand';

interface FilterState {
  status: string;
  gender: string;
  page: number;
}

interface FilterStore extends FilterState {
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  status: '',
  gender: '',
  page: 1,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set(initialState),
}));
