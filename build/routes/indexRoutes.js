"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getIndex(req, res) {
        res.json('Api: /api/transactions');
    }
    routes() {
        this.router.get('/', this.getIndex);
    }
}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
