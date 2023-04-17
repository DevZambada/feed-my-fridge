  import {client as supabaseApi} from './supabase'
  
  // export async function getRecetas() {
  //   const respuesta = await fetch("http://localhost:3000/recipes");
  //   const resultado = await respuesta.json();
  //   console.log('fetched')
  //   return resultado;
  // }

  export async function getRecetas() {
    const respuesta = await supabaseApi
    .from('Recipes')
    .select('*')

    return respuesta;
  }

  // export async function getReceta(id) {
  //   const respuesta = await fetch(`http://localhost:3000/recipes/${id}`);
  //   const resultado = await respuesta.json();
  //   console.log('fetched')

  //   return resultado;
  // }

  export async function getReceta(id) {
    const respuesta = await supabaseApi
    .from('Recipes')
    .select('*')
    .eq('id', id)

    console.log(id)

    return respuesta;
  }

  // export async function addRecipe(datos) {

  //   try{
  //     const respuesta = await fetch("http://localhost:3000/recipes", {
  //       method: 'POST',
  //       body: JSON.stringify(datos),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     await respuesta.json()
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  export async function addRecipe(datos) {
      try {
        const respuesta = await supabaseApi
        .from('Recipes')
        .insert(datos)

        console.log(respuesta)

      }
      catch (error) {
        console.log(error);
      }
  }

  // export async function updateRecipe(id, datos) {
  //   try{
  //     const respuesta = await fetch(`http://localhost:3000/recipes/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify(datos),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     await respuesta.json()
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  export async function updateRecipe(id, datos) {
    try {
      const respuesta = await supabaseApi
      .from('Recipes')
      .update(datos)
      .eq('id', id)

      console.log(respuesta)
    }
    catch (error) {
      console.log(error);
    }
  }
  
  // export async function deleteRecipe(id) {
  //   try{
  //     const respuesta = await fetch(`http://localhost:3000/recipes/${id}`, {
  //       method: 'DELETE'
  //     })
  //     await respuesta.json()
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  export async function deleteRecipe(id) {
      try {
        await supabaseApi
        .from('Recipes')
        .delete()
        .eq('id', id)
      }
      catch(error) {
        console.log(error);
      }
  }