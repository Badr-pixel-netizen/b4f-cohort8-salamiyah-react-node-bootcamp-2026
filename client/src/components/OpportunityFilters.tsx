import type { ChangeEvent } from "react";
import type { OpportunityType, WorkMode } from "../types";

interface OpportunityFiltersProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  typeFilter: OpportunityType | "all";
  onTypeChange: (value: OpportunityType | "all") => void;
  workModeFilter: WorkMode | "all";
  onWorkModeChange: (value: WorkMode | "all") => void;
  savedOnly: boolean;
  onSavedOnlyChange: (value: boolean) => void;
  visibleCount: number;
  totalCount: number;
}

function OpportunityFilters({
  searchText,
  onSearchChange,
  typeFilter,
  onTypeChange,
  workModeFilter,
  onWorkModeChange,
  savedOnly,
  onSavedOnlyChange,
  visibleCount,
  totalCount,
}: OpportunityFiltersProps) {
  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  function handleTypeSelect(event: ChangeEvent<HTMLSelectElement>) {
    onTypeChange(event.target.value as OpportunityType | "all");
  }

  function handleWorkModeSelect(event: ChangeEvent<HTMLSelectElement>) {
    onWorkModeChange(event.target.value as WorkMode | "all");
  }

  function handleSavedOnlyToggle(event: ChangeEvent<HTMLInputElement>) {
    onSavedOnlyChange(event.target.checked);
  }

  return (
    <div className="opportunity-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search title, company, or skill..."
        value={searchText}
        onChange={handleSearchInput}
      />

      <div className="opportunity-filters-row">
        <select className="filter-select" value={typeFilter} onChange={handleTypeSelect}>
          <option value="all">All types</option>
          <option value="job">Job</option>
          <option value="internship">Internship</option>
          <option value="scholarship">Scholarship</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <select className="filter-select" value={workModeFilter} onChange={handleWorkModeSelect}>
          <option value="all">All work modes</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>

        <label className="saved-only-toggle">
          <input type="checkbox" checked={savedOnly} onChange={handleSavedOnlyToggle} />
          Saved only
        </label>
      </div>

      <p className="filters-count">
        {visibleCount} of {totalCount} opportunities shown
      </p>
    </div>
  );
}

export default OpportunityFilters;
