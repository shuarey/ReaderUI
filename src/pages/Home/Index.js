import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/CardBase/Index'; 
import './Style.css'; 

const Home = () => {
    return (
        <div className="home">
            <Link to="/library" className="card-link">
                <Card>
                    <h2>Library</h2>
                    <p>Access your saved passages and notes.</p>
                </Card>
            </Link>
            <Link to="/library/new" className="card-link">
                <Card>
                    <h2>Create New Plan</h2>
                    <p>Start a new reading or study plan.</p>
                </Card>
            </Link>
        </div>
    );
};  

export default Home;