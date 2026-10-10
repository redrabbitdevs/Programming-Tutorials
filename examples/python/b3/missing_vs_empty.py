POSTS = {"intro": ["python", "basics"], "draft": []}

for post in ["intro", "draft", "ghost"]:
    tags = POSTS.get(post)
    if tags is None:
        print(post, "-> no such post")
    elif not tags:
        print(post, "-> no tags")
    else:
        print(post, "->", ", ".join(tags))
