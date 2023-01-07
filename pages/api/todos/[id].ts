import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';

const apiTodosId = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'DELETE':
      await prisma.todo.delete({
        where: { id: Number(id) },
      });

      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default apiTodosId;
