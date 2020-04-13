"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Transaction_1 = __importDefault(require("../models/Transaction"));
class TransactionRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield Transaction_1.default.find();
            res.json({ transactions });
        });
    }
    getTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield Transaction_1.default.find({ url: { $regex: req.params.url } });
            res.json(transaction);
        });
    }
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, amount, content } = req.body;
            const newTransaction = new Transaction_1.default({ title, url, amount, content });
            yield newTransaction.save();
            res.json({ status: res.status, data: newTransaction });
        });
    }
    updateTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const transaction = yield Transaction_1.default.findOneAndUpdate({ url }, req.body);
            res.json({ status: res.status, data: transaction });
        });
    }
    deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Transaction_1.default.findOneAndRemove({ url: req.params.url });
            res.json({ response: 'Transaction deleted Successfully' });
        });
    }
    routes() {
        this.router.get('/', this.getTransactions);
        this.router.get('/:url', this.getTransaction);
        this.router.post('/', this.createTransaction);
        this.router.put('/:url', this.updateTransaction);
        this.router.delete('/:url', this.deleteTransaction);
    }
}
const transactionRoutes = new TransactionRouter();
exports.default = transactionRoutes.router;
