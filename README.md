# ClassCover

## Live Demo

For live demo, vist [Calendar Availability Scheduler](http://classcover.vebadesigns.com/).

## Run the project

1. Install `Node.js` and `Angular CLI` using the links [Node.js](https://nodejs.org/en/) and [Angular CLI](https://cli.angular.io/).
2. Run `npm i` to install the project dependencies in the root of the project folder.
3. Run `npm start` to run the project. Navigate to `http://localhost:4200/` to open the project.

## Documentation

### Data source

Data is populated using the service from a configurable JSON file.

### Search functionality

Search can be performed on the data based on `Name, Contact Number`

### Sort functionality

Sort can be performed on `Name` either in ascending or descending order. By default, data is populated based on ascending order.

### Points assumed for development

1. Select start date and hover across the dates you want and select the end date in the `Date Range` option to view the calendar availability schedule for a period.
2. Clicking on the availability opens modal where one can change the availability for the particualar person on a particular date.
3. `Legend` has been made configurable via a JSON file.
