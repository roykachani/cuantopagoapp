import prisma from './prisma';

export const getAllUser = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const getUser = async (id) => {
  const user = prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const createUser = async (data) => {
  const result = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    },
  });

  return result;
};

export const updateUser = async (id, updateData) => {
  const user = await prisma.user.update({
    where: { id },
    data: { ...updateData },
  });
  return user;
};

export const deleteUser = async (id) => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};
