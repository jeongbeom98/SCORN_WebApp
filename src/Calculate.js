export const calculateGrade = (selectedOptions, data) => {
    let totalScore = 0;
    let dynamicMaxPossibleScore = 91; // Start with the total max possible score.
  
    // Calculate max points for each category and question.
    const maxPointsByCategoryQuestion = data.reduce((acc, item) => {
      const key = `${item.Category}-${item.Number}`; // Construct a unique key for each category and question.
      acc[key] = Math.max(acc[key] || 0, item.Points); // Store the max points for this category and question.
      return acc;
    }, {});
  
    // Adjust maxPossibleScore and calculate totalScore based on selected options.
    Object.entries(selectedOptions).forEach(([key, value]) => {
      const score = parseInt(value, 10); // Ensure the score is an integer.
  
      // Check if the key from selectedOptions matches the keys used in maxPointsByCategoryQuestion
      if (maxPointsByCategoryQuestion.hasOwnProperty(key) && score === 0) {
        // Subtract this category/question's max points from the dynamicMaxPossibleScore if N/A is selected.
        dynamicMaxPossibleScore -= maxPointsByCategoryQuestion[key];
      } else {
        // Otherwise, add the score to the totalScore.
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