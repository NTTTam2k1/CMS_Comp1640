import React, { useState, useEffect } from 'react';
import SubjectService from './service/SubjectService';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function AdminSubjectManagementPage() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [newSubjectStartDate, setNewSubjectStartDate] = useState('');
  const [newSubjectEndDate, setNewSubjectEndDate] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await SubjectService.getAllSubjects(token);
      setSubjects(response);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleAddSubject = async () => {
    try {
      const token = localStorage.getItem('token');
      await SubjectService.addSubject(newSubject, newSubjectStartDate, newSubjectEndDate, token);
      setNewSubject('');
      setNewSubjectStartDate('');
      setNewSubjectEndDate('');
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  return (
    <div className="profile-page-container">
      <h2>Faculty Management Page</h2>
      <div>
      <div>
  <label htmlFor="subjectName">Faculty Name:</label>
  <input
    id="subjectName"
    type="text"
    value={newSubject}
    onChange={(e) => setNewSubject(e.target.value)}
  />
</div>
<div>
  <label htmlFor="startDate">Start Date:</label>
  <input
    id="startDate"
    type="date"
    value={newSubjectStartDate}
    onChange={(e) => setNewSubjectStartDate(e.target.value)}
  />
</div>
<div>
  <label htmlFor="endDate">End Date:</label>
  <input
    id="endDate"
    type="date"
    value={newSubjectEndDate}
    onChange={(e) => setNewSubjectEndDate(e.target.value)}
  />
</div>

        <button onClick={handleAddSubject}>Add Falcuty</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
              <td>{formatDate(subject.startDate)}</td>
              <td>{formatDate(subject.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSubjectManagementPage;
