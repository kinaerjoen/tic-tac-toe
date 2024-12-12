import { useEffect, useState } from "react";
import { Square } from "./components/Square/Square";
import { calculateWinner } from "./helpers/calculateWInner";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [turnHistory, setTurnHistory] = useState([]);
  const [xFirst, setXFirst] = useState(null);
  const [status, setStatus] = useState("");
  const [activeTurn, setActiveTurn] = useState(null);

  const handleClick = (i) => {
    if (
      squares[i] ||
      calculateWinner(squares) ||
      squares.filter((value) => value !== null).length < turnHistory.length
    )
      return;

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";

    setTurnHistory((prev) => [...prev, i]);
    setActiveTurn(turnHistory.length);
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    const gameWinner = calculateWinner(squares);

    setWinner(gameWinner);

    if (gameWinner) {
      setStatus(`Winner: ${gameWinner}`);
    } else if (turnHistory.length === 9) {
      setStatus("Ничья! Начните игру заново!");
    } else {
      setStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [turnHistory, xIsNext]);

  const newGame = () => {
    setTurnHistory([]);
    setWinner(null);
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setXFirst(null);
    setActiveTurn(null);
  };

  const handleXFirst = () => {
    setXFirst(true);
    setXIsNext(true);
  };

  const handleOFirst = () => {
    setXFirst(false);
    setXIsNext(false);
  };

  const handleTurnHistory = (index) => {
    const previousTurns = turnHistory.slice(0, index + 1);
    const previousSquares = Array(9).fill(null);

    previousTurns.forEach((value, i) => {
      previousSquares[value] = (xFirst ? i % 2 === 0 : i % 2 !== 0) ? "X" : "O";
    });

    setSquares(previousSquares);
    setActiveTurn(index);
  };

  return (
    <>
      {xFirst === null ? (
        <>
          <div>Выберите знак первого хода:</div>
          <button onClick={handleXFirst}>X</button>
          <button onClick={handleOFirst}>O</button>
        </>
      ) : (
        <>
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
          <div className="turns-container">
            {turnHistory.map((value, index) => (
              <button
                key={index}
                className={`turns-container__turns-button ${
                  activeTurn === index ? "active" : ""
                }`}
                onClick={() => handleTurnHistory(index)}
              >
                {`Ход ${index + 1}`}
              </button>
            ))}
          </div>
          {(winner || turnHistory.length === 9) && (
            <button onClick={newGame}>Начать заново</button>
          )}
        </>
      )}
    </>
  );
}
