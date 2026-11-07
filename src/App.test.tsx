import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchPosts } from "./api/posts";

vi.mock("./api/posts", () => ({
  fetchPosts: vi.fn(),
}));

const mockedFetchPosts = vi.mocked(fetchPosts);

const samplePosts = [
  { userId: 1, id: 1, title: "Первый пост", body: "Текст первого" },
  { userId: 1, id: 2, title: "Второй пост", body: "Текст второго" },
];

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('загружает и отображает посты по клику на "Показать"', async () => {
    mockedFetchPosts.mockResolvedValueOnce(samplePosts);
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "Показать" }));

    expect(await screen.findByText("Первый пост")).toBeInTheDocument();
    expect(screen.getByText("Второй пост")).toBeInTheDocument();
    expect(mockedFetchPosts).toHaveBeenCalledTimes(1);
  });

  it("показывает ошибку, если запрос упал", async () => {
    mockedFetchPosts.mockRejectedValueOnce(new Error("Request failed: 500"));
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "Показать" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Ошибка: Request failed: 500");
  });

  it('очищает список по клику на "Очистить"', async () => {
    mockedFetchPosts.mockResolvedValueOnce(samplePosts);
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "Показать" }));
    expect(await screen.findByText("Первый пост")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Очистить" }));

    await waitFor(() => {
      expect(screen.queryByText("Первый пост")).not.toBeInTheDocument();
    });
  });
});
