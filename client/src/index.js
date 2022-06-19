import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserAuth from './components/UserAuth';
import AdminAuth from './components/AdminAuth';
import AdminHome from './components/AdminHome';
import { createRoot } from 'react-dom/client';
import UserHome from './components/UserHome';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="user-login" element={<UserAuth />} />
      <Route path="admin-login" element={<AdminAuth />} />
      <Route path="admin-home" element={<AdminHome />} />
      <Route path="home" element={<UserHome />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
