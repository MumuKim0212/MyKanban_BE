import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBoard = async (req: Request, res: Response) => {
  try {
    const board = await prisma.board.findFirst({
      include: {
        columns: {
          include: {
            cards: true,
          },
        },
      },
    });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching board' });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id, columns } = req.body;
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: {
        columns: {
          updateMany: columns.map((column: any) => ({
            where: { id: column.id },
            data: { cardIds: column.cardIds },
          })),
        },
      },
      include: {
        columns: {
          include: {
            cards: true,
          },
        },
      },
    });
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: 'Error updating board' });
  }
};