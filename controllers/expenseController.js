
const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "..", "expenses.json");

// Read expenses 
async function readExpenses() {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
}

// Save expenses 
async function saveExpenses(expenses) {
    await fs.writeFile(
        filePath,
        JSON.stringify(expenses, null, 2),
        "utf8"
    );
}

// Add Expense
async function addExpense(req, res) {
    try {
        const {
            title,
            description,
            amount,
            category,
            paymentMethod,
            expenseDate
        } = req.body;       //Get data from request body

        if (!title || amount === undefined || !category ||
            !paymentMethod || !expenseDate) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }

        if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero."
            });
        }

        const validCategories = [
            "Food", "Travel", "Shopping", "Bills", "Other"
        ];

        const validMethods = ["Cash", "Card", "UPI"];

        if (!validCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid category."
            });
        }

        if (!validMethods.includes(paymentMethod)) {
            return res.status(400).json({
                message: "Invalid payment method."
            });
        }

        if (isNaN(Date.parse(expenseDate))) {
            return res.status(400).json({
                message: "Invalid expense date."
            });
        }

        const expenses = await readExpenses();

        const newExpense = {
            id: Date.now(),
            title,
            description: description || "",
            amount: Number(amount),
            category,
            paymentMethod,
            expenseDate,
            createdDate: new Date().toISOString().split("T")[0]
        };

        expenses.push(newExpense);

        await saveExpenses(expenses);

        res.status(201).json({
            message: "Expense added successfully.",
            expense: newExpense
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

// Get All Expenses
async function getAllExpenses(req, res) {
    try {
        const expenses = await readExpenses();

        res.status(200).json({
            message: "Expenses list generated.",
            expenses
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

// Get Expense By ID
async function getExpenseById(req, res) {
    try {
        const expenses = await readExpenses();

        const expense = expenses.find(
            item => item.id === Number(req.params.id)
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found."
            });
        }

        res.status(200).json({
            message: "Expense found.",
            expense
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

// Update Expense
async function updateExpense(req, res) {
    try {
        const expenses = await readExpenses();

        const expense = expenses.find(
            item => item.id === Number(req.params.id)
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found."
            });
        }

        const {
            title,
            description,
            amount,
            category,
            paymentMethod,
            expenseDate
        } = req.body;

        if (!title || amount === undefined || !category ||
            !paymentMethod || !expenseDate) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }

        if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero."
            });
        }

        const validCategories = [
            "Food", "Travel", "Shopping", "Bills", "Other"
        ];

        const validMethods = ["Cash", "Card", "UPI"];

        if (!validCategories.includes(category) ||
            !validMethods.includes(paymentMethod) ||
            isNaN(Date.parse(expenseDate))) {
            return res.status(400).json({
                message: "Invalid expense details."
            });
        }

        expense.title = title;
        expense.description = description || "";
        expense.amount = Number(amount);
        expense.category = category;
        expense.paymentMethod = paymentMethod;
        expense.expenseDate = expenseDate;

        await saveExpenses(expenses);

        res.status(200).json({
            message: "Expense updated successfully.",
            expense
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

// Delete Expense
async function deleteExpense(req, res) {
    try {
        const expenses = await readExpenses();

        const index = expenses.findIndex(
            item => item.id === Number(req.params.id)
        );

        if (index === -1) {
            return res.status(404).json({
                message: "Expense not found."
            });
        }

        expenses.splice(index, 1);

        await saveExpenses(expenses);

        res.status(200).json({
            message: "Expense deleted successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

// Filter Expenses
async function filterExpenses(req, res) {
    try {
        const expenses = await readExpenses();

        const { category, startDate, endDate } = req.query;

        let filteredExpenses = expenses;

        if (category) {
            filteredExpenses = filteredExpenses.filter(
                item => item.category === category
            );
        }

        if (startDate) {
            filteredExpenses = filteredExpenses.filter(
                item => item.expenseDate >= startDate
            );
        }

        if (endDate) {
            filteredExpenses = filteredExpenses.filter(
                item => item.expenseDate <= endDate
            );
        }

        res.status(200).json({
            message: "Filtered expenses generated.",
            expenses: filteredExpenses
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

// Expense Summary
async function getExpenseSummary(req, res) {
    try {
        const expenses = await readExpenses();

        const { startDate, endDate } = req.query;

        if (!startDate || !endDate ||
            isNaN(Date.parse(startDate)) ||
            isNaN(Date.parse(endDate)) ||
            startDate > endDate) {
            return res.status(400).json({
                message: "Please provide a valid date range."
            });
        }

        const filteredExpenses = expenses.filter(item =>
            item.expenseDate >= startDate &&
            item.expenseDate <= endDate
        );

        const total = filteredExpenses.reduce(
            (sum, item) => sum + item.amount, 0
        );

        res.status(200).json({
            message: "Expense summary generated.",
            totalExpenses: total
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    filterExpenses,
    getExpenseSummary
};
