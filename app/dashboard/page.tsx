import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sb_session");

  if (!session) redirect("/login");

  let user: { name: string; email: string } = { name: "Customer", email: "" };
  try {
    user = JSON.parse(session.value);
  } catch {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-1">Here&apos;s an overview of your accounts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Everyday Account</div>
          <div className="text-3xl font-bold">$4,285.50</div>
          <div className="text-xs text-muted-foreground mt-1">BSB 062-000 · Acc 1234-5678</div>
        </div>
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Savings Maximiser</div>
          <div className="text-3xl font-bold text-accent">$18,930.00</div>
          <div className="text-xs text-muted-foreground mt-1">4.5% p.a. · Earning $71/mo</div>
        </div>
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Home Loan</div>
          <div className="text-3xl font-bold">$342,800.00</div>
          <div className="text-xs text-muted-foreground mt-1">5.89% p.a. · $1,950/mo repayment</div>
        </div>
      </div>

      <div className="flex gap-4">
        <form action="/api/logout" method="POST">
          <Link
            href="/api/logout"
            className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-4"
          >
            Sign Out
          </Link>
        </form>
        <Link
          href="/"
          className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-4"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
