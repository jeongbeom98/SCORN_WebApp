import React, { useState } from 'react';
import './App.css';
import SCORNLogo from './SCORN_Logo.png';
import Display from './Display'; // Ensure this path is correct
import Criteria from './Criteria'; // Make sure you import Criteria
import criteriaData from './SCORN_Data.json'; // Ensure this path is correct

function App() {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [gradingResults, setGradingResults] = useState(null);
  const [showCriteria, setShowCriteria] = useState(true); // State to toggle between Criteria and Display

  const renderMainContent = () => {
    if (gradingResults) {
      return (
        <div className="main-content-area">
          <h2>Grading Results</h2>
          <p>Total Score: {gradingResults.totalScore}</p>
          <p>Maximum Possible Score: {gradingResults.maxPossibleScore}</p>
          <p>Letter Grade: {gradingResults.grade}</p>
          <button onClick={() => setGradingResults(null)}>Go Back</button>
        </div>
      );
    }

    if (showCriteria) {
      return (
        <div className="main-content-area">
          <Criteria />
          <button onClick={() => setShowCriteria(false)}>Take SCORN Test</button>
        </div>
      );
    }

    return (
      <>
        <div className="main-content-area">
          {currentPage && (
            <h2>{`${currentPage} Development Scorecards`}</h2>
          )}
          {!currentPage && !showCriteria && (
            <Display data={criteriaData} setGradingResults={setGradingResults} />
          )}
        </div>
      </>
    );
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Sustainability Co-Operative Rating Number</h1>
        <p>The Laboratory for Advanced Construction Technology (LACT)</p>
      </div>

      <div className="navbar">
        <div className="menu-item" onClick={() => {setCurrentPage(''); setShowCriteria(true);}}>SCORN</div>

        <div className="menu-item" onMouseEnter={() => setShowAboutDropdown(true)} onMouseLeave={() => setShowAboutDropdown(false)}>
          About Us
          {showAboutDropdown && (
            <div className="dropdown-content">
              <a href="http://lactiowa.org/">LACT</a>
              <a href="https://iti.uiowa.edu/labs/laboratory-advanced-construction-technology">ITI</a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="side">
          <img src={SCORNLogo} alt="SCORN Logo" className="sidebar-logo" />
        </div>
        <div className="main">
          {renderMainContent()}
        </div>
      </div>

      <div className="footer">
        <p>&copy; <span>{new Date().getFullYear()} SCORN | </span> Laboratory for Advanced Construction Technology</p>
      </div>
    </div>
  );
}

export default App;