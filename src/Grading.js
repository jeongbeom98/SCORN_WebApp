// Grading.js
export const calculateGrade = (selectedOptions, data) => {
    let totalScore = 0;
    let dynamicMaxPossibleScore = 96; // Start with the total max possible score.
  
    // No need to pre-calculate maxPointsByCategoryQuestion as N/A options directly provide the necessary adjustment.
  
    // Adjust maxPossibleScore based on selected options and calculate totalScore.
    Object.entries(selectedOptions).forEach(([key, value]) => {
        const score = parseInt(value, 10); // Ensure the score is an integer.
  
        if (score < 0) {
            // Correctly adjust the maximum possible score when a "Not Applicable" option is selected.
            // Subtract the absolute value of the score from dynamicMaxPossibleScore to reduce it.
            dynamicMaxPossibleScore += score; // Adding a negative value effectively subtracts its absolute value.
        } else {
            // Add the score to the totalScore for non-N/A options.
            totalScore += score;
        }
    });
  
    const scorePercentage = (totalScore / dynamicMaxPossibleScore) * 100;
    let grade = 'N'; // Default grade
    if (scorePercentage >= 90) grade = 'S';
    else if (scorePercentage >= 80) grade = 'C';
    else if (scorePercentage >= 70) grade = 'O';
    else if (scorePercentage >= 60) grade = 'R';
  
    return { totalScore, maxPossibleScore: dynamicMaxPossibleScore, grade };
  };