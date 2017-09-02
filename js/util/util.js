class Util {
    static replaceAll(target, regex, newStr) {
        return target.replace(new RegExp(regex, 'g'), newStr);
    }
}