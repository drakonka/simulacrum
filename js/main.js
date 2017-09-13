/******* INITIATE CANVAS *******/
var canvas=document.getElementById("gameCanvas");
var ctx=canvas.getContext("2d");

var height = document.body.clientHeight;
var width = document.body.clientWidth;

var canvasHeight = canvas.height;
var canvasWidth = canvas.width;

var instructions=document.getElementById("instructions");
var details=document.getElementById("snailDetails");

var remWidth = width - canvasWidth - 100;
var split = remWidth / 2;

instructions.style.width = split + "px";
details.style.width = split + "px";


canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.fillStyle = "yellowgreen";

var bestFriend;
var bestEffort;

var eligibleSnails = [];
var deadSnails = [];
var immatureSnails = [];
var eggs = [];

var daysLeft = 15;
var year = 1;

var ui = new GameplayUI();
var inputHandler = new InputHandler();
var globalAlpha = 1;
var fadeInterval = 0.07;
var fading = false;
var isDone = false;

main();

function main(incrementYear) {
    isDone = false;
    var resultBtn = document.getElementById("resultBtn");
    resultBtn.style = "visibility: hidden";
    daysLeft = 15;

    var oldBffName = null;
    if (bestFriend) {
        oldBffName = bestFriend.name;
    }
    if (incrementYear !== true) {
        bestFriend = generateBestFriend();
    } else {
        year++;
        if (year <= 4) {
            bestFriend = SnailUtil.getBestAttempt();
            bestFriend.isBestFriend = true;
            bestFriend.isBestAttempt = false;
        }
        else {
            bestFriend = generateBestFriend();
        }
        bestFriend.unlockNextGene();
    }
    bestFriend.posX = 10;
    bestFriend.posY = 35;

    eligibleSnails = [];
    immatureSnails = [];
    deadSnails = [];
    generateEligibleBreedingPool();
    
    menu = new MenuUI(bestFriend.name, oldBffName);
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
    if (year === 1) {
        adjustDifficulty();
    }
    SnailUtil.getClosestSnailToBFF();
}

function adjustDifficulty() {
    var bffAlleles = [bestFriend.genes[0].allele1, bestFriend.genes[0].allele2];
    var missingAlleles = [bestFriend.genes[0].allele1, bestFriend.genes[0].allele2];
    for (var i = 0; i < eligibleSnails.length; i++) {
        var snail = eligibleSnails[i];
        var idx1 = missingAlleles.indexOf(snail.genes[0].allele1);
        var idx2 = missingAlleles.indexOf(snail.genes[0].allele2);
        if (idx1 > -1) {
            missingAlleles.splice(idx1, 1);
        } 
        if (idx2 > -1) {
            missingAlleles.splice(idx2, 1);
        }
    }
    var iter = 0;
    while (missingAlleles.length > 0 && iter < 10) {
        console.log("Adjusting difficulty...");
        var allele = missingAlleles[0];
        var rand = MathUtil.getRandomInt(0, eligibleSnails.length - 1);
        var snail = eligibleSnails[rand];
        var newGene = Util.deepCopyObj(snail.genes[0]);
        var oldGene = Util.deepCopyObj(snail.genes[0]);
        newGene.allele1 = allele;
        snail.genes[0] = newGene;
        snail.getTraitsInCommonWithBff();
        if (snail.proximityToBestFriend === 0) {
            missingAlleles.splice(0, 1);
        } else {
            snail.genes[0] = oldGene;
            snail.getTraitsInCommonWithBff();
        }
        iter++;
    }
    if (missingAlleles.length > 0 && iter >= 10) {
        main();
    }
}

function generateBestFriend() {
    bestFriend = generateRandomSnail();
    var generator = new RandomSnailGenerator();
    if (year === 1) {
        var shellColorGene = bestFriend.findGene("Shell Color");
        var dom = GeneUtil.getDominantAllele(shellColorGene);
        while (dom === ColorAllele.Red) {
            bestFriend.genes = [];
            generator.generateShellColor(bestFriend);
            shellColorGene = bestFriend.findGene("Shell Color");
            dom = GeneUtil.getDominantAllele(shellColorGene);
        }
    }
    bestFriend.isBestFriend = true;
    bestFriend.name = generator.generateSnailName();
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
        fadeInterval *= -1;
        globalAlpha = 0;
    } else if (globalAlpha > 1) {
        fading = false;
        globalAlpha = 1;
        fadeInterval *= -1;
    }

    ctx.save();
    ctx.globalAlpha = globalAlpha;
    if (daysLeft > 0) {
        var bestAttempt = SnailUtil.getBestAttempt();
        if (bestAttempt.proximityToBestFriend === bestFriend.genes.length) {
            drawResult();
        }
        else {
            draw();
        }
    } else if (!fading) {
        drawResult();
    }
    ctx.fillStyle = "rgba(0, 0, 0, " + globalAlpha + ")";
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

function drawResult() {
    isDone = true;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    var bestAttempt = SnailUtil.getBestAttempt();
    bestFriend.posX = canvas.width / 2 - 220;
    bestFriend.posY = 100;
    bestAttempt.posX = canvas.width / 2 + 10;
    bestAttempt.posY = 100;
    var resultBtn = document.getElementById("resultBtn");
    if (bestFriend.genes.length > bestAttempt.proximityToBestFriend) {
        resultBtn.onClick = "main()";
        resultBtn.innerHTML = "Try again";
        ui.drawFailResult(bestFriend, bestAttempt);
    } else {
        ui.drawWinResult(bestFriend, bestAttempt);
    }
    resultBtn.style = "visibility: visible";
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
    drawDayFade();
}