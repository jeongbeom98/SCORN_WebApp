# SCORN Application

The SCORN (Sustainability Co-Operative Rating Number) application is a React-based web application designed to evaluate and grade sustainability practices across various operational categories. It allows users to select sustainability measures they've implemented and receive a SCORN grade based on their selections. This application supports sustainability assessment in areas such as Facilities, Fleet, Roadside Management, Construction, and Operations.

## Features

- **Dynamic Grading System:** Calculates a SCORN grade based on user selections against predefined sustainability criteria.
- **Export Functionality:** Enables users to export their grading results to Excel for further analysis or record-keeping.
- **Responsive Design:** Ensures a seamless user experience across desktop and mobile devices.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine before starting. Follow these steps to set up the project locally.

1. Clone the repository:
   ```sh
   git clone https://github.com/jeongbeom98/SCORN.git
   cd SCORN
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the application:
   ```sh
   npm start
   ```
   This command runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

Navigate through the application to select sustainability measures across different categories. Once selections are made, the application will:

- **Calculate a Total Score:** Based on the selected options.
- **Determine a SCORN Grade:** Reflecting the sustainability efforts made.
- **Export Results:** Users can download their grading results along with their SCORN grade in Excel format.

## Contributing

Contributions to the SCORN application are welcome. If you have suggestions for improving the application, please fork the repository and create a pull request or open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Acknowledgments

- **React:** Utilized for the front-end framework.
- **XLSX and File-Saver:** Used for generating and saving Excel files from the browser.
- **Development Team:** For their dedication and effort in bringing this project to life.

For more detailed information on project setup, components, and functionalities, refer to the individual files and comments within the codebase.