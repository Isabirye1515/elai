export default class Message {
    public name: string;
    public email: string;
    public subject: string;
    public message: string;
    public createdAt: Date;
    public updatedAt: Date;
    public type:string

    constructor( name: string, email: string, subject: string, message: string, createdAt: Date, updatedAt: Date,type:string) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.type=type;
    }

    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getSubject() {
        return this.subject;
    }
    getMessage() {
        return this.message;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setName(name: string) {
        this.name = name;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setSubject(subject: string) {
        this.subject = subject;
    }
    setMessage(message: string) {
        this.message = message;
    }
    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }
    setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
    getType(){
        return this.type;
    }
    setType(type:string){
        this.type=type;

    }
    toString() {
        return `Message [ name=${this.name}, email=${this.email}, subject=${this.subject}, message=${this.message}, createdAt=${this.createdAt}, updatedAt=${this.updatedAt}]`;
    }

}