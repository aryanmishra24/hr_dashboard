"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";
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
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone?: string;
}

type TabType = "overview" | "projects" | "feedback";

const departments = ["Engineering", "HR", "Sales", "Marketing", "Finance", "Support", "Product"];

function getRandomDepartment(id: number) {
  return departments[id % departments.length];
}

function getRandomRating(id: number) {
  return (id % 5) + 1;
}

function getMockAddress(id: number) {
  const addresses = [
    { address: "123 Main St", city: "New York", state: "NY", postalCode: "10001" },
    { address: "456 Oak Ave", city: "Los Angeles", state: "CA", postalCode: "90210" },
    { address: "789 Pine Rd", city: "Chicago", state: "IL", postalCode: "60601" },
  ];
  return addresses[id % addresses.length];
}

function getMockPhone(id: number) {
  return `+1 (555) ${String(id).padStart(3, '0')}-${String(id * 2).padStart(4, '0')}`;
}

function getMockBio(id: number) {
  const bios = [
    "Experienced professional with a strong track record in team leadership and project management. Passionate about innovation and continuous improvement.",
    "Dedicated team player with excellent communication skills and a proven ability to deliver results under pressure.",
    "Creative problem solver with expertise in strategic planning and cross-functional collaboration.",
  ];
  return bios[id % bios.length];
}

function getMockPerformanceHistory(id: number) {
  const history = [];
  for (let i = 0; i < 6; i++) {
    history.push({
      period: `Q${4 - i}`,
      rating: Math.max(1, Math.min(5, getRandomRating(id + i))),
      feedback: `Good performance in ${departments[(id + i) % departments.length]} projects.`,
    });
  }
  return history.reverse();
}

function getMockProjects(id: number) {
  const projects = [
    { name: "Website Redesign", status: "completed", role: "Lead Developer", duration: "3 months" },
    { name: "Mobile App Launch", status: "in-progress", role: "Project Manager", duration: "6 months" },
    { name: "Database Migration", status: "completed", role: "Backend Developer", duration: "2 months" },
  ];
  return projects.slice(0, (id % 3) + 1);
}

function getMockFeedback(id: number) {
  const feedback = [
    { from: "Manager", rating: 4, comment: "Excellent work ethic and team collaboration skills.", date: "2024-01-15" },
    { from: "Peer", rating: 5, comment: "Always willing to help and share knowledge.", date: "2024-01-10" },
    { from: "Client", rating: 4, comment: "Delivered project on time with high quality.", date: "2024-01-05" },
  ];
  return feedback.slice(0, (id % 3) + 1);
}

export default function EmployeeDetailPage() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  useEffect(() => {
    if (!params.id) return;
    
    setLoading(true);
    fetch(`https://dummyjson.com/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        const userWithMock = {
          ...data,
          department: getRandomDepartment(data.id),
          rating: getRandomRating(data.id),
          address: getMockAddress(data.id),
          phone: getMockPhone(data.id),
        };
        setUser(userWithMock);
      })
      .catch(() => setError("Failed to load employee details."))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="text-center text-lg">Loading employee details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!user) return <div className="text-center text-red-500">Employee not found</div>;

  const performanceHistory = getMockPerformanceHistory(user.id);
  const projects = getMockProjects(user.id);
  const feedback = getMockFeedback(user.id);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="secondary" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <div className="text-center">
            {user.image && (
              <Image
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <RatingStars rating={user.rating || 0} />
              <Badge color={user.rating && user.rating >= 4 ? "success" : user.rating === 3 ? "warning" : "danger"}>
                {user.rating} / 5
              </Badge>
            </div>
            <Badge color="info" className="mb-4">{user.department}</Badge>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{user.address?.address}, {user.address?.city}, {user.address?.state} {user.address?.postalCode}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Age: {user.age}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex border-b mb-6">
          {(["overview", "projects", "feedback"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Bio</h3>
              <p className="text-gray-600">{getMockBio(user.id)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance History</h3>
              <div className="space-y-3">
                {performanceHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div>
                      <div className="font-medium">{item.period}</div>
                      <div className="text-sm text-gray-500">{item.feedback}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={item.rating} />
                      <Badge color={item.rating >= 4 ? "success" : item.rating === 3 ? "warning" : "danger"}>
                        {item.rating}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  <Badge color={project.status === "completed" ? "success" : "warning"}>
                    {project.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Role: {project.role} • Duration: {project.duration}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="space-y-4">
            {feedback.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">From: {item.from}</div>
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </div>
                  <RatingStars rating={item.rating} />
                </div>
                <p className="text-gray-600">{item.comment}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
} 