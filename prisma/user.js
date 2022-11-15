import prisma from './prisma';

export const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    if (!allUsers)
      return { message: 'no hay usuarios para mostrar', status: 400 };
    else return allUsers;
  } catch (error) {
    return { message: 'Internal server error', status: 500, error };
  }
};

export const getUserByEmail = async (email) => {
  try {
    const singleUser = await prisma.user.findUnique({
      where: { email },
      include: {
        room: true,
      },
    });
    if (!!singleUser) {
      return singleUser;
    } else return { message: 'usuario no registrado', status: 404 };
  } catch (error) {
    console.log(error);
    return { message: 'Internal server error', status: 500, error };
  }
};

export const getUserById = async (id) => {
  try {
    const singleUser = await prisma.user.findUnique({
      where: { id },
    });
    console.log(singleUser, 'single');
    if (!!singleUser) {
      return singleUser;
    } else return { message: 'usuario no encontrado', status: 404 };
  } catch (error) {
    return error;
  }
};

export const createUser = async (data) => {
  try {
    const isUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!!isUser) {
      return { message: 'usuario ya registrado', status: 409 };
    } else {
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
      });
      if (!newUser)
        return { newUser, message: 'no se pudo crear el usuario', status: 409 };
      else return newUser;
    }
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const userData = await prisma.user.update({
      where: { id },
      data: { ...updateData },
    });

    return userData;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await prisma.user.delete({ where: { id } });
    return result;
  } catch (error) {
    return error;
  }
};
