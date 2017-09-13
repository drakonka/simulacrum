class RandomSnailGenerator extends SnailGenerator {
    generateRandomSnail() {
        var snail = new Snail();
        this.generateShellColor(snail);
        if (year >= 2) {
            this.generateEyeColor(snail);
        }
        if (year >= 3) {
            this.generatePattenType(snail);
        }
        if (year >= 4) {
            this.generatePatternColor(snail);
        }
        snail.currentScale = 1;

        if (bestFriend != null && snail.name !== bestFriend.name) {
            snail.getTraitsInCommonWithBff();
            var maxProx = Math.floor(year / 2);
         
            while (snail.proximityToBestFriend > maxProx) {
                console.log("Adjusting random snail...");
                snail = this.generateRandomSnail();
            }
        }
        return snail;
    }

    generateShellColor(snail) {
        // Get two random alleles for the gene
        var shellColorGene = new ColorGene("Shell Color");
        shellColorGene.allele1 = this.pickRandomColorAllele();
        shellColorGene.allele2 = this.pickRandomColorAllele();
        var dominantAllele = GeneUtil.getDominantAllele(shellColorGene);
        
        snail.genes.push(shellColorGene);

        // Generate color based on dominant allele;
        snail.shellColor = this.pickColorFromGene(shellColorGene);   
    }

    generatePatternColor(snail) {
        var patternColorGene = new ColorGene("Pattern Color");
        patternColorGene.allele1 = this.pickRandomColorAllele();
        patternColorGene.allele2 = this.pickRandomColorAllele();
        snail.genes.push(patternColorGene);
        snail.patternColor = this.pickColorFromGene(patternColorGene);
    }

    generateEyeColor(snail) {
        var eyeColorGene = new ColorGene("Eye Color");
        eyeColorGene.allele1 = this.pickRandomColorAllele();
        eyeColorGene.allele2 = this.pickRandomColorAllele();
        snail.genes.push(eyeColorGene);
        snail.eyeColor = this.pickColorFromGene(eyeColorGene);
    }

    generatePattenType(snail) {
        var shellPatternGene = new PatternGene("Pattern Shape");
        shellPatternGene.allele1 = this.pickRandomPatternAllele();
        shellPatternGene.allele2 = this.pickRandomPatternAllele();
        snail.genes.push(shellPatternGene);
        snail.patternType = this.pickPatternFromGene(shellPatternGene);
    }


    /******* COLOR TRAITS */

    pickRandomColorAllele() {
        var num = MathUtil.getRandomInt(0,2);
        var allele = null;
        switch (num) {
            case 0:
                allele = ColorAllele.Red;
                break;
            case 1:
                allele = ColorAllele.Green;
                break;
            case 2:
                allele = ColorAllele.Blue;
                break;
        }
        return allele;
    }


    /******* PATTERN TRAITS */

    pickRandomPatternAllele() {
        var num = MathUtil.getRandomInt(0,3);
        var allele = null;
        switch (num) {
            case 0:
                allele = PatternType.SOLID;
                break;
            case 1:
                allele = PatternType.CHERRY
                break;
            case 2:
                allele = PatternType.SQUARECHERRY;
                break;
            case 3:
                allele = PatternType.BLOTCHY;
                break;
        }
        return allele;
    }

    generateSnailName() {
        var partOne = [
            "Crimson",
            "Beautiful",
            "Blue",
            "Red",
            "Cantering",
            "Cooky",
            "Spicy",
            "Crazy",
            "Cool",
            "Silver",
            "Antarctic",
            "Icy",
            "Emerald",
            "Volcanic",
            "Busta"
        ];
        var partTwo = [
            "Sunchaser",
            "Cucumber",
            "Velvet",
            "River",
            "Sky",
            "Eraser",
            "Kiko",
            "Adam",
            "Lining",
            "Alex",
            "Bo",
            "Racer",
            "Rock",
            "Rhymes"
        ];
        var firstRand = MathUtil.getRandomInt(0, partOne.length - 1);
        var secondRand = MathUtil.getRandomInt(0, partTwo.length - 1);
        return partOne[firstRand] + " " + partTwo[secondRand];
    }
}