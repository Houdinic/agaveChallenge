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
 *  use bfs to go over the maze;
 *  each path should pick up the first encontered block
 * 
 * function: find the closest blocks
 *  Need to memorize the path to the block
 *  if !lastPlaceFetchBlock:
 *    search from the entrance of the stair around treasure
 *  else:
 *    search from the lastPlaceFetchBlock
 *    
 * 
 * function: place it at the correct place
 * use a 2D arrary to track how the blocks are placed around the treasure
 *  start point of the stair should be either right, left, up or down of the treasure
 * 
 */
export class Stacker {
  visited = new Set();
  treasure = false;
  blockUsed = 0;
  lastPlaceFetchBlock: Cell = {
    type: CellType.EMPTY,
    level: -1
  };
  
  constructor(){
    
  }

  turn = (currentCell: CurrentCell): Instruction => {
    if (!this.treasure) {
      return this.findTreasure(currentCell);
    }

    return this.move(currentCell);
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
   * Any move will cost 1 turn;
   * Pick a block and it needs to be placed at the place it needs to be
   *
   * @param currentCell
   * @returns {Instruction}
   */
  move(currentCell: CurrentCell): Instruction {
    return Instruction.DOWN;
  }
  dfs(currentCell: CurrentCell) {}

  // More wizardry here
}
