import PageContainer from "@/components/layout/page-container";

import { ProfileSettings } from "./components/profile-settings";

function ProfileView() {
  return (
    <PageContainer
      pageTitle="Profile"
      pageDescription="Manage your profile settings and information"
    >
      <ProfileSettings />
    </PageContainer>
  );
}

export { ProfileView };
