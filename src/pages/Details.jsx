import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";

import { AddIcon } from "../icons";

export async function loader({ params }) {
  const api = await fetch(
    `https://api.spoonacular.com/recipes/${
      params.recipeId
    }/information?apiKey=${import.meta.env.VITE_APP_RECIPES_API_KEY}`
  );
  const data = await api.json();

  return data;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Details() {
  const navigate = useNavigate();
  const recipe = useLoaderData();

  return (
    <div className="">
      <div className="flex flex-row items-start">
        <div className=" flex flex-col justify-start flex-none w-1/2">
          <div className="fixed flex flex-col w-full items-start bg-white">
            <h1 className="text-[#008914] text-start font-extrabold text-4xl mb-3 ml-10 mt-0">
              {recipe.title}
            </h1>
            <p className="text-lg ml-10 mb-5">
              {recipe.cuisines.length > 0
                ? capitalizeFirstLetter(recipe.cuisines[0])
                : "Miscellaneous"}
              {recipe.dishTypes.length > 0 &&
                `, ${capitalizeFirstLetter(recipe.dishTypes[0])}`}
            </p>
          </div>
          <div
            className=" flex flex-none justify-start h-[600px] w-full bg-cover bg-center rounded-3xl mt-[160px] mx-10"
            style={{ backgroundImage: `url(${recipe.image})` }}
            key={recipe.id}
          >
            <div className="h-full w-full rounded-3xl bg-gradient-to-b from-transparent to-black pb-4 px-4"></div>
          </div>
        </div>

        <div className="ml-10 mt-[160px] mb-10 flex flex-col overflow-y-auto overflow-x-auto w-1/2 flex-grow mx-10">
          <div className="flex flex-row justify-between ml-10">
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl text-black">Ingredients: </h2>
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

            <div className="flex flex-col  bg-[#cdcdcd] rounded-lg p-3 h-[90px] cursor-pointer text-black hover:text-[#008914] hover:shadow-xl">
              <div className="flex justify-center h-auto">
                <AddIcon />
              </div>
              <div className="flex justify-center h-auto">
                <p className=" font-bold text-xl">Add to Cart</p>
              </div>
            </div>
          </div>

          <h2 className="font-bold text-2xl text-black mt-8  mx-10 w-screen">
            Steps:{" "}
          </h2>
          <div className="ml-10 flex flex-col justify-start ">
            <ul className="list-disc list-inside">
              {recipe.instructions.split(/\.|\n/).map((sentence, index) => {
                const trimmedSentence = sentence.trim();
                const sanitizedSentence = trimmedSentence.replace(
                  /<ol>|<\/ol>|<li>|<\/li>/g,
                  ""
                );
                if (sanitizedSentence !== "") {
                  return (
                    <li className="text-lg" key={index}>
                      {sanitizedSentence}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
