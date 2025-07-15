const express = require('express');
const app = express();

app.use(express.json());



const port = process.env.port || 8081;
app.listen(port, `Server start at ${port}`);