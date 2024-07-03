const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/oauth2callback";
// const REDIRECT_URI = "https://server.evigglobal.com/oauth2callback";

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/adwords",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate Google OAuth2 authorization URL
const getAuthUrl = (req, res) => {
  console.log("getAuthUrl");
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
  res.send({ authorizeUrl });
};

// Handle OAuth2 callback
const oauth2callback = async (req, res) => {
  console.log("oauth2callback");
  const qs = new URL(req.url, `http://localhost:3000`).searchParams;
  // const qs = new URL(req.url, `https://server.evigglobal.com`).searchParams;

  const code = qs.get("code");
  console.log("Authorization code received:", code);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Tokens received:", tokens);
    oAuth2Client.setCredentials(tokens);

    const { access_token, refresh_token, scope, expiry_date } = tokens;

    // Calculate expiry timestamps for access and refresh tokens
    const now = new Date();
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const accessTokenExpiresAt = new Date(
      now.getTime() + oneWeekInMilliseconds
    );

    // Perform any necessary logic with the tokens, such as saving to database
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log("user::payload", payload);

    const { sub, email, name, picture } = payload;

    ///trial url redirect -final
    res.redirect(
      `http://localhost:5173/login?userName=${name}&email=${email}&googleAccessToken=${access_token}&googleRefreshToken=${refresh_token}&googleTokenExpiry=${accessTokenExpiresAt.getTime()}&status=success`
    );

    // res.redirect(
    //   `https://dev.evigglobal.com/login?userId=${
    //     user._id
    //   }&userName=${name}&email=${
    //     user.email
    //   }&googleAccessToken=${access_token}&googleRefreshToken=${refresh_token}&googleTokenExpiry=${accessTokenExpiresAt.getTime()}&status=success&picture=${picture}`
    // );
  } catch (error) {
    console.error("OAuth2 callback error:", error);
    res.status(500).send("Authentication failed");
  }
};

module.exports = {
  getAuthUrl,
  oauth2callback,
};
