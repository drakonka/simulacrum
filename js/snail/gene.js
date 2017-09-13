class Gene {
    constructor(name) {
        this.name = name;
        this.isActive = false;
    }
}

class ColorGene extends Gene {
    constructor(name) {
        super(name);
        this.allele1 = ColorAllele.Red;
        this.allele2 = ColorAllele.Red;
    }
}

class PatternGene extends Gene {

    constructor(name) {
        super(name);
        this.allele1 = PatternType.SOLID;
        this.allele2 = PatternType.SOLID;
    }
}

class GeneUtil {
    static getDominantAllele(gene) {
        var dominantTrait = null;
        if (gene instanceof ColorGene) {
            dominantTrait = GeneUtil.getColorGeneDominantTrait(gene);
        }
        else if (gene instanceof PatternGene) {
            dominantTrait = GeneUtil.getPatternGeneDominantTrait(gene);
        }
        return dominantTrait;
    }

    static getColorGeneDominantTrait(gene) {
        var allele1 = gene.allele1;
        var allele2 = gene.allele2;
        
        if (allele1 === ColorAllele.Red || allele2 === ColorAllele.Red) {
            return ColorAllele.Red;
        }
        else if (allele1 === ColorAllele.Green || allele2 === ColorAllele.Green) {
            return ColorAllele.Green;
        }
        else if (allele1 === ColorAllele.Blue || allele2 === ColorAllele.Blue) {
            return ColorAllele.Blue;
        }   
    }

    static getPatternGeneDominantTrait(gene) {
        var allele1 = gene.allele1;
        var allele2 = gene.allele2;

        if (allele1 === PatternType.SOLID || allele2 === PatternType.SOLID) {
            return PatternType.SOLID;
        }
        else if (allele1 === PatternType.CHERRY || allele2 === PatternType.CHERRY) {
            return PatternType.CHERRY;
        }
        else if (allele1 === PatternType.SQUARECHERRY || allele2 === PatternType.SQUARECHERRY) {
            return PatternType.SQUARECHERRY;
        }  
        else if (allele1 === PatternType.BLOTCHY || allele2 === PatternType.BLOTCHY) {
            return PatternType.BLOTCHY;
        }
    }
}