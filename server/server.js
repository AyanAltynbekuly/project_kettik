const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();
const User = require("./models/user");
const Car = require("./models/cars");
const booking = require("./models/booking");
const cookieParser = require("cookie-parser");
const imageDownoloader = require("image-downloader");
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "abgheheh24ijrijf9asd0=1dsa[123";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/upload", express.static(__dirname + "/upload"));
mongoose.connect(process.env.CONNECT_DB);

app.get("/test", (req, res) => {
  res.json("Okay lets go");
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (e) {
    res.status(402).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const newUser = await User.findOne({ email });
  if (newUser) {
    const passwordStatus = bcrypt.compareSync(password, newUser.password);
    if (passwordStatus) {
      jwt.sign(
        {
          email: newUser.email,
          id: newUser._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(newUser);
        }
      );
    } else {
      res.status(422).json("password is not okay");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { firstName, email, _id } = await User.findById(userData.id);
      res.json({ firstName, email, _id });
    });
  } else {
    res.status(400);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/uploadLink", async (req, res) => {
  const { link } = req.body;
  const newName = "img" + Date.now() + ".jpg";
  await imageDownoloader.image({
    url: link,
    dest: __dirname + "/upload/" + newName,
  });
  res.json(newName);
});

const imgMiddleware = multer({ dest: "upload/" });
app.post("/upload", imgMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("upload/", ""));
  }

  res.json(uploadedFiles);
});

app.post("/cars", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addPhotos,
    description,
    features,
    extra,
    tripStart,
    tripEnd,
    pickUpLocation,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const carDoc = await Car.create({
      owner: userData.id,
      title,
      address,
      photos: addPhotos,
      description,
      features,
      extra,
      tripStart,
      tripEnd,
      pickUpLocation,
      price,
    });
    res.json(carDoc);
  });
});

app.get("/user-cars", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Car.find({ owner: id }));
  });
});
app.get("/cars/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Car.findById(id));
});

app.put("/cars", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addPhotos,
    description,
    features,
    extra,
    tripStart,
    tripEnd,
    pickUpLocation,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const carDoc = await Car.findById(id);
    if (userData.id === carDoc.owner.toString()) {
      carDoc.set({
        title,
        address,
        photos: addPhotos,
        description,
        features,
        extra,
        tripStart,
        tripEnd,
        pickUpLocation,
        price,
      });
      await carDoc.save();
      res.json("ok");
    }
  });
});
app.get("/cars", async (req, res) => {
  res.json(await Car.find());
});

app.post("/trips", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { car, tripStart, tripEnd, pickUpLocation, name, phone, price } =
    req.body;

  booking
    .create({
      car,
      tripStart,
      tripEnd,
      pickUpLocation,
      name,
      phone,
      price,
      user: userData._id,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/trips", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await booking.find({ user: userData.id }).populate("Car"));
});

app.listen(8080);
