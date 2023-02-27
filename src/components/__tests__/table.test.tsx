import React from 'react'

import { render } from '@testing-library/react'
import { AppTable, AppTableProps } from '../table'

const defaultProps: AppTableProps = {
  headItems: ['npmbre', 'apellido'],
  bodyItems: [["Juan", "Martínez"],
  ["Pedro", "García"],
  ["María", "Rodríguez"]]
}

const getRendered = (props = defaultProps) => render(<AppTable {...props}/>)

describe('table', () => {
  it('should match snapshot', () => {
    const { container } = getRendered()
    expect(container.firstChild).toMatchSnapshot()
  })
})