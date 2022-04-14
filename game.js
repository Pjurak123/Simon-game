var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$("body").keypress(function(){
  if (!start){
    nextSequence();
    start = true;
  }else{
    console.log("The game has already started!");
  }
})
  
function nextSequence(){
  userClickedPattern = [];

  $(".level-text").text("Level " + level);
  level++;
  // randomNumber generira random broj izmedu 0 - 3 
  var randomNumber = Math.floor(Math.random() * 4);
// varijabla poprima random boju iz arraya buttonColours 
  var randomChosenColour = buttonColours[randomNumber];
// nakon sto varijabla poprimi vrijednost zapisuje je u prazan array na kraju gamePattern[]
  gamePattern.push(randomChosenColour);
// odabire se id po odabranoj boji i pokrece se animacija to elementa
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


// Dodajemo event listener na svaki button i klikom na button odvaja id tog elementa i dodaje ga varijabli userChosenColour 
// na kraju taj id dodaje u prazni array userClickedPattern

$(".btn").click(handleClick);
function handleClick(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var index = userClickedPattern.length - 1;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(index);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

// Funkcija koja pritiskom na klik aktivira animaciju navedenog gumba

function animatePress(currentColour){
      $("#" + currentColour).addClass("pressed");
      setTimeout(function () { 
      $("#" + currentColour).removeClass("pressed");
}, 100);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $(".level-text").text("Game Over, Press Any Key To Restart")
    $("body").addClass("game-over");
    setTimeout(function()  {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
} 

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}