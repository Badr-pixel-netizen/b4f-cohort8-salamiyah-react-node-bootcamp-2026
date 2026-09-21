import type { Opportunity } from "../types";

interface OpportunityCardProps {
  opportunity: Opportunity;
  isSaved: boolean;
  onToggleSaved: (id: number) => void;
  isExpanded: boolean;
  onToggleExpanded: (id: number) => void;
  onApply: (id: number) => void;
  isApplying: boolean;
}

const TYPE_LABELS = {
  job: "Job",
  internship: "Internship",
  scholarship: "Scholarship",
  volunteer: "Volunteer",
};

const WORK_MODE_LABELS = {
  remote: "Remote",
  hybrid: "Hybrid",
  "on-site": "On-site",
};

function formatDeadline(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSaved,
  isExpanded,
  onToggleExpanded,
  onApply,
  isApplying,
}: OpportunityCardProps) {
  return (
    <li className="opportunity-card">
      <div className="opportunity-card-header">
        <div className="company-logo">{opportunity.companyLogo}</div>
        <div className="opportunity-card-title-block">
          <h3 className="opportunity-title">{opportunity.title}</h3>
          <p className="opportunity-company">{opportunity.company}</p>
        </div>
        <button
          className={`save-button ${isSaved ? "saved" : ""}`}
          onClick={() => onToggleSaved(opportunity.id)}
          aria-label={isSaved ? "Remove from saved" : "Save opportunity"}
        >
          {isSaved ? "★" : "☆"}
        </button>
      </div>

      <div className="opportunity-badges">
        <span className={`type-badge type-${opportunity.type}`}>{TYPE_LABELS[opportunity.type]}</span>
        <span className="work-mode-badge">{WORK_MODE_LABELS[opportunity.workMode]}</span>
        <span className="location-badge">{opportunity.location}</span>
      </div>

      <div className="skills-row">
        {opportunity.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      {isExpanded && (
        <div className="opportunity-details">
          <p className="opportunity-description">{opportunity.description}</p>
          <p className="opportunity-deadline">Apply by {formatDeadline(opportunity.deadline)}</p>
        </div>
      )}

      <div className="opportunity-card-footer">
        <button className="view-details-button" onClick={() => onToggleExpanded(opportunity.id)}>
          {isExpanded ? "Hide details" : "View details"}
        </button>

        <button
          className={`apply-button ${opportunity.applied ? "applied" : ""}`}
          onClick={() => onApply(opportunity.id)}
          disabled={opportunity.applied || isApplying}
        >
          {opportunity.applied ? "Applied" : isApplying ? "Applying..." : "Apply"}
        </button>
      </div>
    </li>
  );
}

export default OpportunityCard;
