import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Nav from '../../components/Nav';
import BtnLink from '../../components/BtnLink';

export default function userActiveRooms() {
  const { userData, getUser } = useContext(UserContext);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    getUser();
    if (session.status === ('unauthenticated' | null)) return router.push('/');
  }, []);

  if (session.status === 'loading')
    return (
      <>
        <Nav />
        <div className="mt-8 flex flex-col items-center gap-y-4 ">
          <h3>Cargando</h3>
        </div>
      </>
    );

  if (session.status === 'unauthenticated') return router.push('/');

  return (
    <>
      <Nav />
      <div className="mt-8 flex flex-col items-center gap-y-4 ">
        <h1 className="text-xl">Tus Salas activas</h1>
        <div className="w-3/4 grid grid-cols-3 place-content-center gap-2 ">
          {!!userData & (userData?.length > 0)
            ? userData.map((r, i) => (
                <BtnLink
                  key={i}
                  input={r.name}
                  href={`/room/${r.id}/${r.name}`}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
}
