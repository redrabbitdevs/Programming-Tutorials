export async function getUser(id) {
  const response = await fetch(`https://api.example.test/users/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
