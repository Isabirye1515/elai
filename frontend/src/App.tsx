import React from 'react';
import Home from './components/dashboard/Home';
import AddDashBoard from './components/dashboard/AddDashBoard';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import Headers from './components/header/header';
import { Column, Grid } from '@carbon/react';
import AppUser from './components/AppUser/AppUser';
import MessageChart from './components/message/message';
import Register from './components/AppUser/Register';
import AddContact from './components/Register/AddContact';
import Products from './components/product/product';
import AddProduct from './components/product/addproduct';
import CreateMenu from './components/AppUser/createMenu';
import SocketMessage from './components/message/socketMessage';


const  App =() => {
  const navigate = useNavigate()
  return (
    <>
      <Headers />
      <Grid fullWidth={true} >
        <Column sm={4} lg={10} md={8} className="main-content">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/user" element={<AppUser />} />
            <Route path="/message/:id" element={<SocketMessage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addDashItem" element={<AddDashBoard />} />
            <Route path="/addAbout" element={<Register />} />
            <Route path="/newMenu" element={<CreateMenu />} />
            <Route path="/newContact" element={<AddContact />} />
            <Route path="/newProduct" element={<AddProduct />} />

          </Routes>
        </Column>
        <Column sm={4} lg={5} md={8}>
          <div className="content-1">
            <center>
            <h3>ISABIRYE ELIJAH(pro)</h3>
            <hr />
            </center>
            <div className="item-2">
              <u><h4>About Elai</h4></u>
              
              <p><i>
                Elai is designed as ISABIRYE ELIJAH portifolio projects, though its a work in progress elai can:
                <p>1:Show that i can build a react application.</p>
                <p>2:show that i use update technologies like carbon/react to create responsive pages.</p>
                <p>3:show you a variaty of forms for a customisable application</p>
                <p>4:show i can manipulate the java logic to type script for eazy debuging</p>
                </i></p>
            </div>
            <div className='item-2' >
             <u> <h4>User Manual</h4></u>
              <p>This is a reusable a ReadMe app where these are the customisable pages</p>
              <p>1:<b>DashBoard</b> You can dashboard items you want<u><p onClick={()=>navigate("/addDashItem")}>/addDashItem</p></u>But these are the available urls</p>
              <p>2: <b>About</b>You, or any Person with clussial importance <u><p onClick={()=>navigate("/addAbout")}>/addAbout</p></u></p>
              <p>3:<b>Menu</b> Arrange Your Side nav for all that is in this app<u><p onClick={()=>navigate("/newMenu")}>/newMenu</p></u></p>
              <p>4:<b>Product</b> Add your products<u><p onClick={()=>navigate("/newProduct")}>/newProduct</p></u></p>
              <p>5:<b>Contact</b>Add a contact this will be used in messaging<u><p onClick={()=>navigate("/newContact")}>/newContact</p></u></p>
              <p>6: <b>Message</b>Talk to me or your network using Message <u><p onClick={()=>navigate("/message")}>/message</p></u></p>
            </div>
         

            
          </div>
          
        </Column>

      </Grid>

    </>

  );
}

export default App;
