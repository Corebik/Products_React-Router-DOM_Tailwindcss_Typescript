import { safeParse } from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../schemas";
import axios from "axios";
import { Product } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
   [k: string]: FormDataEntryValue;
}

export const addProduct = async( data : ProductData ) => {
   try {
      const result = safeParse( DraftProductSchema, { 
         name: data.name, 
         price: +data.price 
      });

      if (result.success) {

         const url = `${import.meta.env.VITE_API_URL}/api/products`;
         await axios.post(url, {
            name: result.output.name,
            price: result.output.price
         });
         
      }else{
         throw new Error("Datos no válidos!");
         return;
      }

      

   } catch (error) {
      console.log(error);
   }
};

export const getProducts = async() => {
   try{

      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      const { data : response } = await axios.get(url);

      const result = safeParse(ProductsSchema, response.products);

      if (!result.success) {
         throw new Error("Error en el servidor");
         return;
      }

      return result.output;

   }catch(error){
      console.log(error);
   }
}

export const getProductById = async( id : Product["id"] ) => {
   try{

      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      const { data : response } = await axios.get(url);

      const result = safeParse(ProductSchema, response.product);
      
      if (!result.success) {
         throw new Error("Error en el servidor");
         return;
      }

      return result.output;

   }catch(error){
      console.log(error);
   }
}

export const updateProduct = async( id : Product["id"], data : ProductData ) => {
   try{

      const result = safeParse(ProductSchema,{
         id,
         name: data.name,
         price: +data.price,
         availability: toBoolean(data.availability.toString())
      });
      
      if(result.success){

         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
         await axios.put(url, result.output);

      }else{
         throw new Error("Error en el servidor");
         return;
      }

   }catch(error){
      console.log(error);
   }
}

export const deleteProduct = async( id : Product["id"] ) => {
   try{
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.delete(url);
   }catch(error){
      console.log(error);
   }
}

export const updateAvailability = async( id : Product["id"] ) => {
   try{

      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.patch(url);

   }catch(error){
      console.log(error);
   }
}