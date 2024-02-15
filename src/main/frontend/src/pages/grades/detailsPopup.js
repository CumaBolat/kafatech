import React from 'react';

const StudentDetailsPopup = ({ details, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Student Details</h2>
        <p>Name: {details.name}</p>
        <p>Surname: {details.surname}</p>
        <p>Grade: {details.grade}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default StudentDetailsPopup;
