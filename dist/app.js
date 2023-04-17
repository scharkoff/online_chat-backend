import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes/index.js';
export class App {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.routes = routes;
    }
    useCORS() {
        this.app.use(cors());
    }
    useJSON() {
        this.app.use(express.json());
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`Server started on port ${port}...`);
        });
    }
    useRoutes() {
        this.routes.forEach((route) => {
            this.app.use(route);
        });
    }
    getHttpServer() {
        return this.server;
    }
}
