import { Request, Response, NextFunction, Router } from 'express';

import User from '../models/User';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find().populate('transactions', 'title url -_id').exec();
        res.json(users);
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({username: req.params.username}).populate('transactions').exec();
        res.json(user);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ status: 200, newUser });
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        const user = await User.findOneAndUpdate({username}, req.body, {new: true});
        res.json(user);
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        const user = await User.findOneAndDelete({username});
        res.json(user);
    }

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }

}

const userRouter = new UserRouter();
export default userRouter.router;