package com.example.student.service;

import com.example.student.model.Student;

import java.util.List;

public interface StudentService {
    Student createStudent(Student student);
    List<Student> getAllStudents();
    Student getStudentById(int id);
    Student updateStudent(int id, Student student);
    void deleteStudent(int id);
}
