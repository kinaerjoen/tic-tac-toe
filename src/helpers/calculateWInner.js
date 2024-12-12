export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Первая строка
    [3, 4, 5], // Вторая строка
    [6, 7, 8], // Третья строка
    [0, 3, 6], // Первый столбец
    [1, 4, 7], // Второй столбец
    [2, 5, 8], // Третий столбец
    [0, 4, 8], // Главная диагональ
    [2, 4, 6], // Побочная диагональ
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
