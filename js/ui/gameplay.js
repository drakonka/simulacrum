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

        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText(daysLeft, this.daysLeftBlock.posX + 55, this.daysLeftBlock.posY + 30);

        ctx.restore();
    }
}