const Layout = ({ children }) => {
  return (
    <main className="font-nunito my-0 mx-auto flex flex-col h-screen bg-gradient-to-tr from-yellow-100 to-amber-50 ">
      {children}
    </main>
  );
};

export default Layout;
