import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import Image from "next/image";

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

const departments = [
  "Engineering",
  "HR",
  "Sales",
  "Marketing",
  "Finance",
  "Support",
  "Product",
];

function getRandomDepartment(id: number) {
  return departments[id % departments.length];
}

function getRandomRating(id: number) {
  return (id % 5) + 1;
}

export function UserCard({ user, onView, onBookmark, onPromote, isBookmarked = false }: {
  user: User;
  onView?: () => void;
  onBookmark?: () => void;
  onPromote?: () => void;
  isBookmarked?: boolean;
}) {
  const department = user.department || getRandomDepartment(user.id);
  const rating = user.rating || getRandomRating(user.id);
  return (
    <Card className="flex flex-col gap-4 items-center text-center">
      {user.image && (
        <Image
          src={user.image}
          alt={user.firstName + " " + user.lastName}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover mx-auto"
        />
      )}
      <div className="font-bold text-lg">{user.firstName} {user.lastName}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
      <div className="flex gap-2 items-center justify-center">
        <Badge color="info">{department}</Badge>
        <span className="text-xs text-gray-400">Age: {user.age}</span>
      </div>
      <div className="flex items-center gap-2">
        <RatingStars rating={rating} />
        <Badge color={rating >= 4 ? "success" : rating === 3 ? "warning" : "danger"}>
          {rating} / 5
        </Badge>
      </div>
      <div className="flex gap-2 mt-2">
        <Button onClick={onView} variant="secondary">View</Button>
        <Button 
          onClick={onBookmark} 
          variant={isBookmarked ? "danger" : "primary"}
        >
          {isBookmarked ? "Remove" : "Bookmark"}
        </Button>
        <Button onClick={onPromote} variant="danger">Promote</Button>
      </div>
    </Card>
  );
} 