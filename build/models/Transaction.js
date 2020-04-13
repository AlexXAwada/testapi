"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    amount: { type: Number, required: true },
    content: { type: String, required: true, },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Transaction', TransactionSchema);
