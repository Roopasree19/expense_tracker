
const express = require("express");
const app = express();
app.use(express.json()); // Middleware
const expenseRoutes = require("./routes/expenseRoutes"); // Import expense routes

app.get("/", (req, res) => {
    res.send("Expense Tracker API is Running");
});   // Home route

app.use("/api/expenses", expenseRoutes); // Expense routes

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found."
    });
});      // Invalid route handling

const PORT = 3000;   // Start server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
