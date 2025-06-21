import { useState } from "react";

export function useSearch<T extends { firstName: string; lastName: string; email: string; department?: string; rating?: number }>(users: T[]) {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  const filterUsers = () => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.department || "").toLowerCase().includes(search.toLowerCase());
      const matchesDepartment =
        departments.length === 0 ||
        (user.department && departments.includes(user.department));
      const matchesRating =
        ratings.length === 0 ||
        (user.rating && ratings.includes(user.rating));
      return matchesSearch && matchesDepartment && matchesRating;
    });
  };

  return {
    search,
    setSearch,
    selectedDepartments: departments,
    setDepartments,
    selectedRatings: ratings,
    setRatings,
    filterUsers,
  };
} 