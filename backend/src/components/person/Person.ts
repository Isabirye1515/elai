export default class Person{
    public id:string;
    public image:string;
    public name:string;
    public username:string
    public email:string;
    public phone:string;
    public occupation:string;
    public contact_id:string

    constructor(id:string,image:string, name:string, username:string, email:string, phone:string, occupation:string,contact_id:string){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.occupation = occupation;
        this.image=image;
        this.contact_id = contact_id
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getUsername(){
        return this.username;
    }
    
}