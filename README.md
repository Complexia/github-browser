# Getting started with Github Browser...

To run, type `npm install`, and then `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

# Project run-through:

HomePage.tsx contains all of the code logic, including several components that make up the interfce. Component RepoBox, which is the box enclosure for each GitHub repository that is displayed is a bootstrap info card, slightly modified to include the CheckBox tick component.

The checkbox and its functionality was a little tricky, since each individual RepoBox had to have one associated with it, with its own state. Since the hook useState can only be called at top level, it wasn't a viable option to initialize the checkbox within the RepoBox component. Instead, the checkbox is initialized at top level (HomePage), and then passed onto the RepoBox as a prop. It contains the id of the RepoBox. When the checkbox is unticked (invisible), the onChange function adds the id of the checkbox to localStorage. When it's ticked (visible), it is removed from localStorage. RepoBox checks within localStorage for id of each RepoBox, and if it contains it, does not display, otherwise displays. This allows the state of the checkbox to persist a page refresh.

The buttons on top and bottom of the page, for pagination functionality, work by altering the counter (useState) of the top level component, and the count is then passed as a prop to the function getData which fetches data from the API using axios and uses the count parameter for page number.


Fun todos: a better pagination system where user could navigate to a specific page, go back to the first page, choose how many items per page to display, and so on. Also cache recently fetched data, so that when user goes to a page he previously visited the API call is not made redunduntly.
