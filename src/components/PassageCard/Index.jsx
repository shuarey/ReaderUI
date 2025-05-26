import React from 'react';
import CardBase from '../CardBase/Index'; 
import './Style.css';

const PassageCard = ({ title, description }) => {
    return (
        <CardBase className="passage-card">
            <h3 className="passage-card-title">{title}</h3>
            <p className="passage-card-description">{description}</p>
        </CardBase>
    );
};

export default PassageCard;