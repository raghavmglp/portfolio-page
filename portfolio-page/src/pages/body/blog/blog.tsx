import React from "react";
import { usePosts } from "@/api/queries/blog-queries";
import PostCard from "./post-card";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import type { BlogPost } from "@/models/blog-models";
import { Button } from "@/components/ui/button";

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

  const featured = featuredPost ? [featuredPost] : [];

  const latestWritings = posts
    ?.filter(
      (post) => post.id !== featuredPost?.id && hasTag(post, WRITING_TAGS)
    )
    .slice(0, 4);

  const latestReviews = posts
    ?.filter(
      (post) => post.id !== featuredPost?.id && hasTag(post, REVIEW_TAGS)
    )
    .slice(0, 4);

  if (isLoading) return <div>Loading posts...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!posts || posts.length === 0) return <div>No posts available</div>;

  const handleClick = (postId: string) => {
    const post = posts?.find((p) => p.id === postId) || null;
    setCurrentPost(post as BlogPost | null);
    navigate(`/post/${postId}`);
  };

  const columnClass =
    "flex flex-col h-fit divide-y divide-border border-y border-border";

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 justify-center">
        {/* Featured - 50% width */}
        <div className={`lg:w-1/2 ${columnClass}`}>
          {featured.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => handleClick(post.id)}
              featured
            />
          ))}
        </div>

        {/* Latest Writings - 25% width */}
        <div className={`lg:w-1/4 ${columnClass}`}>
          {latestWritings?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => handleClick(post.id)}
            />
          ))}
        </div>

        {/* Latest Reviews - 25% width */}
        <div className={`lg:w-1/4 ${columnClass}`}>
          {latestReviews?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => handleClick(post.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button className="size-fit rounded-none">
          here's all i've ever written!
        </Button>
      </div>
    </div>
  );
};

export default BlogPage;
