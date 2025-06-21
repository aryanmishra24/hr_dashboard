import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export function RatingStars({ rating, className = "" }: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }
          size={18}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
} 