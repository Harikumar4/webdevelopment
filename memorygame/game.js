var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
let level=0;
var started = false;
function nextSequence(){
    userClickedPattern = [];
    level+=1;
    $('h1').text('Level ' + level);
    const randomnumber = Math.floor((Math.random()*4));
    const randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
$('.btn').click(function() {
    const userchosenColour = $(this).attr("id");
    playSound(userchosenColour);
    userClickedPattern.push(userchosenColour)
    animatePress(userchosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text("Game Over, Press a Key to Restart");
        startOver();
      }
}
function playSound(name){
    const Sound = new Audio("sounds/"+name+".mp3");
    Sound.play();
};

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keydown(function(event) {
    if ((event.key === "a" || event.key === "A" ) && started==0){
        $('h1').text('Level ' + level);
        nextSequence();
        started=true;
    }
});
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
