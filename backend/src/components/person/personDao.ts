import Person from "./Person";

export interface personDaop{
    getAllPersons():Promise<Person[]>
    getPersonById(id:string):Promise<Person>
    addPerson(person:Person):Promise<void>
    deleteAllPersons():Promise<void>
    deletePersonById(id:string):Promise<void>
    updatePerson(person:Person):Promise<Person>

}