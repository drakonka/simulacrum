class RandomSnailGenerator extends SnailGenerator {
    generateRandomSnail() {
        var snail = new Snail();
        this.generateShellColor(snail);
        this.generatePatternColor(snail);
        this.generateEyeColor(snail);
        this.generatePattenType(snail);
        snail.currentScale = 1;

        if (bestFriend != null && snail.name !== bestFriend.name) {
            snail.getTraitsInCommonWithBff();
            while (snail.proximityToBestFriend > 10) {
                snail = this.generateRandomSnail();
            }
        }
        return snail;
    }

    generateShellColor(snail) {
        // Get two random alleles for the gene
        snail.shellColorGene = new ColorGene("Shell Color");
        snail.shellColorGene.allele1 = this.pickRandomColorAllele();
        snail.shellColorGene.allele2 = this.pickRandomColorAllele();

        // Generate color based on dominant allele;
        snail.shellColor = this.pickColorFromGene(snail.shellColorGene);   
    }

    generatePatternColor(snail) {
        snail.patternColorGene = new ColorGene("Pattern Color");
        snail.patternColorGene.allele1 = this.pickRandomColorAllele();
        snail.patternColorGene.allele2 = this.pickRandomColorAllele();
        snail.patternColor = this.pickColorFromGene(snail.patternColorGene);
    }

    generateEyeColor(snail) {
        snail.eyeColorGene = new ColorGene("Eye Color");
        snail.eyeColorGene.allele1 = this.pickRandomColorAllele();
        snail.eyeColorGene.allele2 = this.pickRandomColorAllele();
        snail.eyeColor = this.pickColorFromGene(snail.eyeColorGene);
    }

    generatePattenType(snail) {
        snail.shellPatternGene = new PatternGene("Pattern Shape");
        snail.shellPatternGene.allele1 = this.pickRandomPatternAllele();
        snail.shellPatternGene.allele2 = this.pickRandomPatternAllele();
        snail.patternType = this.pickPatternFromGene(snail.shellPatternGene);
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