enum Instruction {
    LEFT = 'left',
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down',
    PICKUP = 'pickup',
    DROP = 'drop',
}

enum CellType {
    EMPTY,
    WALL,
    BLOCK,
    GOLD,
}

enum mapCellType {
    EMPTY,
    WALL,
    BLOCK,
    GOLD,
    UNKNOWN
}

interface Cell {
    type: CellType;
    level: number;
}

interface CurrentCell extends Cell {
  left: Cell;
  up: Cell;
  right: Cell;
  down: Cell;
}

interface BFSSearch {
  curCell: CurrentCell;
  step: number;
  path: Array<Instruction>;
}

/**
 * GOAL: average <1000 turns across ten tries. The best score we’ve seen is 430.
 * Solution overview:
 * Building stairs around the treasure to access it. (direction of the inital 1 should be
 * facing the direction that has most blocks)
 *         7  6
 *      1  8  5
 *      2  3  4
 * 1. Explore the whole map and memorized places that bypass.
 *    a. Try to find one of the four corner and draw the map.
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
export class Stacker {
  visited = new Set<string>();
  pathStack = new Array<Instruction>();
  // If we have found the treasure.
  treasure = false;
  blockUsed = 0;
  // The recorded map block.
  map = new Array<Array<mapCellType>>();
  lastPlaceFetchBlock: Cell = {
    type: CellType.EMPTY,
    level: -1,
  };
  prvStep = Instruction.PICKUP;
  nextStep = Instruction.PICKUP;

  constructor() {
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 18; j++) {
        this.map[i][j] = mapCellType.UNKNOWN;
      }
    }
  }

  turn = (currentCell: CurrentCell): Instruction => {
    let curInst = Instruction.PICKUP;
    if (!this.treasure) {
      curInst = <Instruction>this.findPathToCell(currentCell, CellType.GOLD);
    }
    console.log("Instruction: " + curInst);
    return curInst;
  };

  /**
   * Find the closest certain type of the cell to current cell.
   * CellType
   *    Gold: we need to stop 2 steps away from gold
   *    Block: we will only search for block that not surrouding the Gold.
   * @param {CurrentCell} currentCell
   * @param {CellType} targetCellType
   */
  private findPathToCell(
    currentCell: CurrentCell,
    targetCellType: CellType
  ): Instruction {
    let curInstct = Instruction.PICKUP;
    if (this.neighborsCheck(currentCell, targetCellType)) {
      this.treasure = true;
      console.log("found the Gold----------------");
      return this.nextStep;
    }
    if (
      this.reverseDirct(this.prvStep) !== Instruction.DOWN &&
      this.reachable(currentCell, currentCell.down) &&
      this.notVisited(Instruction.DOWN)
    ) {
      return Instruction.DOWN;
    }
    if (
      this.reverseDirct(this.prvStep) !== Instruction.RIGHT &&
      this.reachable(currentCell, currentCell.right) &&
      this.notVisited(Instruction.RIGHT)
    ) {
      return Instruction.RIGHT;
    }
    if (
      this.reverseDirct(this.prvStep) !== Instruction.UP &&
      this.reachable(currentCell, currentCell.up) &&
      this.notVisited(Instruction.UP)
    ) {
      return Instruction.UP;
    }
    if (
      this.reverseDirct(this.prvStep) !== Instruction.LEFT &&
      this.reachable(currentCell, currentCell.left) &&
      this.notVisited(Instruction.LEFT)
    ) {
      return Instruction.LEFT;
    }
    // There's no way to go, need to pop the existing path and retry.
    if (this.pathStack.length > 0) {
      const lastDirect = <Instruction>this.pathStack.pop();
      curInstct = this.reverseDirct(lastDirect);
    }
    return curInstct;
  }

  private neighborsCheck(curCell: CurrentCell, targetCellType: CellType) {
    if (curCell.down.type === targetCellType) {
      this.nextStep = Instruction.DOWN;
      return true;
    } else if (curCell.up.type === targetCellType) {
      this.nextStep = Instruction.UP;
      return true;
    } else if (curCell.right.type === targetCellType) {
      this.nextStep = Instruction.RIGHT;
      return true;
    } else if (curCell.left.type === targetCellType) {
      this.nextStep = Instruction.LEFT;
      return true;
    }
    return false;
  }

  private reverseDirct(curDirection: Instruction): Instruction {
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
  }
  // ------ Boolean helper -------
  private isCorner() {
    
  }

  private notVisited(direction: Instruction): boolean {
    this.pathStack.push(direction);
    const pathString = this.pathStack.join();
    console.log(pathString);
    if (this.visited.has(pathString)) {
      // This direction has been visited
      this.pathStack.pop();
      return false;
    } else {
      this.visited.add(pathString);
      this.prvStep = direction;
    }
    return true;
  }

  private reachable(curCell: CurrentCell, nextCell: Cell) {
    if (
      !nextCell ||
      nextCell.type == CellType.WALL ||
      Math.abs(curCell.level - nextCell.level) > 1
    ) {
      return false;
    }
    return true;
  }
}
