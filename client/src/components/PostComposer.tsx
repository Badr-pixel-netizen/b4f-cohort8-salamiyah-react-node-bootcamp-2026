import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { PostCategory } from "../types";

interface PostComposerProps {
  onSubmit: (content: string, category: PostCategory) => Promise<void>;
}

const MIN_LENGTH = 3;
const MAX_LENGTH = 2000;

const CATEGORY_OPTIONS: { value: PostCategory; label: string }[] = [
  { value: "community", label: "Community" },
  { value: "announcement", label: "Announcement" },
  { value: "event", label: "Event" },
  { value: "resource", label: "Resource" },
];

function PostComposer({ onSubmit }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("community");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value as PostCategory);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (trimmedContent.length < MIN_LENGTH) {
      setFormError(`Post must be at least ${MIN_LENGTH} characters.`);
      return;
    }

    if (trimmedContent.length > MAX_LENGTH) {
      setFormError(`Post must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      await onSubmit(trimmedContent, category);
      setContent("");
      setCategory("community");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not publish your post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="post-composer" onSubmit={handleSubmit}>
      <textarea
        className="post-composer-input"
        placeholder="Share something with the community..."
        value={content}
        onChange={handleContentChange}
        rows={3}
      />

      <div className="post-composer-row">
        <select className="post-composer-select" value={category} onChange={handleCategoryChange}>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button className="post-composer-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>

      {formError !== "" && <p className="form-error">{formError}</p>}
    </form>
  );
}

export default PostComposer;
