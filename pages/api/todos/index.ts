// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Todo } from '../../../types';
import { prisma } from '../../../db';

type ResponseData =
  | {
      todos: Todo[];
    }
  | {
      todo: Todo;
    };

const apiTodosIndex = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const todos = await prisma.todo.findMany();
      res.status(200).json({ todos });
      break;
    case 'POST':
      const { content } = req.body;
      const todo = await prisma.todo.create({
        data: { content },
      });

      res.status(201).json({ todo });
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default apiTodosIndex;
