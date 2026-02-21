"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { login } from "../login";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Login attempt:", { email, password });
      const data = await login(email, password);

      console.log(data);

      router.push("/");
    } catch (err: unknown) {
      setError(err.message ?? "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-dvh items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-card border-border max-sm:bg-background rounded-2xl border p-8 shadow-xl max-sm:rounded-none max-sm:border-none max-sm:p-4 max-sm:shadow-none">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-center text-3xl font-bold">Sign In</h1>

            <p className="text-muted-foreground text-center text-sm">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border-destructive/30 text-destructive rounded-lg border p-3 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground font-semibold">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                inputMode="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <Button type="submit" variant="primary" size="xl" disabled={isLoading} className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : "SIGN IN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
