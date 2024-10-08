import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getProductById, getProducts } from "../services/ProductService";

export const productsLoader = async() => {
   const products = await getProducts();
   return products;
}

export const editProductLoader = async({ params } : LoaderFunctionArgs) => {
   
   if(params.id !== undefined) {
      const product = await getProductById( +params.id );
      
      if(!product) {
         return redirect("/");
      }

      return product;
   }

   return {}
}