import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { nanoid } from 'nanoid';

export default function Home() {
  const [name, setname] = useState('');
  const router = useRouter();

  const handleRoom = (e) => {
    e.preventDefault();
    const roomId = nanoid();
    router.push(`/room/${roomId}/${name}`);
    //pegarle a la db y crear room
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

      <header className="my-5 px-3 flex justify-between">
        <div className="">
          <h1 className="font-semibold text-teal-900 text-lg">
            CuantoPago App
          </h1>
        </div>
        <div className="flex gap-3">
          <Link href="/acounts/login">
            <div className=" text-lg w-28 bg-teal-600 rounded-md shadow-sm text-center md:cursor-pointer text-gray-200 ">
              Ingresar
            </div>
          </Link>
          <Link href="/acounts/createAcount">
            <div className=" text-lg w-28 bg-teal-600 rounded-md shadow-sm text-center md:cursor-pointer text-gray-200 ">
              Registrarse
            </div>
          </Link>
        </div>
      </header>
      <section className="flex flex-col my-11 ">
        <h2 className="text-xl text-center  mb-7">
          Carga los gastos. Nosotros nos ocupamos del resto!
        </h2>
        <h3>
          CuantoPago es una aplicación que te ayuda a dividir las cuentas de
          asados, regalos, meriendas y todo tipo de envetos en simples links,
          para que puedas pagarlo todo a la vez y no tener que avisar cuanto
          dinero debe poner cada uno.
        </h3>
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

      {/* <section>
        <div>
          <div>
            <h3>¿Como Funciona?</h3>
          </div>
          <div>
            <div>
              <Image
                src="/assets/list_paper_office.png"
                width={80}
                height={100}
              />
            </div>
            <div>
              <h4>Creas tu cuenta</h4>
              <p>Solo te toma un minuto crearla.</p>
            </div>
          </div>
          <div>
            <div>
              <h4>Crea la sala e invita</h4>
              <p>
                Compartí el LinkRoom con los participantes. Cuando alguien
                ingresa, se registra en el sistema y automaticamente puede
                cargar gastos a dividir.
              </p>
            </div>
            <div>
              <Image
                src="/assets/paper_plane_flying-1.png"
                width={110}
                height={70}
              />
            </div>
          </div>
          <div>
            <div>
              <Image
                src="/assets/money_bundle_coins.png"
                width={80}
                height={100}
              />
            </div>
            <div>
              <h4>Nosotros</h4>
              <p>
                Al cerrar la sala, te avisamos cuanto debe cada uno. Y te
                compartimos un link de pago para abonar en MercadoPago.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
