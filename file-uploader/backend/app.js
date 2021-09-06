const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const corsOptions = { origin: "*", credentials: true };

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const dbPath = path.join(__dirname, "user.db");
console.log(dbPath);

let db = null;

const PORT = process.env.PORT || 8080;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(PORT, () => {
      console.log(`Server Running at PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send({ error_msg: "Invalid JWT Token" });
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send({ error_msg: "Invalid JWT Token" });
      } else {
        request.user_id = payload.user_id;
        next();
      }
    });
  }
};

app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * from user WHERE username='${username}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send({ error_msg: "Invalid user" });
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      const payload = {
        user_id: dbUser.user_id,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({
        jwt_token: jwtToken,
      });
    } else {
      response.status(400);
      response.send({ error_msg: "Invalid password" });
    }
  }
});

app.get("/", authenticateToken, async (request, response) => {
  let { user_id } = request;
  const getUserDetails = `
    SELECT
         username,name,gender
    FROM
         user
         WHERE user_id = '${user_id}'`;

  const userDetails = await db.get(getUserDetails);
  response.send({ userDetails: userDetails });
});

app.post("/upload/", authenticateToken, async (request, response) => {
  let { user_id } = request;
  const data = request.body;
  const createUserDataQuery = `
      INSERT INTO
          user_upload_data(user_id,data)
      VALUES
          ('${user_id}','${JSON.stringify(data)}');
    `;
  await db.run(createUserDataQuery);
  response.send({ file_data: JSON.stringify(data) });
});
