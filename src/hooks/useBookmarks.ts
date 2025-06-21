import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department?: string;
  rating?: number;
  image?: string;
}

interface BookmarkState {
  bookmarkedUsers: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (userId: number) => void;
  isBookmarked: (userId: number) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarks = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedUsers: [],
      addBookmark: (user) => {
        const { bookmarkedUsers } = get();
        if (!bookmarkedUsers.find(u => u.id === user.id)) {
          set({ bookmarkedUsers: [...bookmarkedUsers, user] });
        }
      },
      removeBookmark: (userId) => {
        const { bookmarkedUsers } = get();
        set({ bookmarkedUsers: bookmarkedUsers.filter(u => u.id !== userId) });
      },
      isBookmarked: (userId) => {
        const { bookmarkedUsers } = get();
        return bookmarkedUsers.some(u => u.id === userId);
      },
      clearBookmarks: () => set({ bookmarkedUsers: [] }),
    }),
    {
      name: 'bookmarks-storage',
    }
  )
); 