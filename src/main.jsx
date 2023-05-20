import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Display, { loader as recipeLoader } from "./pages/Display";
import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import NewRecipe, { action as newRecipeAction } from "./pages/NewRecipe";
import EditRecipe, {
  loader as editRecipeLoader,
  action as editRecipeAction,
} from "./pages/EditRecipe";
import { action as deleteRecipeAction } from "./components/Recipe";
import Home from "./pages/Home";
import Details, { loader as detailRecipeLoader } from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: recipeLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/:recipeId/details",
        element: <Details />,
        loader: detailRecipeLoader,
        // action: newRecipeAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/:recipeId/edit",
        element: <EditRecipe />,
        loader: editRecipeLoader,
        action: editRecipeAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/:recipeId/delete",
        action: deleteRecipeAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
