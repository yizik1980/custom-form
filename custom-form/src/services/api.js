const BASE = 'http://localhost:4500';

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export function listItems() {
  return request('/api/items');
}

export function getItem(id) {
  return request(`/api/items/${id}`);
}

export function createItem(item) {
  return request('/api/items', {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export function updateItem(id, patch) {
  return request(`/api/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(patch),
  });
}

export function deleteItem(id) {
  return request(`/api/items/${id}`, {
    method: 'DELETE',
  });
}

export default { listItems, getItem, createItem, updateItem, deleteItem };
