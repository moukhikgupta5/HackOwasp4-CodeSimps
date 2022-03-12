var url = "https://randomuser.me/api";

var fullNameDisplay = document.querySelector("#full-name");
var avatarDisplay = document.querySelector("#avatar");
var usernameDisplay = document.querySelector("#username");
var emailDisplay = document.querySelector("#email");
var cityDisplay = document.querySelector("#city");
var btn = document.querySelector("#btn");


generate(url);


btn.addEventListener("click", function(){
  generate(url);
});

function generate(url) {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(displayErrors)
}

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.status);
  }
  return response;
}

function parseJSON(response) {
  return response.json()
    .then(function(parsedData) {
    return parsedData.results[0];
  });
}

function updateProfile(data) {
  fullNameDisplay.innerText = getFullName(data);
  avatarDisplay.src = data.picture.medium;
  usernameDisplay.innerText = data.login.username;
  emailDisplay.innerText = data.email;
  cityDisplay.innerText = data.location.city;
}

function getFullName(data) {
  var fullName = data.name.first + " " + data.name.last;
  return fullName;
}

function displayErrors(error) {
  console.log(error);
}