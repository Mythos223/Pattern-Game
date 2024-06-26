$(document).ready(function () {
  var buttonColours = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];

  // Keeps tracks of whether the game has started, only call nextSquence() at the first keydown.
  // The level variable starts at level 0.ff
  var started = false;
  var level = 0;

  $(document).keydown(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  //Generates a random set of numbers based on array of colors
  function nextSequence() {
    userClickedPattern = [];
    level++; // Increase the level by 1

    // Updates the h1 with this change in the value of level
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Adds flash to a random chosen colour
    $("#" + randomChosenColour)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    // Creates variable called audio to access sounds
    playSound(randomChosenColour);
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  //Function that animated button pressed
  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }
  // Checks user clicked pattern against the game pattern
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      endGame();
    }
  }

  // Function for game-over animation
  function endGame() {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

  //Button click handler that logs the color of the button click
  $(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

  // Function for restarting game
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
});
