export const data = [
  {
    room_id: 123,
    room_name: 'demo',
    users: [
      { email: 'roy.kachani@gmail.com', user_id: 1 },
      { email: 'kacha_54@gmail.com', user_id: 2 },
    ],
    bills: [
      {
        title: 'camisetas x 12',
        bill: 100,
      },
    ],
  },
];

export const usersData = [
  {
    user: 'roy',
    email: 'roy.kachani@gmail.com',
    user_id: 1,
    user_ph: 1158444052,
    rooms: [
      { room_id: 123, room_name: 'demo' },
      { room_id: 1234, room_name: 'demo2' },
      { room_id: 12345, room_name: 'demo3' },
    ],
    password: '1324',
  },
  {
    user: 'kacha',
    email: 'kacha_54@gmail.com',
    user_id: 2,
    user_ph: 1158442976,
    rooms: [
      { room_id: 123, room_name: 'demo' },
      { room_id: 1234, room_name: 'demo2' },
      { room_id: 123456, room_name: 'demo4' },
    ],
    password: '1324',
  },
];
