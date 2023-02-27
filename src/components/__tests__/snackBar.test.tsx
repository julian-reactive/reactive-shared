import React from 'react'

import { render } from '@testing-library/react'
import { SnackBar } from '../snackBar'

const getRendered = () => render(<SnackBar />)

describe('snackBar', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })
})