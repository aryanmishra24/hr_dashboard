"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCard } from "@/components/UserCard";
import { CreateUserModal } from "@/components/CreateUserModal";
import { Button } from "@/components/ui/Button";
import { useSearch } from "@/hooks/useSearch";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Plus } from "lucide-react";

const departments = [
  "Engineering",
  "HR",
  "Sales",
  "Marketing",
  "Finance",
  "Support",
  "Product",
];
const ratings = [1, 2, 3, 4, 5];

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

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked, bookmarkedUsers } = useBookmarks();

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false));
  }, []);

  // Add department and rating to each user for filtering
  const usersWithMock = users.map((u) => ({
    ...u,
    department: departments[u.id % departments.length],
    rating: (u.id % 5) + 1,
  }));

  const {
    search,
    setSearch,
    selectedDepartments,
    setDepartments,
    selectedRatings,
    setRatings,
    filterUsers,
  } = useSearch(usersWithMock);

  const handleBookmark = (user: User) => {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  const handleView = (userId: number) => {
    router.push(`/employee/${userId}`);
  };

  const handleCreateUser = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
  };

  if (loading) return <div className="text-center text-lg">Loading users...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Employee Performance Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {bookmarkedUsers.length} bookmarked
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Employee
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center md:items-end">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-80 dark:bg-gray-800 dark:border-gray-700"
        />
        <div className="flex gap-4 flex-wrap">
          <div>
            <div className="font-semibold text-xs mb-1">Department</div>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dep) => (
                <label key={dep} className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dep)}
                    onChange={() => {
                      setDepartments(
                        selectedDepartments.includes(dep)
                          ? selectedDepartments.filter((d) => d !== dep)
                          : [...selectedDepartments, dep]
                      );
                    }}
                  />
                  {dep}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-xs mb-1">Rating</div>
            <div className="flex gap-2 flex-wrap">
              {ratings.map((r) => (
                <label key={r} className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(r)}
                    onChange={() => {
                      setRatings(
                        selectedRatings.includes(r)
                          ? selectedRatings.filter((x) => x !== r)
                          : [...selectedRatings, r]
                      );
                    }}
                  />
                  {r}★
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterUsers().map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={() => handleView(user.id)}
            onBookmark={() => handleBookmark(user)}
            onPromote={() => {}}
            isBookmarked={isBookmarked(user.id)}
          />
        ))}
      </div>

      <CreateUserModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
}
