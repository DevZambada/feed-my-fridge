import React from "react";
import { useLocation } from "react-router-dom";

const List = (props) => {
  const location = useLocation();
  const ingredientList = location.state?.ingredientList || [];

  return (
    <div className="mx-10">
      <h3 className="text-3xl font-black text-start mr-3 text-[#008914] mb-5 mt-8">
        Your Shopping List
      </h3>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
