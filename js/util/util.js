class Util {
    static replaceAll(target, regex, newStr) {
        return target.replace(new RegExp(regex, 'g'), newStr);
    }

    static deepCopyObj(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = new obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
}