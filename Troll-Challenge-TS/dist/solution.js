"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stacker = void 0;
var Instruction;
(function (Instruction) {
    Instruction["LEFT"] = "left";
    Instruction["UP"] = "up";
    Instruction["RIGHT"] = "right";
    Instruction["DOWN"] = "down";
    Instruction["PICKUP"] = "pickup";
    Instruction["DROP"] = "drop";
})(Instruction || (Instruction = {}));
var CellType;
(function (CellType) {
    CellType[CellType["EMPTY"] = 0] = "EMPTY";
    CellType[CellType["WALL"] = 1] = "WALL";
    CellType[CellType["BLOCK"] = 2] = "BLOCK";
    CellType[CellType["GOLD"] = 3] = "GOLD";
})(CellType || (CellType = {}));
var Stacker = /** @class */ (function () {
    function Stacker() {
        // Replace this with your own wizardry
        this.turn = function (currentCell) {
            // Pick an action randomly
            var random = Math.random() * 6 >> 0;
            switch (random) {
                case 0:
                    return Instruction.LEFT;
                case 1:
                    return Instruction.UP;
                case 2:
                    return Instruction.RIGHT;
                case 3:
                    return Instruction.DOWN;
                case 4:
                    return Instruction.PICKUP;
                case 5:
                default:
                    return Instruction.DROP;
            }
        };
        // More wizardry here
    }
    return Stacker;
}());
exports.Stacker = Stacker;
//# sourceMappingURL=solution.js.map