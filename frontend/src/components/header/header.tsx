import React, { JSX, useEffect, useState, useRef } from "react";
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem
} from "@carbon/react";
import { MenuItem } from "../interfaces/Interface";
import { Menu, Notification, Person, Search, Send, User } from "@carbon/icons-react";
import SearchBar from "../Searching/SearchBar";
import AddContact from "../Register/AddContact";
import { useNavigate } from "react-router";

const Headers = () => {
  const url = "http://localhost:4000/api/menu";
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [searchBar, setSeachBar] = useState(false);
  const [register, setRegister] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);  // To track unread messages
  const navigate = useNavigate();

  const handleSearchBar = () => {
    setSeachBar(!searchBar);
  };

  const handleRegister = () => {
    navigate('/message');
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();

    // WebSocket listener
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "message") {
        // Increment unread message count
        setNewMessagesCount((prev) => prev + 1);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const renderMenu = (item: MenuItem): JSX.Element => {
    if (item.hasChildren && item.children && item.children.length > 0) {
      return (
        <SideNavMenu key={item.id} title={item.name} >
          {item.children.map((child) => renderMenu(child))}
        </SideNavMenu>
      );
    } else {
      return (
        <SideNavMenuItem className="side-nav" key={item.id} onClick={() => {
          if (item.url) {
            navigate(item.url);
          }
        }}>
          {item.name}
        </SideNavMenuItem>
      );
    }
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded = true, onClickSideNavExpand }) => (
        <>
          <Header aria-label="ELAI Header" >
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="ELAI">
              ELAI
            </HeaderName>

            <HeaderGlobalBar>
              {searchBar && <SearchBar />}
              <HeaderGlobalAction>
                <Search size={20} onClick={handleSearchBar} />
              </HeaderGlobalAction>
              {register && <AddContact />}
              <HeaderGlobalAction>
                <Send size={20} onClick={handleRegister} />
              </HeaderGlobalAction>
              <HeaderGlobalAction>
                <div style={{ position: 'relative' }}>
                  <Notification size={20} />
                  {newMessagesCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px',
                      }}
                    >
                      {newMessagesCount}
                    </span>
                  )}
                </div>
              </HeaderGlobalAction>
              <HeaderGlobalAction>
                <Menu size={20} onClick={() => navigate('/newMenu')} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>

          <SideNav
            expanded={isSideNavExpanded}
            aria-label="Side navigation"
          >
            <SideNavItems>
              {menu.length > 0
                ? menu.map((item) => renderMenu(item))
                : <SideNavMenuItem>Loading...</SideNavMenuItem>}
            </SideNavItems>
          </SideNav>
        </>
      )}
    />
  );
};

export default Headers;
