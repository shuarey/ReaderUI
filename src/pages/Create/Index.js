import React, { useState } from 'react';
import './Style.css';
import PassageCard from '../../components/PassageCard/Index';
import Card from '../../components/CardBase/Index';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); 
    };

return (
        <div className="create">
            <h1>New Reading Plan</h1>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>
                    <button type="submit" className="create-button">Create</button>
                </form>
            ) : (
                <Card>
                    <h2>Reading Plan Created</h2>
                    <p><strong>Title:</strong> {title}</p>
                    {description && <p><strong>Description:</strong> {description}</p>}
                </Card>
            )}
        </div>
    );
};

export default Create;