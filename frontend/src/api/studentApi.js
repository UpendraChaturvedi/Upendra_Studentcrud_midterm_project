const API_BASE = "/students";

const parseJson = async (text) => {
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const handleResponse = async (response) => {
  const text = await response.text();
  const body = await parseJson(text);
  if (!response.ok) {
    const message =
      body?.message || body?.error || text || "API request failed";
    throw new Error(message);
  }
  return response.status === 204 ? null : body;
};

export const fetchStudents = () => fetch(API_BASE).then(handleResponse);

export const createStudent = (student) =>
  fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  }).then(handleResponse);

export const updateStudent = (id, student) =>
  fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  }).then(handleResponse);

export const deleteStudent = (id) =>
  fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
