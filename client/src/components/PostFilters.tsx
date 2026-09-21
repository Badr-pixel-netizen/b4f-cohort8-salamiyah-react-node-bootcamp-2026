import type { ChangeEvent } from "react";
import type { PostCategory } from "../types";

interface PostFiltersProps {
  activeCategory: PostCategory | "all";
  onCategoryChange: (category: PostCategory | "all") => void;
  searchText: string;
  onSearchChange: (value: string) => void;
  likedOnly: boolean;
  onLikedOnlyChange: (value: boolean) => void;
  visibleCount: number;
  totalCount: number;
}

const CATEGORY_CHIPS: { value: PostCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "announcement", label: "Announcements" },
  { value: "event", label: "Events" },
  { value: "community", label: "Community" },
  { value: "resource", label: "Resources" },
];

function PostFilters({
  activeCategory,
  onCategoryChange,
  searchText,
  onSearchChange,
  likedOnly,
  onLikedOnlyChange,
  visibleCount,
  totalCount,
}: PostFiltersProps) {
  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  function handleLikedOnlyToggle(event: ChangeEvent<HTMLInputElement>) {
    onLikedOnlyChange(event.target.checked);
  }

  return (
    <div className="post-filters">
      <div className="category-chips">
        {CATEGORY_CHIPS.map((chip) => (
          <button
            key={chip.value}
            className={`category-chip ${activeCategory === chip.value ? "active" : ""}`}
            onClick={() => onCategoryChange(chip.value)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="post-filters-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search author or content..."
          value={searchText}
          onChange={handleSearchInput}
        />

        <label className="liked-only-toggle">
          <input type="checkbox" checked={likedOnly} onChange={handleLikedOnlyToggle} />
          Liked only
        </label>
      </div>

      <p className="filters-count">
        {visibleCount} of {totalCount} posts shown
      </p>
    </div>
  );
}

export default PostFilters;
