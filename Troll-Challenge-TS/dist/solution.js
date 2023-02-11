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
/**
 * GOAL: average <1000 turns across ten tries. The best score we’ve seen is 430.
 * Solution overview:
 * Building stairs around the treasure to access it. (direction of the inital 1 should be
 * facing the direction that has most blocks)
 *         7  6
 *      1  8  5
 *      2  3  4
 * 1. Move to the treasure using the shortest path
 *    a. Bring the first block bypass on the way
 * 2. find the direction with closest number of building blocks.
 *  a. explore from treasure
 *  b.
 * 3. while there's not enough blocks around treasure. Totol needed is (1+7)*7/2 = 28:
 *    a. find the closest blocks
 *    b. place it at the correct place
 *
 * function: shortest path to treasure
 *  use bfs to traverse the maze, stop and return the path when encounter the treasure
 *  each path should pick up the first encontered block
 *
 * function: find the closest blocks
 *  Need to memorize the path to the block
 *  if it's the first/round:
 *      different strategy for closest since the start point could be different
 *  if !lastPlaceFetchBlock:
 *    search from the entrance of the stair around treasure
 *  else:
 *    search from the lastPlaceFetchBlock
 *
 *
 * function: place it at the correct place (could improve by reaching out towards the direction)
 * use a 2D arrary to track how the blocks are placed around the treasure
 *  start point of the stair should be either right, left, up or down of the treasure
 *
 */
var Stacker = /** @class */ (function () {
    function Stacker() {
        var _this = this;
        this.visited = new Set();
        this.pathStack = new Array();
        this.treasure = false;
        this.blockUsed = 0;
        //   moves = new Array<Instruction>();
        this.lastPlaceFetchBlock = {
            type: CellType.EMPTY,
            level: -1,
        };
        this.prvStep = Instruction.PICKUP;
        this.nextStep = Instruction.PICKUP;
        this.turn = function (currentCell) {
            var curInst = Instruction.PICKUP;
            if (!_this.treasure) {
                curInst = _this.findPathToCell(currentCell, CellType.GOLD);
            }
            console.log("Instruction: " + curInst);
            return curInst;
        };
    }
    Stacker.prototype.findClosestBlock = function (currentCell) {
        return Instruction.DOWN;
    };
    Stacker.prototype.placeBlock = function (currentCell) {
        return Instruction.DOWN;
    };
    /**
     * Find the closest certain type of the cell to current cell.
     * CellType
     *    Gold: we need to stop 2 steps away from gold
     *    Block: we will only search for block that not surrouding the Gold.
     * @param {CurrentCell} currentCell
     * @param {CellType} targetCellType
     */
    Stacker.prototype.findPathToCell = function (currentCell, targetCellType) {
        var curInstct = Instruction.PICKUP;
        if (this.neighborsCheck(currentCell, targetCellType)) {
            this.treasure = true;
            console.log("found the Gold----------------");
            return this.nextStep;
        }
        if (this.reverseDirct(this.prvStep) !== Instruction.DOWN &&
            this.hasVisited(Instruction.DOWN) &&
            this.reachable(currentCell, currentCell.down)) {
            return Instruction.DOWN;
        }
        if (this.reverseDirct(this.prvStep) !== Instruction.RIGHT &&
            this.hasVisited(Instruction.RIGHT) &&
            this.reachable(currentCell, currentCell.right)) {
            return Instruction.RIGHT;
        }
        if (this.reverseDirct(this.prvStep) !== Instruction.UP &&
            this.hasVisited(Instruction.UP) &&
            this.reachable(currentCell, currentCell.up)) {
            return Instruction.UP;
        }
        if (this.reverseDirct(this.prvStep) !== Instruction.LEFT &&
            this.hasVisited(Instruction.LEFT) &&
            this.reachable(currentCell, currentCell.left)) {
            return Instruction.LEFT;
        }
        // There's no way to go, need to pop the existing path and retry.
        console.log(this.pathStack);
        if (this.pathStack.length > 0) {
            var lastDirect = this.pathStack.pop();
            curInstct = this.reverseDirct(lastDirect);
        }
        console.log(this.visited);
        return curInstct;
    };
    Stacker.prototype.neighborsCheck = function (curCell, targetCellType) {
        if (curCell.down.type === targetCellType) {
            this.nextStep = Instruction.DOWN;
            return true;
        }
        else if (curCell.up.type === targetCellType) {
            this.nextStep = Instruction.UP;
            return true;
        }
        else if (curCell.right.type === targetCellType) {
            this.nextStep = Instruction.RIGHT;
            return true;
        }
        else if (curCell.left.type === targetCellType) {
            this.nextStep = Instruction.LEFT;
            return true;
        }
        return false;
    };
    Stacker.prototype.hasVisited = function (direction) {
        this.pathStack.push(direction);
        var pathString = this.pathStack.join();
        if (this.visited.has(pathString)) {
            // This direction has been visited
            this.pathStack.pop();
            return false;
        }
        else {
            this.visited.add(pathString);
            this.prvStep = direction;
        }
        return true;
    };
    Stacker.prototype.reverseDirct = function (curDirection) {
        switch (curDirection) {
            case Instruction.DOWN:
                return Instruction.UP;
            case Instruction.UP:
                return Instruction.DOWN;
            case Instruction.RIGHT:
                return Instruction.LEFT;
            default:
                return Instruction.RIGHT;
        }
    };
    Stacker.prototype.reachable = function (curCell, nextCell) {
        if (!nextCell ||
            nextCell.type == CellType.WALL ||
            Math.abs(curCell.level - nextCell.level) > 1) {
            return false;
        }
        return true;
    };
    return Stacker;
}());
exports.Stacker = Stacker;
//# sourceMappingURL=solution.js.map