import app from "./app.js"
import { connectDB } from "./config/connection.js";
import { envConfig } from "./config/envConfig.js";
import { createServer } from "http"; // Ise import karein
import { Server } from "socket.io"; // Ise import karein


const httpServer = createServer(app); // Express app ko wrap karein

// Socket.IO server ko initialize karein
const io = new Server(httpServer, {
  cors: {
    origin: "https://tamba-frontend.vercel.app", // Yahan apna Vercel URL daalein
    methods: ["GET", "POST","PUT"],
    credentials: true,
  },
});


let onlineUsers = {}; // userId aur socketId ko map karne ke liye

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // User se 'register' event listen karein
  socket.on("register", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("User registered:", userId, "with socket:", socket.id);
  });

  socket.on("disconnect", () => {
    // User ko onlineUsers se remove karein
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", () => {
  console.log("testing");
});



app.use((req, res, next) => {
  req.io = io;
  req.onlineUsers = onlineUsers;
  next();
});


const port = envConfig.port
// Database connect karke server start karein
connectDB().then(() => {
  httpServer.listen(port, () => {
    console.log(`🚀 Tamba server running on port ${port}`);
  });
});

// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`🚀 Tamba server running on port ${port}`);
//   });
// });




