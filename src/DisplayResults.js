import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Assuming calculateGrade and getScornGradeRange functions are correctly implemented elsewhere
const calculateGrade = (selectedOptions, data) => {
    let totalScore = 0;
    let maxPossibleScore = 96; // Start with the total max possible score.
  
    // Iterate through each selected option to adjust scores and maxPossibleScore
    Object.entries(selectedOptions).forEach(([key, value]) => {
      const score = parseInt(value, 10); // Ensure the score is an integer.
      
      if (score < 0) {
        // Subtract the absolute value of score from maxPossibleScore for "Not Applicable" options
        maxPossibleScore += score; // score is negative, so it reduces maxPossibleScore
      } else {
        // Add score to totalScore for applicable options
        totalScore += score;
      }
    });
  
    // Ensure maxPossibleScore does not drop below zero
    maxPossibleScore = Math.max(maxPossibleScore, 0);
  
    // Calculate the score percentage based on adjusted maxPossibleScore
    const scorePercentage = totalScore / maxPossibleScore * 100;
    
    // Determine the grade based on scorePercentage
    let grade = 'N'; // Default grade
    if (scorePercentage >= 80) grade = 'S';
    else if (scorePercentage >= 60) grade = 'C';
    else if (scorePercentage >= 40) grade = 'O';
    else if (scorePercentage >= 20) grade = 'R';
  
    return { totalScore, maxPossibleScore, grade };
  };
  
function getScornGradeRange(grade) {
  switch (grade) {
    case 'S': return '80% - 100%';
    case 'C': return '60% - 79%';
    case 'O': return '40% - 59%';
    case 'R': return '20% - 39%';
    case 'N': return '0% - 19%';
    default: return '';
  }
}

const DisplayResults = ({ handleStartAgain, data, selectedOptions }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { totalScore, maxPossibleScore, grade } = calculateGrade(selectedOptions, data);

  const isInputValid = () => {
    return name.trim() !== '' && /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const exportToExcel = (exportData, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    saveAs(blob, fileName);
  };

  const download = () => {
    if (!isInputValid()) {
      alert('Please enter a valid name and email.');
      return;
    }

    const detailedResults = Object.entries(selectedOptions).map(([questionKey, selectedPoint]) => {
      const questionDetail = data.find(option => `${option.Abbreviation}-${option.Number}-${option.Title}` === questionKey) || {};
      return {
        Category: questionDetail.Category || 'N/A',
        Question: `${questionDetail.Abbreviation}-${questionDetail.Number} ${questionDetail.Title}`,
        SelectedOption: selectedPoint < 0 ? 'Not Applicable' : (questionDetail.Option || 'N/A'),
        Points: selectedPoint >= 0 ? selectedPoint.toString() : "", // Leave Points cell blank for negative values
      };
    });

    const exportData = [
      ...detailedResults,
      { Category: "", Question: "", SelectedOption: "", Points: "" },
      { Category: "Name", Question: name, SelectedOption: "", Points: "" },
      { Category: "Email", Question: email, SelectedOption: "", Points: "" },
      { Category: "Total Score", Question: totalScore.toString(), SelectedOption: "", Points: "" },
      { Category: "Maximum Possible Score", Question: maxPossibleScore.toString(), SelectedOption: "", Points: "" },
      { Category: "SCORN Grade", Question: grade, SelectedOption: "", Points: "" },
    ];

    // Filename format: [name]_SCORN_Grade.xlsx
    const formattedName = name.trim().replace(/\s+/g, '_');
    const fileName = `${formattedName}_SCORN_Grade.xlsx`;
    exportToExcel(exportData, fileName);
  };

  return (
    <div className="results-container">
      <h2>Grading Results</h2>
      <div className="results-box">
        <p>Total Score: {totalScore}</p>
        <p>Maximum Possible Score: {maxPossibleScore}</p>
        <p>SCORN Grade: {grade} ({getScornGradeRange(grade)})</p>
      </div>
      <div className="input-row">
        <input type="text" placeholder="Name" value={name} onChange={handleInputChange(setName)} required />
        <input type="email" placeholder="Email" value={email} onChange={handleInputChange(setEmail)} required />
      </div>
      <div className="actions-outside">
        <button onClick={download} disabled={!isInputValid()}>Download</button>
        <button onClick={handleStartAgain}>Start Again</button>
      </div>
    </div>
  );
};

export default DisplayResults;