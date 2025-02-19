import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  isSidebarOpen: boolean;
  isFullscreenPreview: boolean;
  isDarkMode: boolean;
  activeView: 'editor' | 'preview';
  toggleSidebar: () => void;
  toggleTheme: () => void;
  toggleView: () => void;
  toggleFullscreenPreview: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      isFullscreenPreview: false,
      isDarkMode: true,
      activeView: 'editor',
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleView: () => set((state) => ({
        activeView: state.activeView === 'editor' ? 'preview' : 'editor'
      })),
      toggleFullscreenPreview: () => set((state) => ({
        isFullscreenPreview: !state.isFullscreenPreview
      }))
    }),
    {
      name: 'ui-store',
    }
  )
);