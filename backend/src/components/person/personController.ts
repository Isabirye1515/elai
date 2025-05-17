import express, { Request, Response } from 'express';
import PersonService from './personService';


const router = express.Router();
const personService = new PersonService();

/**
 * Endpoint to add a new person.
 */
router.post('/', async (req: Request, res: Response) => {
    const person = req.body;
    try {
      await personService.addPerson(person);
      res.status(201).json({ message: 'Person added successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

/**
 * Endpoint to get all persons.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const persons = await personService.getAllPersons();
        res.status(200).json(persons);
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to get a person by ID.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const person = await personService.getPersonById(id);
        res.status(200).json(person);
    } catch (error: string | any) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * Endpoint to update a person.
 */
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPerson = req.body;
    updatedPerson.id = id; // Ensure the ID is passed along with the updated data
    try {
        const person = await personService.updatePerson(updatedPerson);
        res.status(200).json(person);
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to delete a person by ID.
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await personService.deletePersonById(id);
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Endpoint to delete all persons.
 */
router.delete('/', async (req: Request, res: Response) => {
    try {
        await personService.deleteAllPersons();
        res.status(200).json({ message: 'All persons deleted successfully' });
    } catch (error: string | any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
