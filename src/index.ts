import { App } from './app';
import Routes from './routes/routes';

export const app = new App();

app.useSocket();

app.useRoutes(new Routes(app.getIo()).get());

app.listen(4000);
