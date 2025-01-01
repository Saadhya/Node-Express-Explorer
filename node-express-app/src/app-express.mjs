// creating the server in node:-
// import some code and create a server Object
import express from "express";
import { format, join } from "path";
import cookieParser from "cookie-parser";
import winston, { createLogger } from "winston";
import { transports } from 'winston';

const server = express();
const logger= createLogger({
  level:'info',
  format: winston.format.combine(
    // format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports:[
    new transports.File({filename:'app-express.log'}),
    new transports.Console()
  ]  
})

const logAll = function (req, res, next) {
  logger.info(`url being requested: ${req.url}`);
  next();
};
// this is a sequence
//so that I can just get parameters directly with req.body.paraname
server.use(express.json());
server.use(cookieParser()); //when req comes in, its passed to the cookie parser
server.use(express.static(join(process.cwd(), "public"))); //static middleware
server.use(logAll);

server.set("view engine", "ejs");
server.set("views", "./public/views");

const concert_data = {
  concerts: [
    {
      id: 1,
      artist: "The Weekend Warriors",
      desc: "A high-energy performance featuring classic rock hits from the 80s and 90s.",
      price: 45.0,
      date: "2024-02-15",
      time: "19:30",
      image: "https://example.com/images/weekend-warriors.jpg",
      link: "#",
    },
    {
      id: 2,
      artist: "DJ Neon Light",
      desc: "Experience the latest in electronic music, with mind-blowing visuals and an electrifying atmosphere.",
      price: 30.0,
      date: "2024-03-02",
      time: "22:00",
      image: "https://example.com/images/dj-neon-light.jpg",
    },
    {
      id: 3,
      artist: "Jazz Vibes Collective",
      desc: "A night of smooth jazz, with world-class musicians bringing classic tunes to life.",
      price: 60.0,
      date: "2024-04-01",
      time: "20:00",
      image: "https://example.com/images/jazz-vibes.jpg",
    },
    {
      id: 4,
      artist: "Funky Soul Band",
      desc: "A dynamic soul band performing timeless classics and new grooves that will keep you dancing all night.",
      price: 50.0,
      date: "2024-05-05",
      time: "18:00",
      image: "https://example.com/images/funky-soul.jpg",
    },
    {
      id: 5,
      artist: "Electric Dreams Orchestra",
      desc: "An immersive symphonic experience blending classical music with futuristic electronic sounds.",
      price: 75.0,
      date: "2024-06-20",
      time: "20:30",
      image: "https://example.com/images/electric-dreams.jpg",
    },
  ],
};

// listen for req coming into that server
server.get("/", requestListener);
server.get("/simple-text", (req, res) => {
  console.log("this is some text");
  // status code, headers and message
  res
    .status(200)
    .set({ "Content-Type": "text/plain" })
    .send("this is some text from the file");
  // res.status(200).set({ 'Content-Type': 'text/html' }).send("this is some html from the file");
  // res.status(200).set({ 'Content-Type': 'application/json' }).send("this is some json from the file");
});
server.get("/concerts", (req, res) => {
  // const filePath = `${process.cwd()}/src/public/concerts.html`;
  //   const filepath = join(process.cwd(), "public", "concerts.html");
  //   res.status(200).set({ "Content-Type": "text/html" }).sendFile(filepath);
  try {
    res.status(200).render("concerts", { concerts: concert_data.concerts });
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("Internal Server Error");
  }
});
function findConcertById(concerts, id) {
  for (let i = 0; i < concerts.length; i++) {
    const concert = concerts[i];
    if (concert.id === id) {
      return concert;
    }
  }
  return null;
}
server.get("/concerts/:concertId", (req, res) => {
  try {
    const concertId = parseInt(req.params.concertId);
    const concert_obj = findConcertById(concert_data.concerts, concertId);
    if (!concert_obj) {
      return res.status(404).send("Concert not found!");
    }
    res.status(200).render("concert", { concert_info: concert_obj });
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("Internal Server Error");
  }
});

const validateBody = function (req, res, next) {
  try {
    let id = req.body.id;
    let time = req.body.time;
    let price = req.body.price;
    let artist = req.body.artist;
    let date = req.body.date;
    if (!id || !time || !price || !artist || !date) {
      console.log(`missing required fields:`);
      res.status(400).send("missing data");
    }
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
  next();
};

server.post("/save-to-cart", validateBody, (req, res) => {
  // let body = "";
  // req.on("data", (chunk) => {
  //   body += chunk.toString();
  // });
  // req.on("end", () => {
  //   const parsedBody = JSON.parse(body);
  try {
    let id = req.body.id;
    let time = req.body.time;
    let price = req.body.price;
    let artist = req.body.artist;
    let date = req.body.date;

    let cart;
    if (req.cookies.cart === undefined) {
      cart = [];
    } else {
      cart = JSON.parse(req.cookies.cart);
    }
    cart.push({ id, time, price, artist, date });
    res.cookie("cart", JSON.stringify(cart));
    console.log(
      `id: ${id}, name: ${time}, price: ${price}, artist: ${artist}, date: ${date}`
    );
    res.status(200).send("data saved");
  } catch (error) {
    res.status(500).send("save Internal server error!");
  }
});
// generic error handling for other errors
server.use((err, req, res, next) => {
  console.error(err.stack);//logging error to server log
  res.status(500).send("Something broke!");
});
// define the callback function that will be called when a req is made
function requestListener(req, res) {
  res.status(200).send("request received");
}
server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
// event loop:
// nodejs programs loop forever and listen for req until they are stopped
