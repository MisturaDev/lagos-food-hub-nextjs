import { Role } from "@/lib/ui";

export const ACTIVE_ROLE_KEY = "lfh_active_role";
export const ACCOUNT_NAME_KEY = "lfh_account_name";
export const PROFILE_KEY = "lfh_profile";

export type ProfileState = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
};

export function getActiveRole(): Role | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(ACTIVE_ROLE_KEY) as Role | null) ?? null;
}

export function setActiveRole(role: Role) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_ROLE_KEY, role);
}

export function getAccountName() {
  if (typeof window === "undefined") return "User";
  return localStorage.getItem(ACCOUNT_NAME_KEY) || "User";
}

export function setAccountName(name: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCOUNT_NAME_KEY, name.trim() || "User");
}

export function getProfile(): ProfileState {
  if (typeof window === "undefined") {
    return { fullName: "", email: "", phone: "", location: "", bio: "" };
  }

  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return { fullName: "", email: "", phone: "", location: "", bio: "" };

  try {
    const parsed = JSON.parse(raw) as Partial<ProfileState>;
    return {
      fullName: parsed.fullName ?? "",
      email: parsed.email ?? "",
      phone: parsed.phone ?? "",
      location: parsed.location ?? "",
      bio: parsed.bio ?? "",
    };
  } catch {
    return { fullName: "", email: "", phone: "", location: "", bio: "" };
  }
}

export function setProfile(profile: ProfileState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
