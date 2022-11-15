import { getSession } from 'next-auth/react';
import {
  getAllrooms,
  getRoomById,
  getRoomsByUserId,
  updateRoom,
  deleteUser,
} from '../../../prisma/room';

export default async function handleRooms(req, res) {
  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({ message: 'Unauthorize', status: 401 });
  const { userId } = session;
  try {
    switch (req.method) {
      case 'GET': {
        if (req.query.id) {
          const user = await getRoomById(req.query.id);

          return res.status(200).json(user);
        } else {
          const rooms = await getAllrooms();

          return res.status(200).json(rooms);
        }
      }
      case 'POST': {
        const rooms = await getRoomsByUserId(userId);

        if (rooms.error) {
          return res.status(500).json(rooms.error);
        }
        if (rooms.status === 404) {
          return res.status(404).json({ message: rooms.message, status: 404 });
        }
        return res.status(200).json(rooms);
      }
      case 'PUT': {
        const { roomid, ...updateData } = req.body;
        const room = await updateRoom(roomid, ...updateData);

        return res.json(room);
      }
      case 'DELETE': {
        const { id } = req.body;
        const user = await deleteUser(id);

        return res.json(user);
      }
    }
  } catch (e) {
    return res.status(500).json({ ...e, message: e.message });
  }
}
