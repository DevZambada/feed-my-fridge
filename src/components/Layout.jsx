import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { client as supabaseApi } from "../data/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { LogoutIcon, UserIcon, CartIcon } from "../icons";
import LogoWhite2 from "../assets/LogoWhite.svg";
import BackgroundStripes from "../assets/BackgroundStripes.svg";
import Slogan from "../assets/Slogan.svg";

const client = supabaseApi;

const logoutSupabase = () => {
  client.auth.signOut();
};

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await client.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="h-screen w-screen justify-between flex flex-row items-center bg-[#ffffff] p-16">
        <div>
          <img src={Slogan} alt="Slogan App" className="" />
        </div>
        <div className="p-5  w-[400px] ">
          <Auth
            supabaseClient={client}
            appearance={{
              theme: ThemeSupa,
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      // <div className="md:flex md:min-h-screen">
      <>
        <div className="w-full overflow-hidden flex flex-col min-h-screen">
          <aside className="fixed flex flex-row justify-between h-[100px] w-full bg-[#008914] ">
            <div
              className="mx-5 my-1 w-1/8 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={LogoWhite2} alt="Logo Icon" className="w-[200px]" />
            </div>
            <div className="w-3/8 flex flex-col justify-center">
              <h2 className="text-md font-black text-start text-[#ffffff] ">
                {user && <p>Hello, {user.email}</p>}
              </h2>
            </div>
            <div className="flex justify-center w-1/4">
              <img
                src={BackgroundStripes}
                alt="Bg-Stripes"
                className="flex justify-center w-[250px]"
              />
            </div>
            <div className="px-4 my-4 flex align-center justify-center bg-[#84C43E] rounded-lg">
              <div className="flex gap-6 flex-row justify-between ">
                <Link
                  className={
                    " text-[#008914] text-md hover:text-white font-bold flex flex-col justify-center cursor-pointer"
                  }
                >
                  <div className="flex flex-row justify-center">
                    <UserIcon />
                  </div>
                  <label className=" flex flex-row justify-center cursor-pointer">
                    Preferences
                  </label>
                </Link>
                <Link
                  onClick={logoutSupabase}
                  className={
                    " text-[#008914] text-md hover:text-white font-bold flex flex-col justify-center cursor-pointer"
                  }
                >
                  <div className="flex flex-row justify-center">
                    <LogoutIcon />
                  </div>
                  <label className=" flex flex-row justify-center cursor-pointer">
                    Logout
                  </label>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center mr-10">
              <div
                className=" text-white text-md mt-2 hover:text-[#84C43E] font-bold flex flex-col p-2 cursor-pointer"
                onClick={() => navigate("recipes/cart")}
              >
                <div className="flex flex-row justify-center">
                  <CartIcon />
                </div>
                <label className=" flex flex-row justify-center cursor-pointer">
                  Your Cart
                </label>
              </div>
            </div>
          </aside>

          <main className="md:w-full md:h-full overflow-y-auto flex-grow mt-[100px] mb-[100px] bg-white">
            <Outlet />
          </main>

          <div className="fixed bottom-0 w-full bg-[#008914] h-[80px] flex flex-col justify-center p-5 rounded-t-3xl">
            <div className="flex flex-row justify-between">
              <p>2023 Feed my Fridge, Inc. Todos los derechos reservados</p>
              <p>Tecnológico de Monterrey</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Layout;
