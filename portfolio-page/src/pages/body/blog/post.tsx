// pages/PostPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { Text } from "@/components/ui/typography";
import ReactMarkdown from "react-markdown";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentPost = useStore((state) => state.currentPost);

  if (!currentPost || currentPost.id !== id) {
    return <div>Post not found</div>;
  }

  const { title, contentMD, datePublished, tags, imageLink } = currentPost;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Tags */}
      {tags.length > 0 && (
        <Text className="text-sm text-gray-400 dark:text-gray-500">
          {tags.join(", ")}
        </Text>
      )}

      {/* Title */}
      <Text className="text-3xl font-bold">{title}</Text>

      {/* Date */}
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(datePublished).toLocaleDateString()}
      </Text>

      {/* Featured image */}
      {imageLink && (
        <img
          src={imageLink}
          alt={title}
          className="w-full aspect-square object-cover rounded-md"
        />
      )}

      {/* Content */}
      <div className="prose dark:prose-invert max-w-full">
        <ReactMarkdown>{contentMD}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostPage;
