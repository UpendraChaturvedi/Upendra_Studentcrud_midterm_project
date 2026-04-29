import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import {
  createStudent,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "./api/studentApi";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(data);
      setError("");
    } catch (err) {
      setError(`Unable to load student data. ${err.message || ""}`.trim());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSave = async (student) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, student);
      } else {
        await createStudent(student);
      }
      setSelectedStudent(null);
      await loadStudents();
      setError("");
    } catch (err) {
      setError(`Unable to save student. ${err.message || ""}`.trim());
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      await deleteStudent(id);
      await loadStudents();
      setError("");
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
    } catch (err) {
      setError(`Unable to delete student. ${err.message || ""}`.trim());
    }
  };

  const handleCancel = () => {
    setSelectedStudent(null);
    setError("");
  };

  return (
    <div className="app-shell">
      <header>
        <div className="hero-copy">
          <span className="eyebrow">Student Dashboard</span>
          <h1>Manage students with confidence</h1>
          <p>
            Create, update, and remove students using a clean interface built on
            React and a Spring Boot JDBC backend.
          </p>
        </div>
        <div className="hero-glow" />
      </header>

      <div className="status-grid">
        <article className="status-card">
          <span>Total students</span>
          <strong>{students.length}</strong>
        </article>
        <article className="status-card">
          <span>Status</span>
          <strong>{loading ? "Refreshing..." : "Ready"}</strong>
        </article>
        <article className="status-card">
          <span>Mode</span>
          <strong>{selectedStudent ? "Edit" : "Create"}</strong>
        </article>
      </div>

      {error && <div className="alert error">{error}</div>}

      <main className="content-grid">
        <section className="panel panel-left">
          <StudentForm
            key={selectedStudent ? selectedStudent.id : "new"}
            student={selectedStudent}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>
        <section className="panel panel-right">
          {loading ? (
            <div className="loading">Loading students...</div>
          ) : (
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
