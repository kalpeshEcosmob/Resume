const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "1065122892350-1mc1dt6lt3florodnc682i1q5loi5oec.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

async function verifyToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    return ticket;
  } catch (error) {
    return "Error";
  }
}

module.exports = { verifyToken };
