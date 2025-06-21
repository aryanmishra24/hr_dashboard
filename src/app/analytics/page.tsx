"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useBookmarks } from "@/hooks/useBookmarks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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

const departments = ["Engineering", "HR", "Sales", "Marketing", "Finance", "Support", "Product"];

function getRandomDepartment(id: number) {
  return departments[id % departments.length];
}

function getRandomRating(id: number) {
  return (id % 5) + 1;
}

function getMockBookmarkTrends() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, index) => ({
    month,
    bookmarks: Math.floor(Math.random() * 20) + 10 + index * 2,
  }));
}

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarkedUsers } = useBookmarks();

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const usersWithMock = data.users.map((u: User) => ({
          ...u,
          department: getRandomDepartment(u.id),
          rating: getRandomRating(u.id),
        }));
        setUsers(usersWithMock);
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-lg">Loading analytics...</div>;

  // Calculate department-wise average ratings
  const departmentRatings = departments.map((dept) => {
    const deptUsers = users.filter((u) => u.department === dept);
    const avgRating = deptUsers.length > 0
      ? deptUsers.reduce((sum, u) => sum + (u.rating || 0), 0) / deptUsers.length
      : 0;
    return { department: dept, averageRating: avgRating, count: deptUsers.length };
  });

  // Calculate overall statistics
  const totalUsers = users.length;
  const totalBookmarks = bookmarkedUsers.length;
  const averageRating = users.length > 0
    ? users.reduce((sum, u) => sum + (u.rating || 0), 0) / users.length
    : 0;
  const topPerformers = users.filter((u) => (u.rating || 0) >= 4).length;

  // Chart data for department ratings
  const departmentChartData = {
    labels: departmentRatings.map((d) => d.department),
    datasets: [
      {
        label: "Average Rating",
        data: departmentRatings.map((d) => d.averageRating),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart data for bookmark trends
  const bookmarkTrends = getMockBookmarkTrends();
  const bookmarkChartData = {
    labels: bookmarkTrends.map((t) => t.month),
    datasets: [
      {
        label: "Bookmarks",
        data: bookmarkTrends.map((t) => t.bookmarks),
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <div className="text-sm text-gray-500">Total Employees</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalBookmarks}</div>
            <div className="text-sm text-gray-500">Bookmarked</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-500">Avg Rating</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{topPerformers}</div>
            <div className="text-sm text-gray-500">Top Performers</div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Department Average Ratings</h2>
          <Bar data={departmentChartData} options={chartOptions} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Bookmark Trends</h2>
          <Line data={bookmarkChartData} options={lineChartOptions} />
        </Card>
      </div>

      {/* Department Details */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Department Performance Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentRatings.map((dept) => (
            <div key={dept.department} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{dept.department}</h3>
                <Badge color={dept.averageRating >= 4 ? "success" : dept.averageRating >= 3 ? "warning" : "danger"}>
                  {dept.averageRating.toFixed(1)}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">{dept.count} employees</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 