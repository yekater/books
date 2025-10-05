const API_URL = "http://localhost:8080/api/books";

// Получить список книг с поиском
export const fetchBooks = async (search = "") => {
  const res = await fetch(`${API_URL}?search=${search}`);
  if (!res.ok) throw new Error("Ошибка загрузки книг");
  return res.json();
};

// Получить книгу по ID
export const fetchBookById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Ошибка загрузки книги");
  return res.json();
};

// Создать книгу
export const createBook = async (book) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Ошибка создания книги");
  return res.json();
};

// Обновить книгу
export const updateBook = async (id, book) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Ошибка обновления книги");
  return res.json();
};

// Удалить книгу
export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Ошибка удаления книги");
  return res.json();
};

// Проверка соединения с бэком
export const checkHealth = async () => {
  const res = await fetch("http://localhost:8080/api/health");
  if (!res.ok) throw new Error("Нет соединения с бэком");
  return res.json();
};
