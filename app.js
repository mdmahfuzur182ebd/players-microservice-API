const express = require("express");
const cors = require("cors"); //
const morgan = require("morgan");
const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");

const dbLocation = path.resolve("./db.json");

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
//DELETE
app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);

  const player = players.find((item) => item.id == id);

  if (!player) {
    return res.status(404).json({ message: "Player Not Found" });
  }

  const newPlayers = players.filter((item) => item.id !== id);
  await fs.writeFile(dbLocation, JSON.stringify(newPlayers));
  res.status(203).send();
});

//update or create Player
app.put("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);

  let player = players.find((item) => item.id == id);

  if (!player) {
    player = {
      ...req.body,
      id: shortid.generate(),
    };
    players.push(player);
  } else {
    player.name = req.body.name;
    player.country = req.body.country;
    player.rank = req.body.rank;
  }

  await fs.writeFile(dbLocation, JSON.stringify(players));
  res.status(200).json(player);
});

//Update data single PATCH

app.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);

  const player = players.find((item) => item.id == id);

  if (!player) {
    return res.status(404).json({ message: "Player Not Found" });
  }

  player.name = req.body.name || player.name;
  player.country = req.body.country || player.country;
  player.rank = req.body.rank || player.rank;

  await fs.writeFile(dbLocation, JSON.stringify(players));
  res.status(200).json(player);
});

//Find Player by id
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);
  const player = players.find((item) => item.id == id);
  if (!player) {
    return res.status(404).json({ message: "Player Not Found" });
  }
  res.status(201).json(player);
});

//Create Player..
app.post("/", async (req, res) => {
  const player = {
    ...req.body,
    id: shortid.generate(),
  };
  //res.status(201).json(player)
  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);
  //console.log(players)
  players.push(player);

  await fs.writeFile(dbLocation, JSON.stringify(players));
  res.status(201).json(player);
});

//Find Player
app.get("/", async (req, res) => {
  const data = await fs.readFile(dbLocation); //buffer kind of binary data
  const players = JSON.parse(data);
  res.status(201).json(players);
});

app.get("/health", (_req, res) => {
  res.send("First API Create ");
  // res.status(200).json({status: 'OK'})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running On PORT : ${PORT}`);
  console.log(`localhost: ${PORT}`);
});
