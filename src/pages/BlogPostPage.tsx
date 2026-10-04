import {
  PortableText,
  type PortableTextComponents,
  type PortableTextTypeComponentProps,
} from "@portabletext/react";
import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

import BlogFontToggle from "../components/BlogFontToggle";
import { ColorModeButton } from "../components/ui/color-mode";
import {
  getPostBySlug,
  type BlogPost,
  type BlogPostImage,
} from "../lib/sanity";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const portableTextComponents = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<BlogPostImage>) => (
      <figure>
        <img src={value.url} alt={value.alt || ""} />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
} satisfies PortableTextComponents;

interface BlogPostContentProps {
  slug: string;
}

function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getPostBySlug(slug)
      .then((article) => {
        if (!isCurrent) return;
        setPost(article);
        document.title = article
          ? `${article.title} — Raghav Mangalapalli`
          : "Article not found — Raghav Mangalapalli";
      })
      .catch(() => {
        if (isCurrent) setError(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
      document.title = "Raghav Mangalapalli";
    };
  }, [slug]);

  return (
    <main className="blog-shell blog-shell--article">
      <header className="blog-header">
        <Link className="blog-back-link" to="/blog">
          <LuArrowLeft aria-hidden="true" />
          All writing
        </Link>
        <div className="blog-header__actions">
          <BlogFontToggle />
          <ColorModeButton className="theme-toggle" size="xs" />
        </div>
      </header>

      {isLoading && <p className="blog-status">Loading article…</p>}

      {error && (
        <p className="blog-status">
          This article could not be loaded. Please try again shortly.
        </p>
      )}

      {!isLoading && !error && !post && (
        <section className="blog-not-found">
          <p className="blog-kicker">404 / Not found</p>
          <h1>This article isn’t here.</h1>
          <Link className="inline-link" to="/blog">
            Return to all writing
          </Link>
        </section>
      )}

      {post && (
        <article className="blog-article">
          <header className="blog-article__header">
            <div className="blog-article__meta">
              <time dateTime={post.publishedAt}>
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
              {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
          </header>

          {post.coverImageUrl && (
            <img
              className="blog-article__cover"
              src={post.coverImageUrl}
              alt={post.coverImageAlt || ""}
            />
          )}

          {post.body?.length ? (
            <div className="blog-article__body">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          ) : null}
        </article>
      )}
    </main>
  );
}

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  return <BlogPostContent key={slug} slug={slug} />;
}
