import express, { Request, Response } from "express";
import multer from "multer";
import WebSocket from 'ws';
import { createMessage } from './controller/MessageController'; 

import bodyParser from "body-parser";
import dropzoneRouter from "./routes/DropzoneRouter";
import postsRouter from "./routes/PostRouter";
import userRouter from "./routes/UserRouter";
import messageRouter from './routes/MessageRouter';

const app = express();

const wss = new WebSocket.Server({ port: 3002 });

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use(express.static("../uploads")); // Adjust the path accordingly

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Multer error
    res.status(400).send("Multer error: " + err.message);
  } else {
    // Other errors
    res.status(500).send("Internal server error");
  }
});

// Enable CORS (to allow localhost:3000 to use APIs)
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  }
);

interface MessageData {
  id: number;
  message: string;
  creator_id: number;
  user_id: number;
  date: string;
}

wss.on('connection', (ws: WebSocket & { sendMessage?: (messageData: MessageData) => void }) => {

  ws.onmessage = async (event) => {
    try {
      if (typeof event.data === 'string') {
        const messageData: MessageData = JSON.parse(event.data);
        await createMessage(messageData);
        //console.log('Message saved to the database:', messageData);

        wss.clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messageData));
          }
        });
      } else {
        console.warn('Received unexpected message type:', event.data);
      }
    } catch (error) {
      console.error('Error saving message to the database:', error);
    }
  };

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });

  ws.sendMessage = (messageData: MessageData) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(messageData), (error) => {
        if (error) {
          console.error('Error sending message:', error);
        }
      });
    } else {
      console.error('WebSocket connection is not open.');
    }
  };
});

// Routes
app.use("/uploads", express.static("uploads"));
app.use('/api/messages', messageRouter);
app.use("/api", postsRouter);
app.use("/api", userRouter);
app.use("/", dropzoneRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
