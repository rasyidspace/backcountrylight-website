import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Account Settings | Backcountry Light",
  description: "Manage your account settings.",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-semibold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-8 max-w-2xl">
        <div className="space-y-4">
          <h2 className="text-lg font-medium border-b pb-2">Profile Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue={session.user.name?.split(' ')[0] || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" defaultValue={session.user.name?.split(' ').slice(1).join(' ') || ''} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" defaultValue={session.user.email || ''} disabled />
              <p className="text-xs text-muted-foreground">Email addresses cannot be changed currently.</p>
            </div>
            
            <Button type="button">Save Changes</Button>
          </form>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-medium border-b pb-2">Password</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button type="button" variant="secondary">Update Password</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
