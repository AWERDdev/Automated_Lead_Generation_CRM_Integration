const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/DB");

// --------------------
// Init
// --------------------
const app = express();
const port = process.env.PORT || 3500;

// --------------------
// Database Connection
// --------------------
connectDB();

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // allow both
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Routes
// --------------------
app.get("/", (req, res) => {
  console.log("Node JS API has been called");
  res.json({ message: "This is Node JS API" });
});

// Auth Routes
const UserSignup = require("./AUTH/UserAUTH/HandleSignup");
const UserLogin = require("./AUTH/UserAUTH/HandleLogin");
const UserUpdate = require("./AUTH/UserAUTH/HandleDataUpdate");

const AdminSignup = require("./AUTH/AdminAUTH/Adminsingup");
const AdminLogin = require("./AUTH/AdminAUTH/AdminLogin");

const isAUTH = require("./AUTH/isAUTH");

// Other Routes
const UserActivityRoutes = require("./Routes/UserActivity");

// Mount
app.use("/apiAUTH/user", UserSignup);
app.use("/apiAUTH/user", UserLogin);
app.use("/apiAUTH/user", UserUpdate);

app.use("/apiAUTH/admin", AdminSignup);
app.use("/apiAUTH/admin", AdminLogin);

app.use("/apiAUTH", isAUTH);

app.use("/api/user-activity", UserActivityRoutes);

// --------------------
// Server
// --------------------
app.listen(port, () => {
  console.log(`✅ Node API running on port ${port}`);
});
