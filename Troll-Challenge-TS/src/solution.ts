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
   * Move to the treasure with the shortest path
   * Bring the first block bypass on the way
   * while there's not enough blocks around treasure:
   * (find the closest blocks) and (place it at the correct place)
   * 
   * find the closest blocks:
   * 
   * 
   * place it at the correct place:
   * 
   * 
   */
export class Stacker {
  visited = new Set();
  treasure = false;

  // Replace this with your own wizardry
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
