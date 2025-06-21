"use client";
import { UserCard } from "@/components/UserCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Button } from "@/components/ui/Button";

export default function BookmarksPage() {
  const { bookmarkedUsers, removeBookmark, clearBookmarks } = useBookmarks();

  const handleRemoveBookmark = (userId: number) => {
    removeBookmark(userId);
  };

  const handlePromote = (userId: number) => {
    // TODO: Implement promote logic
    console.log("Promote user:", userId);
  };

  if (bookmarkedUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Bookmarks</h1>
        <p className="text-gray-500 mb-4">No bookmarked employees yet.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bookmarked Employees</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={clearBookmarks}>
            Clear All
          </Button>
          <div className="text-sm text-gray-500 flex items-center">
            {bookmarkedUsers.length} bookmarked
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookmarkedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={() => {}}
            onBookmark={() => handleRemoveBookmark(user.id)}
            onPromote={() => handlePromote(user.id)}
            isBookmarked={true}
          />
        ))}
      </div>
    </div>
  );
} 