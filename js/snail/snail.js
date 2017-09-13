class Snail {

    constructor() {
        this.name = this.generateRandomName();
        this.weight = 0;
        this.imgSrc = "./img/snail.png";
        this.isBestFriend = false;
        this.doDrawTile = true;

        this.isBestAttempt = false;
        this.generation = 1;

        this.img = new Image();
        this.img.src = this.imgSrc;
        this.currentScale = 0;
        this.posX = 0;
        this.posY = 0;

        // Offspring
        this.stagName = "Wild Snail";
        this.doeName = "Wild Snail";

        // Visual traits
        this.shellColor = new Color();
        this.patternColor = new Color();
        this.eyeColor = new Color();

        this.patternType = PatternType.SOLID;

        // Genes
        this.genes = [];

        // Fluid traits
        this.lust = 0;
        this.sexualOrientation = 0; // -100 = extremely feminine, 100 = extremely masculine
        this.age = 1;
        
        this.traitsInCommonWithBff = [];
        this.maxPoints = 26;


    //   this.img.onload = this.draw();
    }

    findGene(name) {
        for (var i = 0; i < this.genes.length; i++) {
            var gene = this.genes[i];
            if (gene.name === name) {
                return gene;
            }
        }
        return null;
    }

    unlockNextGene() {
        var generator = new RandomSnailGenerator();
        if (year === 2) {
            generator.generateEyeColor(this);
        }
        if (year === 3) {
            generator.generatePattenType(this);
        }
        if (this.genes.length < 4 && year === 4) {
            generator.generatePatternColor(this);
        }
        this.currentScale = 1;
    }

    generateRandomName() {
        var name = "Unnamed#" + MathUtil.getRandomInt(1,50);
        var allSnails = SnailUtil.getAllSnails();
        for (var i = 0; i < allSnails.length; i++) {
            var snail = allSnails[i];
            if (snail.name === name) {
                return this.generateRandomName();
            }
        }
        return name;
    }
    

    ageSnail() {
        if (this.age === 0) {
            var idx = immatureSnails.indexOf(this);
            immatureSnails.splice(idx, 1);
            eligibleSnails.push(this);
        }
        this.age++;
        if (this.currentScale < 1) {
            this.currentScale += 0.25;
        }
    }

    get isDead() {
        var idx = deadSnails.indexOf(this);
        if (idx != -1) {
            return true;
        }
        return false;
    }
    get sexualOrientationDesc() {
        if (this.sexualOrientation === 0) {
            return "sexually neutral";
        }
        else if (this.sexualOrientation > 50) {
            return "very masculine";
        }
        else if (this.sexualOrientation > 0) {
            return "slightly masculine";
        }
        else if (this.sexualOrientation < 50) {
            return "very feminine";
        }
        else if (this.sexualOrientation < 0) {
            return "slightly feminine";
        }
        return "very confused!"
    }

   get proximityToBestFriend() {
        return this.traitsInCommonWithBff.length;
    }

    getTraitsInCommonWithBff() {
        // The more dominant genes the snails have in common the closer they are.
        this.traitsInCommonWithBff = [];
        for (var i = 0; i < this.genes.length; i++) {
            var gene = this.genes[i];
            var bffGene = bestFriend.findGene(gene.name);
            if (GeneUtil.getDominantAllele(gene) === GeneUtil.getDominantAllele(bffGene)) {
                this.traitsInCommonWithBff.push(gene.name);
            }
        }
    }

    showDetails() {
        ui.showSnailDetails(this);
    }

    killAndNotify(cod) {
        var msg = this.name + " has died! It was " + cod + " and weak to breed.";
        var idx = eligibleSnails.indexOf(this);
        eligibleSnails.splice(idx, 1);
        deadSnails.push(this);
        alert(msg);
    }

    tryToRename(newName) {
        if (newName.length > 10) {
            alert("Your new chosen name is more than 10 characters long! That's too long for a snail name.");
            return;
         } else if (this.name === bestFriend.name) {
            alert("You can't rename your missing best friend. You monster.");
            return;
        } else if (bestFriend.name === newName) {
            alert("You shouldn't try to name another snail by the name of your best friend - it won't fill the hole in your heart.");
            return;
        } else {
            for (var i = 0; i < eligibleSnails.length; i++) {
                var snail = eligibleSnails[i];
                if (snail.name === newName) {
                    alert("You already have a snail with that name!");
                    return;
                }
            }
        }
        var allSnails = SnailUtil.getAllLiveSnails();
       
        // Sync up all of this snail's offspring with the new name
        for (var i = 0; i < allSnails.length; i++) {
            var snail = allSnails[i];
            if (snail.doeName === this.name) {
                snail.doeName = newName;
            } else if (snail.stagName === this.name) {
                snail.stagName = newName;
            }
        }
        this.name = newName;
        this.showDetails();
        draw();
    }


    drawTile(posX, posY) {
        ctx.save();
        var color = new Color();
        color.R = 255;
        color.G = 255;
        color.B = 255;
        var fill = ColorUtil.formatRGBA(color, 0.75);
        ctx.fillStyle = fill;
        ctx.strokeStyle = ColorUtil.formatRGBA(color, 0.5);
        ctx.lineJoin = "round";

        var cRadius = 10;
        ctx.lineWidth = cRadius;
        ctx.strokeRect(posX+(cRadius/2), posY+(cRadius/2), 215-cRadius, 75-cRadius);
        ctx.fillRect(posX+(cRadius/2), posY+(cRadius/2), 215-cRadius, 75-cRadius);

        ctx.restore();
    }

    drawShell(posX, posY, offsetX, offsetY) {
        offsetX += 42;
        offsetY += 26;
        ctx.save();
        ctx.beginPath();
        var r = 25 * this.currentScale;

        var x = posX + offsetX * this.currentScale;
        var y = posY + offsetY * this.currentScale;
        ctx.arc(x,y,r,0,2*Math.PI);
        var fill = ColorUtil.formatRGBA(this.shellColor, 1);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
    }

    drawEye(posX, posY, offsetX, offsetY) {
        offsetX += 10;
        offsetY += 10;
        ctx.save();
        ctx.beginPath();
        var r = 7 * this.currentScale;
        var x = posX + offsetX * this.currentScale;
        var y = posY + offsetY * this.currentScale;
        ctx.arc(x,y,r,0,2*Math.PI);
        var fill = ColorUtil.formatRGBA(this.eyeColor, 1);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
    }

    drawCherryPattern(posX, posY, offsetX, offsetY) {
        var fill = "#fff";
        if (this.patternColor !== null) {
            var fill = ColorUtil.formatRGBA(this.patternColor, 1);
        }

        ctx.fillStyle = fill;

        // Marking one
        ctx.beginPath();
        var r = 5 * this.currentScale;

        var x = posX + offsetX + 40 * this.currentScale;
        var y = posY + offsetY + 15 * this.currentScale;
    
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fill();

        // Marking two
        x = posX + offsetX + 30 * this.currentScale;
        y = posY + offsetY + 30 * this.currentScale;

        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fill();

        // Marking three

        x = posX + offsetX + 50 * this.currentScale;
        y = posY + offsetY + 30 * this.currentScale;

        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fill();
    }

    drawSquareCherryPattern(posX, posY, offsetX, offsetY) {
        var fill = "#fff";
        if (this.patternColor !== null) {
            var fill = ColorUtil.formatRGBA(this.patternColor, 1);
        }
        ctx.fillStyle = fill;

        var l = 10 * this.currentScale;

        // Marking one
        var x = posX + offsetX + 40 * this.currentScale;
        var y = posY + offsetY + 15 * this.currentScale;

        ctx.fillRect(x,y,l,l);

        // Marking two
        x = posX + offsetX + 30 * this.currentScale;
        y = posY + offsetY + 30 * this.currentScale;

        ctx.fillRect(x,y,l,l);

        // Marking three
        x = posX + offsetX + 50 * this.currentScale;
        y = posY + offsetY + 30 * this.currentScale;

        ctx.fillRect(x, y,l,l);
    }

    drawBlotchyPattern(posX, posY, offsetX, offsetY) {
        ctx.beginPath();
        var r = 20 * this.currentScale;
        var x = posX + offsetX + 47 * this.currentScale;
        var y = posY + offsetY + 30 * this.currentScale;

        var fill = "#fff";
        if (this.patternColor !== null) {
            var fill = ColorUtil.formatRGBA(this.patternColor, 1);
        }


        ctx.arc(x, y,r,-2,2*Math.PI);
        ctx.fill();
    }

    drawPattern(posX, posY, offsetX, offsetY) {
        ctx.save();
        switch(this.patternType) {
            case PatternType.CHERRY:
                this.drawCherryPattern(posX, posY, offsetX, offsetY);
                break;
            case PatternType.SQUARECHERRY:
                this.drawSquareCherryPattern(posX, posY, offsetX, offsetY);
                break;
            case PatternType.BLOTCHY:
                this.drawBlotchyPattern(posX, posY, offsetX, offsetY);
                break;
        }
        ctx.restore();
    }

    drawSnail(posX, posY, offsetX, offsetY) {
        ctx.save();
        if (this.shellColor !== null) {
            this.drawShell(posX, posY, offsetX, offsetY);
        }
        if (this.eyeColor !== null) {
            this.drawEye(posX, posY, offsetX, offsetY);
        }
        if (this.patternType !== null) {
            this.drawPattern(posX, posY, offsetX, offsetY);
        }
        var w = this.img.width;
        var h = this.img.height;
        var x = posX + offsetX;
        var y = posY + offsetY;
        ctx.drawImage(this.img, x, y, w * this.currentScale, h * this.currentScale);
        ctx.restore();
    }

    drawStats(posX, posY) {
        var offsetX = 75;
        var offsetY = 10;
        var lineHeight = 13;
        ctx.save();
        ctx.font = "15px Arial";
        ctx.fillStyle = "green";
        ctx.textBaseline = "top";
        var y = posY + offsetY;
        var x = posX + offsetX;
        ctx.fillText(this.name, x, y);
        y += lineHeight;
        if (!this.isDead) {
            ctx.fillText("Age: " + this.age, x, y);
        }
        else {
            ctx.fillText("DEAD", x, y);
        }

        if (this.name !== bestFriend.name) {
            y += lineHeight;
            ctx.fillText("Proximity Points: " + this.proximityToBestFriend, x, y);
        }

        ctx.restore();
    }

    drawOrienationSymbol() {
        var feminineColor = new Color();
        femininecolor.R = 245;
        feminineColor.G = 79;
        feminineColor.B = 112;

        var masculineColor = new Color();
        masculineColor.R = 33;
        masculineColor.G = 150;
        masculineColor.B = 243;
        
    }

    drawEgg() {
        var offsetX = 35;
        var offsetY = 35;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.posX + offsetX,this.posY + offsetY,5,0,2*Math.PI);
        var fill = ColorUtil.formatRGBA(this.shellColor, 1);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
    }

    draw() {
        var posX = this.posX;
        var posY = this.posY;
        if (!isDone && this.isBestAttempt && daysLeft > 0) {
            posX = ui.bestAttemptBlock.posX - 20;
            posY = ui.bestAttemptBlock.posY + 25;
        }

        if (this.doDrawTile) {
            this.drawTile(posX, posY);
        }

        if (this.age === 0) {
            this.drawEgg();
        }
        else if (this.age > 0) {
            var offsetX = 5;
            var offsetY = 10;
            this.drawSnail(posX, posY, offsetX, offsetY);
        }
       
        this.drawStats(posX, posY);
    }
}