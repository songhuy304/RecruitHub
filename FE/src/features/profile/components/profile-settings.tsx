"use client";

import { useUser } from "@/hooks/useUser";

import { UpdateProfileForm } from "../forms/update-profile-form";
import { ProfileSectionCard } from "./profile-section-card";
import { SecuritySettings } from "./security-settings";

const FALLBACK_PROFILE = {
  fullName: "Huy Dang",
  email: "huy.dang@example.com",
  avatarUrl: "",
};

export function ProfileSettings() {
  const { user } = useUser();

  const defaultValues = {
    fullName: user?.fullName ?? FALLBACK_PROFILE.fullName,
    email: user?.email ?? FALLBACK_PROFILE.email,
    avatarUrl: user?.avatar ?? FALLBACK_PROFILE.avatarUrl,
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <ProfileSectionCard
        title="Profile"
        description="Update your personal information and profile picture."
      >
        <UpdateProfileForm defaultValues={defaultValues} />
      </ProfileSectionCard>

      <SecuritySettings />
    </div>
  );
}
