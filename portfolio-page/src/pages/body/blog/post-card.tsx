import React, { useState } from "react";
import type { BlogPost } from "@/models/blog-models";
import { Text } from "@/components/ui/typography";

interface PostCardProps {
  post: BlogPost;
  onClick: () => void;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onClick,
  featured = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError] = useState(false);

  const cardWrapperClass =
    "group cursor-pointer flex p-2 transition-all duration-300 ease-in-out";

  if (featured) {
    return (
      <div onClick={onClick} className={`${cardWrapperClass} flex-col gap-4`}>
        {post.imageLink && !imageError && (
          <div className="overflow-hidden rounded-lg bg-gray-50">
            <img
              src={post.imageLink}
              alt={post.title}
              className="w-full max-w-md h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Text className="font-neuton font-bold text-3xl leading-tight transition-colors duration-300 group-hover:text-gray-500">
            {post.title}
          </Text>
          <Text className="text-sm text-gray-500 uppercase tracking-tight font-ui">
            {new Date(post.datePublished).toLocaleDateString()}
          </Text>
          {post.tags.length > 0 && (
            <Text className="text-xs text-gray-400 uppercase tracking-widest font-ui">
              {post.tags.join(", ")}
            </Text>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${cardWrapperClass} flex-row gap-4 items-center border-b border-transparent hover:bg-gray-50/50`}
    >
      <div className="flex-1 flex flex-col justify-between gap-1">
        <Text className="font-neuton font-semibold text-lg leading-snug transition-colors duration-300 group-hover:text-gray-400">
          {post.title}
        </Text>

        <Text className="font-neuton font-semibold text-lg leading-snug transition-colors duration-300 group-hover:text-gray-400">
          {" "}
          {new Date(post.datePublished).toLocaleDateString()}
        </Text>
      </div>

      {post.imageLink && !imageError && (
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded grayscale group-hover:grayscale-0 transition-all duration-500">
          <img
            src={post.imageLink}
            alt={post.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
