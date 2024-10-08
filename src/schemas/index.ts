import { boolean, number, object, string, array } from "valibot";

export const DraftProductSchema = object({
   name: string(),
   price: number()
});

export const ProductSchema = object({
   name: string(),
   price: number(),
   id: number(),
   availability: boolean()
});

export const ProductsSchema = array(ProductSchema);