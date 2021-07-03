const express = require('express');
const studentRoutes = require('./src/student/routes');
const app = express();
const port = process.env.APP_PORT;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hellooo")
})

app.use('/api/v1/students', studentRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})