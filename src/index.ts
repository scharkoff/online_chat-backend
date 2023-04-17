import { App } from './app.js';
import routes from './routes/index.js';

export const app = new App();

app.useCORS();

app.useJSON();

app.useSocket();

app.useRoutes(routes);

app.listen(4000);
