//BWfIfD90FV7vggWv
//Qg0DHievgx1mbGqn

//new w1FT4k2sitYrwaYs
//mongodb+srv://<db_username>:<db_password>@cluster0.v8erxtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//fODsJ9xwyT2JrQUx
//mongodb+srv://admin:<db_password>@cluster0.fni1hxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//hC8jth37s2JYWd3M
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");
const appealObjectionRouter = require("./Routes/AppealObjectionRoutes");
const app = express();
const cors = require("cors");

//Middleware to parse JSON requests
//app.use(express.json());
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/appeals", appealObjectionRouter);

mongoose.connect("mongodb+srv://admin:J6VFRtZnB69GRLnp@cluster0.r6zrdej.mongodb.net/GNConnect?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));

