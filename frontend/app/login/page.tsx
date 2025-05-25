"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "@/components/LoginPage"
import { useAuthStore } from "@/lib/store/useAuthStore"

export default function Login() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  console.log(user);

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (user) {
      router.push('/');
    }
  }, [user, router]);

 

  return <LoginPage />;
} 