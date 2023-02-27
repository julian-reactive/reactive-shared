import React from 'react'

import { render } from '@testing-library/react'
import { Autocomplete, AutocompleteProps } from '../autocomplete'

const defaultProps: AutocompleteProps = {
  freeSolo: true,
  inputProps: {
    label: ''
  }
}

const getRendered = (props = defaultProps) => render(<Autocomplete {...props}/>)

jest.mock('../', () => ({
  defaultUseQuery: () => {}
}))

describe('autocomplete', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })

  // describe('when handleChange is used', () => {
  //   it('should', () => {
  //     getRendered()
  //   })
  // })
})