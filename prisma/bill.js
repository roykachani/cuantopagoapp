import prisma from './prisma';

export const getBillsByRoomId = async (id) => {
  try {
    const roomBills = await prisma.bill.findMany({
      where: {
        room: { id },
      },
      include: {
        author: true,
        room: { include: { members: true } },
      },
    });
    if (roomBills.code === 'P2023') {
      return { message: 'el usuario no tiene salas registradas', status: 404 };
    } else return roomBills;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createBill = async (data) => {
  const { authorId, description, amount, roomId } = data;
  console.log(authorId, description, amount, roomId, 'prisma bill');
  try {
    const newBill = await prisma.bill.create({
      data: {
        description,
        amount,
        author: {
          connect: {
            id: authorId,
          },
        },
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });
    if (!newBill)
      return { newBill, message: 'no se pudo crear el sala', status: 409 };
    else return newBill;
  } catch (error) {
    return error;
  }
};
