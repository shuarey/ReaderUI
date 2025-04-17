import React, { useState } from 'react';
import PassageCard from '../../components/PassageCard/Index';
import { useUser } from '../../context/userContext';
import './Style.css';

const Library = () => {
    
    const readingPlans = [
        { id: 1, title: 'Plan 1', description: 'Read the Gospels in 30 days', category: 'New Testament' },
        { id: 2, title: 'Plan 2', description: 'Old Testament in 90 days', category: 'Old Testament' },
        { id: 3, title: 'Plan 3', description: 'New Testament in 60 days', category: 'New Testament' },
        { id: 4, title: 'Plan 4', description: 'Psalms and Proverbs in 30 days', category: 'Old Testament' },
    ];

    const {userID} = useUser();
    console.log(userID);
    const [activeTab, setActiveTab] = useState(null); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredPlans, setFilteredPlans] = useState([]); 
    const [suggestions, setSuggestions] = useState([]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const newFilteredPlans = tab === null ? [] : tab === 'All' ? readingPlans : readingPlans.filter((plan) => plan.category === tab);
        setFilteredPlans(newFilteredPlans); 
        setSearchQuery(''); 
    };
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setSuggestions([]);
            setFilteredPlans([]); 
            return;
        }
        
        const newSuggestions = readingPlans
            .filter((plan) =>
                plan.title.toLowerCase().includes(query.toLowerCase()) ||
                plan.description.toLowerCase().includes(query.toLowerCase())
            )
            .map((plan) => plan.title);
        setSuggestions(newSuggestions.slice(0, 5)); 
            
            const newFilteredPlans = readingPlans.filter((plan) =>
                plan.title.toLowerCase().includes(query.toLowerCase()) ||
            plan.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPlans(newFilteredPlans);
    };
const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
    const newFilteredPlans = readingPlans.filter((plan) =>
            plan.title.toLowerCase().includes(suggestion.toLowerCase())
        );
        setFilteredPlans(newFilteredPlans);
        setActiveTab(null);
    };
const clearFilters = () => {
        setActiveTab(null); 
        setSearchQuery('');
        setSuggestions([]);
        setFilteredPlans([]);
    };
return (
        <div className="library">
            <h1 className="library-title">Library</h1>
        {/* Tabs for categories */}
            <div className="library-tabs">
                {['All', 'Old Testament', 'New Testament'].map((tab) => (
                    <button
                        key={tab}
                        className={`library-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
                <button className="clear-filters-button" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>
        <div className="library-search">
                <input
                    type="text"
                    placeholder="Search plans..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {suggestions.length > 0 && (
                    <ul className="search-suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="search-suggestion"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        <div className="library-grid">
                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan) => (
                        <PassageCard
                            key={plan.id}
                            title={plan.title}
                            description={plan.description}
                        />
                    ))
                ) : (
                    <p className="library-empty">No plans to display. Use the search bar or select a category.</p>
                )}
            </div>
        </div>
    );
};

export default Library;