function StudentTable({ students, onEdit, onDelete }) {
  if (!students.length) {
    return (
      <div className="empty-state">
        No students found. Add a student to get started.
      </div>
    );
  }

  return (
    <div className="card table-card">
      <div className="table-header">
        <h2>Students</h2>
        <span>
          {students.length} record{students.length === 1 ? "" : "s"}
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button
                  className="action-btn edit"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
