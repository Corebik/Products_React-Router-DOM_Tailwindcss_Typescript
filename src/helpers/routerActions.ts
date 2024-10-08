import { ActionFunctionArgs, redirect } from "react-router-dom";
import { addProduct, deleteProduct, updateAvailability, updateProduct } from "../services/ProductService";

export const actionNewProduct = async ({ request } : ActionFunctionArgs) => {
   const data = Object.fromEntries( await request.formData() );
   
   let error = "";

   if (Object.values(data).includes("")) {
      error = "Todos los campos son obligatorios";
   }

   if (error.length) {
      return error;
      
   }

   await addProduct(data);

   return redirect("/");
}

export const actionEditProduct = async ({ request, params } : ActionFunctionArgs) => {
   const data = Object.fromEntries( await request.formData() );
   
   let error = "";

   if (Object.values(data).includes("")) {
      error = "Todos los campos son obligatorios";
   }

   if (error.length) {
      return error;
      
   }

   if(params.id !== undefined) {
      await updateProduct(+params.id, data);
   }

   return redirect("/");
}

export const actionDeleteProduct = async ({ params } : ActionFunctionArgs) => {
   if(params.id !== undefined) {
      await deleteProduct(+params.id);
   }

   return redirect("/");
}

export const actionUpdateAvailability = async({ request } : ActionFunctionArgs) => {
   const data = Object.fromEntries( await request.formData() );
   await updateAvailability(+data.id);

   return {}
}