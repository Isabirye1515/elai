import { Button, Column, Grid, } from "@carbon/react";
import { useEffect, useState } from "react";
import { Dashboards } from "../interfaces/Interface";
import { useNavigate } from "react-router";

const Home = () => {
  const url = "http://localhost:4000/api/dashboard"
  const [dashboard, setDashboard] = useState<Dashboards[]>([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data fetched successfully:", data);
      setDashboard(data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }
    , []);

  return (
    <>
      <h2>Dashboard Page</h2>
      <hr />
      {dashboard.map((item) => (
        <Grid fullWidth >
          <Column lg={8} md={8} sm={4} key={item.id}  >

            <div className="item" >
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.value}</p>
            </div>
            <div>
              <Button onClick={()=>navigate(item.url)} >VIEW</Button>
            </div>
            </div>
          </Column>

        </Grid>
      ))}
    </>
  );
};
export default Home;