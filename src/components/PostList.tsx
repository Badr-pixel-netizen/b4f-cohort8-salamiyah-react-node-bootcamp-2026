import type { Post } from "../types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  onToggleLike: (post: Post) => void;
  updatingPostId: number | null;
}

function PostList({ posts, onToggleLike, updatingPostId }: PostListProps) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onToggleLike={onToggleLike}
          isUpdating={updatingPostId === post.id}
        />
      ))}
    </ul>
  );
}

export default PostList;
