import { useEffect, useState, useContext } from "react";
import { useNavigate, Form, redirect } from "react-router-dom";
import { AddIcon } from "../icons";
import { CartContext } from "../features/cartContext";

function Desserts() {
  const navigate = useNavigate();

  const { cartItems, addToCart } = useContext(CartContext);

  const [dessert, setDessert] = useState([]);

  useEffect(() => {
    getDessert();
  }, []);

  const getDessert = async () => {
    const check = localStorage.getItem("dessert");

    if (check) {
      setDessert(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_APP_RECIPES_API_KEY
        }&number=20&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem("dessert", JSON.stringify(data.recipes));
      setDessert(data.recipes);
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-3xl font-black text-start ml-8 mr-3 text-[#008914] mb-5">
          Desserts to Finish Your Meal
        </h3>
        <div className="h-[280px] w-screen rounded overflow-scroll flex gap-[20px]">
          {dessert.map((recipe) => {
            return (
              <div
                className="h-[250px] min-w-[400px] ml-8 bg-[#84C43E] rounded-3xl flex flex-row justify-between shadow-lg"
                key={recipe.id}
              >
                <div
                  className="h-[200px] w-[230px] bg-cover bg-center rounded-3xl text-white hover:text-[#84C43E] m-5 hover:h-[225px] hover:w-[250px] hover:m-3 cursor-pointer hover:shadow-black hover:shadow-xl"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                  onClick={() => navigate(`/recipes/${recipe.id}/details`)}
                >
                  <div className="h-full w-full rounded-3xl bg-gradient-to-b from-transparent to-black pb-4 px-4 flex flex-col justify-end">
                    <div className="flex w-full justify-between items-end">
                      <p className="text-center font-semibold text-base">
                        {recipe.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between w-1/4 m-5">
                  <div
                    className="flex flex-row justify-end cursor-pointer text-black hover:text-white"
                    onClick={() => addToCart(recipe)}
                  >
                    <AddIcon className="flex flex-row justify-end " />
                  </div>
                  <div className="flex flex-col justify-end mb-3">
                    <div className="flex flex-col justify-center">
                      <p className="text-[#008914] font-semibold">
                        {recipe.veryHealthy ? "Very Healthy" : ""}
                      </p>
                      <p className="text-[#008914] font-semibold">
                        {recipe.glutenFree ? "Gluten Free" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end mb-3 mr-3">
                    <div className="flex flex-row justify-center">
                      <p className="">
                        {recipe.cuisines.length > 0
                          ? recipe.cuisines[0]
                          : "Miscellaneous"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Desserts;
