import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Column, Form, Grid, TextInput } from "@carbon/react";

const SocketMessage = () => {
  const { id } = useParams(); // this will act as client ID
  const [person, setPerson] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineClients, setOnlineClients] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/api/person/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPerson(data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:5000");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected.");
      socketRef.current.send(JSON.stringify({ type: "register", id }));
    };

    socketRef.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "clients") {
          console.log("Received clients:", msg.clients);
          setOnlineClients(msg.clients.filter((u) => String(u.id) !== id));
        } else if (msg.type === "message") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: msg.from === id ? "me" : msg.from,
              message: msg.message,
            },
          ]);
        }
      } catch (err) {
        console.error("Invalid WebSocket message:", event.data);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => {
      socketRef.current.close();
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socketRef.current && message.trim() && selectedReceiver) {
      socketRef.current.send(
        JSON.stringify({
          type: "message",
          to: selectedReceiver,
          message,
        })
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", message },
      ]);
      setMessage("");
    }
  };

  if (!person) return <p>Loading...</p>;

  return (
    <>
    <h2>Send A Message</h2>
    <hr />
      <Grid>
        <Column lg={10} sm={4} md={8} >
          <Column lg={10} sm={4} md={8} className="person-card" >
            <img
              src={person.image}
              height={50}
              width={50}
              alt={`${person.name}'s profile`}
              style={{borderRadius: "50%",margin:"5px"}}
            />
        <div>
        <h2>{person.name}</h2>
                    <p>{person.email}</p>
                    <p>{person.bio}</p>
        </div>

          </Column>
        </Column>
      </Grid>

      <Grid>
        <Column lg={10} sm={4} md={8}>
          <Column lg={10} sm={4} md={8}>
            <div className="screen">
              <p>Talk with others</p>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "me" ? "sent" : "received"}`}
                >
                    <div>{msg.sender === "me" ? "You" : msg.sender}:</div>{" "}
                    {msg.message}
                  </div>
              ))}
            </div>
          </Column>

          <Column lg={8} sm={4} md={4} className="bod-1">
            <Form onSubmit={handleSubmit}>
              <TextInput
                name="message"
                labelText="Message Input"
                placeholder="Type a message"
                value={message}
                size="sm"
                onChange={(e) => setMessage(e.target.value)}
              />
              <select
                value={selectedReceiver}
                onChange={(e) => setSelectedReceiver(e.target.value)}
              >
                <option value="" disabled>
                  Select a user to message
                </option>
                {onlineClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button type="submit">Send</button>
            </Form>
          </Column>
        </Column>
      </Grid>
    </>
  );
};

export default SocketMessage;
