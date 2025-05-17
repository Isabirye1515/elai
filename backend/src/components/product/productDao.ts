import Product from "./Product";

export interface productDao{
    getAllProducts():Promise<Product[]>
    getProductById(id:number):Promise<Product>
    addProduct(product:Product):Promise<void>
    deleteAllProducts():Promise<void>
    deleteProduct(id:number):Promise<void>
    updateProduct(product:Product):Promise<void>
}