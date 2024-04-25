import React, { useState, useEffect } from 'react';
import SubjectService from './service/SubjectService';
import FileService from './service/FileService';

function UserFileUploadPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false); // New state for terms agreement

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    try {
      if (!agreedToTerms) {
        alert('Please agree to the Terms and Conditions before submitting.');
        return;
      }
      
      const token = localStorage.getItem('token'); 
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', selectedSubject);
      await FileService.uploadFile(formData, token);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await SubjectService.getAllSubjects(token);
      setSubjects(response);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="profile-page-container">
      <div className="page-header">
        <h1>File Upload Page</h1>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="fileName">Select a file</label>
          <div className="input-group">
            <input type="text" id="fileName" className="form-control" value={fileName} readOnly onClick={() => document.getElementById('fileInput').click()} />
            <span className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={() => document.getElementById('fileInput').click()}>Browse</button>
            </span>
          </div>
        </div>

        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />

        <div>
          <button type="button" className="btn btn-primary" onClick={handleUpload} disabled={!file || !selectedSubject || !agreedToTerms}>Upload</button>
        </div>
      </div>

      <div>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select Faculty</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.name}>{subject.name}</option>
          ))}
        </select>
      </div>

      <div>
        <input type="checkbox" id="termsCheckbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
        <label htmlFor="termsCheckbox">I agree to the Terms and Conditions</label>
      </div>
    </div>
  );
}

export default UserFileUploadPage;
