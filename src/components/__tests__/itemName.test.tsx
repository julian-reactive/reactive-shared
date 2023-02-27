import React from 'react'

import {render} from '@testing-library/react'
import { ItemName, ItemNameProps } from '../itemName'

const defaultProps: ItemNameProps = {
    name: 'test',
    image: 'test'   
}

const getRendered = (props = defaultProps) => render(<ItemName {...props} />)

describe('itemName', () => {
    it('should match snapshot', () => {
        const { container } = getRendered()
        expect(container.firstChild).toMatchSnapshot()
    })
})