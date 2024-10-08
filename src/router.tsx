import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Products, NewProduct, EditProduct } from "./views";
import { actionNewProduct, editProductLoader, productsLoader, actionEditProduct, actionDeleteProduct, actionUpdateAvailability } from "./helpers";


export const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            index: true,
            element: <Products />,
            loader: productsLoader,
            action: actionUpdateAvailability
         },
         {
            path: "/products",
            element: <NewProduct />,
            action: actionNewProduct
         },
         {
            path: "/products/:id/edit", //ROA Pattern - Resource-oriented design
            element: <EditProduct />,
            loader: editProductLoader,
            action: actionEditProduct
         },
         {
            path: "/products/:id/delete",
            action: actionDeleteProduct
         }
      ]
   },

])