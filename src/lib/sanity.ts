import { createClient } from "@sanity/client";
import type { PortableTextBlock, TypedObject } from "@portabletext/types";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-10-04",
      useCdn: true,
    })
  : null;

export interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  tags?: string[];
  coverImageUrl?: string;
}

export interface BlogPost extends BlogPostSummary {
  coverImageAlt?: string;
  body?: Array<PortableTextBlock | BlogPostImage>;
}

export interface BlogPostImage extends TypedObject {
  _type: "image";
  url: string;
  alt?: string;
  caption?: string;
}

export const isSanityConfigured = Boolean(client);

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  if (!client) return [];

  return client.fetch(`
    *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      tags,
      "coverImageUrl": coverImage.asset->url
    }
  `);
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (!client) return null;

  return client.fetch(
    `
      *[
        _type == "post" &&
        slug.current == $slug &&
        defined(publishedAt) &&
        publishedAt <= now()
      ][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        tags,
        "coverImageUrl": coverImage.asset->url,
        "coverImageAlt": coverImage.alt,
        body[]{
          ...,
          _type == "image" => {
            ...,
            "url": asset->url
          }
        }
      }
    `,
    { slug },
  );
}
