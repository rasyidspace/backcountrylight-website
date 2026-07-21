import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Login | Backcountry Light",
  description: "Login to your Backcountry Light account.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh] py-12">
      <div className="mx-auto w-full max-w-[400px] space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-heading font-medium tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email to sign in to your account
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="hello@example.com" required className="bg-background" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs font-medium text-muted-foreground hover:text-foreground">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required className="bg-background" />
            </div>
          </div>
          
          <Button size="lg" className="w-full rounded-none" asChild>
            <Link href="/">Sign In</Link>
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground border-t pt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-foreground hover:underline underline-offset-4">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
