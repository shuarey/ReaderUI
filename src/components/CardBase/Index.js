import React from 'react';
import './Style.css';

const CardBase = ({ children }) => {
    return <div className="card">{children}</div>;
};

export default CardBase;