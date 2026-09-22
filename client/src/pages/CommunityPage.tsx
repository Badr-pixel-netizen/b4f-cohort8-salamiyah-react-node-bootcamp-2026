import CommunitySection from "../components/CommunitySection";

interface CommunityPageProps {
  onNotify: (message: string, tone: "success" | "error") => void;
}

// Thin page wrapper: the real work still lives in CommunitySection, which
// hasn't changed at all. This file's only job is to be the thing a <Route>
// renders at /community.
function CommunityPage({ onNotify }: CommunityPageProps) {
  return <CommunitySection onNotify={onNotify} />;
}

export default CommunityPage;
