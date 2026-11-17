# Expense Tracker API

## Project Description
The Expense Tracker API is a RESTful API developed using Node.js and Express.js. It allows users to manage their daily expenses by performing CRUD operations, filtering expenses and calculating total expenses.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- JSON File Storage
- Postman
- Git and GitHub

## Features
- Add a new expense
- View all expenses
- View a single expense by ID
- Update an existing expense
- Delete an expense
- Filter expenses by category and date range
- Calculate total expenses
- Input validation and error handling
- Store expense data in a JSON file

## Project Structure


Expense Tracker/
│
├── controllers/
│   └── expenseController.js
│
├── services/
│   └── expenseService.js
│
├── routes/
│   └── expenseRoutes.js
│
├── data/
│   └── expenses.json
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Roopasree19/expense_tracker.git
```

### 2. Navigate to the project folder
```bash
cd "Expense Tracker"
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server
```bash
node server.js
```

The server will start on the configured port.

Example:
```text
Server running on port 3000
```

### 5. Test the API
Open Postman and use the API endpoints to test the application.

Base URL: http://localhost:3000/


## API Testing
The API supports the following operations:

| Method | Operation |
|---|---|
| GET | Get all expenses |
| GET | Get expense by ID |
| POST | Add a new expense |
| PUT | Update an expense |
| DELETE | Delete an expense |
| GET | Filter expenses |
| GET | Calculate total expenses |

## Data Storage
Expense details are stored in a JSON file. The application uses Node.js file system operations to read and write expense data asynchronously.

## Error Handling
The API includes input validation and error handling to manage invalid requests, missing expenses and server errors.

Roopasree K
Developed as a Node.js and Express.js learning project.