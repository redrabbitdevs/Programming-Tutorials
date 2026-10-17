function addTagImpure(post, tag) {
  post.tags.push(tag);
  return post;
}

function addTag(post, tag) {
  return { ...post, tags: [...post.tags, tag] };
}

const draft = { title: "Hi", tags: ["intro"] };
const tagged = addTag(draft, "js");
console.log(draft.tags, tagged.tags, draft === tagged);

addTagImpure(draft, "oops");
console.log(draft.tags);
