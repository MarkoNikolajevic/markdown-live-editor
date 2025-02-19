import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  activeView: 'editor' | 'preview';
  toggleSidebar: () => void;
  toggleTheme: () => void;
  toggleView: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      isDarkMode: true,
      activeView: 'editor',
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleView: () => set((state) => ({
        activeView: state.activeView === 'editor' ? 'preview' : 'editor'
      }))
    }),
    {
      name: 'ui-store',
    }
  )
);