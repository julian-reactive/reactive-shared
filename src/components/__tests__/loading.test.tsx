import React from 'react'

import {render} from '@testing-library/react'
import { Loading, iLoading } from '../loading'

const defaultProps: iLoading = {
    backdrop: false
}

const getRendered = (props = defaultProps) => render(<Loading {...props} />)

describe('loading', () => {
    it('should match snapshot', () => {
        const { container } = getRendered()
        expect(container.firstChild).toMatchSnapshot()
    })

    describe('when backdrop is true', () => {
      it('should open backdrop', async () => {
        defaultProps.backdrop = true
        getRendered()
      })
    })
})