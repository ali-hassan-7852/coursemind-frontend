const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://coursemaid-ai.onrender.com";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new ApiError("Couldn't reach the server. It may be waking up after being idle — try again in a moment.", 0);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // some responses have no JSON body
  }

  if (!res.ok) {
    const message = data?.detail || "Something went wrong. Please try again.";
    throw new ApiError(message, res.status);
  }

  return data;
}

export function signup(email, password) {
  return request("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function login(email, password) {
  const body = new URLSearchParams({ username: email, password });
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

export function uploadDocument(file, token) {
  const formData = new FormData();
  formData.append("file", file);
  return request("/documents/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}

export function askQuestion(question, token) {
  return request("/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question }),
  });
}

export function deleteDocument(documentId, token) {
  return request(`/documents/${documentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
