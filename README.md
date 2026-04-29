# Student Management App

A polished full-stack application built with Spring Boot (JDBC) and React. It supports full CRUD for a single `students` table and includes a clean dashboard UI for adding, updating, and deleting records.

## 📁 Repository structure

- `student/` — Spring Boot backend using `JdbcTemplate` and PostgreSQL
- `frontend/` — React frontend application with reusable components

## 🚀 Features

- Create, read, update, delete student records
- RESTful endpoints powered by Spring Boot
- JDBC-based repository layer without ORM
- Responsive React UI with modern cards and tables

## 🧩 Backend setup

1. Open a terminal in `student/`
2. Update PostgreSQL connection details in `student/src/main/resources/application.properties`
3. Run:
   ```powershell
   .\mvnw.cmd clean package
   .\mvnw.cmd spring-boot:run
   ```

Backend URL: `http://localhost:8080`

## 🧪 Frontend setup

1. Open a terminal in `frontend/`
2. Install packages:
   ```powershell
   npm install
   ```
3. Start the app:
   ```powershell
   npm start
   ```

Frontend URL: `http://localhost:3000`

> If port `3000` is already used, React will prompt to run on another available port.

## 🔌 API Endpoints

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/students`      | Get all students       |
| POST   | `/students`      | Create a new student   |
| GET    | `/students/{id}` | Get a student by ID    |
| PUT    | `/students/{id}` | Update student details |
| DELETE | `/students/{id}` | Delete a student       |

## 🗄 Database

The schema is defined in `student/src/main/resources/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  course VARCHAR(100) NOT NULL
);
```

If you change your database settings, update `student/src/main/resources/application.properties` accordingly.

## 🧰 GitHub publish

1. Initialize git (if needed):
   ```powershell
   git init
   ```
2. Add files:
   ```powershell
   git add .
   ```
3. Commit:
   ```powershell
   git commit -m "Initial student management app"
   ```
4. Add your GitHub remote and push:
   ```powershell
   git remote add origin <your-github-url>
   git push -u origin main
   ```

## ⚠️ Notes

- Start the backend first, then the frontend.
- If the backend fails to start, check for port clashes on `8080`.
- If the frontend cannot start, check for port clashes on `3000`.

## 💡 Quick test

- Open the app in the browser.
- Create a student with name, email, and course.
- Edit or delete existing entries to confirm full CRUD behavior.
