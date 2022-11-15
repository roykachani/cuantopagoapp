import { getSession } from 'next-auth/react';
import { createRoom } from '../../../prisma/room';

export default async function CreateRoom(req, res) {
  if (req.method !== 'POST')
    return res
      .status(405)
      .json({ message: 'This endpoint only support POST method' });

  const session = await getSession({ req });
  if (!session) res.status(401).json({ message: 'Unauthorize', status: 401 });
  const { userId, user } = session; //
  const data = {
    admin: userId,
    name: req.body.name,
    user, //
  };
  const room = await createRoom(data);

  return res.status(201).json({ room, status: 201 });
}
