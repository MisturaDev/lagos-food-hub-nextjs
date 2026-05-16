"use client";

import { useSyncExternalStore } from "react";
import { getAccountName, getActiveRole } from "@/lib/ui-session";
import { Role } from "@/lib/ui";

function subscribe() {
  return () => {};
}

export function useAccountName() {
  return useSyncExternalStore(subscribe, getAccountName, () => "User");
}

export function useActiveRole() {
  return useSyncExternalStore(subscribe, getActiveRole, () => null as Role | null);
}
