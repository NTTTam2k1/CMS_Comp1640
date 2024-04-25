import React from 'react';
import'./App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import AdminSubjectManagementPage from './components/AdminSubjectManagementPage';
import FileManagementPage from './components/FileManagementPage';
import UserFileUploadPage from './components/UserFileUploadPage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/register" element={<RegistrationPage />} />
            <Route path="/profile" element={<ProfilePage />}/>          
            <Route path="/files" element={<FileManagementPage />} />
            <Route path="/upload-file" element={<UserFileUploadPage />} />
            {UserService.adminOnly() && (
              <>
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/admin/subject-management" element={<AdminSubjectManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
