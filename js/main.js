/******* INITIATE CANVAS *******/
var canvas=document.getElementById("gameCanvas");
var ctx=canvas.getContext("2d");

canvasHeight = parseInt(canvas.getAttribute("height"));
canvasWidth = parseInt(canvas.getAttribute("width"));
ctx.fillStyle = "yellowgreen";

var bestFriend;
var bestEffort;

var eligibleSnails = [];
var deadSnails = [];
var immatureSnails = [];
var eggs = [];

var daysLeft = 15;

var ui = new GameplayUI();
var inputHandler = new InputHandler();
var globalAlpha = 1;
var fadeInterval = 0.07;
var fading = false;

main();

function main() {
    eligibleSnails = [];
    immatureSnails = [];
    deadSnails = [];
    daysLeft = 15;
    bestFriend = generateBestFriend();
    generateEligibleBreedingPool();
    menu = new MenuUI(bestFriend.name);
    window.onload = draw();

}

function generateEligibleBreedingPool() {
    var snailPosX = ui.breedingPoolBlock.posX;
    var snailPosY = ui.breedingPoolBlock.posY + 25;


    for (var i = 0; i < 3; i++) {
        var snail = generateRandomSnail();
        snail.posX = snailPosX;
        snail.posY = snailPosY;
        SnailUtil.positionNewSnail(snail);
        eligibleSnails.push(snail);
    }
    SnailUtil.getClosestSnailToBFF();
}

function generateBestFriend() {
    bestFriend = generateRandomSnail();
    bestFriend.isBestFriend = true;
    var generator = new RandomSnailGenerator();
    bestFriend.name = generator.generateSnailName();
    bestFriend.posX = 10;
    bestFriend.posY = 35;
    return bestFriend;
}

function generateRandomSnail() {
    var generator = new RandomSnailGenerator();
    var snail = generator.generateRandomSnail();
    return snail;
}

function drawDayFade() {
    globalAlpha -= fadeInterval;
    
    if (globalAlpha < 0) {
        console.log("starting fadein");
        fadeInterval *= -1;
        globalAlpha = 0;
    } else if (globalAlpha > 1) {
        fading = false;
        globalAlpha = 1;
        fadeInterval *= -1;
    }
      //  draw();

    ctx.save();
    ctx.globalAlpha = globalAlpha;
    draw();
  //  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, " + globalAlpha + ")";
  //  ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore(); 
    if (fading) {
        requestAnimationFrame(drawDayFade);
    }
   
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    ui.draw();

    bestFriend.draw();
    bestFriend.img.onload = bestFriend.draw.bind(bestFriend);
    for (var i = 0; i < eligibleSnails.length; i++) {
        var snail = eligibleSnails[i];
        snail.draw();
        snail.img.onload = snail.draw.bind(snail);
    }

    for (var i = 0; i < immatureSnails.length; i++) {
        var snail = immatureSnails[i];
        snail.draw();
        snail.img.onload = snail.draw.bind(snail);
    }

    for (var i = 0; i < deadSnails.length; i++) {
        var snail = deadSnails[i];
        snail.draw();
        snail.img.onload = snail.draw.bind(snail);
    }
}

function incrementDay() {
    daysLeft--;
    var allSnails = SnailUtil.getAllLiveSnails();
    for (var i = 0; i < allSnails.length; i++) {
        var snail = allSnails[i];
        snail.ageSnail();
        if (snail.sexualOrientation > 0) {
            snail.sexualOrientation -= 25;
        }
        else if (snail.sexualOrientation < 0) {
            snail.sexualOrientation += 25;
        }
    }
    ui.hideSelectedSnailDetails();
    SnailUtil.refreshSnailGrid();
    SnailUtil.getClosestSnailToBFF();
    fading = true;
    console.log("GA: " + globalAlpha);
    drawDayFade();
}