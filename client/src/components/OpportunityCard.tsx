import { Link } from "react-router-dom";
import type { Opportunity } from "../types";

interface OpportunityCardProps {
  opportunity: Opportunity;
  isSaved: boolean;
  onToggleSaved: (id: number) => void;
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

function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSaved,
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
        <span className={`type-badge type-${opportunity.type}`}>
          {TYPE_LABELS[opportunity.type]}
        </span>
        <span className="work-mode-badge">
          {WORK_MODE_LABELS[opportunity.workMode]}
        </span>
        <span className="location-badge">{opportunity.location}</span>
      </div>

      <div className="skills-row">
        {opportunity.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="opportunity-card-footer">
        <Link
          className="view-details-button"
          to={`/opportunities/${opportunity.id}`}
        >
          View details
        </Link>

        <button
          className={`apply-button ${opportunity.applied ? "applied" : ""}`}
          onClick={() => onApply(opportunity.id)}
          disabled={opportunity.applied || isApplying}
        >
          {opportunity.applied
            ? "Applied"
            : isApplying
              ? "Applying..."
              : "Apply"}
        </button>
      </div>
    </li>
  );
}

export default OpportunityCard;
