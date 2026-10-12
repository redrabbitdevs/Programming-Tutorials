import json
from typing import cast

from api_payload import Post, summary

raw = """[
  {"id": 1, "title": "Hello", "author": {"login": "ada"}, "tags": []},
  {"id": 2, "title": "Types", "tags": ["python", "typing"],
   "author": {"login": "bob", "site": "bob.dev"}}
]"""
for post in cast(list[Post], json.loads(raw)):
    print(summary(post))
