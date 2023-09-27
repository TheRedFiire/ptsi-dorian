import React from 'react';
import Navbar from './components/Navbar';
import FileUpload from "./components/FileUpload";
import Home from './pages/Home';
import Footer from './components/Footer';
import { Routes, Route, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/depot-de-fichiers" element={<FileUpload />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;