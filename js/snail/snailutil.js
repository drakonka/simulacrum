var PatternType = {
  SOLID: "Solid",
  CHERRY: "Cherry",
  SQUARECHERRY: "Square Cherry",
  BLOTCHY: "Blotchy",
};

var ColorAllele = {
  Red: "R",
  Green: "G",
  Blue: "B",
};

var Personality = {
  Neutral: "Neutral",
  Curious: "Curious",
  Friendly: "Friendly",
  Amorous: "Amorous",
  Aggressive: "Aggressive",
};

var CauseOfDeath = {
    TooOld: "too old",
    TooYoung: "too young"
}

class SnailUtil {
    static getSelectedSnail() {
        var detailSnailName = document.getElementById("selectedSnailName").innerText;
        console.log(detailSnailName);
        for (var i = 0; i < eligibleSnails.length; i++) {
            var snail = eligibleSnails[i];
            if (snail.name == detailSnailName) {
                return snail;
            }
        }
    }

    static getSnailByName(name) {
        for (var i = 0; i < eligibleSnails.length; i++) {
            var snail = eligibleSnails[i];
            if (snail.name === name) {
                return snail;
            }
        }
    }

    static tryBreedSnails(selection) {
        try {
            var selectedSnail = SnailUtil.getSelectedSnail();
            var select = document.getElementById('breedSnailSelect');
            var mateName = select.options[select.selectedIndex].value;
            var mateSnail = SnailUtil.getSnailByName(mateName);
            var someoneDied = SnailUtil.checkCasualties(selectedSnail, mateSnail);
            if (!someoneDied) {
                var generator = new FoalGenerator();
                generator.breedSnails(selectedSnail, mateSnail);
            }
            incrementDay();
        }
        catch (e) {
            console.log(e);
        }
        return false
    }

    static checkCasualties(snail1, snail2) {
        var cod = null;
        cod = SnailUtil.doYoungDeathRoll(snail1);
        if (cod !== null) {
            snail1.killAndNotify(cod);
            return cod;
        }        
        cod = SnailUtil.doYoungDeathRoll(snail2);
        if (cod !== null) {
            snail2.killAndNotify(cod);
            return cod;
        }     
        cod = SnailUtil.doOldDeathRoll(snail2);
        if (cod !== null) {
            snail2.killAndNotify(cod);
        }     
        cod = SnailUtil.doOldDeathRoll(snail1)
        if (cod !== null) {
            snail1.killAndNotify(cod);
        }
        return cod;
    }

    static checkDeath(snail, cod) {
        if (cod !== null) {
            snail.killAndNotify(cod);
        }
    }

    static doYoungDeathRoll(snail) {
        var cod = null;
        var chance = 1 / snail.currentScale;
        var rand = MathUtil.getRandomInt(1, 8);
        if (rand < chance) {
            cod = CauseOfDeath.TooYoung;
        }
        return cod;
    }

    static doOldDeathRoll(snail) {
        var cod = null;
        var chance = snail.age - 5;
        var rand = MathUtil.getRandomInt(1, 8);
        if (rand <= chance) {
            cod = CauseOfDeath.TooOld;
        }
        return cod;
    }


    static getAllLiveSnails() {
        var allSnails = eligibleSnails.concat(immatureSnails);
        return allSnails;
    }

    static getAllSnails() {
        var allSnails = eligibleSnails.concat(immatureSnails).concat(deadSnails);
        return allSnails;
    }
    
    static shuffleSnails() {
        var generator = new RandomSnailGenerator();
    
        var liveSnails = SnailUtil.getAllLiveSnails();
        var newSnails = [];
        for (var i = 0; i < liveSnails.length; i++) {
            var snail = liveSnails[i];
            if (daysLeft !== 15 && snail.isBestAttempt) {
                newSnails.push(snail);
                continue;
            }
            var newSnail = generator.generateRandomSnail();
            newSnail.posX = snail.posX;
            newSnail.posY = snail.posY;
            newSnails.push(newSnail);
        }
        eligibleSnails = newSnails;
        SnailUtil.getClosestSnailToBFF();
        draw();
        if (daysLeft !== 15) {
            incrementDay();
        }
        console.log("wat");
    }

    static refreshSnailGrid() {
        var allSnails = SnailUtil.getAllLiveSnails();
        if (allSnails.length === 0) {
            return;
        }
        
        var x = ui.breedingPoolBlock.posX;
        var y = ui.breedingPoolBlock.posY + 25;
        for (var i = 1; i < allSnails.length; i++) {
            var snail = allSnails[i - 1];
            snail.posX = x;
            snail.posY = y;

            if (i % 4 === 0) {
                x = ui.breedingPoolBlock.posX;
                y += 80;
            }
            else {
                x += 220;
            }
        
        }
    }

    static positionNewSnail(snail) {
        var allSnails = SnailUtil.getAllLiveSnails();
        if (allSnails.length === 0) {
            return;
        }
        
        var posX = allSnails[allSnails.length - 1].posX;
        var posY = allSnails[allSnails.length - 1].posY;
        if (allSnails.length % 4 === 0) {
            posX = ui.breedingPoolBlock.posX;
            posY += 80;
        }
        else {
            posX += 220;
        }
        snail.posX = posX;
        snail.posY = posY;
    }

    static getClosestSnailToBFF() {
        for (var i = 0; i < deadSnails.length; i++) {
            var deadSnail = deadSnails[i];
            if (deadSnail.isBestAttempt) {
                deadSnail.isBestAttempt = false;
            }
        }

        var allSnails = SnailUtil.getAllLiveSnails();
        var closestSnail = null;
        for (var i = 0; i < allSnails.length; i++) {
            var snail = allSnails[i];
            if (snail.age > 0) {
                if (snail.isBestAttempt) {
                    snail.isBestAttempt = false;
                }
                if (closestSnail === null || snail.proximityToBestFriend > closestSnail.proximityToBestFriend) {
                    closestSnail = snail;
                }
            }
        }
        closestSnail.isBestAttempt = true;
    }
}