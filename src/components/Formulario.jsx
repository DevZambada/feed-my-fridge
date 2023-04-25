const Formulario = ({ recipe }) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Recipe Name"
          name="name"
          defaultValue={recipe?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="ingredients">
          Ingredients:
        </label>
        <input
          id="ingredients"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Recipe Ingredients"
          name="ingredients"
          defaultValue={recipe?.ingredients}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="steps">
          Steps:
        </label>
        <textarea
          as="textarea"
          id="steps"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50 h-40 align-self"
          placeholder="Steps"
          name="steps"
          defaultValue={recipe?.steps}
        />
      </div>
    </>
  );
};

export default Formulario;
