package com.cumabolat.kafatech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cumabolat.kafatech.models.Student;
import com.cumabolat.kafatech.repos.StudentRepository;

@Service
public class StudentService {
  
  @Autowired
  private StudentRepository studentRepository;

  public List<Student> getAllStudents() {
    return studentRepository.findAll();
  }

  /*
   * Just incase...
   */
  public Student getStudentById(Long id) {
    return studentRepository.getOne(id);
  }

  public void addStudent(Student student) {
    studentRepository.save(student);
  }

  public void deleteStudent(Long id) {
    studentRepository.deleteById(id);
  }

  public void updateStudent(Student student) {
    if (studentRepository.existsById(student.getId())) {
      studentRepository.save(student);
    } else {
      throw new IllegalArgumentException("Student with id " + student.getId() + " does not exist");
    }
  }
}
