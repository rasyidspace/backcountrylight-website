"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerUser, null);

  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh] py-12">
      <div className="mx-auto w-full max-w-[450px] space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-heading font-medium tracking-tight">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to create your account
          </p>
        </div>
        
        <form action={action} className="space-y-6">
          {state?.error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm text-center font-medium">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" name="firstName" placeholder="John" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" name="lastName" placeholder="Doe" required className="bg-background" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="hello@example.com" required className="bg-background" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="bg-background" />
            </div>
          </div>
          
          <Button type="submit" size="lg" className="w-full rounded-none" disabled={isPending}>
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
        </form>
        
        <div className="text-center text-sm text-muted-foreground border-t pt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground hover:underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
