var gameColors = ["green", "red", "yellow" , "blue"];
var gamePattern = [];
var userClickedPattern = [];
var startGameCheck = false;
var level = 0;


//Document is going to listen to keypress and initiate startGame() untill the startGameCheck is set to false
$(document).on("keydown", function(){
    if(!startGameCheck){
        startGame();
        startGameCheck = true;
    }
});


/*Everytime this function is executed it's going to increase the level by one and 
add the selected color to the array */

function startGame() {
    $("h1").text(`Level ${level}`);
    level++;

    var randomNumber = Math.floor(Math.random() * ($(".btn").length));

    var id = gameColors[randomNumber];
    $("#"+id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var buttonSound = new Audio(`./sounds/${id}.mp3`);
    buttonSound.play();

    gamePattern.push(gameColors[randomNumber]);
    console.log(gamePattern);
}

/* I've add this event listener to detect which button is triggered and capture thier id
and push it to userClickedPattern array */

$(".btn").on("click",function (){
    var element = $(this).attr("id");
    userClickedPattern.push(element);

    var buttonSound = new Audio(`./sounds/${element}.mp3`);
    buttonSound.play();

    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

/* This function first checks whether the length of the two arrays are the same and 
once after checked it moves on to the second validation to check the postioned items of the two
arrays are the same and if not it restarts the game with everything set to begining */

function checkAnswer(position){

    if(gamePattern[position] === userClickedPattern[position]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                userClickedPattern = [];
                startGame();
            }, 1000);
            
        }
    }else{
        console.log("fail");

        var patternFailedSound = new Audio("./sounds/wrong.mp3");
        patternFailedSound.play();
        $("body").addClass("game-over");
       

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);

        gamePattern = [];
        userClickedPattern = [];
        level = 0;

        $("h1").text("Press A key to start");

        startGameCheck = false;
       
    }
    
}

