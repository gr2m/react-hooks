// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.extra-1.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, onSquareSelected}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onSquareSelected(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Step({step, currentStep, onSelect}) {
  const isCurrentStep = step === currentStep
  const label = step === 0 ? 'Go to game start' : `Go to move #${step}`
  return (
    <li key={step}>
      <button disabled={isCurrentStep} onClick={() => onSelect(step)}>
        {label} {isCurrentStep ? ' (current)' : ''}
      </button>
    </li>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )
  const squares = history[currentStep]
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  const steps = history.map(
    (_, step) => new Step({step, currentStep, onSelect: setStep}),
  )

  function selectSquare(square) {
    if (winner || squares[square]) return

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setCurrentStep(currentStep + 1)

    setHistory([...history.slice(0, currentStep + 1), squaresCopy])
  }

  function setStep(step) {
    setCurrentStep(step)
  }

  function restart() {
    setCurrentStep(0)
    setHistory([Array(9).fill(null)])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onSquareSelected={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{steps}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
