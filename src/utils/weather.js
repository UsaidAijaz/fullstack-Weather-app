import request from "request";
const weather = (address, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${address.latitude}&lon=${address.longitude}&appid=da079d7f2b5d757ae164123d5297f0c1&units=metric`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined); //here it is not able to connect to internet.
    } else if (response.body.message) {
      callback("Unable to find location", undefined); // call api with invalid data and see what will be the new things response and add it here.
    } else {
      const a = response.body.main.temp;
      callback(undefined, a);
    }
  });
};
export { weather };
