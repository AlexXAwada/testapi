"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// import routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const TransactionRoutes_1 = __importDefault(require("./routes/TransactionRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
// Server Class
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/restapits';
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
    }
    routes() {
        const router = express_1.default.Router();
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/transactions', TransactionRoutes_1.default);
        this.app.use('/api/users', UserRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
