import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../context/user';

export default function userActiveRooms() {
  const { userData } = useContext(UserContext);

  return (
    <>
      <h1>Tus Salas activas</h1>
      <div>
        {userData?.rooms.length > 0 &&
          userData.rooms.map((r, i) => (
            <Link key={i} href={`/room/${r.room_name}/${r.room_id}`}>
              <div className="m-2">{r.room_name}</div>
            </Link>
          ))}
      </div>
    </>
  );
}
