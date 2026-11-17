const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
router.post("/", expenseController.addExpense);
router.get("/", expenseController.filterExpenses);
router.get("/summary", expenseController.getExpenseSummary);
router.get("/:id", expenseController.getExpenseById);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
