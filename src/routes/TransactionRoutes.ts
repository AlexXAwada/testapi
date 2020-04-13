import { Router, Request, Response, NextFunction } from 'express';

import Transaction from '../models/Transaction';

class TransactionRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getTransactions(req: Request, res: Response): Promise<void> {
        const transactions = await Transaction.find();
        res.json({ transactions });
    }

    public async getTransaction(req: Request, res: Response): Promise<void> {
        const transaction = await Transaction.find({ url: { $regex: req.params.url } });
        res.json(transaction);
    }

    public async createTransaction(req: Request, res: Response): Promise<void>{
        const { title, url, amount, content } = req.body;
        const newTransaction= new Transaction({ title, url, amount, content });
        await newTransaction.save();
        res.json({status: res.status, data: newTransaction});

    }

    public async updateTransaction(req: Request, res: Response): Promise<void>{
        const { url } = req.params;
        const transaction = await Transaction.findOneAndUpdate({url}, req.body);
        res.json({status: res.status, data: transaction});
    }

    public async deleteTransaction(req: Request, res: Response): Promise<void> {
        await Transaction.findOneAndRemove({ url: req.params.url });
        res.json({ response: 'Transaction deleted Successfully' });
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

export default transactionRoutes.router;