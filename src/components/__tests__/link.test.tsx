import React from 'react'

import {render} from '@testing-library/react'
import { Link } from '../link'

const defaultProps = {
    to: 'test/app'
}

const getRendered = (props = defaultProps) => render(<Link {...props}>Link</Link>)

describe('link', () => {
    it('should match snapshot', () => {
        const { container } = getRendered()
        expect(container.firstChild).toMatchSnapshot()
    })
})