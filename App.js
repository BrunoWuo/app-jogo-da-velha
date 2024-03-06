import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    const boardCopy = [...board];

    if (calculateWinner() || boardCopy[index]) {
      return;
    }

    boardCopy[index] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const winner = calculateWinner();
  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Button title="Reiniciar Jogo" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  board: {
    flexDirection: 'column',
    padding: 20
  },
  row: {
    flexDirection: 'row',    
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
