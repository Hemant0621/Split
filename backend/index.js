const express = require("express");
const MainRouter = require("./Routes/index");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/", MainRouter);


app.listen(3002);