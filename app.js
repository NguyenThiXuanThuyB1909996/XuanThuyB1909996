const express = require("express");
const cors = require("cors");
const ContactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", ContactsRouter);

app.get('/',(req,res) => {
    res.json({msg:"Welcome to contact book application."});
});
// middleware

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        msg: error.message || "Internal Server Error",
    });
});


module.exports = app;