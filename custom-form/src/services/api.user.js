import { request } from "./api";

export function listUsers() {
  return request("/api/users");
}

export function getUser(id) {
  return request(`/api/users/${id}`);
} 
export function createUser(user) {
  return request("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
} 
export function deleteUser(id) {
  return request(`/api/users/${id}`, {
    method: "DELETE",
  });
} 