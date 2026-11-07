import { describe, it, expect } from "vitest";
import { PostsSchema, PostSchema } from "./posts";

describe("PostsSchema", () => {
  it("принимает валидный массив постов", () => {
    const valid = [{ userId: 1, id: 1, title: "Заголовок", body: "Текст" }];
    expect(() => PostsSchema.parse(valid)).not.toThrow();
  });

  it("отклоняет объект вместо массива", () => {
    const invalid = { userId: 1, id: 1, title: "Заголовок", body: "Текст" };
    expect(() => PostsSchema.parse(invalid)).toThrow();
  });

  it("отклоняет пост с неверным типом поля", () => {
    const invalid = [{ userId: "1", id: 1, title: "Заголовок", body: "Текст" }];
    expect(() => PostsSchema.parse(invalid)).toThrow();
  });
});

describe("PostSchema", () => {
  it("отклоняет пост без обязательного поля", () => {
    const invalid = { userId: 1, id: 1, title: "Заголовок" }; // нет body
    expect(() => PostSchema.parse(invalid)).toThrow();
  });
});
