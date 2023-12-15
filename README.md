# Spectrum of Signals: Mapping the World's Cell Tower Infrastructure


## Overview
This Project is an interactive web application that visualizes the worldwide distribution and technological evolution of cell towers. Leveraging a rich dataset, the application provides an immersive experience, allowing users to engage with the data through a 3D globe and interactive analytical tools.

## Features
- **3D Globe Visualization**: Countries are color-coded based on the cell tower count, offering a global perspective at a glance.
- **Yearly Data Exploration**: Users can select individual years to see the distribution and growth of cell towers over time.
- **Technology Breakdown**: Interactive elements represent different cell technologies (GSM, CDMA, UMTS, LTE) for a comprehensive analysis.
- **Range Filtering**: A slider to filter cell towers by their signal range, allowing for a more focused examination.
- **Analytical Charts**: Donut and stacked bar charts provide detailed breakdowns of cell tower data across various dimensions.

## Installation
Clone the repository and install the dependencies to set up the project:

```bash
git clone https://github.com/aleemuddin13/dataviz-celltower.git
cd dataviz-celltower
npm install
```
## Usage

To run the project locally:
```bash
npm start
```
The application will be available at http://localhost:3000

## Development

To build the project for production, use the following command:

```bash
npm run build
```

## Technologies Used

- **Frontend Development**:
  - `React` (v18.2.0): A JavaScript library for building user interfaces.
  - `React-DOM` (v18.2.0): Serves as the entry point to the DOM for React.
  - `D3.js` (v7.8.5): A JavaScript library for producing dynamic, interactive data visualizations.
  - `react-globe.gl` (v2.27.0): React component for Globe.gl, used for creating the 3D globe visualization.
  - `React Redux` (v9.0.2): Used for managing application state.

- **Data Processing and Backend**:
  - `Node.js`: A JavaScript runtime for server-side scripting.
  - `MongoDB`: A NoSQL database for storing and querying the large dataset.

- **Animation and Interactive Elements**:
  - `@react-spring/web` (v9.7.3): A spring-physics based animation library.
  - `d3-color-legend` (v1.4.1): For adding color legends to the D3 visualizations.
  - `d3-simple-slider` (v2.0.0): To add interactive sliders to the visualizations.

- **3D Rendering**:
  - `Three.js` (v0.159.0): A JavaScript 3D library used in conjunction with react-globe.gl.

- **Testing and Quality Assurance**:
  - `@testing-library/react` (v13.4.0), `@testing-library/jest-dom` (v5.17.0), `@testing-library/user-event` (v13.5.0): For testing React components and ensuring they function as expected.


## License

This project is licensed under the MIT License. This license permits unrestricted use, modification, and distribution, subject to certain conditions. For more details, see the [LICENSE.md](LICENSE.md) file.

## Acknowledgements

- A heartfelt thanks to OpenCelliD for providing the comprehensive dataset that powers our visualizations.
- Gratitude to the various open-source communities, especially those related to React, D3.js, and MongoDB, for their invaluable resources and support.


