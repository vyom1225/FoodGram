"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SignupPage from "@/components/SignupPage"
import { useAuthStore } from "@/lib/store/useAuthStore"

export default function Signup() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (user) {
      router.push('/');
    }
  }, [user, router]);


  return <SignupPage />;
} 