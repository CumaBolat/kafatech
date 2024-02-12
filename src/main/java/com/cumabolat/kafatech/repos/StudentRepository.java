package com.cumabolat.kafatech.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cumabolat.kafatech.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{
}
