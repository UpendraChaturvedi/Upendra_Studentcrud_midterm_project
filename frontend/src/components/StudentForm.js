import { useEffect, useState } from "react";

function StudentForm({ student, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setEmail(student.email || "");
      setCourse(student.course || "");
    } else {
      setName("");
      setEmail("");
      setCourse("");
    }
  }, [student]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ name: name.trim(), email: email.trim(), course: course.trim() });
  };

  return (
    <div className="card form-card">
      <h2>{student ? "Edit Student" : "New Student"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter full name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email address"
            required
          />
        </label>

        <label>
          Course
          <input
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            placeholder="Enter course name"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            {student ? "Update" : "Create"} Student
          </button>
          {student && (
            <button type="button" className="btn secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
