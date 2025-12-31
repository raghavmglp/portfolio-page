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
  const [imageError, setImageError] = useState(false);

  if (featured) {
    // Featured layout (vertical)
    return (
      <div onClick={onClick} className="cursor-pointer flex flex-col gap-4 p-2">
        {/* Tags first */}
        {post.tags.length > 0 && (
          <Text className="text-sm text-gray-400">{post.tags.join(", ")}</Text>
        )}

        {/* Image */}
        {post.imageLink && !imageError && (
          <img
            src={post.imageLink}
            alt={post.title}
            className="w-full aspect-square object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        )}

        {/* Text section */}
        <div className="flex flex-col gap-1">
          <Text className="font-bold text-2xl">{post.title}</Text>
          <Text className="text-sm text-gray-500">
            {new Date(post.datePublished).toLocaleDateString()}
          </Text>
        </div>
      </div>
    );
  }

  // Small horizontal layout
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-row gap-1 items-center p-2"
    >
      {/* Text part */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        {post.tags.length > 0 && (
          <Text className="text-xs text-gray-500 ">{post.tags.join(", ")}</Text>
        )}
        <Text className="font-semibold text-md">{post.title}</Text>
        <Text className="text-xs text-gray-500">
          {new Date(post.datePublished).toLocaleDateString()}
        </Text>
      </div>

      {/* Image part */}
      {post.imageLink && !imageError && (
        <img
          src={post.imageLink}
          alt={post.title}
          className="w-20 h-20 object-cover"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      )}
    </div>
  );
};

export default PostCard;
