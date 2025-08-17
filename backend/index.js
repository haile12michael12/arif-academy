const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
require("./Config/db");
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/user.route");
const courseRoutes = require("./Routes/usercourse.route");
const resumeRoutes = require("./Routes/userresume.route");
const insightsRoutes = require("./Routes/insights.route");

const questionRoutes = require("./Routes/riverflowroutes/question.route");
const answerRoutes = require("./Routes/riverflowroutes/answer.route");
const commentRoutes = require("./Routes/riverflowroutes/comment.route");
const voteRoutes = require("./Routes/riverflowroutes/vote.route");
const paymentRoutes = require("./Routes/payment.route");

const podcastRoutes = require("./Routes/podcast.route");
const problemRoutes = require("./Routes/problem.route");

const interviewRoutes = require("./Routes/interview.route");
const companyRoutes = require("./Routes/company.route");
const notificationRoutes = require("./Routes/notification.route");
const mlRoutes = require("./Routes/ml.route");
const chatRoutes = require("./Routes/chat.route");

// Socket.io setup for real-time notifications
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  
  // Join user to their personal notification room
  socket.on("join", (userId) => {
    socket.join(`user:${userId}`);
    console.log(`User ${userId} joined their notification room`);
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Make io accessible to route handlers
app.set("io", io);

const fileUpload = require("express-fileupload");
const { cloudnairyconnect } = require("./Config/cloudinary");
require("./jobs/schedular");

const port = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, "deployments")));

cloudnairyconnect();

app.use("/api/user", userRoute);
app.use("/api/usercourse", courseRoutes);
app.use("/api/userresume", resumeRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/chat", chatRoutes);

// Use server.listen instead of app.listen for Socket.io
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} with Socket.io support`);
});
