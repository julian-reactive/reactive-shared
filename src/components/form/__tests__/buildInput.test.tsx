import React from 'react'

import { render } from '@testing-library/react'
import { BuildInput, BuildInputProps } from '../buildInput'

const defaultProps: BuildInputProps = {
  
}

const getRendered = (props = defaultProps) => render(<BuildInput {...props}/>)

jest.mock('../', () => ({
  defaultUseQuery: () => {}
}))

describe('BuildInput', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })

  // describe('', () => {
  //   it('', () => {
  //     getRendered()
  //   })
  // })
})