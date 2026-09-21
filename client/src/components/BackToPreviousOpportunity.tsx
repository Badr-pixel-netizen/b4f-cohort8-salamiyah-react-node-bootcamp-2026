import type { Opportunity } from "../types";

interface BackToPreviousOpportunityProps {
  previousOpportunity: Opportunity | null;
  onBack: () => void;
}

// Purely a display component: it shows a Back control ONLY when the caller
// has something to go back to (a non-empty Stack), and stays completely
// hidden otherwise. All Stack logic lives in OpportunitiesSection.
function BackToPreviousOpportunity({ previousOpportunity, onBack }: BackToPreviousOpportunityProps) {
  if (!previousOpportunity) {
    return null;
  }

  return (
    <button className="back-to-previous-button" onClick={onBack}>
      ← Back to {previousOpportunity.title}
    </button>
  );
}

export default BackToPreviousOpportunity;
