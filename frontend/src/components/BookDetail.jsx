import React, { useEffect, useState } from "react";
import { fetchBookById, deleteBook } from "../api/books";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const data = await fetchBookById(id);
        setBook(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      navigate("/");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>Tags: {book.tags?.join(", ")}</p>
      <p>Created at: {book.createdAt}</p>
      <p>Updated at: {book.updatedAt}</p>
      <Link to={`/books/${id}/edit`}>Edit</Link>{" "}
      <button onClick={handleDelete}>Delete</button>
      <br />
      <Link to="/">Back to list</Link>
    </div>
  );
}
