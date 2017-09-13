class GameplayUI {

    constructor() {
        this.targetBlock = {
            text: "Your Target:",
            posX: 10,
            posY: 10
        };

        this.daysLeftBlock = {
            text: "Days Left:",
            posX: 355,
            posY: 10
        }

        this.bestAttemptBlock = {
            text: "Your Best Effort:",
            posX: 700,
            posY: 10
        }

        this.breedingPoolBlock = {
            text: "Eligible Breeding Pool:",
            posX: 10,
            posY: 120,
            gridCols: 3,
            gridRows: 3
        }

        this.bestAttemptText = "Your Best Effort:";
        this.breedingPoolText = "Eligible Breeding Pool:";
    }

    hideSelectedSnailDetails() {
        var detailDiv = document.getElementById("snailDetails");
        detailDiv.style = "visibility: hidden";

        var detailSection = document.getElementById("selectedSnailDetails");
        detailSection.style = "visibility:hidden";

        var geneSectionDiv = document.getElementById("selectedSnailGenes");
        geneSectionDiv.style = "visibility: hidden";

        var breedSectionDiv = document.getElementById("breedSnailSection");
        breedSectionDiv.style = "visibility: hidden";
    }

    draw() {
        ctx.save();
        ctx.font = "25px Arial";
        ctx.fillStyle = "green";
        ctx.textBaseline = "top";
        ctx.fillText(this.targetBlock.text, this.targetBlock.posX, this.targetBlock.posY);
        ctx.fillText(this.daysLeftBlock.text, this.daysLeftBlock.posX, this.daysLeftBlock.posY);
        ctx.fillText(this.bestAttemptBlock.text, this.bestAttemptBlock.posX, this.bestAttemptBlock.posY);
        ctx.fillText(this.breedingPoolBlock.text, this.breedingPoolBlock.posX, this.breedingPoolBlock.posY);

        ctx.save();
        ctx.textBaseline = "bottom";
        ctx.fillText("Year: " + year, 10, canvas.height - 10);
        ctx.restore();

        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText(daysLeft, this.daysLeftBlock.posX + 55, this.daysLeftBlock.posY + 30);
        ctx.restore();
    }

    drawFailResult(bestFriend, bestAttempt) {
        bestFriend.draw();
        bestAttempt.draw();

        ctx.save();
        ctx.font = "60px Arial";
        ctx.fillStyle = "green";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.fillText("Time's up!", canvasWidth / 2, 20);

        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        var x = 50;
        var y = bestFriend.posY + 120;
        var generationLabel = "wild snail";
        if (bestAttempt.generation > 1) {
            generationLabel = bestAttempt.generation + "nd generation offspring";
        }
        var traitStr = "You achieved the following common traits: ";
        for (var i = 0; i < bestAttempt.traitsInCommonWithBff.length; i++) {
            var traitName = bestAttempt.traitsInCommonWithBff[i].name;
            traitStr += traitName;
            if (i < bestAttempt.traitsInCommonWithBff.length - 1) {
                traitStr += ", ";
            }
            else {
                traitStr += ".";
            }
        }
        var lines = [
            "Summer is over and with it the breeding season.",
            "- Your best attempt to breed a snail like " + bestFriend.name + " is " + bestAttempt.name + ".",
            "- " + bestAttempt.name + " is a " + generationLabel + "."
        ];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            ctx.fillText(line, x, y);
            y += 23;
        }
        ctx.restore();

    }

    drawWinResult(bestFriend, bestAttempt) {
        bestFriend.draw();
        bestAttempt.draw();

        ctx.save();
        ctx.font = "60px Arial";
        ctx.fillStyle = "green";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.fillText("You did it!", canvasWidth / 2, 20);

        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        var x = 50;
        var y = bestFriend.posY + 120;
        var generationLabel = "wild snail";
        if (bestAttempt.generation > 1) {
            generationLabel = bestAttempt.generation + "nd generation offspring";
        }
        var traitStr = "You achieved the following common traits: ";
        for (var i = 0; i < bestAttempt.traitsInCommonWithBff.length; i++) {
            var traitName = bestAttempt.traitsInCommonWithBff[i].name;
            traitStr += traitName;
            if (i < bestAttempt.traitsInCommonWithBff.length - 1) {
                traitStr += ", ";
            }
            else {
                traitStr += ".";
            }
        }
        var lines = [
            "You did it! You bred a snail whose traits perfectly match your best friend.",
            "- " + bestAttempt.name + " is a " + generationLabel + ".",
            "",
        ];
        if (year < 4) {
            lines.push("You seem to have discovered more traits! Maybe you should keep living...");
        }
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            ctx.fillText(line, x, y);
            y += 23;
        }
        ctx.restore();

    }

    showSnailDetails(snail) {
        var detailDiv = document.getElementById("snailDetails");
        detailDiv.style = "visibility: visible";
        var detailSnailName = document.getElementById("selectedSnailName");
        detailSnailName.innerHTML = snail.name;
 
        if (snail !== bestFriend) {
            this.displayDetailsSection(snail);
        } else {
            var details = document.getElementById("selectedSnailDetails");
            details.style = "visibility: hidden";
        }
        this.displayGeneSection(snail);
        if (snail !== bestFriend) {
            this.displayBreedingSection(snail);
        } else {
            var breedSection = document.getElementById("breedSnailSection");
            breedSection.style = "visibility: hidden";
        }
    }

    displayGeneSection(snail) {
        var geneSection = document.getElementById("selectedSnailGenes");
        geneSection.style = "visibility: visible";
        var inner = "<h3>Genes</h3>";
        inner += "<p>Color gene dominance: R > G > B<br />";
        inner += "Shape gene dominance: S > C > SC > B</p>";

        inner += "<table><tr><th>Name</th><th>Allele 1</th><th>Allele 2</th></tr>";
        for (var i = 0; i < snail.genes.length; i++) {
            var gene = snail.genes[i];
            inner += this.buildGeneRow(gene);
        }
        inner += "</table>"
        geneSection.innerHTML = inner;
    }

    buildGeneRow(gene) {
        var dominantAllele = GeneUtil.getDominantAllele(gene);
        var inner = "<tr><td>" + gene.name + "</td><td>";

        if (dominantAllele === gene.allele1) {
            inner += "<strong>" + gene.allele1 + "</strong>";
        }
        else {
            inner += gene.allele1;
        }
        inner += "</td>";
        inner += "<td>";
        if (dominantAllele === gene.allele2) {
            inner += "<strong>" + gene.allele2 + "</strong>";
        }
        else {
            inner += gene.allele2;
        }
        inner += "</td></tr>";
        return inner;
    }

    displayDetailsSection(snail) {
        var details = document.getElementById("selectedSnailDetails");
        details.style = "visibility: visible";

        details.innerHTML = "<ul>";
        details.innerHTML += "<li><strong>Age:</strong> " + snail.age + " days</li>"

        if (snail.age > 0) {
            details.innerHTML += "<li><strong>Proximity to " + bestFriend.name + ": </strong>" + snail.proximityToBestFriend + "/" + snail.maxPoints + "</li>";
            details.innerHTML += "<li><strong>Traits in common:</strong> ";
            for (var i = 0; i < snail.traitsInCommonWithBff.length; i++) {
                var trait = snail.traitsInCommonWithBff[i];
                details.innerHTML += trait;
                if (i < snail.traitsInCommonWithBff.length - 1) {
                    details.innerHTML += ", ";
                }
            }
            details.innerHTML += "</li>";
            details.innerHTML += "<li><strong>Orientation:</strong>" + snail.sexualOrientationDesc + "</li>";
        }
        details.innerHTML += "<li><strong>Stag:</strong> " + snail.stagName + "</li>";
        details.innerHTML += "<li><strong>Doe:</strong> " + snail.doeName + "</li>";
        details.innerHTML += "</ul>";
    }

    displayBreedingSection(snail) {
        var breedSection = document.getElementById("breedSnailSection");
        if (snail.age > 0) {
            breedSection.style = "visibility: visible";
            
            var mateSelection = document.getElementById("breedSnailSelect");
            mateSelection.innerHTML = "";
            for (var i = 0; i < eligibleSnails.length; i++) {
            
                var otherSnail = eligibleSnails[i];
                if (snail.name !== otherSnail.name && snail.age > 0) {
                    mateSelection.innerHTML += "<option value='" + otherSnail.name + "'>" + otherSnail.name + "</option>"
                }
            }
        }
        else {
            breedSection.style = "visibility: hidden";
        }
    }

    hideBreedingPreviewChart() {
        var breedingPreview = document.getElementById("breedingPreview");
        breedingPreview.style = "visibility: hidden";      
    }

    displayBreedingPreviewChart(name1, name2, geneCombos) {
        var breedingPreview = document.getElementById("breedingPreview");
        breedingPreview.style = "visibility: visible";
        var inner = "<table>";
        inner += "<th colspan=3><p>" + name1 + " x " + name2 + " BREEDING PREVIEW</p></th>";
        for (var i = 0; i < geneCombos.length; i++) {
            var geneCombo = geneCombos[i];
            inner += "<tr>";
            inner += "<td colspan=3><strong>" + geneCombo[0].name + " possibilities</strong></td></tr>";
            inner += "<tr><td></td><td>" + geneCombo[0].allele2 + "</td>";
            inner += "<td>" + geneCombo[1].allele2 + "</td></tr>";
            for (var n = 0; n < geneCombo.length; n++) {
                var gene = geneCombo[n];
                if (n === 0) {
                    inner += "<tr><td>" + gene.allele1 + "</td>";
                }
                else if (n === 2) {
                    inner += "</tr><tr><td>" + gene.allele1 + "</td>";
                }
                inner += "<td>" + gene.allele1 + gene.allele2 + "</td>";
                if (n === geneCombo.length - 1) {
                    inner += "</tr>";
                }
            }
        }
        inner += "</table><br />";
        var closeBtn = document.createElement("BUTTON");
        var label = document.createTextNode("Close");
        closeBtn.appendChild(label);
        closeBtn.onclick = this.hideBreedingPreviewChart;
    

        breedingPreview.innerHTML = inner;
        breedingPreview.appendChild(closeBtn);
    }
}