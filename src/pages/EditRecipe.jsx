import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { getReceta, updateRecipe } from "../data/recipes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
  const recipe = await getReceta(params.recipeId);
  if (Object.values(recipe).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No Results Found",
    });
  }
  return recipe;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);

  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("All data is mandatory");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await updateRecipe(params.recipeId, datos);
  return redirect("/");
}

function EditRecipe() {
  const navigate = useNavigate();
  const recipe = useLoaderData();
  const errores = useActionData();

  console.log(recipe.id);

  return (
    <>
      <h1 className="font-black text-4xl text-gray-900">Edit Recipe</h1>
      <p className="mt-3">Edit the information for your recipes</p>

      <div className="flex justify-end">
        <button
          className="bg-gray-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Return
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <Formulario recipe={recipe} />

          <input
            type="submit"
            className="mt-5 w-full bg-gray-800 p-3 uppercase font-bold text-white text-lg"
            value="Save Changes"
          />
        </Form>
      </div>
    </>
  );
}

export default EditRecipe;
