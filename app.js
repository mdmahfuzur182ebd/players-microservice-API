const express = require("express");
const cors = require("cors"); //
const morgan = require("morgan");
const shortid = require("shortid");
const fs = require('fs/promises')
const path = require('path')

//shortid id generate - npm i shortid
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/*
   // Project Playing //
    Project microservice
    _CURD   -      -Create Read update and Delete 
    -GET    -/     -Find all Players
    -POST   -/     -Create a new player and save into db
    -GET    -/:id  -find a single player by id
    -PUT    -/:id  -update or create player
    -PATCH  -/:id  -update player
    -DELETE -/:id  -Delete player form db


*/
app.post("/", async(req, res) => {
  const player = {
    ...req.body,
    id: shortid.generate(),
  };
   //res.status(201).json(player)
   const dbLocation = path.resolve("./db.json");
   const data = await fs.readFile(dbLocation)
   const players = JSON.parse(data)
   //console.log(players)
   players.push(player)

   await fs.writeFile(dbLocation, JSON.stringify(players))
   res.status(201).json(player)
});

app.get("/health", (_req, res) => { 
  res.send("First API Create ");
   res.status(200).json({status: 'OK'})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running On PORT : ${PORT}`);
  console.log(`localhost: ${PORT}`);
});
