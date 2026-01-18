import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { Text } from "@/components/ui/typography";
import ReactMarkdown from "react-markdown";
import { usePostById } from "@/api/queries/blog-queries";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = usePostById(id || "");
  const currentPost = useStore((state) => state.currentPost);
  if (isLoading) return <div className="p-8 font-ui">Loading...</div>;
  if (error || !post) return <div className="p-8 font-ui">Post not found</div>;

  if (!currentPost || currentPost.id !== id) {
    return <div className="p-8 font-ui">Post not found</div>;
  }

  const { title, contentMD, datePublished, tags, imageLink } = currentPost;

  return (
    <div className="mx-auto py-8 space-y-6">
      <div className="flex items-center gap-3">
        {tags.length > 0 && (
          <Text className="font-ui text-[12px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-bold">
            {tags.join(" • ")}
          </Text>
        )}

        {tags.length > 0 && (
          <span className="text-gray-300 dark:text-gray-600 select-none">
            •
          </span>
        )}

        <Text className="font-ui text-[12px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-bold">
          {new Date(datePublished).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </div>

      <Text className=" font-neuton text-4xl font-bold leading-tight">
        {title}
      </Text>

      {imageLink && (
        <img
          src={imageLink}
          alt={title}
          className="w-full h-auto max-h-[600px] object-contain rounded-md bg-gray-50 dark:bg-zinc-900"
        />
      )}

      <div className="font-neuton text-md prose dark:prose-invert max-w-full whitespace-pre-line text-lg leading-relaxed">
        <ReactMarkdown>{contentMD}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostPage;
