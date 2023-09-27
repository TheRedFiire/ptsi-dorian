import React from 'react';
import Navbar from './components/Navbar';
import AdminDocs from './components/AdminDocs';
import GeneralTools from './components/GeneralTools';
import PedagogicalLinks from './components/PedagogicalLinks';
import FileUpload from "./components/FileUpload";
import Footer from './components/Footer';
import { Routes, Route, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
       <Routes>
        <Route path="/" element={
          <>
            <AdminDocs />
            <GeneralTools />
            <PedagogicalLinks />
          </>
        } />
        <Route path="/depot-de-fichiers" element={<FileUpload />} />
       </Routes>
       <Footer />
     </BrowserRouter>
  );
}

export default App;