class MenuUI {

    constructor(bestFriendName, oldName) {
        if (!oldName) {
            oldName = "\\[bffname\\]";
        }
        this.instructionDiv = document.getElementById("instructions");
        this.instructionDiv.innerHTML = Util.replaceAll(this.instructionDiv.innerHTML, oldName, bestFriendName);
    }

}