import { createContext, useState } from 'react';
import { data } from '../mokData';

export const MainContext = createContext({
  mainData: [],
  getRoomData: () => {},
});

const { Provider } = MainContext;

export const MainProvider = ({ children }) => {
  const [mainData, setMainData] = useState(null);
  const [isLoading, setIsLodaing] = useState(null);
  const [error, setError] = useState(null);

  const getRoomData = (room) => {
    const check = data.find((r) => r.room_id === room.room_id);
    console.log(check);
    if (!!check) {
      setMainData(check);
      return check;
    }
    return check;
  };

  return (
    <Provider value={{ mainData, isLoading, error, getRoomData }}>
      {children}
    </Provider>
  );
};
