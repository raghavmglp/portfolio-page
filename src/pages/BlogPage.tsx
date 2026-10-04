import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";

import BlogFontToggle from "../components/BlogFontToggle";
import { ColorModeButton } from "../components/ui/color-mode";
import {
  getAllPosts,
  isSanityConfigured,
  type BlogPostSummary,
} from "../lib/sanity";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(isSanityConfigured);
  const [error, setError] = useState(false);
  const [featuredPost, ...remainingPosts] = posts;

  useEffect(() => {
    document.title = "Blog — Raghav Mangalapalli";
    let isCurrent = true;

    getAllPosts()
      .then((articles) => {
        if (isCurrent) setPosts(articles);
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
  }, []);

  return (
    <main className="blog-shell">
      <header className="blog-header">
        <Link className="blog-back-link" to="/">
          <LuArrowLeft aria-hidden="true" />
          Home
        </Link>
        <div className="blog-header__actions">
          <BlogFontToggle />
          <ColorModeButton className="theme-toggle" size="xs" />
        </div>
      </header>

      <section className="blog-intro">
        <p className="blog-kicker">Articles / Stories / Notes</p>
        <h1>Writing</h1>
        <p>
          Occasional notes on things I find interesting.
        </p>
      </section>

      <section className="blog-index" aria-label="Articles">
        {isLoading && <p className="blog-status">Loading articles…</p>}

        {error && (
          <p className="blog-status">
            Articles could not be loaded. Please try again shortly.
          </p>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <p className="blog-status">
            {isSanityConfigured
              ? "No articles published yet."
              : "The writing desk is being set up. Check back soon."}
          </p>
        )}

        {featuredPost && (
          <article
            className="blog-lead"
            data-has-image={Boolean(featuredPost.coverImageUrl)}
          >
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="blog-lead__copy">
                <div className="blog-card__meta">
                  <span>Latest</span>
                  <time dateTime={featuredPost.publishedAt}>
                    {dateFormatter.format(new Date(featuredPost.publishedAt))}
                  </time>
                </div>
                <h2>{featuredPost.title}</h2>
                {featuredPost.excerpt && <p>{featuredPost.excerpt}</p>}
                <span className="blog-read-link">
                  Read article <LuArrowUpRight aria-hidden="true" />
                </span>
              </div>

              {featuredPost.coverImageUrl && (
                <img src={featuredPost.coverImageUrl} alt="" />
              )}
            </Link>
          </article>
        )}

        {remainingPosts.length > 0 && (
          <div className="blog-grid">
            {remainingPosts.map((post) => (
              <article className="blog-card" key={post._id}>
                <Link to={`/blog/${post.slug}`}>
                  {post.coverImageUrl && (
                    <img src={post.coverImageUrl} alt="" />
                  )}
                  <div className="blog-card__meta">
                    <time dateTime={post.publishedAt}>
                      {dateFormatter.format(new Date(post.publishedAt))}
                    </time>
                    {post.tags?.length ? <span>{post.tags[0]}</span> : null}
                  </div>
                  <div className="blog-card__copy">
                    <h2>{post.title}</h2>
                    {post.excerpt && <p>{post.excerpt}</p>}
                  </div>
                  <LuArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
