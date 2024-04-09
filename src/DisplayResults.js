import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const calculateGrade = (selectedOptions, data) => {
    let totalScore = 0;
    let maxPossibleScore = 96; // Start with the total max possible score.

    Object.entries(selectedOptions).forEach(([key, value]) => {
      const score = parseInt(value, 10);

      if (score < 0) {
        maxPossibleScore += score;
      } else {
        totalScore += score;
      }
    });

    maxPossibleScore = Math.max(maxPossibleScore, 0);
    const scorePercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

    let level = 'N';
    if (scorePercentage >= 80) level = 'S';
    else if (scorePercentage >= 60) level = 'C';
    else if (scorePercentage >= 40) level = 'O';
    else if (scorePercentage >= 20) level = 'R';

    return { totalScore, maxPossibleScore, scorePercentage, level };
};

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

    const detailedResults = Object.entries(selectedOptions).map(([questionKey, points]) => {
      const [abbreviation, number, title] = questionKey.split('-');
      const question = data.find(q => q.Abbreviation === abbreviation && q.Number.toString() === number && q.Title === title);
      return {
        Category: question.Category || 'N/A',
        Question: title,
        SelectedOption: points < 0 ? 'Not Applicable' : question.Option,
        Points: points.toString()
      };
    });

    const exportData = [
      ...detailedResults,
      { Category: "Summary", Question: "Name", SelectedOption: name, Points: "" },
      { Category: "Summary", Question: "Email", SelectedOption: email, Points: "" },
      { Category: "Summary", Question: "Total Score", SelectedOption: `${totalScore} (${isNaN(scorePercentage) ? 'N/A' : scorePercentage + "%" })`, Points: "" },
      { Category: "Summary", Question: "Maximum Possible Score", SelectedOption: maxPossibleScore.toString(), Points: "" },
      { Category: "Summary", Question: "SCORN Level", SelectedOption: level, Points: "" },
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
        <p>Percent Score: {isNaN(scorePercentage) ? 'N/A' : scorePercentage + "%"}</p>
        <p>SCORN Level: {level}</p>
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
