import { createContext, useState } from 'react';
import { usersData } from '../mokData';

export const UserContext = createContext({
  userData: [],
  getUser: () => {},
});

const { Provider } = UserContext;

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const getUser = async () => {
    const res = await fetch('/api/rooms/room', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (!!data) {
      setUserData(data);
      return data;
    }

    setUserData('No hay salas disponibles');
    return 'No hay salas disponibles';
  };

  return <Provider value={{ userData, getUser }}>{children}</Provider>;
};
