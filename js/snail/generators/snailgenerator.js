class SnailGenerator {

    pickColorFromGene(colorGene) {
        // Red > Green > Blue
        var color = null;
        if (colorGene.allele1 === ColorAllele.Red || colorGene.allele2 === ColorAllele.Red) {
            color = ColorUtil.pickRedColor(100, 255);
        }
        else if (colorGene.allele1 === ColorAllele.Blue || colorGene.allele2 === ColorAllele.Blue) {
            color = ColorUtil.pickBlueColor(100, 255);
        }
        else {
            color = ColorUtil.pickGreenColor(100,255);
        }
        return color;
    }

    pickPatternFromGene(patternGene) {
        // Solid > Cherry > SquareCherry > Blotchy
        var pattern = null;
        var a1 = patternGene.allele1;
        var a2 = patternGene.allele2;
        if (a1 === PatternType.SOLID || a2 === PatternType.SOLID) {
            pattern = PatternType.SOLID;
        }
        else if (a1 === PatternType.CHERRY || a2 === PatternType.CHERRY) {
            pattern = PatternType.CHERRY;
        }
        else if (a1 === PatternType.SQUARECHERRY || a2 === PatternType.SQUARECHERRY) {
            pattern = PatternType.SQUARECHERRY;
        }
        else {
            pattern = PatternType.BLOTCHY;
        }

        return pattern;
    }
}