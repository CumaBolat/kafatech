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
    return studentRepository.getReferenceById(id);
  }

  public void addStudent(Student student) {
    studentRepository.save(student);
  }

  public void deleteStudent(Long id) {
    studentRepository.deleteById(id);
  }

  public void updateGrade(Long id, int grade) {
    Student student = studentRepository.getReferenceById(id);
    student.setGrade(grade);
    studentRepository.save(student);
  }
}
