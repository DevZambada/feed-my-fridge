import { useLoaderData } from "react-router-dom";
import { getRecetas } from "../data/recipes";
import Recipe from "../components/Recipe";

export function loader() {
  const recipes = getRecetas();

  return recipes;
}

function Display() {
  const recipes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-gray-900">Recipes</h1>
      <p className="mt-3">Review your favorite recipes</p>

      {recipes.data.length ? (
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden mt-5">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Ingredients</th>
              <th className="p-4 text-left">Steps</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.data.map((recipe) => (
              <Recipe recipe={recipe} key={recipe.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No recipes found</p>
      )}
    </>
  );
}

export default Display;
