const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];
const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userId === userId);
  if (!checkUser) {
    users.push({
      userId,
      socketId,
      userInfo,
    });
  }
};

const userRemove = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const findFriend = (id) => {
  return users.find((u) => u.userId === id);
};

const userLogout = (userId) => {
  users = users.filter((u) => u.userId !== userId);
};

io.on("connection", (socket) => {
  console.log("Socket is connecting...");
  socket.on("addUser", (userId, userInfo) => {
    //console.log(userId, userInfo);
    addUser(userId, socket.id, userInfo);
    io.emit("getUser", users);
  });
  socket.on("sendMessage", (data) => {
    const user = findFriend(data.receiverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("getMessage", data);
    }
    //console.log(user);
  });
  socket.on("messageSeen", (msg) => {
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("messageSeenResponse", msg);
    }
  });
  socket.on("deliveredMessage", (msg) => {
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("messageDeliveredResponse", msg);
    }
  });
  socket.on("typingMessage", (data) => {
    //console.log(data);
    const user = findFriend(data.receiverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("typingMessageGet", {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });
    }
  });

  socket.on("logout", (userId) => {
    userLogout(userId);
  });
  socket.on("disconnect", () => {
    console.log("user is disconnect...");
    userRemove(socket.id);
    io.emit("getUser", users);
  });
});
