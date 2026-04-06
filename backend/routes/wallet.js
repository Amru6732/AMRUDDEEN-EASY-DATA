const express = require('express');
const router = express.Router();

// Placeholder for wallet data
let wallets = {};

// Get balance
router.get('/balance/:userId', (req, res) => {
    const userId = req.params.userId;
    const balance = wallets[userId]?.balance || 0;
    res.json({ userId, balance });
});

// Deposit money
router.post('/deposit', (req, res) => {
    const { userId, amount } = req.body;
    if (!wallets[userId]) wallets[userId] = { balance: 0, transactions: [] };
    wallets[userId].balance += amount;
    wallets[userId].transactions.push({ type: 'deposit', amount, date: new Date() });
    res.json({ userId, balance: wallets[userId].balance });
});

// Withdraw money
router.post('/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    if (!wallets[userId]) wallets[userId] = { balance: 0, transactions: [] };
    if (wallets[userId].balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
    }
    wallets[userId].balance -= amount;
    wallets[userId].transactions.push({ type: 'withdraw', amount, date: new Date() });
    res.json({ userId, balance: wallets[userId].balance });
});

// Get transaction history
router.get('/transactions/:userId', (req, res) => {
    const userId = req.params.userId;
    const transactions = wallets[userId]?.transactions || [];
    res.json({ userId, transactions });
});

module.exports = router;