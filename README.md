# Books Fullstack App

A fullstack CRUD application for managing books, built with **React (Vite) frontend** and **Spring Boot backend**.  

---

## 🖥 Features

- List, search, view, create, edit, and delete books
- Server-side pagination
- Loading and error handling
- Health check for backend connection
- Frontend consumes real backend API

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/health` | Check server connection |
| GET    | `/api/books?search=&page=&pageSize=` | List books with optional search & pagination |
| GET    | `/api/books/{id}` | Get a single book by ID |
| POST   | `/api/books` | Create a new book (title required) |
| PUT    | `/api/books/{id}` | Update an existing book |
| DELETE | `/api/books/{id}` | Delete a book by ID |

---

## 🏃‍♂️ How to Run Locally

### Backend

1. Go to backend folder:  
   ```bash
   cd backend/books-backend


### Frontend

1. cd frontend
    npm install
    npm start

## ✅ Testing

- **Backend:**  
  ```bash
  ./mvnw test

- **Frontend:**  
  npm test

##  📌 Notes

- Uses in-memory H2 database (development)
- Frontend consumes real backend (no mocks)
- JSON responses include data + meta (page, pageSize, total)
- Ready for local demo and further deployment
- Built to demonstrate full-stack CRUD capabilities with React + Spring Boot


##  📌 [Project Presentation](https://www.canva.com/design/DAG0-FF3stc/qQn4iOByXd7kRDH0JK5h8Q/edit?utm_content=DAG0-FF3stc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

