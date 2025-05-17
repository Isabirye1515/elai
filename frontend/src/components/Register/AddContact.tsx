import {
  Column,
  Form,
  TextInput,
  Button,
  Stack,
  Select,
  SelectItem,
  Grid,
} from "@carbon/react";
import { useCallback, useEffect, useState } from "react";
import { Contacts, Persons } from "../interfaces/Interface";

const AddContact = () => {
  const urls = {
    contact: "http://localhost:4000/api/contact",
    persons: "http://localhost:4000/api/person",
  };

  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactUniqId, setNewContactUniqId] = useState("");
  const [person, setPerson] = useState<Persons>({
    image: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    occupation: "",
    contact_id: "",
  });

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch(urls.contact);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, [urls.contact]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newContactName.trim() || !newContactUniqId.trim()) {
      alert("Please enter both contact name and uniqId (phone number).");
      return;
    }

    try {
      await fetch(urls.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newContactName, uniqId: newContactUniqId }),
      });

      await fetchContacts();
      setNewContactName("");
      setNewContactUniqId("");
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  const handlePersonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!person.name || !person.username || !person.email) {
      alert("Please enter name, username, and email.");
      return;
    }

    let contactId = selectedContactId;

    if (!contactId && newContactName && newContactUniqId) {
      try {
        await fetch(urls.contact, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newContactName, uniqId: newContactUniqId }),
        });

        await fetchContacts();
        const createdContact = contacts.find(c => c.uniqId === newContactUniqId);
        if (!createdContact) {
          alert("Could not find the newly created contact.");
          return;
        }

        contactId = String(createdContact.id);
      } catch (error) {
        console.error("Error creating contact:", error);
        return;
      }
    }

    if (!contactId) {
      alert("Please select or create a contact.");
      return;
    }

    try {
      const res = await fetch(urls.persons, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...person, contact_id: contactId }),
      });

      const data = await res.json();
      console.log("Person saved:", data);
      setPerson({
        image: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        occupation: "",
        contact_id: "",
      });
      setSelectedContactId("");
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  return (
    <>
    <h2>Create Contact</h2>
    <hr />
    <Grid>
    <Column sm={4} lg={10} md={8}>
      <Form onSubmit={handleContactSubmit}>
        <TextInput
          id="new-contact-name"
          labelText="Contact Name"
          placeholder="Enter contact name"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
          required
        />
        <TextInput
          id="new-contact-uniqId"
          labelText="Contact Phone Number (uniqId)"
          placeholder="Enter phone number"
          value={newContactUniqId}
          onChange={(e) => setNewContactUniqId(e.target.value)}
          required
        />
        <Button type="submit" style={{ marginTop: "1rem" }}>
          Save Contact
        </Button>
      </Form>

      <hr />

      <h3>Add Person</h3>
      <Form onSubmit={handlePersonSubmit}>
        <Stack gap={4}>
          <Select
            id="contact"
            labelText="Select Existing Contact"
            value={selectedContactId}
            onChange={(e) => setSelectedContactId(e.target.value)}
          >
            <SelectItem value="" text="-- None --" />
            {contacts.map((contact) => (
              <SelectItem
                key={contact.id}
                value={String(contact.id)}
                text={`${contact.name} (${contact.uniqId})`}
              />
            ))}
          </Select>

          <TextInput
            id="name"
            labelText="Full Name"
            value={person.name}
            onChange={(e) => setPerson({ ...person, name: e.target.value })}
            required
          />
          <TextInput
            id="username"
            labelText="Username"
            value={person.username}
            onChange={(e) => setPerson({ ...person, username: e.target.value })}
            required
          />
          <TextInput
            id="email"
            labelText="Email"
            type="email"
            value={person.email}
            onChange={(e) => setPerson({ ...person, email: e.target.value })}
            required
          />
          <TextInput
            id="phone"
            labelText="Phone"
            value={person.phone}
            onChange={(e) => setPerson({ ...person, phone: e.target.value })}
          />
          <TextInput
            id="occupation"
            labelText="Occupation"
            value={person.occupation}
            onChange={(e) => setPerson({ ...person, occupation: e.target.value })}
          />
          <TextInput
            id="image"
            labelText="Image URL"
            value={person.image}
            onChange={(e) => setPerson({ ...person, image: e.target.value })}
          />

          <Button type="submit" style={{ marginTop: "1rem" }}>
            Save Person
          </Button>
        </Stack>
      </Form>
    </Column>
    </Grid>
    </>
  );
};

export default AddContact;
