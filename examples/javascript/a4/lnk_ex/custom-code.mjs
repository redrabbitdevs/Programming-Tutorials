export function chooseCode(store, body) {
  if (body.code === undefined) return { status: 201, link: store.add(body.url) };
  if (!/^[a-zA-Z0-9-]{3,20}$/.test(body.code)) {
    return { status: 400, error: "invalid code" };
  }
  const link = store.addWithCode(body.code, body.url);
  return link ? { status: 201, link } : { status: 409, error: "code already taken" };
}
