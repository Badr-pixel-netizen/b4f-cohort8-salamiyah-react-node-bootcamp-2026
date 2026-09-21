import { useEffect, useState } from "react";
import type { Post, PostCategory } from "../types";
import { createPost, fetchPosts, setPostLiked } from "../api";
import PostComposer from "./PostComposer";
import PostFilters from "./PostFilters";
import PostList from "./PostList";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

interface CommunitySectionProps {
  onNotify: (message: string, tone: "success" | "error") => void;
}

function CommunitySection({ onNotify }: CommunitySectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [activeCategory, setActiveCategory] = useState<PostCategory | "all">("all");
  const [searchText, setSearchText] = useState("");
  const [likedOnly, setLikedOnly] = useState(false);
  const [updatingPostId, setUpdatingPostId] = useState<number | null>(null);

  async function loadPosts() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await fetchPosts();
      setPosts(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleCreatePost(content: string, category: PostCategory) {
    const newPost = await createPost(content, category);
    setPosts([newPost, ...posts]);
    onNotify("Your post was published.", "success");
  }

  async function handleToggleLike(post: Post) {
    setUpdatingPostId(post.id);

    try {
      const updated = await setPostLiked(post.id, !post.liked);

      const updatedPosts = posts.map((existingPost) => {
        if (existingPost.id === updated.id) {
          return updated;
        }

        return existingPost;
      });

      setPosts(updatedPosts);
    } catch {
      onNotify("Could not update your like. Please try again.", "error");
    } finally {
      setUpdatingPostId(null);
    }
  }

  const search = searchText.toLowerCase();

  const visiblePosts = posts.filter((post) => {
    let matchesCategory = false;

    if (activeCategory === "all") {
      matchesCategory = true;
    } else if (post.category === activeCategory) {
      matchesCategory = true;
    }

    const matchesSearch =
      post.author.toLowerCase().includes(search) || post.content.toLowerCase().includes(search);

    let matchesLiked = true;

    if (likedOnly && !post.liked) {
      matchesLiked = false;
    }

    return matchesCategory && matchesSearch && matchesLiked;
  });

  return (
    <section className="panel community-panel">
      <div className="panel-header">
        <h2 className="panel-title">Community</h2>

        {!isLoading && !hasError && <PostComposer onSubmit={handleCreatePost} />}

        {!isLoading && !hasError && (
          <PostFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchText={searchText}
            onSearchChange={setSearchText}
            likedOnly={likedOnly}
            onLikedOnlyChange={setLikedOnly}
            visibleCount={visiblePosts.length}
            totalCount={posts.length}
          />
        )}
      </div>

      <div className="panel-scroll">
        {isLoading && <LoadingMessage label="Loading the community feed..." />}

        {!isLoading && hasError && (
          <ErrorMessage
            message="We could not load the community feed. Please check your connection and try again."
            onRetry={loadPosts}
          />
        )}

        {!isLoading &&
          !hasError &&
          (visiblePosts.length === 0 ? (
            <EmptyState message="No posts match your filters right now." />
          ) : (
            <PostList
              posts={visiblePosts}
              onToggleLike={handleToggleLike}
              updatingPostId={updatingPostId}
            />
          ))}
      </div>
    </section>
  );
}

export default CommunitySection;
