package com.example.student.repository.impl;

import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class StudentRepositoryImpl implements StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    private static final RowMapper<Student> STUDENT_ROW_MAPPER = (rs, rowNum) -> Student.builder()
            .id(rs.getInt("id"))
            .name(rs.getString("name"))
            .email(rs.getString("email"))
            .course(rs.getString("course"))
            .build();

    private static final String INSERT_SQL = "INSERT INTO students (name, email, course) VALUES (?, ?, ?) RETURNING id";
    private static final String FIND_ALL_SQL = "SELECT * FROM students";
    private static final String FIND_BY_ID_SQL = "SELECT * FROM students WHERE id = ?";
    private static final String UPDATE_SQL = "UPDATE students SET name=?, email=?, course=? WHERE id=?";
    private static final String DELETE_SQL = "DELETE FROM students WHERE id = ?";

    @Override
    public Student save(Student student) {
        Integer generatedId = jdbcTemplate.queryForObject(
                INSERT_SQL,
                Integer.class,
                student.getName(),
                student.getEmail(),
                student.getCourse()
        );

        if (generatedId != null) {
            student.setId(generatedId);
        }
        return student;
    }

    @Override
    public List<Student> findAll() {
        return jdbcTemplate.query(FIND_ALL_SQL, STUDENT_ROW_MAPPER);
    }

    @Override
    public Optional<Student> findById(int id) {
        try {
            Student student = jdbcTemplate.queryForObject(FIND_BY_ID_SQL, STUDENT_ROW_MAPPER, id);
            return Optional.of(student);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public int update(int id, Student student) {
        return jdbcTemplate.update(UPDATE_SQL, student.getName(), student.getEmail(), student.getCourse(), id);
    }

    @Override
    public int deleteById(int id) {
        return jdbcTemplate.update(DELETE_SQL, id);
    }
}
