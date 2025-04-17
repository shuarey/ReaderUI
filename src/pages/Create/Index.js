import React, { useState } from 'react';
import './Style.css';
import PassageCard from '../../components/PassageCard/Index';
import Card from '../../components/CardBase/Index';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [isBookListVisible, setIsBookListVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
const books = [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
        '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
        'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
        'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
        'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
        'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
        'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
        'Matthew', 'Mark', 'Luke', 'John', 'Acts',
        'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
        'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
        '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
        'James', '1 Peter', '2 Peter', '1 John', '2 John',
        '3 John', 'Jude', 'Revelation'
    ];
const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); 
    };
const handleBookSelect = (book) => {
        setSelectedBook(book);
        setIsBookListVisible(false); 
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
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="book">Select a Book</label>
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={() => setIsBookListVisible(!isBookListVisible)}
                            required
                        >
                            {selectedBook || 'Select a Book'}
                        </button>
                        {isBookListVisible && (
                            <ul className="book-list">
                                {books.map((book, index) => (
                                    <li
                                        key={index}
                                        className="book-item"
                                        onClick={() => handleBookSelect(book)}
                                    >
                                        {book}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className="create-button">Create</button>
                </form>
            ) : (
                <Card>
                    <h2>Reading Plan Created</h2>
                    <p><strong>Title:</strong> {title}</p>
                    {description && <p><strong>Description:</strong> {description}</p>}
                    <p><strong>Book:</strong> {selectedBook}</p>
                </Card>
            )}
        </div>
    );
};

export default Create;