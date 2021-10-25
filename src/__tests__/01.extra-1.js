import * as React from 'react'
import {render, screen} from '@testing-library/react'
import App from '../exercise/01.extra-1'

test('typing a name shows a greeting', () => {
  render(<App />)
  expect(screen.getByText(/hello.*Cody/i)).toBeInTheDocument()
})
