import Person from "./Person";
import { personDaop } from "./personDao"; 
import PersonDaoImpl from "./personDaoIpl";  // Importing the DAO implementation.

export default class PersonService {
    private personDao: personDaop;

    constructor() {
        this.personDao = new PersonDaoImpl();  // Initializing the DAO implementation.
    }

    // Get all persons
    async getAllPersons(): Promise<Person[]> {
        return await this.personDao.getAllPersons();
    }

    // Get person by id
    async getPersonById(id: string): Promise<Person> {
        return await this.personDao.getPersonById(id);
    }

    // Add a new person
    async addPerson(person: Person): Promise<void> {
        await this.personDao.addPerson(person);
    }

    // Delete all persons
    async deleteAllPersons(): Promise<void> {
        await this.personDao.deleteAllPersons();
    }

    // Delete a person by id
    async deletePersonById(id: string): Promise<void> {
        await this.personDao.deletePersonById(id);
    }

    // Update a person
    async updatePerson(person: Person): Promise<Person> {
        return await this.personDao.updatePerson(person);
    }
}
