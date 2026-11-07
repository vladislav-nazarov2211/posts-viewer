import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostList } from "./PostList";
import type { Post } from "../api/posts";

const samplePosts: Post[] = [
  { userId: 1, id: 1, title: "Первый пост", body: "Текст первого" },
  { userId: 1, id: 2, title: "Второй пост", body: "Текст второго" },
];

describe("PostList", () => {
  it("не рендерит ничего при пустом массиве", () => {
    const { container } = render(<PostList posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("рендерит заголовки и тела всех постов", () => {
    render(<PostList posts={samplePosts} />);

    expect(screen.getByText("Первый пост")).toBeInTheDocument();
    expect(screen.getByText("Текст первого")).toBeInTheDocument();
    expect(screen.getByText("Второй пост")).toBeInTheDocument();
    expect(screen.getByText("Текст второго")).toBeInTheDocument();
  });

  it("рендерит ровно столько элементов, сколько постов", () => {
    render(<PostList posts={samplePosts} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});
