"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormValues, loginSchema } from "@/lib/schema/login";
import { login, logout } from "@/features/auth.service";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signinForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const signIn = signinForm.handleSubmit(async ({ email, password }) => {
    try {
      await login(email, password);
      router.replace("/");
    } catch (e) {
      signinForm.setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  });

  const signOut = async () => {
    try {
      setIsSigningOut(true);
      await logout();
      router.replace("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  return {
    ...signinForm,
    signIn,
    signOut,
    isSigningOut,
  };
}
