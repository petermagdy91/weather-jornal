/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const APIKey = "&appid=a0387e6f2d5a161b23e618fb6cb3a3f5&units=imperial";
const userInput = document.getElementById("feelings");
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");
const contentHolder = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document
  .getElementById("generate")
  .addEventListener("click", getInitialization);

function getInitialization(e) {
  const zipCode = document.getElementById("zip").value;
  zipCode.trim();
  userInput.value;

  if (zipCode !== "" && zipCode.length === 5) {
    getWeatherInfo(baseUrl, zipCode, APIKey).then(function(data) {
      const newData = {
        temperature: data.main.temp,
        date: newDate,
        userResponse: userInput.value
      };
      postWeatherInfo("/userInputs", newData).then(updateUI());
    });
  }
}

const getWeatherInfo = async (base, zip, key) => {
  const res = await fetch(base + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postWeatherInfo = async (path = "", data = {}) => {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res;
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    dateHolder.innerHTML = `<span>Date: </span> ${allData.date}`;
    tempHolder.innerHTML = `<span>Temperature: </span>${allData.temperature} degrees`;
    contentHolder.innerHTML = `<span>Feeling: </span>${allData.userResponse}`;
  } catch (error) {
    console.log(error);
  }
};
