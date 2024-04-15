import express from 'express';
import { createMessage,getUserChats,getUsersWithMessages } from '../controller/MessageController';

const MessageRouter = express.Router();

MessageRouter.post('/create', createMessage);
MessageRouter.get('/user/:user_id/chats/:target_user_id', getUserChats);
MessageRouter.get('/users/:userId/messages', getUsersWithMessages);

export default MessageRouter;
