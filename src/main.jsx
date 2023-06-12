import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home";
import Details, { loader as detailRecipeLoader } from "./pages/Details";
import { CartProvider } from "./features/cartContext";
import Cart from "./pages/Cart";
import List from "./pages/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/:recipeId/details",
        element: <Details />,
        loader: detailRecipeLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/recipes/list/",
        element: <List />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    <ToastContainer />
  </React.StrictMode>
);
