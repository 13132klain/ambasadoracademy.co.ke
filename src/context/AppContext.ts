import { createContext } from 'react';

export interface AppContextType {
  openAdmissionModal: () => void;
}

export const AppContext = createContext<AppContextType | null>(null); 