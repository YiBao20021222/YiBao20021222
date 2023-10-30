const express = require('express')
const interface=require("./InterfaceModule")
const app = express()
const port = 3000
const cors=require("cors");
app.use(cors());
app.use(interface);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))