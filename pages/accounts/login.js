import { getProviders, signIn, getSession } from 'next-auth/react';
import { useEffect } from 'react';
import GoogleIcon from '../../components/Icons/GoogleIcon';

export default function Login({ providers, session }) {
  useEffect(() => {
    console.log(session);
  }, []);
  console.log(session);
  return (
    <div className="w-2/3 m-auto h-2/6 flex flex-col gap-y-8 rounded-md shadow-md bg-gray-50 ">
      <div className="flex flex-col gap-y-5 mt-6 h-1/3 items-center">
        <h1 className="text-5xl font-semibold ">Ingresa</h1>
        <span className="text-md">Inicia sesion de forma segura</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="text-lg w-2/3 flex items-center gap-3 justify-center p-3 bg-teal-600 rounded-md shadow-sm text-center cursor-pointer text-gray-200 select-none "
          type="submit"
          onClick={() => signIn(providers.google.id)}
        >
          Ingresar con Google <GoogleIcon />
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {
      providers: await getProviders(),
      session,
    },
  };
};
