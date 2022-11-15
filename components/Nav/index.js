import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import LogoutIcon from '../Icons/LogoutIcon';
import BtnLink from '../BtnLink';

const Nav = () => {
  const { data: session } = useSession();

  if (!session)
    return (
      <header className="my-5 px-3 flex justify-between">
        <div className="">
          <h1 className="font-semibold text-teal-600 text-lg">
            CuantoPago App
          </h1>
        </div>
        <div className="flex gap-3">
          <BtnLink input="Ingresar" href="/accounts/login" />
        </div>
      </header>
    );

  return (
    <header className="my-5 px-3 flex justify-between">
      <div className="">
        <h1 className="font-semibold text-teal-600 text-lg">CuantoPago App</h1>
      </div>
      <div className="flex gap-3 items-center ">
        <BtnLink input="Mis Salas" href="/user/allRooms" />
        <button
          className="text-xl text-center md:cursor-pointer text-teal-600 flex justify-center hover:text-teal-400"
          onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default Nav;
