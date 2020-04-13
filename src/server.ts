import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import bodyparse from 'body-parser';

// import routes
import indexRoutes from './routes/indexRoutes';
import TransactionRouter from './routes/TransactionRoutes';
import UserRoutes from './routes/UserRoutes';

// Server Class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        const MONGO_URI = 'mongodb://localhost/restapits';
        mongoose.set('useFindAndModify', false);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(bodyparse.json());
    }

    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/', indexRoutes);
        this.app.use('/api/transactions', TransactionRouter);
        this.app.use('/api/users', UserRoutes);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();