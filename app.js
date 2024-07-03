const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

// Allowed domains for CORS
const allowedDomains = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5174",
];

// Middleware setup
app.use(express.json()); // To parse JSON bodies
app.use(
  cors({
    origin: allowedDomains,
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
app.use(bodyParser.urlencoded({ extended: false })); // To parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Helper function to validate tokens
const isTokenValid = (token) => {
  console.log("Validating token"); // Log token validation step
  if (!token) {
    console.log("No token provided");
    return false;
  }
  const { access_token, expiry_date } = token;
  if (!access_token || new Date(expiry_date) < new Date()) {
    console.log("Token is invalid or expired");
    return false;
  }
  console.log("Token is valid");
  return true;
};

// Importing controllers
const { getAuthUrl, oauth2callback } = require("./controllers/auth");
const { getFormattedCampaignData } = require("./controllers/GadsController");

// CORS headers for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Route for running checks
app.get("/run-checks", (req, res) => {
  console.log("Running server checks"); // Log server checks
  res.status(200).json({ msg: "Packet Returned Success:**/" });
});

// Route to get authentication URL
app.post(
  "/getAuthUrl",
  (req, res, next) => {
    console.log("Requesting auth URL"); // Log auth URL request
    next();
  },
  getAuthUrl
);

// Callback route for OAuth2
app.get(
  "/oauth2callback",
  (req, res, next) => {
    console.log("Handling OAuth2 callback"); // Log OAuth2 callback handling
    next();
  },
  oauth2callback
);

// Route to get Google Ads report
app.post("/google-ads-report", async (req, res) => {
  console.log("Request received for Google Ads report"); // Log Google Ads report request

  // Extract token and date range from request body
  const token = req.body?.gUserDataLocal?.googleTokens;
  const dateRange = req.body?.dateRange;
  console.log("Token and date range extracted from request body");

  // Validate token
  if (!isTokenValid(token)) {
    console.log("Invalid or expired token");
    return res.status(200).json({ error: "Invalid or expired token" });
  }

  // Fetch and return Google Ads report
  try {
    console.log("Fetching Google Ads report data");
    const data = await getFormattedCampaignData("4461865446", token, dateRange);
    console.log("Google Ads report fetched successfully");
    res
      .status(200)
      .json({ msg: "Google Ads report fetched successfully", data });
  } catch (error) {
    console.error("Error fetching Google Ads report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
