from typing import NotRequired, TypedDict


class Author(TypedDict):
    login: str
    site: NotRequired[str]


class Post(TypedDict):
    id: int
    title: str
    author: Author
    tags: list[str]


def summary(post: Post) -> str:
    author = post["author"]
    site = author.get("site", "no site")
    tags = ", ".join(post["tags"]) or "untagged"
    head = f"#{post['id']} {post['title']}"
    return f"{head} by {author['login']} ({site}) [{tags}]"
