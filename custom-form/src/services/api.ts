const BASE = 'http://localhost:4500/api';

export type Item = {
  id?: number;
  name: string;
  data?: unknown;
  createdAt?: string;
};

async function request<T = unknown>(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return (await res.json()) as T;
}

export function listItems() {
  return request<Item[]>('/api/items');
}

export function getItem(id: number) {
  return request<Item>(`/api/items/${id}`);
}

export function createItem(item: { name: string; data?: unknown }) {
  return request<Item>('/api/items', {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export function updateItem(id: number, patch: Partial<Item>) {
  return request<Item>(`/api/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(patch),
  });
}

export function deleteItem(id: number) {
  return request<Item>(`/api/items/${id}`, {
    method: 'DELETE',
  });
}
