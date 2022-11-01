import request from "request";
const geocode = (address, callback) => {
  const geocodeURL = `https://geocode.xyz/city=${address}?json=1&auth=713017375398267722110x86784`;
  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to Connect to Location Services!", undefined);
    } else if (response.body.standard.confidence <= 0.2) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.latt,
        longitude: response.body.longt,
        city: response.body.alt.loc.city,
      });
    }
  });
};
export { geocode };

// import * as notes from "./notes.js";`
// `export { getNotes, addNote };
