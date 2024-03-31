import React from 'react';

function Criteria() {
  return (  
    <div>
      <h1>Evaluation Standards</h1>
      <p>
        Our project development scorecard quantifies the impact of various actions within specific domains. Each action carries a certain number of points, reflecting its potential contribution towards sustainability and efficiency.
      </p>
      
      <h2>Domain Categories:</h2>
      <ul>
        <li>CO: Construction</li>
        <li>FA: Facilities</li>
        <li>FL: Fleet</li>
        <li>II: Indirect Infrastructure</li>
        <li>OP: Operations</li>
        <li>PL: Planning</li>
        <li>PU: Purchasing</li>
        <li>RE: Resiliency</li>
        <li>RM: Roadside Management</li>
    </ul>


      <h2>Scoring System:</h2>
      <ul>
        <li>Each option within a domain has an associated point value. The total score accumulates points from actions selected across all domains.</li>
        <li>The maximum possible score is the sum of the highest point values available within each domain, representing an ideal scenario.</li>
      </ul>

      <h2>Grading Scale:</h2>
      <ul>
        <li><strong>S (Superior):</strong> 90% and above of the maximum possible score.</li>
        <li><strong>C (Commendable):</strong> 80% to 89% of the maximum possible score.</li>
        <li><strong>O (Ordinary):</strong> 70% to 79% of the maximum possible score.</li>
        <li><strong>R (Requires Improvement):</strong> 60% to 69% of the maximum possible score.</li>
        <li><strong>N (Not Satisfactory):</strong> Below 60% of the maximum possible score.</li>
      </ul>

      <p>
        This structured approach ensures a comprehensive assessment of project choices, guiding stakeholders towards informed and sustainable decisions.
      </p>
      <p>Visit <a href="https://www.sustainablehighways.org/" target="_blank" rel="noopener noreferrer">INVEST</a> for more information about project scorecards.</p>
      <p>For inquiries or to report issues, please contact us at: <a href="mailto:jeongbeom98@gmail.com">jeongbeom98@gmail.com</a></p>

    </div>
  );
}

export default Criteria;
