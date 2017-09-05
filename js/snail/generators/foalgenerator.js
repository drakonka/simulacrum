class FoalGenerator extends SnailGenerator {
    
    breedSnails(snail1, snail2) {
        var stag = this.pickMaleSnail(snail1, snail2);
        var doe = this.getFemaleSnail(stag, snail1, snail2);  
        stag.sexualOrientation = 100;
        doe.sexualOrientation = -100;
        var egg = this.generateEgg(stag, doe);
        egg.currentScale = 0;
        SnailUtil.positionNewSnail(egg);
        if (bestFriend != null) {
            egg.getTraitsInCommonWithBff();
        }
        immatureSnails.push(egg);
    }

    pickMaleSnail(snail1, snail2) {
        if (snail1.sexualOrientation > snail2.sexualOrientation) {
            return snail1;
        }
        else if (snail1.sexualOrientation < snail2.sexualOrientation) {
            return snail2;
        }

        var rand = MathUtil.getRandomInt(0,1);
        if (rand === 0) {
            return snail1;
        }
        else {
            return snail2;
        }
    }

    getFemaleSnail(maleSnail, snail1, snail2) {
        if (snail1 === maleSnail) {
            return snail2;
        }
        return snail1;
    }

    generateEgg(stag, doe) {
        var snail = new Snail();
        snail.age = -1;
        snail.stagName = stag.name;
        snail.doeName = doe.name;

        snail.shellColorGene = this.getColorGene(stag.shellColorGene, doe.shellColorGene);
        snail.shellColor = this.pickColorFromGene(snail.shellColorGene);

        snail.eyeColorGene = this.getColorGene(stag.eyeColorGene, doe.eyeColorGene);
        snail.eyeColor = this.pickColorFromGene(snail.eyeColorGene);

        snail.patternColorGene = this.getColorGene(stag.patternColorGene, doe.patternColorGene);
        snail.patternColor = this.pickColorFromGene(snail.patternColorGene);

        snail.shellPatternGene = this.getPatternGene(stag.shellPatternGene, doe.shellPatternGene);
        snail.patternType = this.pickPatternFromGene(snail.shellPatternGene);
        return snail;
    }

    getColorGene(stagGene, doeGene) {
        var gene = new ColorGene(stagGene.name);
        gene.allele1 = this.generateAlleles(stagGene.allele1, stagGene.allele2);
        gene.allele2 = this.generateAlleles(doeGene.allele1, stagGene.allele2);
        return gene;
    }

    getPatternGene(stagGene, doeGene) {
        var gene = new PatternGene(stagGene.name);
        gene.allele1 = this.generateAlleles(stagGene.allele1, stagGene.allele2);
        gene.allele2 = this.generateAlleles(doeGene.allele1, stagGene.allele2);
        return gene;
    }

    generateAlleles(allele1, allele2) {
        var possibilities = [allele1, allele2];
        var rand = MathUtil.getRandomInt(0,1);
        return possibilities[rand];
    }
    
    pickFoalColorFromGene(colorGene, stagColor, doeColor) {
        // Red > Green > Blue
        var color = null;
        if (colorGene.allele1 == ColorAllele.Red || colorGene.allele2 == ColorAllele.Red) {
            var min = 0;
            var max = 255;
            if (stagColor.Red < doeColor.Red) {
                min = stagColor.Red - 10;
                max = doeColor.Red + 10;
            }
            else {
                min = doeColor.Red - 10;
                max = stagColor.Red + 10;
            }
            color = ColorUtil.pickRedColor(min, max);
        }
        else if (colorGene.allele1 == ColorAllele.Green || colorGene.allele2 == ColorAllele.Green) {
            var min = 0;
            var max = 255;
            if (stagColor.Green < doeColor.Green) {
                min = stagColor.Green - 10;
                max = doeColor.Green + 10;
            }
            else {
                min = doeColor.Green - 10;
                max = stagColor.Green + 10;
            }

            color = ColorUtil.pickGreenColor(min, max);
        }
        else {
            var min = 0;
            var max = 255;
            if (stagColor.Blue < doeColor.Blue) {
                min = stagColor.Blue - 10;
                max = doeColor.Blue + 10;
            }
            else {
                min = doeColor.Blue - 10;
                max = stagColor.Blue + 10;
            }
            color = ColorUtil.pickBlueColor(min, max);
        }
        return color;
    }
}