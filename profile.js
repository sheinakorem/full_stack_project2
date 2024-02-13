document.addEventListener("DOMContentLoaded", function() {
    // Retrieve selected photo and username from local storage
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    var username = localStorage.getItem("loggedInUsername");
    var place;
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].username === username) {
            // Username exists, return true
            place= i;
        }
    }
    var username = accounts[place].username;
    var score= accounts[place].score;
    // Display greeting message with username
    var greetingElement = document.getElementById("greeting");
    var greetingMessage = document.createElement("p");
    greetingMessage.textContent = "Hi, " + username + "!";
    greetingElement.appendChild(greetingMessage);
  
    var scoreElement = document.getElementById("score");
    var scoreMessage = document.createElement("p");
    scoreElement.textContent =  score + " points";
    scoreElement.appendChild(scoreMessage);
   
  });