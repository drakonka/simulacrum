class ColorUtil {

    static pickRedColor(min, max) {
        min = ColorUtil.clampColor(min);
        max = ColorUtil.clampColor(max);
        var color = new Color();
        color.R = MathUtil.getRandomInt(min,max);
        color.G = MathUtil.getRandomInt(0,color.R);
        color.B = MathUtil.getRandomInt(0,color.R);
        return color;
    }

    static pickGreenColor(min, max) {
        min = ColorUtil.clampColor(min);
        max = ColorUtil.clampColor(max);
        var color = new Color();
        color.G = MathUtil.getRandomInt(min, max);
        color.R = MathUtil.getRandomInt(0,color.G);
        color.B = MathUtil.getRandomInt(0,color.G);
        return color;
    }

    static pickBlueColor(min, max) {
        min = ColorUtil.clampColor(min);
        max = ColorUtil.clampColor(max);
        var color = new Color();
        color.B = MathUtil.getRandomInt(min, max);
        color.G = MathUtil.getRandomInt(0,color.B);
        color.R = MathUtil.getRandomInt(0,color.B);
        return color;
    }   

    static formatRGBA(color, alpha) {
        var rgba = "rgba(" + color.R + "," + color.G + "," + color.B + "," + alpha + ")";
        return rgba;
    }

    static clampColor(num) {
        if (num < 0) {
            num = 0;
        } else if (num > 255) {
            num = 255;
        }
        return num;
    }

    static getDeltaE(color1, color2) {
        var r1 = color1.R;
        var g1 = color1.G;
        var b1 = color1.B;

        var xyz1 = ColorUtil.rgbToXyz(r1, g1, b1);
        var lab1 = ColorUtil.xyzToLab(xyz1[0], xyz1[1], xyz1[2]);

        var r2 = color2.R;
        var g2 = color2.G;
        var b2 = color2.B;

        var xyz2 = ColorUtil.rgbToXyz(r2, g2, b2);
        var lab2 = ColorUtil.xyzToLab(xyz2[0], xyz2[1], xyz2[2]);

        var deltaE = ColorUtil.cie1994(lab1,lab2,false);
        return deltaE;

    }

    static rgbToXyz(r,g,b) {
        var _r = ( r / 255 );
        var _g = ( g / 255 );
        var _b = ( b / 255 );

        if ( _r > 0.04045 ) {
            _r = Math.pow(( ( _r + 0.055 ) / 1.055 ), 2.4);
        }
        else {
            _r = _r / 12.92;
        }

        if ( _g > 0.04045 ) {
            _g = Math.pow(( ( _g + 0.055 ) / 1.055 ), 2.4);
        }
        else {                 
            _g = _g / 12.92;
        }

        if ( _b > 0.04045 ) {
            _b = Math.pow(( ( _b + 0.055 ) / 1.055 ), 2.4);
        }
        else {                  
            _b = _b / 12.92;
        }

        _r = _r * 100;
        _g = _g * 100;
        _b = _b * 100;

        //Observer. = 2°, Illuminant = D65
        var X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805;
        var Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722;
        var Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

        return [X, Y, Z];
    };

    static xyzToLab(x, y, z) {
        var ref_X =  95.047;
        var ref_Y = 100.000;
        var ref_Z = 108.883;

        var _X = x / ref_X;          //ref_X =  95.047   Observer= 2°, Illuminant= D65
        var _Y = y / ref_Y;          //ref_Y = 100.000
        var _Z = z / ref_Z;          //ref_Z = 108.883

        if ( _X > 0.008856 ) {

            _X = Math.pow(_X, ( 1/3 ));
        }
        else {                 
            _X = ( 7.787 * _X ) + ( 16 / 116 );
        }

        if ( _Y > 0.008856 ) {
            _Y = Math.pow(_Y, ( 1/3 ));
        }
        else {
            _Y = ( 7.787 * _Y ) + ( 16 / 116 );
        }

        if ( _Z > 0.008856 ) {
            _Z = Math.pow(_Z, ( 1/3 ));
        }
        else { 
            _Z = ( 7.787 * _Z ) + ( 16 / 116 );
        }

        var CIE_L = ( 116 * _Y ) - 16;
        var CIE_a = 500 * ( _X - _Y );
        var CIE_b = 200 * ( _Y - _Z );

        return [CIE_L, CIE_a, CIE_b];
    };

    static cie1994(x, y, isTextiles) {
        var x = {l: x[0], a: x[1], b: x[2]};
        var y = {l: y[0], a: y[1], b: y[2]};
        var labx = x;
        var laby = y;
        var k2;
        var k1;
        var kl;
        var kh = 1;
        var kc = 1;
        if (isTextiles) {
            k2 = 0.014;
            k1 = 0.048;
            kl = 2;
        }
        else {
            k2 = 0.015;
            k1 = 0.045;
            kl = 1;
        }

        var c1 = Math.sqrt(x.a*x.a + x.b*x.b);
        var c2 = Math.sqrt(y.a*y.a + y.b*y.b);

        var sh = 1 + k2*c1;
        var sc = 1 + k1*c1;
        var sl = 1;

        var da = x.a - y.a;
        var db = x.b - y.b;
        var dc = c1 - c2;

        var dl = x.l - y.l;
        var dh = Math.sqrt(da*da + db * db - dc*dc);

        return Math.sqrt(Math.pow((dl/(kl*sl)),2) + Math.pow((dc/(kc*sc)),2) + Math.pow((dh/(kh*sh)),2));
    }
}

class Color {
    constructor() {
        this.R = 0;
        this.G = 0;
        this.B = 0;
    }
}