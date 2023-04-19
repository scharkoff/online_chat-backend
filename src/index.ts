import { App } from './app.js';
import Routes from './routes/routes.js';

export const app = new App();

app.useSocket();

app.useRoutes(new Routes(app.getIo()).get());

app.listen(4000);
