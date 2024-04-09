import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const calculateGrade = (selectedOptions, data) => {
    let totalScore = 0;
    let maxPossibleScore = 96; // Start with the total max possible score.
    
    // Iterate through each selected option to adjust scores and maxPossibleScore
    Object.entries(selectedOptions).forEach(([key, value]) => {
        const score = parseInt(value, 10); // Ensure the score is an integer.
        
        if (score < 0) {
            maxPossibleScore += score; // score is negative, so it reduces maxPossibleScore
        } else {
            totalScore += score; // Add score to totalScore for applicable options
        }
    });
  
    maxPossibleScore = Math.max(maxPossibleScore, 0);
    const scorePercentage = (maxPossibleScore > 0) ? (totalScore / maxPossibleScore * 100) : 0; // Prevent division by zero
    
    // Determine the level based on scorePercentage
    let level = 'N'; // Default level
    if (scorePercentage >= 80) level = 'S';
    else if (scorePercentage >= 60) level = 'C';
    else if (scorePercentage >= 40) level = 'O';
    else if (scorePercentage >= 20) level = 'R';
    
    return { totalScore, maxPossibleScore, scorePercentage, level };
};

function getScornLevelRange(level) {
    switch (level) {
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
  
    const { totalScore, maxPossibleScore, scorePercentage, level } = calculateGrade(selectedOptions, data);
  
    const isInputValid = () => name.trim() !== '' && /\S+@\S+\.\S+/.test(email);
  
    const handleInputChange = (setter) => (e) => setter(e.target.value);
  
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
        }).filter(result => result.SelectedOption !== 'N/A'); // Exclude 'Not Applicable' from export
    
        const exportData = [
            ...detailedResults,
            { Category: "", Question: "", SelectedOption: "", Points: "" },
            { Category: "Name", Question: name, SelectedOption: "", Points: "" },
            { Category: "Email", Question: email, SelectedOption: "", Points: "" },
            { Category: "Total Score", Question: totalScore.toString(), SelectedOption: "", Points: "" },
            { Category: "Maximum Possible Score", Question: maxPossibleScore.toString(), SelectedOption: "", Points: "" },
            { Category: "Percent Score", Question: `${scorePercentage.toFixed(2)}%`, SelectedOption: "", Points: "" },
            { Category: "SCORN Level", Question: level, SelectedOption: getScornLevelRange(level), Points: "" },
        ];
    
        const formattedName = name.trim().replace(/\s+/g, '_');
        const fileName = `${formattedName}_SCORN_Score.xlsx`;
        exportToExcel(exportData, fileName);
    };
  
    return (
        <div className="results-container">
            <h2>Grading Results</h2>
            <div className="results-box">
                <p>Total Score: {totalScore}</p>
                <p>Maximum Possible Score: {maxPossibleScore}</p>
                <p>Percent Score: {scorePercentage.toFixed(2)}%</p>
                <p>SCORN Level: {level} ({getScornLevelRange(level)})</p>
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
