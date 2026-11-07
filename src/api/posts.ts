import { z } from "zod";

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const PostsSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data: unknown = await res.json();

  return PostsSchema.parse(data);
}
