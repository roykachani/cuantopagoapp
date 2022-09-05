import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/user';

export default function Login() {
  const router = useRouter();
  const { getUser } = useContext(UserContext);

  const handlelogin = (e) => {
    e.preventDefault();
    const data = {
      email: e.target['email'].value,
      pass: e.target['password'].value,
    };
    const user = getUser(data);
    if (!!user) router.push('/user/activeRooms');
    if (!user) router.push('/');
    //almacenar las rooms del user en context
  };

  return (
    <>
      <h1>Ingresa</h1>
      <span>Para ingresar utiliza tu email y contraseña</span>
      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </>
  );
}
