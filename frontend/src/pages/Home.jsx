import React, { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pageSize: 5, total: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", tags: "" });

  // Load books
  const fetchBooks = async (page = 1, query = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:8080/api/books?search=${query}&page=${page}&pageSize=${meta.pageSize}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setBooks(json.data);
      setMeta(json.meta);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books 😢");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBooks(1, search);
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  const nextPage = () => {
    if (meta.page * meta.pageSize < meta.total) {
      fetchBooks(meta.page + 1, search);
    }
  };

  const prevPage = () => {
    if (meta.page > 1) {
      fetchBooks(meta.page - 1, search);
    }
  };

  // Handle Add/Edit
  const openModal = (book = null) => {
    setEditingBook(book);
    setForm(
      book
        ? {
            title: book.title,
            description: book.description,
            tags: book.tags.join(", "),
          }
        : { title: "", description: "", tags: "" }
    );
    setShowModal(true);
  };

  const saveBook = async () => {
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    try {
      const method = editingBook ? "PUT" : "POST";
      const url = editingBook
        ? `http://localhost:8080/api/books/${editingBook.id}`
        : "http://localhost:8080/api/books";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setShowModal(false);
      fetchBooks(meta.page, search);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    await fetch(`http://localhost:8080/api/books/${id}`, { method: "DELETE" });
    fetchBooks(meta.page, search);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        📚 Books Library
      </h1>

      {/* Search Bar */}
      <div className="flex mb-6 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or tags..."
          className="flex-1 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <button
          onClick={() => openModal()}
          className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Add Book
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {books.length === 0 ? (
            <p className="text-gray-600 text-center">No books found</p>
          ) : (
            <ul className="space-y-4">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {book.title}
                      </h2>
                      <p className="text-gray-600 mb-2">{book.description}</p>
                      {book.tags && book.tags.length > 0 && (
                        <p className="text-sm text-gray-500 italic">
                          #{book.tags.join(" #")}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(book)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevPage}
              disabled={meta.page === 1}
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <p className="text-gray-600">
              Page {meta.page} of {Math.ceil(meta.total / meta.pageSize) || 1}
            </p>
            <button
              onClick={nextPage}
              disabled={meta.page * meta.pageSize >= meta.total}
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-md p-2 mb-3"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-md p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full border rounded-md p-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveBook}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
