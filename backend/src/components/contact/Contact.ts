import Person from "../person/Person"

export default class Contact{
    public name:string
    public uniqId:string
    public person:Person[]
    constructor(name:string,uniqId:string,person:Person[]){
        this.person = person;
        this.name=name
        this.uniqId=uniqId
    }
    getUniqId(){
        return this.uniqId
    }
    setUniqId(uniqId:string){
        this.uniqId=uniqId
    }
    getName(){
        return this.name

    }

    setName(name:string){
        this.name=name
    }
    setPerson(person:Person[]){
        this.person=person
    }
    getPerson(){
        return this.person
    }

    

}