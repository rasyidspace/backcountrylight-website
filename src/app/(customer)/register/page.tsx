import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Register | Backcountry Light",
  description: "Create your Backcountry Light account.",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh] py-12">
      <div className="mx-auto w-full max-w-[450px] space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-heading font-medium tracking-tight">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to create your account
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required className="bg-background" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="hello@example.com" required className="bg-background" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="bg-background" />
            </div>
          </div>
          
          <Button size="lg" className="w-full rounded-none" asChild>
            <Link href="/">Create Account</Link>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
        </div>
        
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
