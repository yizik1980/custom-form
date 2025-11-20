const BASE = "http://localhost:4000";

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return res?.json() || res;
}

export function listItems() {
  return request("/api/inputs");
}

export function getItem(id) {
  return request(`/api/inputs/${id}`);
}

export function createItem(item) {
  return request("/api/inputs", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function updateItem(id, patch) {
  return request(`/api/inputs/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}

export function deleteItem(id) {
  return request(`/api/inputs/${id}`, {
    method: "DELETE",
  });
}

export function listUsers() {
  return request("/api/users");
}

