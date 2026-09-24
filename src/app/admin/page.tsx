import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Package, Users, LayoutList, Tags } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // Fetch some summary stats
  const [productCount, categoryCount, brandCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.brand.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { name: "Total Products", value: productCount, icon: Package },
    { name: "Total Categories", value: categoryCount, icon: LayoutList },
    { name: "Total Brands", value: brandCount, icon: Tags },
    { name: "Total Users", value: userCount, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session?.user?.name || "Admin"}! Here's an overview of your store.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">{stat.name}</h3>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-medium">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Placeholder for future charts or recent orders */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="font-semibold leading-none tracking-tight mb-4">Recent Activity</h3>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
          No recent activity to show yet.
        </div>
      </div>
    </div>
  );
}
