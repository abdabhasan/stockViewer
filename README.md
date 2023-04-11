# React Stock Market App

This is a simple React application that allows users to search for stock market information and add stocks to their watch list. The app is built using React, React Router, and Bootstrap, and uses FinnHub's API for real-time stock market data.

### Installation

1. Clone the repository.

2. Run `npm install` to install the necessary dependencies.

3. Run `npm start` to start the development server.

### Usage

1.  Open your browser and navigate to http://localhost:3000 or check https://abdabhasan.github.io/stockViewer.

2.  Use the search bar to search for a stock by name or symbol.

3.  Click on a stock to add it to your watch list.

### File Structure

    `node_modules/` - contains the project dependencies.
    `public/` - contains the index.html file and other static assets.
    `src/` - contains the source code for the React application.
        `APIs/`- contains the API configuration for FinnHub.
        `Components/` - contains the presentational components used in the app.
        `context/` - contains the WatchListContext for the watch list functionality.
        `Pages/` - contains the components for the StockOverviewPage and StockDetailsPage.
        `App.js` - contains the main component that sets up the routing for the app.
        `index.js` - the entry point of the application that renders the App component.

`package.json` - contains metadata about the project and its dependencies.
`README.md` - this file.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

[MIT](https://choosealicense.com/licenses/mit/)
