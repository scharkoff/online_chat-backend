import express, { Router } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import routes from './routes';

export class App {
  private app = express();
  private server = http.createServer(this.app);

  private routes = routes;

  public useCORS() {
    this.app.use(cors());
  }

  public useJSON() {
    this.app.use(express.json());
  }

  public listen(port: number) {
    this.server.listen(port, () => {
      console.log('Server started on port 4000...');
    });
  }

  public useRoutes() {
    this.routes.forEach((route: Router) => {
      this.app.use(route);
    });
  }

  public getHttpServer(): Server {
    return this.server;
  }
}
