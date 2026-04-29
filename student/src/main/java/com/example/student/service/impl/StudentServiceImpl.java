package com.example.student.service.impl;

import com.example.student.exception.ResourceNotFoundException;
import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import com.example.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public Student createStudent(Student student) {
        if (student.getName() == null || student.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Student name cannot be blank");
        }
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Student email cannot be blank");
        }
        if (student.getCourse() == null || student.getCourse().trim().isEmpty()) {
            throw new IllegalArgumentException("Student course cannot be blank");
        }
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(int id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    @Override
    public Student updateStudent(int id, Student student) {
        getStudentById(id); // Check if exists
        studentRepository.update(id, student);
        return student;
    }

    @Override
    public void deleteStudent(int id) {
        getStudentById(id); // Check if exists
        studentRepository.deleteById(id);
    }
}
