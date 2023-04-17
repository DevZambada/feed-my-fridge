import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { addRecipe } from "../data/recipes";

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);

  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Every field is required");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await addRecipe(datos);

  return redirect("/");
}

function NewRecipe() {
  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-gray-900">New Recipe</h1>
      <p className="mt-3">Fill the required information to add a new recipe</p>

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
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-gray-800 p-3 uppercase font-bold text-white text-lg"
            value="Add Recipe"
          />
        </Form>
      </div>
    </>
  );
}

export default NewRecipe;
