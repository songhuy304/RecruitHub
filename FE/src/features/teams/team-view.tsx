import PageContainer from '@/components/layout/page-container';
import { teamInfoContent } from '@/config/infoconfig';
import { TeamSetupFlow } from './components/team-setup-flow';

function TeamViewPage() {
  return (
    <PageContainer
      pageTitle="Teams"
      pageDescription="Manage your teams and team settings."
      infoContent={teamInfoContent}
    >
      <TeamSetupFlow />
    </PageContainer>
  );
}

export { TeamViewPage };
