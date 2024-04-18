import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './pages/Join';
import GetDeviceLocation from './components/GetDeviceLocation';
import Home from './components/Home'; // Assuming your component is named Home

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/home/:id" element={<Home />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
