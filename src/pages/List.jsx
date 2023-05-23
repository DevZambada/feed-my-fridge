import React from "react";
import { useLocation } from "react-router-dom";

const List = (props) => {
  const location = useLocation();
  //const ingredientList = location.state?.ingredientList || [];
  const ingredientList = JSON.parse(localStorage.getItem("ingredientList"));

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="mx-10">
      <h3 className="text-3xl font-black text-start mr-3 text-[#008914] mb-5 mt-8">
        Your Shopping List
      </h3>
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
