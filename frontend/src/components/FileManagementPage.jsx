import React, { useState, useEffect } from 'react';
import FileService from './service/FileService';

function FileDownloadButton({ file }) {
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await fetch(file.downloadURL);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      a.click();
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download file. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
      {error && <div>{error}</div>}
    </div>
  );
}

function FileManagementPage() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await FileService.getAllFiles(token);
      setFiles(response);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch files. Please try again.'); // Set error state
    }
  };

  return (
    <div className="profile-page-container">
      <h2>File Management Page</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Download Link</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>
                <FileDownloadButton file={file} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileManagementPage;
