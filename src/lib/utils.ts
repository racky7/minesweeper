const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export type Cell = {
  revealed: boolean;
  value: number | string;
};

export const generateBoard = (rows: number, cols: number, mines: number) => {
  const board = Array(rows)
    .fill(0)
    .map(() =>
      Array(cols).fill({
        revealed: false,
        value: 0,
      })
    );

  let mineCount = 0;
  while (mineCount < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col].value !== "X") {
      board[row][col] = { revealed: false, value: "X" };
      mineCount++;
      updateNumbers(board, row, col, rows, cols);
    }
  }

  return board;
};

export const updateNumbers = (
  board: Cell[][],
  row: number,
  col: number,
  rows: number,
  cols: number
) => {
  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      board[newRow][newCol].value !== "X"
    ) {
      if (typeof board[newRow][newCol].value === "string") return;

      board[newRow][newCol] = {
        ...board[newRow][newCol],
        value: board[newRow][newCol].value + 1,
      };
    }
  });
};

export const onEmptyCell = (
  board: Cell[][],
  row: number,
  col: number,
  rows: number,
  cols: number
) => {
  const newBoard = JSON.parse(JSON.stringify(board));

  const targetIndexes = [[row, col]];
  const visitedIndex = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  const dfs = (rowI: number, colI: number) => {
    if (visitedIndex[rowI][colI] === 1) return;
    visitedIndex[rowI][colI] = 1;

    targetIndexes.push([rowI, colI]);
    if (board[rowI][colI].value !== 0) return;

    // traverse all 8 directions
    directions.forEach(([dx, dy]) => {
      const newRow = rowI + dx;
      const newCol = colI + dy;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        board[newRow][newCol].revealed === false
      ) {
        dfs(newRow, newCol);
      }
    });
  };

  dfs(row, col);

  targetIndexes.forEach(([nR, nC]) => {
    newBoard[nR][nC].revealed = true;
  });

  return newBoard;
};

export const onMineCell = (
  board: Cell[][],
  row: number,
  col: number,
  rows: number,
  cols: number
) => {
  const newBoard = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].value === "X") {
        newBoard[i][j].revealed = true;
      }
    }
  }

  return newBoard;
};
