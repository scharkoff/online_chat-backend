import SocketController from 'domain/socket/socket.controller';
import App from './app';
import Routes from './routes/routes';
import Container from 'container';

export const app = new App();

const container = new Container(app.getIo());

container.get<SocketController>(SocketController).inizialize();

app.useRoutes(new Routes(container).get());

app.listen(4000);
