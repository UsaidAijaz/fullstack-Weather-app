import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import { rmSync } from "fs";
import * as geo from "./utils/geocode.js";
import * as wea from "./utils/weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Usaid",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Usaid",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Usaid",
    helpText: "This is some helpful text.",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geo.geocode(req.query.address, (error, data) => {
    if (error)
      return res.send({
        error: error,
      });
    wea.weather(data, (error, forecast) => {
      if (error)
        return res.send({
          error: error,
        });
      res.send({
        // forecast: "It is snowing",
        location: data.city,
        forecast: forecast,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You Must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
// * is match anyting that hasen't matched above
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Usaid",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Usaid",
    errorMessage: "Page not found",
  });
});
app.listen(port, () => {
  console.log("Server is running on 3000");
});
