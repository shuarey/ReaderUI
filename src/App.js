import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Index';
import Create from './pages/Create/Index';
import Home from './pages/Home/Index';
import './App.css';
import Library from './pages/Library/Index';

function App() {
  useEffect(() => {
    document.title = 'Versemark'; 
  }, []);
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Default */}
            <Route path="/home" element={<Home />} />
            <Route path="/library" element={<Library />} /> 
            <Route path="/library/new" element={<Create />} /> 
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
