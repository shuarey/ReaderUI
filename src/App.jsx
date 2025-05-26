import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Create from './pages/Create/Index';
import Home from './pages/Home/Index';
import Library from './pages/Library/Index';
import UserProfile from './pages/UserProfile';
import './App.css';

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
            <Route path="/user/:userID" element={<UserProfile />} />"
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
