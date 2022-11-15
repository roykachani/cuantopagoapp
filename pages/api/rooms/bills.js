import { getSession } from 'next-auth/react';
import { createBill, getBillsByRoomId } from '../../../prisma/bill';

export default async function handleBills(req, res) {
  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({ message: 'Unauthorize', status: 401 });
  else {
    const { userId } = session;
    const checkUser = true; //await addedUser(userId);
    if (!checkUser)
      return res.status(401).json({ message: 'Unauthorize', status: 401 });
    else {
      try {
        switch (req.method) {
          case 'GET': {
            if (req.query.id) {
              const bill = await getBillsByRoomId(req.query.id);

              return res.status(200).json(bill);
            } else {
              const bills = await getAllBills();

              return res.status(200).json(bills);
            }
          }
          case 'POST': {
            console.log(userId);
            const data = {
              authorId: userId,
              description: req.body.description,
              amount: req.body.amount,
              roomId: req.body.roomId,
            };
            const bill = await createBill(data);
            console.log(bill, 'bill post');
            if (bill.error) {
              return res.status(500).json(bill.error);
            }
            if (bill.status === 404) {
              return res
                .status(404)
                .json({ message: bill.message, status: 404 });
            }
            return res.status(201).json({ bill, status: 201 });
          }
          case 'PUT': {
            //chequear que sea de propiedad o admin room
            const { billId, ...updateData } = req.body;
            const bill = await updateRoom(billId, ...updateData);

            return res.json(room);
          }
          case 'DELETE': {
            //chequear que sea de propiedad o admin room
            const { id } = req.body;
            const user = await deleteUser(id);

            return res.json(user);
          }
        }
      } catch (e) {
        return res.status(500).json({ ...e, message: e.message });
      }
    }
  }
}
