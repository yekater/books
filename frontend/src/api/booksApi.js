const API_BASE = "http://localhost:8080/api/books";

export async function fetchBooks(search = "") {
  try {
    const res = await fetch(`${API_BASE}?search=${encodeURIComponent(search)}`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchBook(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createBook(book) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to create book");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateBook(id, book) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteBook(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete book");
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function checkConnection() {
  try {
    const res = await fetch("http://localhost:8080/api/health");
    if (!res.ok) throw new Error("DB connection failed");
    return await res.text();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
