"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // NextAuth might return 'CredentialsSignin' for generic errors
        if (res.error === 'CredentialsSignin') {
          setError("Invalid email or password");
        } else {
          setError(res.error);
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[400px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-heading font-medium tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email to sign in to your account
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-destructive/15 text-destructive p-3 text-sm flex items-center gap-2 border border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="hello@example.com" 
              required 
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs font-medium text-muted-foreground hover:text-foreground">
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              className="bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <Button type="submit" size="lg" className="w-full rounded-none" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="text-center text-sm text-muted-foreground border-t pt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-foreground hover:underline underline-offset-4">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh] py-12">
      <Suspense fallback={<div className="text-center w-full">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
