import { Button, Column, Form, Grid, TextInput } from "@carbon/react"
import { dashboardItem } from "../interfaces/Interface"
import { ChangeEvent,  useState } from "react";
const AddDashBoard = () => {
    const url = "http://localhost:4000/api/dashboard"   
    const [dashboard, setDashboard] = useState<dashboardItem>({
        title: "",
        description: "",
        url: "",
        value: 0,
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setDashboard((prev) => ({
            ...prev,
            [id]: id === "value" ? Number(value) : value,
        }));
    };
    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dashboard),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Data added successfully:", data);
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData();
        setDashboard({
            title: "",
            description: "",
            url: "",
            value: 0,
        });
    };

    return(
        <>
        <h2>Create A Dashboard Item</h2>
        <hr />
        <Grid>
            <Column sm={4} md={8} lg={8}>
    <Form onSubmit={handleSubmit}>
        <TextInput
            id="title"
            labelText="Title"
            placeholder="Enter title"
            value={dashboard.title}
            onChange={handleChange}
         />
         <TextInput
            id="description"
            labelText="Description"
            placeholder="Enter description"
            value={dashboard.description}
            onChange={handleChange}
         />
            <TextInput
                id="url"
                labelText="URL"
                placeholder="Enter URL"
                value={dashboard.url}
                onChange={handleChange}
         
            />
            <TextInput
                id="value"
                labelText="Value"
                placeholder="Enter value"
                value={dashboard.value}
                onChange={handleChange}
            />
           <Button type="submit">Add Dashboard</Button>
        </Form>
            </Column>

        </Grid>
        </>
    )
}
export default AddDashBoard;