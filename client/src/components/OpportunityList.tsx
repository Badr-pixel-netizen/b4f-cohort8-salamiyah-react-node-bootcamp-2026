import type { Opportunity } from "../types";
import OpportunityCard from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: Opportunity[];
  savedIds: Set<number>;
  onToggleSaved: (id: number) => void;
  onApply: (id: number) => void;
  applyingId: number | null;
}

function OpportunityList({
  opportunities,
  savedIds,
  onToggleSaved,
  onApply,
  applyingId,
}: OpportunityListProps) {
  return (
    <ul className="opportunity-list">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.has(opportunity.id)}
          onToggleSaved={onToggleSaved}
          onApply={onApply}
          isApplying={applyingId === opportunity.id}
        />
      ))}
    </ul>
  );
}

export default OpportunityList;
