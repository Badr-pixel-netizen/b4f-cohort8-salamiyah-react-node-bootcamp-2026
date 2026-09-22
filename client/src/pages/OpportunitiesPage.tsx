import OpportunitiesSection from "../components/OpportunitiesSection";

interface OpportunitiesPageProps {
  onNotify: (message: string, tone: "success" | "error") => void;
}

// Thin page wrapper, same idea as CommunityPage: OpportunitiesSection keeps
// doing the real work, this file just gives <Route> something to render at
// /opportunities.
function OpportunitiesPage({ onNotify }: OpportunitiesPageProps) {
  return <OpportunitiesSection onNotify={onNotify} />;
}

export default OpportunitiesPage;
