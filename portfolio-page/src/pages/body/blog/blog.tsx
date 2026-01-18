import React from "react";
import { usePosts } from "@/api/queries/blog-queries";
import PostCard from "./post-card";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import type { BlogPost } from "@/models/blog-models";

const BlogPage: React.FC = () => {
  const { data: posts, isLoading, error } = usePosts();
  const setCurrentPost = useStore((state) => state.setCurrentPost);
  const navigate = useNavigate();

  const WRITING_TAGS = ["essay", "poetry", "story"];
  const REVIEW_TAGS = ["review"];
  const FEATURED_TAGS = [...WRITING_TAGS, ...REVIEW_TAGS];

  const hasTag = (post: BlogPost, tagsToCheck: string[]) =>
    post.tags.some((tag) => tagsToCheck.includes(tag.toLowerCase()));

  const featuredPost = posts?.find((post) => hasTag(post, FEATURED_TAGS));
  const latestWritings = posts
    ?.filter((p) => p.id !== featuredPost?.id && hasTag(p, WRITING_TAGS))
    .slice(0, 4);
  const latestReviews = posts
    ?.filter((p) => p.id !== featuredPost?.id && hasTag(p, REVIEW_TAGS))
    .slice(0, 4);

  if (isLoading) return <div className="p-8 text-center">Loading posts...</div>;
  if (error instanceof Error)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;

  const handleClick = (postId: string) => {
    const post = posts?.find((p) => p.id === postId) || null;
    setCurrentPost(post);
    navigate(`/post/${postId}`);
  };

  // Base class for columns to ensure they look consistent even when empty
  const columnBase =
    "flex flex-col h-full divide-y divide-border border-y border-border min-h-[100px]";

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Featured Column - Spans 2/4 (50%) */}
        <div className={`lg:col-span-2 ${columnBase}`}>
          <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Featured
          </div>
          {featuredPost ? (
            <PostCard
              post={featuredPost}
              onClick={() => handleClick(featuredPost.id)}
              featured
            />
          ) : (
            <div className="p-8 text-gray-400 italic text-center">
              No featured post found.
            </div>
          )}
        </div>

        {/* Writings Column - Spans 1/4 (25%) */}
        <div className={`lg:col-span-1 ${columnBase}`}>
          <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Writings
          </div>
          {latestWritings?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => handleClick(post.id)}
            />
          ))}
          {latestWritings?.length === 0 && (
            <div className="p-4 text-xs text-gray-300">Nothing here yet.</div>
          )}
        </div>

        {/* Reviews Column - Spans 1/4 (25%) */}
        <div className={`lg:col-span-1 ${columnBase}`}>
          <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Reviews
          </div>
          {latestReviews?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => handleClick(post.id)}
            />
          ))}
          {latestReviews?.length === 0 && (
            <div className="p-4 text-xs text-gray-300">Nothing here yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
