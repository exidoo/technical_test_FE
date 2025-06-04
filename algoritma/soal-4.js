function hitungDiagonal(matrix) {
  let diagonal1 = 0;
  let diagonal2 = 0;
  const N = matrix.length;

  for (let i = 0; i < N; i++) {
    diagonal1 += matrix[i][i];
    diagonal2 += matrix[i][N - 1 - i];
  }

  return Math.abs(diagonal1 - diagonal2);
}

const matrix = [
  [5, 22, 2],
  [12, 5, 6],
  [6, 66, 9],
];

console.log(hitungDiagonal(matrix));
