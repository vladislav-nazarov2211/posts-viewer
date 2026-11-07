import { useState } from "react";
import { fetchPosts, type Post } from "./api/posts";
import { PostList } from "./components/PostList";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPosts([]);
    setError(null);
  };

  return (
    <main className="app">
      <h1>Posts Viewer</h1>

      <div className="controls">
        <button onClick={handleShow} disabled={loading}>
          {loading ? "Загрузка..." : "Показать"}
        </button>
        <button onClick={handleClear} disabled={loading || posts.length === 0}>
          Очистить
        </button>
      </div>

      {error && (
        <p className="error" role="alert">
          Ошибка: {error}
        </p>
      )}

      <PostList posts={posts} />
    </main>
  );
}

export default App;
