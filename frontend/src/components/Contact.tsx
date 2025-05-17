import { useEffect, useState } from "react";
import {Persons } from "./interfaces/Interface";
import { Grid, Column } from "@carbon/react";
import { PhoneApplication } from "@carbon/icons-react";
import { useNavigate } from "react-router";

const Contact = () => {
  const url = "http://localhost:4000/api/person";
  const navigate = useNavigate()

  const [person, setPerson] = useState<Persons[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setPerson(data); // or data.person if your object uses that
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h2>Contacts Page</h2>
    <hr />
    <Grid>

      {person.map((person, index) => (
        <Column key={person.id} lg={8} md={8} sm={4} className="person-card" onClick={()=>navigate(`/message/${person.id}`)} >
                    <div style={{margin:"20px"}} >
            <PhoneApplication size={20} />
          </div>
        
          <img
            src={person.image}
            width={50}
            height={50}
            alt={`${person.name}-image`}
            style={{borderRadius: "50%",margin:"5px"}}
          />
          <div>
          <h4>{person.name}</h4>
          <p> {person.email}</p>
          <p>{person.phone}</p>
          </div>

        </Column>
      ))}
    </Grid>
    </>
  );
};

export default Contact;
