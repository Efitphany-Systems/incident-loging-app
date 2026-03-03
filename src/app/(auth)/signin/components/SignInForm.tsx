"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { usesignIn } from "@/hooks/use-signin";
import { RHFInput } from "@/components/form/RHFInput";

export default function SignInForm() {
  const {
    control,
    signIn,
    formState: { errors, isSubmitting },
  } = usesignIn();

  return (
    <div className="bg-background flex min-h-dvh items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-card border-border max-sm:bg-background rounded-2xl border p-8 shadow-xl max-sm:rounded-none max-sm:border-none max-sm:p-4 max-sm:shadow-none">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-center text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground text-center text-sm">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={signIn} className="space-y-5">
            <RHFInput control={control} name="email" label="Email" placeholder="you@example.com" />
            <RHFInput control={control} name="password" label="Password" placeholder="••••••••" type="password" />

            {errors.root && (
              <p role="alert" className="text-destructive text-center text-sm">
                {errors.root.message}
              </p>
            )}

            <Button type="submit" variant="primary" size="xl" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
