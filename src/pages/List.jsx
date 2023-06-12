import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { client as supabaseApi } from "../data/supabase";

const client = supabaseApi;

const List = () => {
  const [user, setUser] = useState(null);
  const [ingredientList, setIngredientList] = useState([]);

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

  // const metadata = user.user_metadata;

  // const ingredientList2 = metadata.list;

  useEffect(() => {
    const storedIngredientList =
      JSON.parse(localStorage.getItem("ingredientList")) || [];
    setIngredientList(storedIngredientList);
  }, []);

  const handleDeleteIngredient = (index) => {
    const updatedList = [...ingredientList];
    updatedList.splice(index, 1);
    setIngredientList(updatedList);
    localStorage.setItem("ingredientList", JSON.stringify(updatedList));
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="mx-10">
      <h3 className="text-3xl font-black text-start mr-3 text-[#008914] mb-5 mt-8">
        Your Shopping List
      </h3>
      {ingredientList.length === 0 ? (
        <p className="flex mt-10 text-xl font-semibold">
          It looks empty here. How about searching for some recipes?
        </p>
      ) : (
        <ul>
          {ingredientList.map((ingredient, index) => (
            <li key={index} className="text-lg font-bold text-black mt-10">
              <div className="flex flex-row justify-start">
                <div>- {capitalizeFirstLetter(ingredient[0])}</div>
                <div className="flex flex-row ml-2">
                  {ingredient.slice(1).map((amount, index) => (
                    <div key={index}>
                      <p className="font-bold text-lg text-[#008914]">
                        {amount.amount} {amount.unit}
                      </p>
                    </div>
                  ))}
                  <button
                    className="ml-5 text-red-600"
                    onClick={() => handleDeleteIngredient(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
