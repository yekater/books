import React, { useState, useEffect } from "react";
import { createBook, fetchBookById, updateBook } from "../api/books";
import { useNavigate, useParams } from "react-router-dom";

export default function BookForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && id !== "new") {
      fetchBookById(id).then((data) => {
        setTitle(data.title);
        setDescription(data.description || "");
        setTags(data.tags || []);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, description, tags };
    try {
      if (id === "new") await createBook(book);
      else await updateBook(id, book);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(",").map((t) => t.trim()));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id === "new" ? "Add New Book" : "Edit Book"}</h2>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input value={tags.join(", ")} onChange={handleTagsChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
