import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteRecipe } from "../data/recipes";
import { EditIcon, DeleteIcon } from "../icons";

export async function action({ params }) {
  await deleteRecipe(params.recipeId);
  return redirect("/");
}

function Recipe({ recipe }) {
  const navigate = useNavigate();
  const { id, name, ingredients, steps } = recipe;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{name}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600">{ingredients}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600">{steps}</p>
      </td>

      <td className="p-6 flex gap-3 flex-col align-middle">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-900 uppercase font-bold text-xs"
          onClick={() => navigate(`/recipes/${id}/edit`)}
        >
          <EditIcon />
        </button>

        <Form
          method="post"
          action={`/recipes/${id}/delete`}
          onSubmit={(e) => {
            if (!confirm("¿Do you wish to delete this recipe??")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs mt-5"
          >
            <DeleteIcon />
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default Recipe;
