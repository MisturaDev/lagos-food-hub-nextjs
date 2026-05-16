"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Role, roleOptions } from "@/lib/ui";
import { setActiveRole } from "@/lib/ui-session";
import { useAccountName, useActiveRole } from "@/lib/use-ui-session";

export default function DashboardPage() {
  const router = useRouter();
  const selectableRoles = roleOptions.filter((role) => role.value !== "admin");
  const activeRole = useActiveRole();
  const accountName = useAccountName();

  function chooseRole(role: Role) {
    setActiveRole(role);
    router.push(`/${role}`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Dashboard</span>
      </p>

      <section className="mt-4 rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-lime-50 p-8 shadow-sm">
        <Badge tone="success">Workspace Hub</Badge>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#166534] md:text-4xl">
          Welcome, {accountName}
        </h1>
        <p className="mt-2 text-sm font-semibold text-slate-700 md:text-base">
          Active Role: {activeRole ? activeRole[0].toUpperCase() + activeRole.slice(1) : "Not selected"}
        </p>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {selectableRoles.map((role) => (
          <Card key={role.value} title={role.label}>
            <div className="space-y-3">
              <p className="line-clamp-2 text-sm text-slate-600">{role.description}</p>
              <Button onClick={() => chooseRole(role.value)} className="px-3 py-1.5 text-xs">
                Continue as {role.label}
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
