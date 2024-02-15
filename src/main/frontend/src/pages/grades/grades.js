import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './css/grades.css';
import StudentDetailsPopup from './detailsPopup';

function Grades() {
  const location = useLocation();
  const name = location.state.name;
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedBy, setSortedBy] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: '', lastName: '', grade: '' });
  const [detailsPopup, setDetailsPopup] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const details = (id) => {
    fetch(`http://localhost:8080/api/v1/students/${id}`)
      .then(response => response.json())
      .then(data => {
        setDetailsPopup(data);
        setTimeout(() => {
          setDetailsPopup(null);
        }, 3000); // Close the popup after 3 seconds
      });
  }

  const deleteStudent = (id) => {
    fetch(`http://localhost:8080/api/v1/students/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      });
  }

  const editStudent = (id) => {
    setStudents(students.map(student => {
      if (student.id === id) {
        return { ...student, editing: true };
      } else {
        return student;
      }
    }));
  }

  const saveEditedStudent = (id) => {
    const updatedStudent = students.find(student => student.id === id);
    fetch(`http://localhost:8080/api/v1/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedStudent)
    })
      .then(() => {
        setStudents(students.map(student => {
          if (student.id === id) {
            return { ...student, editing: false };
          } else {
            return student;
          }
        }));
      });
  }

  const handleChange = (id, field, value) => {
    setStudents(students.map(student => {
      if (student.id === id) {
        return { ...student, [field]: value };
      } else {
        return student;
      }
    }));
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  }

  const handleAddFormChange = (field, value) => {
    setNewStudent({ ...newStudent, [field]: value });
  }

  const createStudent = () => {
    fetch('http://localhost:8080/api/v1/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
      .then(() => {
        setShowAddForm(false);
        setNewStudent({ name: '', lastName: '', grade: '' }); // Reset the form fields
        // Fetch updated student list
        fetch('http://localhost:8080/api/v1/students')
          .then(response => response.json())
          .then(data => setStudents(data));
      });
  }

  const sortByGrade = () => {
    if (sortOrder === 'asc') {
      setStudents([...students].sort((a, b) => a.grade - b.grade));
      setSortOrder('desc');
    } else {
      setStudents([...students].sort((a, b) => b.grade - a.grade));
      setSortOrder('asc');
    }
    setSortedBy('grade');
  }

  return (
    <div className="student-page">
      <div className="students-table">
        <h1>Hey {name}! Here is the Student List:</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>
                <button onClick={sortByGrade}>{sortOrder === 'asc' ? 'Grade ↑' : 'Grade ↓'}</button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>
                  {student.editing ? (
                    <input className="form-item"
                      type="text"
                      value={student.name}
                      onChange={(e) => handleChange(student.id, 'name', e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {student.editing ? (
                    <input  className="form-item"
                      type="text"
                      value={student.lastName}
                      onChange={(e) => handleChange(student.id, 'lastName', e.target.value)}
                    />
                  ) : (
                    student.lastName
                  )}
                </td>
                <td>
                  {student.editing ? (
                    <input  className="form-item"
                      type="text"
                      value={student.grade}
                      onChange={(e) => handleChange(student.id, 'grade', e.target.value)}
                    />
                  ) : (
                    student.grade < 70 ? (
                      <span style={{ color: 'red' }}>{student.grade}</span>
                    ) : (
                      <span style={{ color: 'green' }}>{student.grade}</span>
                    )
                  )}
                </td>
                <td>
                  {student.editing ? (
                    <button className="td-button" onClick={() => saveEditedStudent(student.id)}>Save</button>
                  ) : (
                    <button className="td-button" onClick={() => editStudent(student.id)}>Edit</button>
                  )}
                  <button className="td-button" onClick={() => details(student.id)}>Details</button>
                  <button className="td-button" onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="add-student-section">
        <button className="add-student-button" onClick={toggleAddForm}>Add Student</button>
        {showAddForm && (
          <div className="new-student-form">
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => handleAddFormChange('name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Surname"
              value={newStudent.lastName}
              onChange={(e) => handleAddFormChange('lastName', e.target.value)}
            />
            <input
              type="number"
              placeholder="Grade"
              value={newStudent.grade}
              onChange={(e) => handleAddFormChange('grade', e.target.value)}
            />
            <button className="create-button" onClick={createStudent}>Create</button>
          </div>
        )}
      </div>

      {detailsPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Student Details</h2>
            <p>Name: {detailsPopup.name}</p>
            <p>Surname: {detailsPopup.surname}</p>
            <p>Grade: {detailsPopup.grade}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Grades;
