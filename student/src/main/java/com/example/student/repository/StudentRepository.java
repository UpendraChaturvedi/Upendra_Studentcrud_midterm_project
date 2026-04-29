package com.example.student.repository;

import com.example.student.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentRepository {
    Student save(Student student);
    List<Student> findAll();
    Optional<Student> findById(int id);
    int update(int id, Student student);
    int deleteById(int id);
}
