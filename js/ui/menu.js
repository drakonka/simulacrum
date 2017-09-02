class MenuUI {

    constructor(bestFriendName) {
        this.title = "KIKO";
        this.instructionDiv = document.getElementById("instructions");
        this.instructionDiv.innerHTML = Util.replaceAll(this.instructionDiv.innerHTML, "\\[bffname\\]", bestFriendName);
    }

}