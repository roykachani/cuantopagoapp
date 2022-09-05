import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../../../prisma/user';

export default async function handleAcounts(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        if (req.query.id) {
          const user = await getUser(req.query.id);

          return res.status(200).json(user);
        } else {
          const users = await getAllUser();

          return res.status(200).json(users);
        }
      }
      case 'POST': {
        const user = await createUser(req.body);

        return res.json(user);
      }
      case 'PUT': {
        const { id, ...updateData } = req.body;
        const user = await updateUser(id, ...updateData);

        return res.json(user);
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
