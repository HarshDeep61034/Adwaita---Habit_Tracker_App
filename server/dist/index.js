"use strict";
const express = require("express");
const app = express();
app.get("/", (_req, res) => res.send("hi"));
app.listen(8080, () => console.log("Listening at PORT 8080"));
