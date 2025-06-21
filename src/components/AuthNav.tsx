"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AuthNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <div className="font-medium">{session.user?.name}</div>
          <div className="text-gray-500">{session.user?.role}</div>
        </div>
        <Button variant="secondary" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login" className="hover:underline">
      Login
    </Link>
  );
} 