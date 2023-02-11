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
  cell: CurrentCell;
  step: number;
  instructions: Array<Instruction>;
}

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
export class Stacker {
  visited = new Set();
  treasure = false;
  blockUsed = 0;
  moves = new Array<Instruction>();
  lastPlaceFetchBlock: Cell = {
    type: CellType.EMPTY,
    level: -1,
  };

  constructor() {}

  turn = (currentCell: CurrentCell): Instruction => {
    if (!this.treasure) {
      return this.findTreasure(currentCell);
    }

    return Instruction.DOWN;
  };

  findTreasure(currentCell: CurrentCell): Instruction {
    return Instruction.DOWN;
  }

  findClosestBlock(currentCell: CurrentCell): Instruction {
    return Instruction.DOWN;
  }

  placeBlock(currentCell: CurrentCell): Instruction {
    return Instruction.DOWN;
  }

  /**
   * Find the closest certain type of the cell to current cell.
   * CellType
   *    Gold: we need to stop 2 steps away from gold
   *    Block: we will only search for block that not surrouding the Gold.
   * @param {CurrentCell} currentCell
   * @param {CellType} targetCellType
   */
  private shortestPathToCell(
    currentCell: CurrentCell,
    targetCellType: CellType
  ) {
    let queue = new Array<BFSSearch>();
    queue.push(<BFSSearch>{
      cell: currentCell,
      step: 0,
      instructions: new Array<Instruction>(),
    });
    let step = 0;
    while (queue) {
      let cur = queue.shift();
    }
  }

  private reachable(curCell: CurrentCell, nextCell: CurrentCell) {
    if (
      nextCell.type == CellType.WALL ||
      Math.abs(curCell.level - nextCell.level) > 1
    ) {
      return false;
    }
  }
}
