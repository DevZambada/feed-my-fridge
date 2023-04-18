import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Outlet, Link, useLocation } from "react-router-dom";

const client = createClient(
  "https://zjhmrnstdyhghaqupqxr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaG1ybnN0ZHloZ2hhcXVwcXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyNDYzMDMsImV4cCI6MTk5NjgyMjMwM30.ISWgU3QCPb73DsPphHPNpWAMT_xUKA25UvYXc8IqeWs"
);

const logoutSupabase = () => {
  client.auth.signOut();
};

function Layout() {
  const location = useLocation();
  const [session, setSession] = useState(null);

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
      <div className="h-screen w-screen justify-center flex items-center bg-gray-900">
        <div className="p-5 border-solid border-2 border-gray-700 rounded-lg w-[400px]">
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
      <div className="md:flex md:min-h-screen">
        <aside className="md:w-1/4 bg-gray-900 px-5 py-10">
          <h2 className="text-4xl font-black text-center text-white">
            Feed My Fridge
          </h2>
          <nav className="mt-10">
            <Link
              className={`${
                location.pathname === "/" ? "text-white" : "text-gray-500"
              } text-2xl block mt-2 hover:text-white`}
              to="/"
            >
              Recipes
            </Link>
            <Link
              className={`${
                location.pathname === "/recipes/new"
                  ? "text-white"
                  : "text-gray-500"
              } text-2xl block mt-2 hover:text-white`}
              to="/recipes/new"
            >
              New Recipe
            </Link>
            <Link
              onClick={logoutSupabase}
              className={"text-gray-500 text-2xl block mt-2 hover:text-white"}
            >
              Logout
            </Link>
          </nav>
        </aside>

        <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
          <Outlet />
        </main>
      </div>
    );
  }
}

export default Layout;
