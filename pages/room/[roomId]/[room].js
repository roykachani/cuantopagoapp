import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../../context/main';

import { data, usersData } from '../../../mokData';

export default function Room(props) {
  const { mainData, getRoomData } = useContext(MainContext);
  const [bills, setBills] = useState([]);
  console.log(props, 'props');
  useEffect(() => {}, []);

  const handleBills = (e) => {
    e.preventDefault();
    let newBill = {
      title: e.target['title'].value,
      bill: e.target['bill'].value,
    };

    setBills([...bills, newBill]);
  };

  return (
    <>
      <div>
        <form onSubmit={handleBills}>
          <div>
            <label>descripcion</label>
            <input name="title" type="text" />
          </div>
          <div>
            <label>gasto</label>
            <input name="bill" type="number" />
          </div>
          <button type="submit">agregar gasto</button>
        </form>
      </div>
      <div className="m-6">
        <h2>gastos</h2>
        <div>
          {bills.length > 0
            ? bills.map((b, i) => (
                <div key={i}>
                  <span className="m-2">titulo </span>
                  <span className="text-red-400">{b.title}</span>
                  <span className="m-2">gasto </span>
                  <span className="text-red-400">{b.bill}</span>
                </div>
              ))
            : 'no hay gastos cargados'}
        </div>
      </div>
    </>
  );
}

// export const getStaticProps = async (context) => {
//   const roomname = context.params;
//   console.log('room en static', roomname);

//   return {
//     props: {
//       room: '<roomname>',
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const paths = data.map((d) => ({
//     params: { roomId: `${d.room_id}`, room: `${d.room_name}` },
//   }));

//   return {
//     paths,
//     fallback: true, // fallback to 404 page if no match
//   };
// };
