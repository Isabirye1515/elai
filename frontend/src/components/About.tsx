import { useEffect, useState } from "react";
import { About } from "./interfaces/Interface";
import { Column, Grid } from "@carbon/react";

const Contact = () => {
  const url = "http://localhost:4000/api/about";
  const [abouts, setAbout] = useState<About[] | []>([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("About data:", data);
        setAbout(data);
      } catch (error) {
        console.error("Error fetching about:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <>
      <h2>I KNOW YOU</h2>
      <hr />
      <Grid>
      <Column lg={10} md={8} sm={4}  >
        {abouts.map((about)=>(
          <div key={about.id} className="about" >
            <img src={about.image} alt="profile" width={150} height={150} />
      
          <div>
              <h4>{about.name}</h4>
              <p>Status: {about.status ? "Active" : "Inactive"}</p>
              <p>Contact: {about.contact}</p>
              <p>Email: {about.email}</p>
              <div>
              <p>Address: {about.address}</p>
              <p>Phone: {about.phone}</p>

              </div>
            </div>
            </div>
        )) }
</Column>
      </Grid>
    </>
  );
};

export default Contact;
