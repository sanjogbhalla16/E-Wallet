//we will create our express server here
const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

//use also helps us to route the requests here

app.use("/api/v1", mainRouter);

app.listen(3000);
