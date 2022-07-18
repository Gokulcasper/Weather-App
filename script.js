window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDesc = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let LocationTimeZone = document.querySelector(".loc-timezone");

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
          const { temperature, summary } = data.currently;
          //Set DOM Elements From the API
          tempDegree.textContent = temperature;
          tempDesc.textContent = summary;
          LocationTimeZone.textContent = data.timezone;
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.paly();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
