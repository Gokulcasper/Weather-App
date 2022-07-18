window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDesc = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let LocationTimeZone = document.querySelector(".loc-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elements From the API
          tempDegree.textContent = temperature;
          tempDesc.textContent = summary;
          LocationTimeZone.textContent = data.timezone;

          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // change Temp To celsius/Farenheit

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              tempDegree.textContent = temperature;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
