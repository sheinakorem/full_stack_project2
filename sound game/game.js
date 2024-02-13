
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var score;

function updateScore(score) {
  var username = getCurrentUsername(); 
  
  if (username) {
      var scores = JSON.parse(localStorage.getItem("scores")) || {};
      scores[username] = score;
      localStorage.setItem("scores", JSON.stringify(scores));
  }
}
function getCurrentUsername() {
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  
    // Check if the entered credentials match any existing account
    var user = accounts.find(account => account.username === username && account.password === password );
  return user;
}
function getScore() {
  var username = getCurrentUsername();
  var scores = JSON.parse(localStorage.getItem("scores")) || {};
  return scores[username] || 0;
}

function calculateScore(levelsCompleted) {
  // Assuming each level completed gives 10 points
  var score = levelsCompleted * 10;
  return score;
}
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
      updateScore(score);

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

