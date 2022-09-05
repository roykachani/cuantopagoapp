import { createContext, useState } from 'react';
import { usersData } from '../mokData';

export const UserContext = createContext({
  userData: [],
  getUser: () => {},
});

const { Provider } = UserContext;

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const getUser = (data) => {
    const check = usersData.find((user, i) => user.email === data.email);
    console.log(check);
    if (!!check) {
      setUserData(check);
      //seteamos cookies de user
      return check;
    }
    return check;
  };

  return <Provider value={{ userData, getUser }}>{children}</Provider>;
};
