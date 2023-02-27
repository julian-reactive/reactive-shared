import React from 'react'

import { render } from '@testing-library/react'
import { NotFound } from '../notFound'

const getRendered = () => render(<NotFound />)

describe('notFound', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })
})