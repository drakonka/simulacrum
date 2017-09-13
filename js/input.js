class InputHandler {
    
    constructor() {
        canvas.addEventListener("click", this.onClick, false);
    }

    onClick(e) {
        var rect = canvas.getBoundingClientRect();
        var mousePoint = {
            posX: e.clientX - rect.left,
            posY: e.clientY - rect.top
        };
       
        var allSnails = SnailUtil.getAllLiveSnails();
        if (isDone) {
            allSnails = [SnailUtil.getBestAttempt()];
        }
        allSnails.push(bestFriend);
        for (var i = 0; i < allSnails.length; i++) {
            var snail = allSnails[i];
            var hitsTarget = inputHandler.hitsTarget(mousePoint, snail);
            if (hitsTarget) {
                snail.showDetails();
                break;
            }
        }
    }

    hitsTarget(point, target) {
        var posX = target.posX;
        var posY = target.posY;
        if (target.isBestAttempt && isDone === false) {
            posX = ui.bestAttemptBlock.posX - 20;
            posY = ui.bestAttemptBlock.posY + 25;
        }
        var widthHits = point.posX >= posX && point.posX <= posX + 200;
        var heightHits = point.posY >= posY && point.posY <= posY + 85;
        return widthHits && heightHits;
    }

    static renameSelectedSnail() {
        var newName = prompt("Enter new name:", "");
        var selectedSnail = SnailUtil.getSelectedSnail();
        selectedSnail.tryToRename(newName);
    }
}
