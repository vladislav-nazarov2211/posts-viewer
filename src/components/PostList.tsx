import type { Post } from '../api/posts';

type Props = {
  posts: Post[];
};

export function PostList({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}