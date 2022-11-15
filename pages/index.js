import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import Nav from '../components/Nav';

export default function Home({ session }) {
  const [name, setname] = useState('');
  const router = useRouter();

  const handleRoom = async (e) => {
    e.preventDefault();
    if (!session) return;
    try {
      const res = await fetch('/api/rooms/createRoom', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data?.status === 201) {
        return router.push(`/room/${data.room.id}/${data.room.name}`);
      } else throw Error;
    } catch (err) {
      //manejar error mostrar msj
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Cuanto Pago App</title>
        <meta name="title" content="Cuanto Pago App" />
        <meta
          name="description"
          content="Te ayudamos a dividir las cuentas de asados,  regalos, meriendas y todo tipo de envetos en simples links!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <section className="flex flex-col items-center  my-11 ">
        <div className="w-3/4 ">
          <h2 className="text-4xl text-center mb-8">
            Carga los gastos.{' '}
            <span className="font-semibold text-teal-600">Nosotros</span> nos
            ocupamos del resto!
          </h2>
          <h3 className="text-lg text-center">
            CuantoPago es una aplicación que te ayuda a dividir las cuentas de
            asados, regalos, meriendas y todo tipo de envetos entre amigos en
            simples links.
          </h3>
        </div>
      </section>

      <section className=" w-full flex flex-col items-center ">
        <form className=" mt-6 ">
          <span className="mr-1 text-teal-600 ">cuantopago.app/</span>
          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            className="rounded-md border-none focus:outline-none px-1 text-teal-600 bg-gray-100 "
          />
        </form>
        <button
          onClick={handleRoom}
          className="my-6 w-24 h-7 text-gray-200 bg-teal-600 rounded-md font-medium shadow-sm"
        >
          Crear Sala
        </button>
      </section>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log('SESION', session);

  return {
    props: {
      session,
    },
  };
};
