import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createMessage = async (messageData: any) => {
  try {
    const { creator_id, user_id, message } = messageData;
    if (!creator_id || !user_id || !message) {
      throw new Error('Missing required fields in messageData');
    }

    const creatorId = parseInt(creator_id);
    const userId = parseInt(user_id);

    const currentDate = new Date();

    const newMessage = await prisma.message.create({
      data: {
        creator_id: creatorId,
        user_id: userId,
        message: message,
        date: currentDate 
      }
    });

    return newMessage;
  } catch (error) {
    console.error('Error saving message to the database:', error);
    throw error; 
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { user_id, target_user_id } = req.params;
    if (!user_id || !target_user_id) {
      return res.status(400).json({ error: 'User IDs are required' });
    }

    const userId = parseInt(user_id);
    const targetUserId = parseInt(target_user_id);

    // Fetch messages exchanged between the two users
    const userChats = await prisma.message.findMany({
      where: {
        OR: [
          { creator_id: userId, user_id: targetUserId },
          { creator_id: targetUserId, user_id: userId }
        ]
      },
      orderBy: {
        date: 'asc' 
      }
    });

    res.json({ data: userChats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsersWithMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const userChats = await prisma.message.findMany({
      where: {
        OR: [
          { creator_id: parseInt(userId) },
          { user_id: parseInt(userId) }
        ]
      },
      distinct: ['creator_id', 'user_id'] 
    });

    const uniqueUserIds = Array.from(new Set(userChats.flatMap(chat => [chat.creator_id, chat.user_id])));

    const usersWithMessages = await prisma.user.findMany({
      where: {
        id: {
          in: uniqueUserIds
        }
      }
    });

    res.json(usersWithMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
