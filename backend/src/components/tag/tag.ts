export default class Tag{
    public name:string
    public uniqId:string
    public description:string
    public value:string
    

    constructor(name:string, uniqId:string,description:string,value:string){
        this.name = name;
        this.uniqId = uniqId;
        this.description = description;
        this.value = value;

    }
    
}