import Tag from "../tag/tag";

export default class Product{
    public name: string;
    public description: string;
    public price: number;
    public category: string;
    public image: string;
    public stock: number;
    public rating: number;
    public reviews: number;
    public createdAt: Date;
    public updatedAt: Date;
    public isActive: boolean;
    public discount: number;
    public manufacturer: string;
    public warranty: string;

    constructor( name: string, description: string, price: number, category: string, image: string, stock: number, rating: number, reviews: number, createdAt: Date, updatedAt: Date, isActive: boolean, discount: number, manufacturer: string, warranty: string){

        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.stock = stock;
        this.rating = rating;
        this.reviews = reviews;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
       
        this.discount = discount;
        this.manufacturer = manufacturer;
        this.warranty = warranty;

    }

    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getPrice(){
        return this.price;
    }
    getCategory(){  
        return this.category;
    }
    getImage(){
        return this.image;
    }           
    getStock(){
        return this.stock;
    }           
    getRating(){
        return this.rating;
    }
    getReviews(){
        return this.reviews;
    }
    getCreatedAt(){
        return this.createdAt;
    }
    getUpdatedAt(){
        return this.updatedAt;
    }
    getIsActive(){
        return this.isActive;
    }

    getDiscount(){
        return this.discount;
    }
    getManufacturer(){
        return this.manufacturer;
    }
    getWarranty(){
        return this.warranty;
    }
    setName(name: string){
        this.name = name;
    }

    setPrice(price: number){
        this.price = price;
    }   
    setCategory(category: string){
        this.category = category;
    }   
    setDescription(description: string){
        this.description = description;
    }   
    setImage(image: string){
        this.image = image;
    }
    setStock(stock: number){
        this.stock = stock;
    }
    setRating(rating: number){
        this.rating = rating;
    }
    
    setReviews(reviews: number){
        this.reviews = reviews;
    }
    setIsActive(isActive: boolean){
        this.isActive = isActive;
    }
    setDiscount(discount: number){
        this.discount = discount;
    }
    setManufacturer(manufacturer: string){
        this.manufacturer = manufacturer;
    }
    setWarranty(warranty: string){
        this.warranty = warranty;
    }

    setCreatedAt(createdAt: Date){
        this.createdAt = createdAt;
    }
    setUpdatedAt(updatedAt: Date){
        this.updatedAt = updatedAt;
    }
    toString(){
        return `Product: ${this.name}, Price: ${this.price}, Category: ${this.category}, Stock: ${this.stock}, Rating: ${this.rating}, Reviews: ${this.reviews}, Created At: ${this.createdAt}, Updated At: ${this.updatedAt}, Is Active: ${this.isActive}, Discount: ${this.discount}%, Manufacturer: ${this.manufacturer}, Warranty: ${this.warranty}`;
    }
    

}
