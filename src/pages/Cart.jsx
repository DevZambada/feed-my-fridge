import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../features/cartContext";
import { RemoveIcon, InfoIcon } from "../icons";
import { client as supabaseApi } from "../data/supabase";
import { toast } from "react-toastify";

const client = supabaseApi;

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);

  //const [cartItems2, setCartItems2] = useState(null);

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

  //const metadata = user.user_metadata;
  //console.log(user.user_metadata);
  //setCartItems2(metadata.cart);

  const updateUserListSupabase = (ingredientList) => {
    client.auth.updateUser({
      data: {
        list: ingredientList,
      },
    });
  };

  const calculateTotalIngredients = () => {
    const ingredientMap = new Map();

    for (const recipe of cartItems) {
      for (const ingredient of recipe.extendedIngredients) {
        const { name, amount, unit } = ingredient;

        if (ingredientMap.has(name)) {
          const existingIngredient = ingredientMap.get(name);
          const newAmount = existingIngredient.amount + amount;

          ingredientMap.set(name, {
            amount: newAmount,
            unit: existingIngredient.unit || unit,
          });
        } else {
          ingredientMap.set(name, { amount, unit });
        }
      }
    }

    return ingredientMap;
  };

  const handleNavigateToIngredientList = (ingredientList) => {
    navigate("/recipes/list", { state: { ingredientList } });
  };

  const handleCalculateSum = () => {
    const ingredientMap = calculateTotalIngredients();

    // for (const [name, { amount, unit }] of ingredientMap) {
    //   console.log(`${name}: ${amount} ${unit || ""}`);
    // }
    const ingredientList = Array.from(ingredientMap);

    updateUserListSupabase(ingredientList);
    localStorage.setItem("ingredientList", JSON.stringify(ingredientList));

    toast.success("Shopping List created!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Adjust the duration as needed
    });

    //handleNavigateToIngredientList(ingredientList);
  };

  return (
    <div className="mx-10">
      <h3 className="text-3xl font-black text-start mr-3 text-[#008914] mb-5 mt-8">
        My Recipes
      </h3>
      {cartItems.length === 0 ? (
        <p className="flex mt-10 text-xl font-semibold">
          It looks empty here. How about searching for some recipes?
        </p>
      ) : (
        <>
          <ul>
            {cartItems.map((recipe) => (
              <li
                key={recipe.id}
                className=" border-[#84C43E] border-4 rounded-xl mb-5 p-5"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col w-1/3">
                    <div className="rounded-xl">
                      <img src={recipe.image} />
                    </div>
                    <h2 className="text-[#008914] font-bold text-lg">
                      {recipe.title}
                    </h2>
                  </div>

                  <div className="max-h-[300px] overflow-scroll">
                    <h2 className="font-bold text-2xl text-black">
                      Ingredients:{" "}
                    </h2>
                    <div className="flex flex-row justify-between gap-10">
                      <ul>
                        {recipe.extendedIngredients.map((detail) => {
                          return (
                            <li className="text-lg" key={detail.id}>
                              {detail.name}
                            </li>
                          );
                        })}
                      </ul>
                      <div>
                        {recipe.extendedIngredients.map((detail) => {
                          return (
                            <div
                              className="flex flex-col justify-start "
                              key={detail.id}
                            >
                              <div className="flex gap-2 align-center">
                                <p className=" font-bold text-lg text-[#008914]">
                                  {detail.amount} {detail.unit}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col justify-center">
                    <div className="flex flex-row justify-between">
                      <button
                        onClick={() =>
                          navigate(`/recipes/${recipe.id}/details`)
                        }
                      >
                        <InfoIcon />
                      </button>
                      <button
                        onClick={() => removeFromCart(recipe.id)}
                        className="text-red-700 ml-10"
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div
            className="mt-8 rounded-xl w-full h-auto p-5 bg-[#84C43E] flex justify-center cursor-pointer"
            onClick={handleCalculateSum}
          >
            <h4 className=" font-extrabold text-white text-2xl text-center flex flex-row justify-center">
              Create My Shopping List
            </h4>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
