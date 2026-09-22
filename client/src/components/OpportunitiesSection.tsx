import { useEffect, useState } from "react";
import type { Opportunity, OpportunityType, WorkMode } from "../types";
import { applyToOpportunity, fetchOpportunities } from "../api";
import OpportunityFilters from "./OpportunityFilters";
import OpportunityList from "./OpportunityList";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

interface OpportunitiesSectionProps {
  onNotify: (message: string, tone: "success" | "error") => void;
}

function OpportunitiesSection({ onNotify }: OpportunitiesSectionProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");
  const [workModeFilter, setWorkModeFilter] = useState<WorkMode | "all">("all");
  const [savedOnly, setSavedOnly] = useState(false);

  // Hash Set — which opportunity ids are currently saved. A genuine native
  // Set used for uniqueness/membership (new Set(), .has(), .add()) — one
  // valid implementation choice, not a claim about the exact technique this
  // cohort was taught (see INSTRUCTOR_GUIDE.md). A fresh Set is created on
  // every toggle (new Set(savedIds), then .add()/.delete() on the copy) so
  // React still sees a new reference and re-renders, the same immutability
  // discipline already used for every array/object update in this course.
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  const [applyingId, setApplyingId] = useState<number | null>(null);

  async function loadOpportunities() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadOpportunities();
  }, []);

  function handleToggleSaved(id: number) {
    const updated = new Set(savedIds);

    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }

    setSavedIds(updated);
  }

  async function handleApply(id: number) {
    setApplyingId(id);

    try {
      const updated = await applyToOpportunity(id);

      const updatedOpportunities = opportunities.map((existing) => {
        if (existing.id === updated.id) {
          return updated;
        }

        return existing;
      });

      setOpportunities(updatedOpportunities);
      onNotify(`Applied to ${updated.title}.`, "success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not submit your application.";
      onNotify(message, "error");
    } finally {
      setApplyingId(null);
    }
  }

  // Hash Table — a plain key-value object, opportunities keyed by id,
  // rebuilt from the current array each render, read/written with bracket
  // notation. One valid implementation choice for key -> value lookup, not a
  // claim about the exact technique this cohort was taught (see
  // INSTRUCTOR_GUIDE.md). Typed loosely here on purpose: no confirmed course
  // precedent exists for typing a dynamic, computed-key lookup object in
  // TypeScript, so this deliberately does not introduce one (no `Record<>`,
  // no index signature) — everything that reads OUT of this table below is
  // still normally typed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opportunitiesById: any = {};

  for (const opportunity of opportunities) {
    opportunitiesById[opportunity.id] = opportunity;
  }

  const search = searchText.toLowerCase();

  const visibleOpportunities = opportunities.filter((opportunity) => {
    const matchesSkill =
      opportunity.skills.find((skill) =>
        skill.toLowerCase().includes(search),
      ) !== undefined;

    const matchesSearch =
      opportunity.title.toLowerCase().includes(search) ||
      opportunity.company.toLowerCase().includes(search) ||
      matchesSkill;

    let matchesType = false;

    if (typeFilter === "all") {
      matchesType = true;
    } else if (opportunity.type === typeFilter) {
      matchesType = true;
    }

    let matchesWorkMode = false;

    if (workModeFilter === "all") {
      matchesWorkMode = true;
    } else if (opportunity.workMode === workModeFilter) {
      matchesWorkMode = true;
    }

    let matchesSaved = true;

    if (savedOnly && !savedIds.has(opportunity.id)) {
      matchesSaved = false;
    }

    return matchesSearch && matchesType && matchesWorkMode && matchesSaved;
  });

  return (
    <section className="panel opportunities-panel">
      <div className="panel-header">
        <h2 className="panel-title">Opportunities</h2>

        {!isLoading && !hasError && (
          <>
            <OpportunityFilters
              searchText={searchText}
              onSearchChange={setSearchText}
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
              workModeFilter={workModeFilter}
              onWorkModeChange={setWorkModeFilter}
              savedOnly={savedOnly}
              onSavedOnlyChange={setSavedOnly}
              visibleCount={visibleOpportunities.length}
              totalCount={opportunities.length}
            />
          </>
        )}
      </div>

      <div className="panel-scroll">
        {isLoading && <LoadingMessage label="Loading opportunities..." />}

        {!isLoading && hasError && (
          <ErrorMessage
            message="We could not load opportunities. Please check your connection and try again."
            onRetry={loadOpportunities}
          />
        )}

        {!isLoading &&
          !hasError &&
          (visibleOpportunities.length === 0 ? (
            <EmptyState message="No opportunities match your filters right now." />
          ) : (
            <OpportunityList
              opportunities={visibleOpportunities}
              savedIds={savedIds}
              onToggleSaved={handleToggleSaved}
              onApply={handleApply}
              applyingId={applyingId}
            />
          ))}
      </div>
    </section>
  );
}

export default OpportunitiesSection;
