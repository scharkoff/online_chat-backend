import express, { json } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req: express.Request, res: express.Response) => {
   console.log(req);
});

io.on("connection", (socket: Socket ) => {
    console.log("user connected: ", socket.id);
})


server.listen(4000, () => {
    console.log("Server started on port 4000...")
});


