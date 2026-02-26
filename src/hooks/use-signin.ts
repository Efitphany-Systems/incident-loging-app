"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormValues, SignInPayload, signInSchema } from "@/lib/schema/signin";
import { signin } from "@/app/(auth)/signin/action";

export function usesignIn() {
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const signIn = form.handleSubmit(async (payload: SignInPayload) => {
    try {
      await signin(payload);
      router.replace("/");
    } catch (e) {
      form.setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  });

  return {
    ...form,
    signIn,
  };
}
