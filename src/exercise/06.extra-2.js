// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.extra-2.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [state, setState] = React.useState('idle')

  React.useEffect(() => {
    if (!pokemonName) return

    setState('pending')
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData)
        setState('resolved')
      })
      .catch(error => {
        setError(error)
        setState('rejected')
      })
  }, [pokemonName])

  const isIdle = state === 'idle'
  const isPending = state === 'pending'
  const isRejected = state === 'rejected'
  const isResolved = state === 'resolved'

  if (isIdle) {
    return 'Submit a pokemon'
  }

  if (isRejected) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (isPending) {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (isResolved) {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error(`Unknown state: ${state}`)
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
