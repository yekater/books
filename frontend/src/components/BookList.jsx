import React from "react";

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) {
    return <p className="text-center text-gray-500">No books found</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {books.map((book) => (
        <div key={book.id} className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          {book.description && (
            <p className="text-sm text-gray-600 mt-1">{book.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {book.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(book)}
              className="bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="bg-red-200 hover:bg-red-300 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
