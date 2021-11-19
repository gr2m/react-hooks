// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.extra-3.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) return

    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({status: 'resolved', pokemon: pokemonData})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  const isIdle = state.status === 'idle'
  const isPending = state.status === 'pending'
  const isRejected = state.status === 'rejected'
  const isResolved = state.status === 'resolved'

  if (isIdle) {
    return 'Submit a pokemon'
  }

  if (isRejected) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }

  if (isPending) {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (isResolved) {
    return <PokemonDataView pokemon={state.pokemon} />
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
