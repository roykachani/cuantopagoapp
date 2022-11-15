import prisma from './prisma';

export const getAllrooms = async () => {
  try {
    const allrooms = await prisma.room.findMany();
    if (!allrooms) return { message: 'no hay salas para mostrar', status: 400 };
    else return allrooms;
  } catch (error) {
    return { message: 'Internal server error', status: 500, error };
  }
};

export const getRoomsByUserId = async (id) => {
  try {
    const userRooms = await prisma.room.findMany({
      where: {
        admin: { id },
      },
      include: {
        admin: true,
        bills: true,
        members: true, //revisar si es necesario
      },
    });
    // console.log(userRooms, ' userRooms!!!!!');//revisar si es necesario
    if (userRooms.length === 0) {
      return { message: 'el usuario no tiene salas registradas', status: 404 };
    } else return userRooms;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRoomById = async (id) => {
  try {
    const singleroom = await prisma.room.findUnique({
      where: { id },
      include: {
        admin: true,
        members: true,
        bills: { include: { author: true } },
      },
    });
    if (!!singleroom) {
      console.log(singleroom);
      return singleroom;
    } else return { message: 'sala no encontrada', status: 404 };
  } catch (error) {
    return error;
  }
};

export const createRoom = async (data) => {
  try {
    // const isroom = await prisma.room.findUnique({  esto me sirve para chequear si el user ya pertenece a la room
    //   where: { email: data.email },
    // });
    console.log(data, 'prisma');
    const { admin, name, user } = data;
    if (!admin) {
      return { message: 'necesita usuario admin registrado', status: 406 };
    } else {
      const newroom = await prisma.room.create({
        data: {
          name,
          admin: {
            connect: {
              id: admin,
            },
          },
          members: {
            connectOrCreate: {
              where: {
                email: user.email,
              },
              create: {
                user: { connect: { id: admin } },
                name: user.name,
                email: user.email,
                isAdminRoom: 'ADMIN',
              },
            },
          },
        },
      });
      if (!newroom)
        return { newroom, message: 'no se pudo crear el sala', status: 409 };
      else return newroom;
    }
  } catch (error) {
    return error;
  }
};

export const updateRoom = async (roomid, updateData, userId) => {
  try {
    const roomData = await prisma.room.update({
      where: { id },
      data: { ...updateData },
    });

    return roomData;
  } catch (error) {
    return error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const result = await prisma.room.delete({ where: { id } });
    return result;
  } catch (error) {
    return error;
  }
};
