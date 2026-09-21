import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  onToggleLike: (post: Post) => void;
  isUpdating: boolean;
}

const CATEGORY_LABELS = {
  announcement: "Announcement",
  event: "Event",
  community: "Community",
  resource: "Resource",
};

function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    return "Just now";
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function PostCard({ post, onToggleLike, isUpdating }: PostCardProps) {
  return (
    <li className="post-card">
      <div className="post-card-header">
        <div className="avatar">{post.avatar}</div>
        <div className="post-card-meta">
          <span className="post-author">{post.author}</span>
          <span className="post-timestamp">{formatRelativeDate(post.createdAt)}</span>
        </div>
        <span className={`category-badge category-${post.category}`}>
          {CATEGORY_LABELS[post.category]}
        </span>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-card-footer">
        <button
          className={`like-button ${post.liked ? "liked" : ""}`}
          onClick={() => onToggleLike(post)}
          disabled={isUpdating}
        >
          {post.liked ? "♥ Liked" : "♡ Like"}
        </button>
        <span className="like-count">
          {post.likes} {post.likes === 1 ? "like" : "likes"}
        </span>
      </div>
    </li>
  );
}

export default PostCard;
