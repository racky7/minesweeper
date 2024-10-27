import { useState } from "react";
import { useEffect } from "react";
import { generateBoard, onEmptyCell, onMineCell, Cell } from "../lib/utils";

export default function Minesweeper({
  rows,
  cols,
  mines,
}: {
  rows: number;
  cols: number;
  mines: number;
}) {
  const [board, setBoard] = useState<Cell[][] | undefined>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const onCellClick = (rowIndex: number, colIndex: number, cell: Cell) => {
    if (!board) return;
    if (board[rowIndex][colIndex].revealed) return;

    if (cell.value === "X") {
      setIsGameOver(true);

      const newBoard = onMineCell(board, rowIndex, colIndex, rows, cols);

      setBoard(newBoard);
    } else if (cell.value === 0) {
      console.log("old board - ", board);
      const newBoard = onEmptyCell(board, rowIndex, colIndex, rows, cols);

      setBoard(newBoard);
    } else {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex].revealed = true;

      setBoard(newBoard);
    }
  };

  useEffect(() => {
    if (isGameOver == false) {
      const board = generateBoard(rows, cols, mines);
      setBoard(board);
    }
  }, [rows, cols, mines, isGameOver]);

  return (
    <div className="minesweeper-container">
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          pointerEvents: isGameOver ? "none" : "unset",
        }}
      >
        {board?.map((rows, rowIndex) => {
          return rows?.map((cell, colIndex) => {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  onCellClick(rowIndex, colIndex, cell);
                }}
                className={`cell ${cell.revealed ? "revealed" : ""} ${
                  cell.revealed && cell.value === "X" ? "mine" : ""
                }`.trim()}
              >
                {cell.revealed ? <span>{cell.value}</span> : ""}
              </div>
            );
          });
        })}
      </div>
      <div className="minesweeper-footer">
        {isGameOver && (
          <>
            <span className="game-over">Game Over!</span>
            <button
              className="restart-button"
              onClick={() => setIsGameOver(false)}
            >
              Restart Game
            </button>
          </>
        )}
      </div>
    </div>
  );
}
