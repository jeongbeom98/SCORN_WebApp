import React, { useState } from 'react';
import './display.css';
import { calculateGrade } from './Grading';
import DisplayResults from './DisplayResults'; // Make sure this import path is correct

const Display = ({ data }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [gradingResults, setGradingResults] = useState(null);

  const handleOptionChange = (questionKey, points) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionKey]: points,
    }));
  };

  const formatOptionText = (option, points) => {
    // Check if the option is "Not Applicable"
    if (option === 'Not Applicable') {
      return 'Not Applicable'; // Display without points
    }

    // Handle options with a colon for special formatting
    if (option.includes(':')) {
      const [firstPart, ...restParts] = option.split(':');
      return (
        <>
          {firstPart}:{' '}
          <span style={{ display: 'block', marginLeft: '20px' }}>
            {'> ' + restParts.join(':')} ({points} Pts)
          </span>
        </>
      );
    }
    return `${option} (${points} Pts)`; // Regular display with points
  };

  const categories = [...new Set(data.map((item) => item.Category))];
  const groupedByCategory = categories.map((category) => ({
    category,
    questions: data.filter((item) => item.Category === category),
  }));

  const groupedQuestions = groupedByCategory.map((group) => ({
    ...group,
    questions: group.questions.reduce((acc, item) => {
      const key = `${item.Abbreviation}-${item.Number}-${item.Title}`;
      if (!acc[key]) {
        acc[key] = {
          title: `${item.Abbreviation}-${item.Number}) ${item.Title}`,
          options: [],
        };
      }
      acc[key].options.push({ Option: item.Option, Points: item.Points });
      return acc;
    }, {}),
  }));

  const handleNext = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handleBack = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleGrade = () => {
    const results = calculateGrade(selectedOptions, data);
    setGradingResults(results);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setSelectedOptions({});
    setShowResults(false);
    setCurrentPageIndex(0);
  };

  // Render logic for questions and navigation
  if (showResults && gradingResults) {
    return (
      <DisplayResults
        gradingResults={gradingResults}
        handleStartAgain={handleStartAgain}
        data={data}
        selectedOptions={selectedOptions}
      />
    );
  }

  return (
    <div className="ratings-container">
      <div className="category-title">
        <strong>{groupedQuestions[currentPageIndex]?.category} Scorecards</strong>
      </div>
      <div className="questions-container">
        {Object.entries(groupedQuestions[currentPageIndex]?.questions || {}).map(([key, question]) => (
          <div key={key} className="family-group">
            <h3><strong>{question.title}</strong></h3>
            {question.options.map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type="radio"
                  id={`${key}-${index}`}
                  name={key}
                  value={option.Points}
                  checked={selectedOptions[key] === option.Points}
                  onChange={(e) => handleOptionChange(key, parseInt(e.target.value, 10))}
                />
                {formatOptionText(option.Option, option.Points)}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="actions-outside">
        <div className="left-align">
          {currentPageIndex > 0 && <button className="back-button" onClick={handleBack}>Back</button>}
          {currentPageIndex < groupedQuestions.length - 1 && <button onClick={handleNext}>Next</button>}
          {currentPageIndex === groupedQuestions.length - 1 && <button onClick={handleGrade}>Grade</button>}
        </div>
      </div>
    </div>
  );
};

export default Display;