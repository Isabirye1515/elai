const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });
const clients = new Map(); // userId (string) -> socket

const broadcastClientList = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/person", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users = await response.json();
    const onlineUserIds = [...clients.keys()]; // Already strings
    const onlineUsers = users.filter((user) => onlineUserIds.includes(String(user.id)));

    const payload = JSON.stringify({
      type: "clients",
      clients: onlineUsers,
    });

    for (const ws of clients.values()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(payload);
      }
    }
  } catch (err) {
    console.error("Failed to broadcast client list:", err);
  }
};

wss.on("connection", function connection(ws) {
  let clientId = null;

  ws.on("message", function incoming(data) {
    let msg;
    try {
      msg = JSON.parse(data);
    } catch (err) {
      console.error("Invalid JSON:", err);
      return;
    }

    if (msg.type === "register") {
      clientId = String(msg.id);
      clients.set(clientId, ws);
      console.log(`User ${clientId} registered.`);
      broadcastClientList();
    }

    if (msg.type === "message") {
      const to = String(msg.to);
      const messagePayload = {
        type: "message",
        from: clientId,
        to: to,
        message: msg.message,
      };

      const toSocket = clients.get(to);
      if (toSocket && toSocket.readyState === WebSocket.OPEN) {
        toSocket.send(JSON.stringify(messagePayload));
      }

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(messagePayload));
      }
    }
  });

  ws.on("close", () => {
    if (clientId && clients.get(clientId) === ws) {
      clients.delete(clientId);
      console.log(`User ${clientId} disconnected.`);
      broadcastClientList();
    }
  });
});

console.log("✅ WebSocket server running on ws://localhost:5000");
