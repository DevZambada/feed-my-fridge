  export async function getRecetas() {
    const respuesta = await fetch("http://localhost:3000/recipes");
    const resultado = await respuesta.json();
    console.log('fetched')
    return resultado;
  }

  export async function getReceta(id) {
    const respuesta = await fetch(`http://localhost:3000/recipes/${id}`);
    const resultado = await respuesta.json();
    console.log('fetched')

    return resultado;
  }

  export async function addRecipe(datos) {

    try{
      const respuesta = await fetch("http://localhost:3000/recipes", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await respuesta.json()
    }
    catch (error) {
      console.log(error);
    }
  }

  export async function updateRecipe(id, datos) {
    try{
      const respuesta = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await respuesta.json()
    }
    catch (error) {
      console.log(error);
    }
  }
  
  export async function deleteRecipe(id) {
    try{
      const respuesta = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'DELETE'
      })
      await respuesta.json()
    }
    catch (error) {
      console.log(error);
    }
  }