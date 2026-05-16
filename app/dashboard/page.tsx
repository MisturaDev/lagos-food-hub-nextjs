"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Role, roleOptions } from "@/lib/ui";
import { setActiveRole } from "@/lib/ui-session";
import { useAccountName, useActiveRole, useProfile } from "@/lib/use-ui-session";

const roleStats: Record<Role, Array<{ label: string; value: string }>> = {
  donor: [
    { label: "Total Donations", value: "18" },
    { label: "Meals Shared", value: "740" },
    { label: "Active Donations", value: "3" },
  ],
  beneficiary: [
    { label: "Requests Made", value: "11" },
    { label: "Support Received", value: "8" },
    { label: "Pending Requests", value: "2" },
  ],
  volunteer: [
    { label: "Deliveries Completed", value: "27" },
    { label: "Communities Helped", value: "9" },
    { label: "Open Tasks", value: "4" },
  ],
  admin: [
    { label: "Approvals Processed", value: "56" },
    { label: "Active Assignments", value: "14" },
    { label: "Pending Reviews", value: "6" },
  ],
};

const activityItems = [
  "Donation offer updated for Surulere pickup.",
  "Volunteer dispatch route confirmed for Yaba.",
  "Beneficiary request marked high priority.",
];

const alertItems = [
  "2 pending request confirmations need attention.",
  "Profile completion below 100% may reduce matching speed.",
];

export default function DashboardPage() {
  const router = useRouter();
  const selectableRoles = roleOptions.filter((role) => role.value !== "admin");
  const activeRole = useActiveRole() ?? "volunteer";
  const accountName = useAccountName();
  const profile = useProfile();
  const profileFields = [profile.fullName, profile.email, profile.phone, profile.location, profile.bio];
  const filledFields = profileFields.filter((field) => field.trim().length > 0).length;
  const completion = Math.round((filledFields / profileFields.length) * 100);

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
        <Badge tone="success">Control Center</Badge>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#166534] md:text-4xl">
          Welcome, {accountName}
        </h1>
        <p className="mt-2 text-sm font-semibold text-slate-700 md:text-base">
          Active Role: {activeRole[0].toUpperCase() + activeRole.slice(1)}
        </p>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-4">
        <Card title="Profile Completion">
          <div className="space-y-2">
            <Badge tone={completion >= 75 ? "success" : "warning"}>{completion}% Complete</Badge>
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-[#16A34A] transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </Card>
        {roleStats[activeRole].map((item) => (
          <Card key={item.label} title={item.value} description={item.label}>
            <span className="text-xs text-slate-500">Live role metric</span>
          </Card>
        ))}
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Recent Activity" description="Latest updates from your workspace.">
          <ul className="space-y-2 text-sm text-slate-700">
            {activityItems.map((item) => (
              <li key={item} className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Alerts" description="Items that need quick attention.">
          <ul className="space-y-2 text-sm text-slate-700">
            {alertItems.map((item) => (
              <li key={item} className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-bold text-[#166534]">Role Workspaces</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
    </main>
  );
}
