package com.cumabolat.kafatech.controllers;

import com.cumabolat.kafatech.service.StudentService;
import com.cumabolat.kafatech.models.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class StudentController {
  
  @Autowired
  private StudentService studentService;

  @GetMapping("/students")
  public List<Student> getAllStudents() {
    return studentService.getAllStudents();
  }

  @GetMapping("/students/{id}")
  public Student getStudentById(@RequestParam Long id) {
    return studentService.getStudentById(id);
  }

  @PostMapping("/students")
  public void addStudent(@RequestBody Student student) {
    studentService.addStudent(student);
  }

  @DeleteMapping("/students/{id}")
  public void deleteStudent(@RequestParam Long id) {
    studentService.deleteStudent(id);
  }

  @PutMapping("/students/{id}")
  public void updateGrade(@RequestParam Long id, @RequestParam int grade) {
    studentService.updateGrade(id, grade);
  }
}
