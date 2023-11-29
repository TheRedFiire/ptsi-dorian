import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import FileUpload from "./pages/FileUpload";
import Home from './pages/Home';
import Footer from './components/Footer';
import Calendar from './pages/Calendar';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/depot-de-fichiers" element={<FileUpload />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path="*" element={<NotFoundPage />} /> {/* This will handle any undefined paths */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
