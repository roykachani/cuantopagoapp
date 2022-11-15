import { useContext, useEffect, useMemo, useState } from 'react';
import { MainContext } from '../../../context/main';
import { useSession } from 'next-auth/react';

import { data, usersData } from '../../../mokData';
import Router from 'next/router';
import Nav from '../../../components/Nav';
import { getAllrooms } from '../../../prisma/room';

export default function Room({ room, roomId }) {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // crear coookie para luego redirigir
      Router.push('/accounts/login');
    },
  });

  const [roomData, setRoomData] = useState([]);
  const [bills, setBills] = useState([]);
  const { mainData, getRoomData } = useContext(MainContext);
  // console.log(roomData, 'roomData');
  const getbills = async () => {
    try {
      const res = await fetch('/api/rooms/room' + `?id=${roomId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!!data) {
        setRoomData(data), setBills(data.bills);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(bills, 'RESSS');

  useEffect(() => {
    getbills();
  }, []);

  const handleBills = async (e) => {
    e.preventDefault();
    const { roomId } = Router.query;
    let newBill = {
      author: { name: session.user.name },
      description: e.target['title'].value,
      amount: parseInt(e.target['bill'].value),
      roomId,
    };
    try {
      const res = await fetch('/api/rooms/bills', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBill),
      });
      const data = await res.json();
      if (data?.status === 201) {
        console.log(data, 'nueva bill');
        setBills([...bills, newBill]);
      } else throw Error;
    } catch (err) {
      //manejar error mostrar msj
      console.log(err, 'error');
    }
    e.target.reset();
  };

  //calcula total de gastos
  const totalbills = useMemo(
    () => bills?.reduce((acc, curr) => acc + curr.amount, 0),
    [bills, roomData]
  );

  //calculo de montofinal a poner x user
  const singleTotal = useMemo(() => totalbills / bills?.length, [bills]);

  // console.log(singleTotal, 'singleTotal');

  //calculo de que debe cada user respecto a lo que gasto
  const uTotal = useMemo(
    () =>
      bills?.map((b) => {
        b.rest = b.bill - 750;
        return b;
      }),
    [bills, roomData]
  );
  // console.log(uTotal, 'uTotal');

  if (status === 'loading') return <div>...Loading</div>;

  return (
    <>
      <Nav />
      <div className="flex justify-center my-10 ">
        <h1 className="text-5xl text-center">
          Sala: <span className="text-teal-600">{room}</span>
        </h1>
      </div>
      <div className="flex flex-col items-center gap-y-6 ">
        <h3 className="text-xl text-center">Ingresa un nuevo gasto</h3>
        <form
          onSubmit={handleBills}
          className="flex flex-col items-center gap-y-4"
        >
          <div className="flex flex-col gap-1">
            <label>Descripcion</label>
            <input
              name="title"
              type="text"
              placeholder="bebidas"
              className="rounded-md border-none focus:outline-none p-2 text-teal-600 bg-gray-100 "
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Costo</label>
            <input
              name="bill"
              type="number"
              placeholder="$ 850 ARS"
              className="rounded-md border-none focus:outline-none p-2 text-teal-600 bg-gray-100 "
            />
          </div>
          <button
            type="submit"
            className="my-6 w-24 h-8 text-gray-200 bg-teal-600 rounded-md font-medium shadow-sm"
          >
            Agregar
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center mt-6 gap-y-10">
        <div className="w-3/4 flex justify-between items-center ">
          <h2 className="text-xl">Gasto total parcial</h2>
          <span className="text-xl text-green-500">{totalbills}</span>
        </div>
        <div className="w-3/4 flex flex-col items-center gap-y-3">
          <h3 className="text-xl">Lista de Gastos</h3>
          <div className="w-full flex flex-col gap-y-2 ">
            <div className="flex justify-between">
              <span className="text-lg ">Descripcion</span>
              <span className="text-lg ">Gasto </span>
              <span className="text-lg ">Usuario</span>
            </div>
            {bills?.length > 0
              ? bills.map((b, i) => {
                  console.log(b);
                  return (
                    <div key={i} className="flex justify-between">
                      <span className="text-red-400">{b.description}</span>
                      <span className="text-red-400">{b.amount}</span>
                      <span className="text-red-400">{b?.author.name}</span>
                    </div>
                  );
                })
              : 'no hay gastos cargados'}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (context, req) => {
  const { room, roomId } = context.params;

  return {
    props: {
      room,
      roomId,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await getAllrooms();
  const data = res;

  const paths = data.map((d) => ({
    params: { roomId: `${d.id}`, room: `${d.name}` },
  }));
  //MOKdata
  // const paths = data.map((d) => ({
  //   params: { roomId: `${d.room_id}`, room: `${d.room_name}` },
  // }));

  return {
    paths,
    fallback: true, // fallback not result to 404 page if no match
  };
};
